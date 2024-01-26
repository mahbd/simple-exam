"use server";

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export const submitAnswer = async (
  examSecret: string,
  questionId: number,
  answer: string,
) => {
  const examinee = await prisma.examinee.findUnique({
    where: {
      secret: examSecret,
    },
  });
  if (!examinee) {
    notFound();
  }
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });
  if (!question) {
    notFound();
  }
  const res = await prisma.answer.create({
    data: {
      examineeId: examinee.id,
      questionId: questionId,
      answer: answer,
      isCorrect: question.correctAnswer === answer,
    },
  });
  return { ok: true, isCorrect: res.isCorrect };
};
