"use server";

import prisma from "@/prisma/client";
import { testSchema } from "@/app/admin/tests/index";

export const createTest = async (dataStr: string) => {
  const data = testSchema.safeParse(JSON.parse(dataStr));
  if (!data.success) {
    return { ok: false, message: data.error };
  }
  await prisma.test.create({
    data: {
      ...data.data,
    },
  });
  return { ok: true };
};

export const updateTest = async (id: number, dataStr: string) => {
  const data = testSchema.safeParse(JSON.parse(dataStr));
  if (!data.success) {
    return { ok: false, message: data.error };
  }
  await prisma.test.update({
    where: {
      id,
    },
    data: {
      ...data.data,
    },
  });
  return { ok: true };
};

export const deleteTest = async (id: number) => {
  await prisma.test.delete({
    where: {
      id,
    },
  });
  return { ok: true };
};
