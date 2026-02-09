"use client";

import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t py-8 bg-muted/30">
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>&copy; {year || '2025'} ResumePilot AI. Built for the future of work.</p>
      </div>
    </footer>
  );
}
