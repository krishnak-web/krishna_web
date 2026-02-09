
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Zap, Target, ArrowRight, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
              <Star className="w-3 h-3 fill-primary" />
              <span>AI-POWERED RESUME ANALYSIS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight mb-6">
              Master Your Job Search with <span className="text-primary">AI Precision</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Upload your resume and get an instant ATS score, detailed skill gap analysis, and personalized feedback powered by Google Gemini AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20" asChild>
                <Link href="/analyze">Analyze My Resume <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl" asChild>
                <Link href="/companies">View Company Guides</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "ATS Score",
              desc: "Get an instant score based on how well your resume matches the job description.",
              icon: <Zap className="w-10 h-10 text-primary" />,
            },
            {
              title: "Skill Gap Detection",
              desc: "Identify exactly which keywords and competencies you're missing to land the interview.",
              icon: <Target className="w-10 h-10 text-primary" />,
            },
            {
              title: "AI Feedback",
              desc: "Receive actionable suggestions to rewrite bullet points for maximum impact.",
              icon: <CheckCircle2 className="w-10 h-10 text-primary" />,
            },
          ].map((feature, i) => (
            <Card key={i} className="border-2 hover:border-primary/30 transition-all duration-300 group">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="mb-6 p-3 bg-muted rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotion/Social Proof */}
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-12">Landing a job at top tech companies has never been easier.</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-80 grayscale invert transition-all hover:grayscale-0">
             {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map(brand => (
               <span key={brand} className="text-3xl font-bold tracking-tighter">{brand}</span>
             ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-muted/50 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 border border-border">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">Ready to beat the bots?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't let a generic resume hold you back. Let ResumePilot AI optimize your profile for your dream role today.
            </p>
            <Button size="lg" className="rounded-xl px-12 h-14 text-lg" asChild>
              <Link href="/register">Start Free Analysis</Link>
            </Button>
          </div>
          <div className="flex-1 relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
             <Image 
                src="https://picsum.photos/seed/resume-preview/800/600" 
                fill 
                alt="Resume Analysis Preview" 
                className="object-cover"
                data-ai-hint="resume analysis"
             />
          </div>
        </div>
      </section>
    </div>
  );
}
