"use server";

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export const submitAnswer = async (
  examineeId: number,
  questionId: number,
  answer: string,
) => {
  const examinee = await prisma.examinee.findUnique({
    where: {
      id: examineeId,
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
      examineeId: examineeId,
      questionId: questionId,
      answer: answer,
      isCorrect: question.correctAnswer === answer,
    },
  });
  return { ok: true, isCorrect: res.isCorrect };
};
