import z from "zod";

export const testSchema = z.object({
  name: z.string(),
  questions: z.array(
    z.object({
      id: z.number({ coerce: true }).optional(),
      question: z.string().min(5),
      answerType: z.enum(["number", "float", "text"]),
      correctAnswer: z.string(),
    }),
  ),
});
