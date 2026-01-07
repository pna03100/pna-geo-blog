// ============================================
// [Security] WordPress HTML Parser for Home Page
// Trinity: Cheerio Parsing + Zod Validation + Robust Detection
// ============================================

import * as cheerio from 'cheerio';
import {
  HeroSectionProps,
  HeroSectionSchema,
  FeatureGridProps,
  FeatureGridSchema,
  ServicesTabsProps,
  ServicesTabsSchema,
  FaqSectionProps,
  FaqSectionSchema,
} from './home-types';

// ============================================
// [Debug] HTML Preview Helper
// ============================================
function logHTMLPreview(html: string, sectionName: string, maxLength = 300) {
  console.log(`\n📝 [${sectionName}] HTML Preview (${html.length} chars):`);
  console.log(html.substring(0, maxLength).replace(/\s+/g, ' '));
  if (html.length > maxLength) console.log('...');
}

// ============================================
// [Security] Parse Hero Section
// ============================================
export function parseHeroSection(html: string): HeroSectionProps | null {
  try {
    const $ = cheerio.load(html);
    
    // [Implementation] Try multiple selector strategies
    let heroSection = $('#hero');
    if (heroSection.length === 0) {
      heroSection = $('[id*="hero"]'); // Elementor/Builder IDs
    }
    if (heroSection.length === 0) {
      heroSection = $('.hero, .hero-section, section.hero');
    }
    if (heroSection.length === 0) {
      // Fallback: 첫 번째 section 시도
      heroSection = $('section').first();
    }

    if (heroSection.length === 0) {
      console.warn('⚠️ Hero section not found in HTML');
      logHTMLPreview(html, 'Hero Search Failed');
      return null;
    }

    logHTMLPreview(heroSection.html() || '', 'Hero Section Found');

    // [Implementation] Flexible content extraction
    const title = heroSection.find('h1, h2, .heading, .title, [class*="heading"], [class*="title"]')
      .first()
      .text()
      .trim();

    const subtitle = heroSection.find('.subtitle, .badge, .tag, .label, span[class*="subtitle"], small')
      .first()
      .text()
      .trim() || undefined;

    // Get first meaningful paragraph (skip empty ones)
    let description: string | undefined;
    heroSection.find('p').each((_, elem) => {
      const text = $(elem).text().trim();
      if (text && text.length > 10 && !description) {
        description = text;
      }
    });

    // Find CTA link
    const ctaLink = heroSection.find('a').filter((_, elem) => {
      const $a = $(elem);
      const classes = $a.attr('class') || '';
      const text = $a.text().trim();
      return (
        text.length > 0 &&
        text.length < 50 &&
        (classes.includes('btn') ||
          classes.includes('button') ||
          classes.includes('cta') ||
          classes.includes('link'))
      );
    }).first();

    const ctaText = ctaLink.text().trim() || undefined;
    const ctaUrl = ctaLink.attr('href') || undefined;

    const data = {
      title: title || '제목 없음',
      subtitle,
      description,
      ctaText,
      ctaUrl,
    };

    console.log('🔍 [Hero] Extracted:', {
      title: data.title.substring(0, 50),
      hasSubtitle: !!data.subtitle,
      hasDescription: !!data.description,
      hasCTA: !!data.ctaText,
    });

    // [Security] Zod Validation
    const validated = HeroSectionSchema.safeParse(data);
    
    if (!validated.success) {
      console.error('❌ Hero Section validation failed:', validated.error.errors);
      return null;
    }

    return validated.data;
  } catch (error) {
    console.error('❌ parseHeroSection error:', error);
    return null;
  }
}

