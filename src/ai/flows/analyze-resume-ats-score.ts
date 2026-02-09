// src/ai/flows/analyze-resume-ats-score.ts
'use server';
/**
 * @fileOverview Analyzes a resume against a job description and generates an ATS score.
 *
 * - analyzeResumeAndGenerateATSScore - A function that handles the resume analysis and ATS score generation process.
 * - AnalyzeResumeAndGenerateATSScoreInput - The input type for the analyzeResumeAndGenerateATSScore function.
 * - AnalyzeResumeAndGenerateATSScoreOutput - The return type for the analyzeResumeAndGenerateATSScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeAndGenerateATSScoreInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobDescription: z.string().describe('The description of the job role.'),
});
export type AnalyzeResumeAndGenerateATSScoreInput = z.infer<typeof AnalyzeResumeAndGenerateATSScoreInputSchema>;

const AnalyzeResumeAndGenerateATSScoreOutputSchema = z.object({
  atsScore: z.number().describe('The ATS score (0-100) of the resume against the job description.'),
  matchedSkills: z.array(z.string()).describe('List of skills from the resume that match the job description.'),
  missingSkills: z.array(z.string()).describe('List of skills from the job description that are missing from the resume.'),
  feedback: z.string().describe('Feedback and suggestions for improving the resume.'),
  resumeStrength: z.string().describe('Overall resume strength (High / Medium / Low).'),
});
export type AnalyzeResumeAndGenerateATSScoreOutput = z.infer<typeof AnalyzeResumeAndGenerateATSScoreOutputSchema>;

export async function analyzeResumeAndGenerateATSScore(input: AnalyzeResumeAndGenerateATSScoreInput): Promise<AnalyzeResumeAndGenerateATSScoreOutput> {
  return analyzeResumeAndGenerateATSScoreFlow(input);
}

const analyzeResumeAtsPrompt = ai.definePrompt({
  name: 'analyzeResumeAtsPrompt',
  input: {schema: AnalyzeResumeAndGenerateATSScoreInputSchema},
  output: {schema: AnalyzeResumeAndGenerateATSScoreOutputSchema},
  prompt: `Analyze the following resume text against the job description.\n\nResume Text: {{{resumeText}}}\n\nJob Description: {{{jobDescription}}}\n\nReturn:\n1. ATS score (0-100)\n2. Matched skills\n3. Missing skills\n4. Resume improvement suggestions\n5. Overall resume strength (High / Medium / Low).`,
});

const analyzeResumeAndGenerateATSScoreFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndGenerateATSScoreFlow',
    inputSchema: AnalyzeResumeAndGenerateATSScoreInputSchema,
    outputSchema: AnalyzeResumeAndGenerateATSScoreOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeAtsPrompt(input);
    return output!;
  }
);
