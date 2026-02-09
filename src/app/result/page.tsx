
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  FileText, 
  ArrowLeft,
  Share2,
  Download
} from 'lucide-react';
import { AnalyzeResumeAndGenerateATSScoreOutput } from '@/ai/flows/analyze-resume-ats-score';

export default function ResultPage() {
  const [data, setData] = useState<AnalyzeResumeAndGenerateATSScoreOutput | null>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('resumeAnalysis');
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      router.push('/analyze');
    }
  }, [router]);

  if (!data) return null;

  const getStrengthColor = (strength: string) => {
    switch (strength.toLowerCase()) {
      case 'high': return 'text-green-500 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      default: return 'text-red-500 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4 text-muted-foreground -ml-2">
            <Link href="/analyze"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Analysis</Link>
          </Button>
          <h1 className="text-4xl font-bold font-headline">Analysis Report</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
             <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button variant="outline" className="gap-2">
             <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score Card */}
        <Card className="lg:col-span-5 border-2 h-fit">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Your ATS Score</CardTitle>
            <CardDescription>Overall resume compatibility</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
               <svg className="w-full h-full transform -rotate-90">
                 <circle 
                    cx="96" cy="96" r="80" 
                    fill="none" stroke="currentColor" 
                    strokeWidth="12" 
                    className="text-muted"
                 />
                 <circle 
                    cx="96" cy="96" r="80" 
                    fill="none" stroke="currentColor" 
                    strokeWidth="12" 
                    strokeDasharray={2 * Math.PI * 80}
                    strokeDashoffset={2 * Math.PI * 80 * (1 - data.atsScore / 100)}
                    strokeLinecap="round"
                    className="text-primary transition-all duration-1000"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-bold font-headline">{data.atsScore}</span>
                  <span className="text-muted-foreground font-medium">/ 100</span>
               </div>
            </div>
            
            <Badge variant="outline" className={`text-lg px-4 py-1 mb-6 rounded-full border-2 ${getStrengthColor(data.resumeStrength)}`}>
              {data.resumeStrength} Strength
            </Badge>

            <div className="w-full space-y-4 bg-muted/30 p-6 rounded-2xl">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Keyword Match</span>
                <span className="font-bold">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Formatting Check</span>
                <span className="font-bold text-green-600">Perfect</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Feedback Card */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-foreground leading-relaxed italic">
                  &quot;{data.feedback}&quot;
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold font-headline flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" /> Found Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.matchedSkills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold font-headline flex items-center gap-2 text-red-600">
                    <XCircle className="w-4 h-4" /> Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.missingSkills.map(skill => (
                      <Badge key={skill} variant="destructive" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/40 border-0 p-8 flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1">
                <h3 className="text-2xl font-bold font-headline mb-2">Want to see how you stack up?</h3>
                <p className="text-muted-foreground mb-6">Explore what the world's most innovative companies are actually looking for in a resume.</p>
                <Button className="w-full md:w-auto rounded-xl h-12 px-8" asChild>
                  <Link href="/companies">Go to Company Guides <ChevronRight className="ml-2 w-4 h-4" /></Link>
                </Button>
             </div>
             <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-border rotate-3">
                <FileText className="w-16 h-16 text-primary" />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
