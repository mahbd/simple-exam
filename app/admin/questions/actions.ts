"use server";

import prisma from "@/prisma/client";
import { questionSchema } from "@/app/admin/questions/index";

export const createQuestion = async (dataStr: string) => {
  const data = questionSchema.safeParse(JSON.parse(dataStr));
  if (!data.success) {
    return { ok: false, message: data.error };
  }
  await prisma.question.create({
    data: {
      ...data.data,
    },
  });
  return { ok: true };
};

export const updateQuestion = async (id: number, dataStr: string) => {
  const data = questionSchema.safeParse(JSON.parse(dataStr));
  if (!data.success) {
    return { ok: false, message: data.error };
  }
  await prisma.question.update({
    where: {
      id,
    },
    data: {
      ...data.data,
    },
  });
  return { ok: true };
};

export const deleteQuestion = async (id: number) => {
  await prisma.question.delete({
    where: {
      id,
    },
  });
  return { ok: true };
};
