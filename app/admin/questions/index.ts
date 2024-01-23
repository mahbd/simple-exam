import z from "zod";

export const questionSchema = z.object({
  question: z.string(),
  correctAnswer: z.number(),
  testId: z.number(),
});
