import z from "zod";

export const questionSchema = z.object({
  question: z.string(),
  correctAnswer: z.string(),
  testId: z.number(),
});
