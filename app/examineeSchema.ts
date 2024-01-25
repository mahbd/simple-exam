import z from "zod";

export const examineeSchema = z.object({
  studentId: z.string(),
  name: z.string(),
  classNo: z.number(),
  school: z.string(),
  testId: z.number(),
});
