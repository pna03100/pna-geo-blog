'use client';

import { useEffect, useRef, useState } from 'react';

export function LazyMap() {
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full h-full min-h-[180px] rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all">
      {load ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.780766513604!2d126.76813457652135!3d37.65435791908621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8546188e35e9%3A0xebe2b6747f0c7786!2zU0vsl6Dsi5zti7A!5e0!3m2!1sko!2skr!4v1768281891666!5m2!1sko!2skr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="brightness-90 group-hover:brightness-100 transition-all duration-300"
          title="PNA Company Location"
        />
      ) : (
        <div className="w-full h-full min-h-[180px] bg-white/5 animate-pulse" />
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none" />
    </div>
  );
}
