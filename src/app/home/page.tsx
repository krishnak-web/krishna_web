"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart3, 
  History, 
  Settings, 
  PlusCircle, 
  FileText, 
  ChevronRight, 
  TrendingUp, 
  Award, 
  ArrowRight 
} from 'lucide-react';

export default function UserHomePage() {
  const stats = [
    { label: 'Analyses Run', value: '12', icon: <History className="w-4 h-4" /> },
    { label: 'Avg. Score', value: '78%', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Best Skill', value: 'React', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold font-headline">Welcome, Candidate</h1>
          <p className="text-muted-foreground">You're on your way to that dream role.</p>
        </div>
        <Button className="rounded-xl h-12 gap-2" asChild>
          <Link href="/analyze"><PlusCircle className="w-5 h-5" /> New Analysis</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="border-2">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
                <CardDescription>Your last few resume scans</CardDescription>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
                <Link href="/analyze">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  { title: 'Google - Senior SWE', date: '2 days ago', score: 84 },
                  { title: 'Meta - Product Engineer', date: '1 week ago', score: 72 },
                  { title: 'Amazon - Backend Developer', date: '2 weeks ago', score: 65 },
                ].map((item, i) => (
                  <div key={i} className="py-4 flex items-center justify-between group cursor-pointer hover:bg-muted/30 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted p-2 rounded-lg group-hover:bg-white transition-colors">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="text-xl font-bold text-primary">{item.score}</p>
                          <p className="text-[10px] text-muted-foreground font-bold">SCORE</p>
                       </div>
                       <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           <Card className="bg-accent text-accent-foreground border-0 shadow-xl overflow-hidden relative group cursor-pointer" asChild>
             <Link href="/companies">
               <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Reference Guides</CardTitle>
                  <CardDescription className="text-foreground/70">Benchmark against the best</CardDescription>
               </CardHeader>
               <CardContent>
                  <p className="mb-4 text-sm leading-relaxed text-foreground">See how top-tier resumes are constructed at companies like Google, Meta, and Netflix.</p>
                  <div className="flex justify-end">
                    <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                       <ArrowRight className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
               </CardContent>
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Award className="w-32 h-32" />
               </div>
             </Link>
           </Card>

           <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Account Tools</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                 <Button variant="outline" className="w-full justify-start gap-3 h-12" asChild>
                    <Link href="/home"><Settings className="w-4 h-4" /> Profile Settings</Link>
                 </Button>
                 <Button variant="outline" className="w-full justify-start gap-3 h-12" asChild>
                    <Link href="/home"><BarChart3 className="w-4 h-4" /> View All Stats</Link>
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}