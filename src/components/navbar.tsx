
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Award, BarChart3, Info } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:inline-block">ResumePilot <span className="text-primary">AI</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/home" className="hover:text-primary transition-colors flex items-center gap-2">
            Home
          </Link>
          <Link href="/analyze" className="hover:text-primary transition-colors flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Analyze
          </Link>
          <Link href="/companies" className="hover:text-primary transition-colors flex items-center gap-2">
            <Award className="w-4 h-4" /> Reference
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