// ============================================
// [Security] Parse Feature Grid
// ============================================
export function parseFeatureGrid(html: string): FeatureGridProps | null {
  try {
    const $ = cheerio.load(html);
    
    // [Implementation] Try multiple selector strategies
    let featureSection = $('#features');
    if (featureSection.length === 0) {
      featureSection = $('[id*="feature"]');
    }
    if (featureSection.length === 0) {
      featureSection = $('.features, .feature-section, section[class*="feature"]');
    }

    if (featureSection.length === 0) {
      console.warn('⚠️ Features section not found in HTML');
      return null;
    }

    logHTMLPreview(featureSection.html() || '', 'Features Section Found');

    // Extract section title
    const title = featureSection
      .find('h2, h3, .section-title, .heading, [class*="title"]')
      .first()
      .text()
      .trim() || undefined;

    const features: Array<{ title: string; description: string; icon?: string }> = [];

    // [Implementation] Try multiple item selectors
    const itemSelectors = [
      'article',
      '.feature',
      '.feature-item',
      '.feature-card',
      'div[class*="feature"]',
      'div[class*="card"]',
      'div[class*="item"]',
      '.col', // Grid columns
      '[class*="col-"]', // Bootstrap/Grid columns
    ];

    for (const selector of itemSelectors) {
      const items = featureSection.find(selector);
      
      if (items.length > 0) {
        console.log(`🔍 [Features] Found ${items.length} items with selector: ${selector}`);
        
        items.each((_, element) => {
          const $el = $(element);
          
          // Extract title
          const featureTitle = $el
            .find('h3, h4, h5, .title, .heading, strong, b, [class*="title"], [class*="heading"]')
            .first()
            .text()
            .trim();
          
          // Extract description
          let description = $el.find('p, .description, .text, [class*="description"]')
            .first()
            .text()
            .trim();
          
          // Fallback: get any text content
          if (!description) {
            description = $el.text().trim().substring(0, 200);
          }
          
          // Extract icon (emoji or icon class)
          const icon = $el.find('.icon, .emoji, [data-icon], i[class*="icon"]')
            .first()
            .text()
            .trim() || undefined;

          if (featureTitle && description && featureTitle !== title) {
            features.push({ title: featureTitle, description, icon });
          }
        });

        // If we found features, stop trying other selectors
        if (features.length > 0) break;
      }
    }

    console.log(`🔍 [Features] Extracted ${features.length} features`);

    if (features.length === 0) {
      console.warn('⚠️ No feature items found');
      return null;
    }

    const data = { title, features };

    // [Security] Zod Validation
    const validated = FeatureGridSchema.safeParse(data);
    
    if (!validated.success) {
      console.error('❌ Feature Grid validation failed:', validated.error.errors);
      return null;
    }

    return validated.data;
  } catch (error) {
    console.error('❌ parseFeatureGrid error:', error);
    return null;
  }
}

// ============================================
// [Security] Parse Services Tabs
// ============================================
export function parseServicesTabs(html: string): ServicesTabsProps | null {
  try {
    const $ = cheerio.load(html);
    
    // [Implementation] Try multiple selector strategies
    let servicesSection = $('#services');
    if (servicesSection.length === 0) {
      servicesSection = $('[id*="service"]');
    }
    if (servicesSection.length === 0) {
      servicesSection = $('.services, .service-section, section[class*="service"]');
    }

    if (servicesSection.length === 0) {
      console.warn('⚠️ Services section not found in HTML');
      return null;
    }

    logHTMLPreview(servicesSection.html() || '', 'Services Section Found');

    const title = servicesSection
      .find('h2, h3, .section-title, .heading, [class*="title"]')
      .first()
      .text()
      .trim() || undefined;

    const tabs: Array<{ id: string; title: string; description: string; content: string }> = [];

    // [Implementation] Try multiple item selectors
    const itemSelectors = [
      'article',
      '.service',
      '.service-item',
      '.service-card',
      'div[class*="service"]',
      'div[class*="tab"]',
      '.col',
      '[class*="col-"]',
    ];

    for (const selector of itemSelectors) {
      const items = servicesSection.find(selector);
      
      if (items.length > 0) {
        console.log(`🔍 [Services] Found ${items.length} items with selector: ${selector}`);
        
        items.each((index, element) => {
          const $el = $(element);
          
          const tabTitle = $el
            .find('h3, h4, h5, .title, .heading, strong, [class*="title"]')
            .first()
            .text()
            .trim();
          
          let description = $el
            .find('p, .description, .text, [class*="description"]')
            .first()
            .text()
            .trim();
          
          // Fallback: get text content (excluding title)
          if (!description) {
            description = $el.text().replace(tabTitle, '').trim().substring(0, 200);
          }
          
          const content = $el.find('.content, .details, .body').html() || 
                          $el.html() || 
                          `<p>${description}</p>`;

          if (tabTitle && tabTitle !== title) {
            tabs.push({
              id: `service-${tabs.length + 1}`,
              title: tabTitle,
              description: description || tabTitle,
              content,
            });
          }
        });

        if (tabs.length > 0) break;
      }
    }

    console.log(`🔍 [Services] Extracted ${tabs.length} tabs`);

    if (tabs.length === 0) {
      console.warn('⚠️ No service items found');
      return null;
    }

    const data = { title, tabs };

    // [Security] Zod Validation
    const validated = ServicesTabsSchema.safeParse(data);
    
    if (!validated.success) {
      console.error('❌ Services Tabs validation failed:', validated.error.errors);
      return null;
    }

    return validated.data;
  } catch (error) {
    console.error('❌ parseServicesTabs error:', error);
    return null;
  }
}

