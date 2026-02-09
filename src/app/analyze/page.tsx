
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Loader2, Sparkles } from 'lucide-react';
import { analyzeResumeAndGenerateATSScore } from '@/ai/flows/analyze-resume-ats-score';
import { useToast } from '@/hooks/use-toast';

export default function AnalyzePage() {
  const [loading, setLoading] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobRole || !jobDescription || !resumeText) {
      toast({
        title: "Missing fields",
        description: "Please fill in all the details including your resume content.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeResumeAndGenerateATSScore({
        resumeText,
        jobDescription: `${jobRole}: ${jobDescription}`
      });
      
      // We store the results in localStorage for the demo result page
      // In a real app, this would be saved to Firestore and passed via ID
      localStorage.setItem('resumeAnalysis', JSON.stringify(result));
      router.push('/result');
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Something went wrong while analyzing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">Launch Your Analysis</h1>
        <p className="text-muted-foreground text-lg">Enter your details and let Gemini AI work its magic.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Resume Content
              </CardTitle>
              <CardDescription>
                Paste your resume text below for the most accurate analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Text</Label>
                  <Textarea 
                    id="resume"
                    placeholder="Paste your resume content here..."
                    className="min-h-[400px] resize-none font-body text-base leading-relaxed p-6"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end">
                   {/* This button is just a visual for mobile/extra utility */}
                   <Button variant="outline" type="button" className="gap-2">
                     <Upload className="w-4 h-4" /> Upload PDF (Simulated)
                   </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-2 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Target Job
              </CardTitle>
              <CardDescription>
                What role are you applying for?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Job Role</Label>
                <Input 
                  id="role" 
                  placeholder="e.g. Senior Software Engineer" 
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Job Description</Label>
                <Textarea 
                  id="desc" 
                  placeholder="Paste the job requirements..." 
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleAnalyze} 
                className="w-full h-12 text-lg rounded-xl"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Analyzing...
                  </>
                ) : (
                  "Run AI Analysis"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-0 overflow-hidden relative">
             <CardHeader>
                <CardTitle className="text-xl">Pro Tip</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-sm opacity-90 leading-relaxed">
                  Make sure to include your experience years and specific technical tools. These carry the most weight in modern ATS algorithms.
                </p>
             </CardContent>
             <div className="absolute -bottom-4 -right-4 opacity-10">
                <Sparkles className="w-24 h-24" />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
