import z from "zod";

export const questionSchema = z.object({
  question: z.string(),
  answerType: z.enum(["number", "float", "text"]),
  correctAnswer: z.string(),
  testId: z.number(),
});
