// src/ai/flows/analyze-resume-ats-score.ts
'use server';
/**
 * @fileOverview Analyzes a resume (text or PDF) against a job description and generates an ATS score.
 *
 * - analyzeResumeAndGenerateATSScore - A function that handles the resume analysis and ATS score generation process.
 * - AnalyzeResumeAndGenerateATSScoreInput - The input type for the analyzeResumeAndGenerateATSScore function.
 * - AnalyzeResumeAndGenerateATSScoreOutput - The return type for the analyzeResumeAndGenerateATSScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeAndGenerateATSScoreInputSchema = z.object({
  resumeText: z.string().optional().describe('The text content of the resume.'),
  resumePdfDataUri: z
    .string()
    .optional()
    .describe(
      "The resume file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
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
  prompt: `You are an expert ATS (Applicant Tracking System) analyst. Your task is to evaluate a resume against a job description.

Analyze the following resume against the provided job description.

Job Description: {{{jobDescription}}}

Resume Content:
{{#if resumePdfDataUri}}
PDF Document: {{media url=resumePdfDataUri}}
{{/if}}
{{#if resumeText}}
Text: {{{resumeText}}}
{{/if}}

Please provide:
1. An ATS score from 0 to 100 based on keyword matching, experience alignment, and role suitability.
2. A list of skills found in the resume that match the job requirements.
3. A list of critical skills or keywords missing from the resume based on the job description.
4. Actionable feedback for the candidate to improve their resume.
5. Overall resume strength: High, Medium, or Low.`,
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
