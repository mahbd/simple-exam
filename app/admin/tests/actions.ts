"use server";

import prisma from "@/prisma/client";
import { testSchema } from "@/app/admin/tests/index";

async function getNextQuestionId() {
  const result = await prisma.question.findFirst({
    select: {
      id: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  if (result) {
    return result.id + 1;
  } else {
    return 1;
  }
}

export const createTest = async (dataStr: string) => {
  const data = testSchema.safeParse(JSON.parse(dataStr));
  if (!data.success) {
    return { ok: false, message: data.error };
  }
  const test = await prisma.test.create({
    data: {
      name: data.data.name,
    },
  });
  for (const question of data.data.questions) {
    await prisma.question.create({
      data: {
        ...question,
        testId: test.id,
      },
    });
  }
  return { ok: true };
};

export const updateTest = async (id: number, dataStr: string) => {
  const data = testSchema.safeParse(JSON.parse(dataStr));
  if (!data.success) {
    return { ok: false, message: data.error };
  }
  const test = await prisma.test.update({
    where: {
      id,
    },
    data: {
      name: data.data.name,
    },
  });
  for (const question of data.data.questions) {
    if (question.id === 0) {
      question.id = await getNextQuestionId();
    }
    await prisma.question.upsert({
      where: {
        id: question.id,
      },
      update: {
        ...question,
      },
      create: {
        ...question,
        testId: test.id,
      },
    });
  }
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
