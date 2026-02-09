"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Loader2, Sparkles, X } from 'lucide-react';
import { analyzeResumeAndGenerateATSScore } from '@/ai/flows/analyze-resume-ats-score';
import { useToast } from '@/hooks/use-toast';

export default function AnalyzePage() {
  const [loading, setLoading] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('text');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file for analysis.",
          variant: "destructive"
        });
        return;
      }
      
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeFile(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasResume = activeTab === 'text' ? resumeText.trim().length > 0 : !!resumeFile;

    if (!jobRole || !jobDescription || !hasResume) {
      toast({
        title: "Missing fields",
        description: "Please fill in all the details including your resume content or file.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeResumeAndGenerateATSScore({
        resumeText: activeTab === 'text' ? resumeText : undefined,
        resumePdfDataUri: activeTab === 'file' ? (resumeFile || undefined) : undefined,
        jobDescription: `${jobRole}: ${jobDescription}`
      });
      
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
          <Card className="border-2 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Resume Content
              </CardTitle>
              <CardDescription>
                Provide your resume as text or upload a PDF file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze} className="space-y-6">
                <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="text" className="gap-2"><FileText className="w-4 h-4" /> Paste Text</TabsTrigger>
                    <TabsTrigger value="file" className="gap-2"><Upload className="w-4 h-4" /> Upload PDF</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4">
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
                  </TabsContent>

                  <TabsContent value="file" className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-2xl min-h-[400px] p-12 text-center transition-colors hover:bg-muted/50">
                      {!resumeFile ? (
                        <>
                          <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <Upload className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold font-headline mb-2">Upload your PDF</h3>
                          <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                            Our AI will read your PDF directly to ensure formatting is preserved.
                          </p>
                          <Button variant="outline" type="button" onClick={() => fileInputRef.current?.click()} className="rounded-xl px-8">
                            Select PDF File
                          </Button>
                        </>
                      ) : (
                        <div className="w-full max-w-md bg-card border rounded-2xl p-6 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <FileText className="w-6 h-6 text-primary" />
                              </div>
                              <div className="text-left">
                                <p className="font-bold truncate max-w-[200px]">{fileName}</p>
                                <p className="text-xs text-muted-foreground">PDF Document Ready</p>
                              </div>
                            </div>
                            <Button variant="ghost" type="button" size="icon" onClick={clearFile} className="hover:text-destructive">
                              <X className="w-5 h-5" />
                            </Button>
                          </div>
                          <Button variant="outline" type="button" className="w-full" onClick={() => fileInputRef.current?.click()}>
                            Change File
                          </Button>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".pdf" 
                        className="hidden" 
                      />
                    </div>
                  </TabsContent>
                </Tabs>
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
                  Uploading a PDF allows Gemini AI to analyze your layout and visual hierarchy, which are often key for ATS systems.
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
