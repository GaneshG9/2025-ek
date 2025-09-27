
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function Logo({ width = 28, height = 28 }: { width?: number, height?: number }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  if (!mounted) {
    return <div style={{ width: `${width}px`, height: `${height}px` }} />;
  }

  return (
    <div>
      {currentTheme === 'dark' ? (
        <Image 
          src="/logo-white.svg" 
          alt="Ekavarta Logo" 
          width={width} 
          height={height}
          priority
        />
      ) : (
        <Image 
          src="/logo-black.svg" 
          alt="Ekavarta Logo" 
          width={width} 
          height={height}
          priority
        />
      )}
    </div>
  );
}
