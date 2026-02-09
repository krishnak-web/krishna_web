'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered feedback and suggestions on resume improvement based on a job description.
 *
 * - provideAIResumeFeedback - A function that triggers the flow to provide feedback on the resume.
 * - ProvideAIResumeFeedbackInput - The input type for the provideAIResumeFeedback function.
 * - ProvideAIResumeFeedbackOutput - The return type for the provideAIResumeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideAIResumeFeedbackInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text extracted from the resume to be analyzed.'),
  jobDescription: z.string().describe('The job description to compare the resume against.'),
});
export type ProvideAIResumeFeedbackInput = z.infer<
  typeof ProvideAIResumeFeedbackInputSchema
>;

const ProvideAIResumeFeedbackOutputSchema = z.object({
  atsScore: z
    .number()
    .describe('The ATS score of the resume (0-100) based on the job description.'),
  feedback: z
    .string()
    .describe('AI-generated feedback and suggestions for resume improvement.'),
  missingSkills: z
    .array(z.string())
    .describe('A list of skills missing from the resume based on the job description.'),
  strength: z
    .string()
    .describe('Resume strength category (High / Medium / Low)'),
});
export type ProvideAIResumeFeedbackOutput = z.infer<
  typeof ProvideAIResumeFeedbackOutputSchema
>;

export async function provideAIResumeFeedback(
  input: ProvideAIResumeFeedbackInput
): Promise<ProvideAIResumeFeedbackOutput> {
  return provideAIResumeFeedbackFlow(input);
}

const provideAIResumeFeedbackPrompt = ai.definePrompt({
  name: 'provideAIResumeFeedbackPrompt',
  input: {schema: ProvideAIResumeFeedbackInputSchema},
  output: {schema: ProvideAIResumeFeedbackOutputSchema},
  prompt: `Analyze the following resume text against the job description.\nReturn:\n1. ATS score (0–100)\n2. Resume strength category (High / Medium / Low)\n3. AI feedback (from Gemini)\n4. Missing skills list\n\nResume Text: {{{resumeText}}}\nJob Description: {{{jobDescription}}}`,
});

const provideAIResumeFeedbackFlow = ai.defineFlow(
  {
    name: 'provideAIResumeFeedbackFlow',
    inputSchema: ProvideAIResumeFeedbackInputSchema,
    outputSchema: ProvideAIResumeFeedbackOutputSchema,
  },
  async input => {
    const {output} = await provideAIResumeFeedbackPrompt(input);
    return output!;
  }
);
