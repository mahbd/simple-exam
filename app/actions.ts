"use server";

import prisma from "@/prisma/client";
import { examineeSchema } from "@/app/examineeSchema";

export const createExaminee = async (dataStr: string) => {
  const data = examineeSchema.safeParse(JSON.parse(dataStr));
  if (!data.success) {
    return { ok: false, message: data.error };
  }
  const examinee = await prisma.examinee.create({
    data: {
      ...data.data,
    },
  });
  return { ok: true, examinee: examinee };
};
