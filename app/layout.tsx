// ============================================
// Root Layout (App Router)
// ============================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getPrimaryMenu } from '@/lib/api';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Headless WordPress + Next.js 블로그',
  description: 'GEO 최적화와 Core Web Vitals에 집착하는 초고속 블로그',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  let menuItems = [];

  try {
    menuItems = await getPrimaryMenu();
  } catch (error) {
    console.error('메뉴 로드 실패 (Layout):', error);
    // @ts-ignore
    menuItems = [];
  }

  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              My Blog
            </Link>
            <ul className="flex gap-6">
              {/* @ts-ignore */}
              {menuItems && menuItems.length > 0 ? (
                // @ts-ignore
                menuItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path || item.url || '/'}
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">메뉴 로딩 중...</li>
              )}
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
            <p>© 2024 Headless WordPress Blog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

