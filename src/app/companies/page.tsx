"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Code2, 
  Terminal, 
  Globe, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';

const COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    role: 'Software Engineer',
    color: 'border-blue-500',
    icon: <Globe className="w-8 h-8 text-blue-500" />,
    expectations: [
      'Strong foundations in Algorithms & Data Structures',
      'Emphasis on scalability and distributed systems',
      'Contribution to open-source or large-scale projects',
      'Clean code principles and documentation focus'
    ],
    skills: ['Python', 'Java', 'Go', 'Kubernetes', 'GCP', 'C++'],
    formatTip: 'Keep it simple. One column, black and white, no images. Focus on impact and metrics.'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    role: 'Backend Developer',
    color: 'border-orange-500',
    icon: <Terminal className="w-8 h-8 text-orange-500" />,
    expectations: [
      'Deep understanding of AWS Ecosystem',
      'Customer-centric project results',
      'Proficiency in microservices architecture',
      'Ownership and biased-for-action mentality'
    ],
    skills: ['Node.js', 'DynamoDB', 'AWS Lambda', 'Java', 'SQL'],
    formatTip: 'Use keywords directly from the leadership principles. Be specific about the "Scale" of your projects.'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    role: 'Full Stack Developer',
    color: 'border-blue-600',
    icon: <Building2 className="w-8 h-8 text-blue-600" />,
    expectations: [
      'Experience with .NET or React stacks',
      'Azure cloud knowledge is a major plus',
      'Strong collaborative and CI/CD skills',
      'Testing and quality assurance mindset'
    ],
    skills: ['C#', 'TypeScript', 'React', 'Azure', 'SQL Server'],
    formatTip: 'Hybrid formatting works well. Show your versatility across the front-end and back-end.'
  },
  {
    id: 'meta',
    name: 'Meta',
    role: 'Product Engineer',
    color: 'border-blue-400',
    icon: <Cpu className="w-8 h-8 text-blue-400" />,
    expectations: [
      'Exceptional product-thinking abilities',
      'Deep expertise in modern JS frameworks',
      'High ownership of user-facing features',
      'Performance optimization experience'
    ],
    skills: ['React', 'Relay', 'GraphQL', 'PHP/Hack', 'Rust'],
    formatTip: 'Focus on "Ship It" culture. Highlight projects where you took an idea from concept to production.'
  }
];

export default function CompaniesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-16">
        <h1 className="text-5xl font-bold font-headline mb-6">Industry Gold Standards</h1>
        <p className="text-xl text-muted-foreground">
          What do the world's leading tech companies look for? We've analyzed thousands of successful hires to bring you these reference benchmarks.
        </p>
      </div>

      <Tabs defaultValue="google" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50 rounded-2xl mb-12">
          {COMPANIES.map(company => (
            <TabsTrigger 
              key={company.id} 
              value={company.id}
              className="py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-headline"
            >
              {company.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {COMPANIES.map(company => (
          <TabsContent key={company.id} value={company.id}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className={`lg:col-span-2 border-l-8 ${company.color} shadow-lg`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-muted rounded-2xl">{company.icon}</div>
                     <Badge variant="outline" className="text-sm font-medium">{company.role}</Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold">{company.name} Expectations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h3 className="text-lg font-bold font-headline flex items-center gap-2">
                          Core Competencies
                       </h3>
                       <ul className="space-y-3">
                          {company.expectations.map((exp, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                               <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                               <span>{exp}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-lg font-bold font-headline">Tech Stack Preference</h3>
                       <div className="flex flex-wrap gap-2">
                          {company.skills.map(skill => (
                            <code key={skill} className="px-3 py-1 bg-muted rounded-lg text-sm font-code border border-border">
                              {skill}
                            </code>
                          ))}
                       </div>
                       <div className="pt-6">
                          <Button className="w-full h-12 gap-2" variant="secondary" asChild>
                            <a href={`https://www.google.com/search?q=${company.name}+careers+${company.role}`} target="_blank" rel="noopener noreferrer">
                              Explore Jobs at {company.name} <ArrowRight className="w-4 h-4" />
                            </a>
                          </Button>
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="bg-primary text-primary-foreground border-0 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                       <Info className="w-5 h-5" />
                       Resume Format Tip
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed opacity-90 italic">
                      &quot;{company.formatTip}&quot;
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <section className="mt-24 py-16 px-8 rounded-[3rem] bg-muted/30 border border-border text-center">
         <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">The Golden Rule for ATS</h2>
         <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
           Recruiters spend an average of 6 seconds looking at your resume. Make every second count by prioritizing impact over activity. Instead of "Responsible for X", try "Delivered X which resulted in Y% increase in Z".
         </p>
         <Button size="lg" className="rounded-xl px-12 h-14 text-lg shadow-xl shadow-primary/20" asChild>
            <a href="/analyze">Test My Resume Now</a>
         </Button>
      </section>
    </div>
  );
}