// ============================================
// [Security] Parse FAQ Section
// ============================================
export function parseFaqSection(html: string): FaqSectionProps | null {
  try {
    const $ = cheerio.load(html);
    
    // [Implementation] Try multiple selector strategies
    let faqSection = $('#faq');
    if (faqSection.length === 0) {
      faqSection = $('[id*="faq"]');
    }
    if (faqSection.length === 0) {
      faqSection = $('.faq, .faq-section, .faqs, section[class*="faq"]');
    }
    if (faqSection.length === 0) {
      faqSection = $('[id*="question"]');
    }

    if (faqSection.length === 0) {
      console.warn('⚠️ FAQ section not found in HTML');
      return null;
    }

    logHTMLPreview(faqSection.html() || '', 'FAQ Section Found');

    const title = faqSection
      .find('h2, h3, .section-title, .heading, [class*="title"]')
      .first()
      .text()
      .trim() || undefined;

    const faqs: Array<{ question: string; answer: string }> = [];

    // [Implementation] Strategy 1: article/.faq-item structure
    const itemSelectors = [
      'article',
      '.faq',
      '.faq-item',
      '.faq-card',
      'div[class*="faq"]',
      'div[class*="question"]',
      '.accordion-item',
      '.col',
    ];

    for (const selector of itemSelectors) {
      const items = faqSection.find(selector);
      
      if (items.length > 0) {
        console.log(`🔍 [FAQ] Found ${items.length} items with selector: ${selector}`);
        
        items.each((_, element) => {
          const $el = $(element);
          
          // Try to find question
          let question = $el
            .find('h3, h4, h5, .question, .q, strong, [class*="question"]')
            .first()
            .text()
            .trim();
          
          // If no specific question element, try first heading
          if (!question) {
            question = $el.find('h1, h2, h3, h4, h5, h6').first().text().trim();
          }
          
          // Try to find answer
          let answer = $el
            .find('p, .answer, .a, .description, [class*="answer"]')
            .first()
            .text()
            .trim();
          
          // Fallback: get remaining text after question
          if (!answer) {
            answer = $el.text().replace(question, '').trim();
          }

          if (question && answer && question !== title && answer.length > 5) {
            faqs.push({ question, answer });
          }
        });

        if (faqs.length > 0) break;
      }
    }

    // [Implementation] Strategy 2: dt/dd structure
    if (faqs.length === 0) {
      const dtElements = faqSection.find('dt');
      if (dtElements.length > 0) {
        console.log(`🔍 [FAQ] Found ${dtElements.length} dt/dd pairs`);
        
        dtElements.each((_, element) => {
          const $dt = $(element);
          const $dd = $dt.next('dd');
          const question = $dt.text().trim();
          const answer = $dd.text().trim();

          if (question && answer) {
            faqs.push({ question, answer });
          }
        });
      }
    }

    // [Implementation] Strategy 3: Alternating h3/p structure
    if (faqs.length === 0) {
      const headings = faqSection.find('h3, h4');
      if (headings.length > 0) {
        console.log(`🔍 [FAQ] Trying alternating heading/paragraph structure (${headings.length} headings)`);
        
        headings.each((_, element) => {
          const $heading = $(element);
          const question = $heading.text().trim();
          const $nextP = $heading.next('p');
          const answer = $nextP.text().trim();

          if (question && answer && question !== title) {
            faqs.push({ question, answer });
          }
        });
      }
    }

    console.log(`🔍 [FAQ] Extracted ${faqs.length} FAQ items`);

    if (faqs.length === 0) {
      console.warn('⚠️ No FAQ items found');
      return null;
    }

    const data = { title, faqs };

    // [Security] Zod Validation
    const validated = FaqSectionSchema.safeParse(data);
    
    if (!validated.success) {
      console.error('❌ FAQ Section validation failed:', validated.error.errors);
      return null;
    }

    return validated.data;
  } catch (error) {
    console.error('❌ parseFaqSection error:', error);
    return null;
  }
}

