"use server";

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const checkAnswer = (
  answer: string,
  correctAnswer: string,
  answerType: string,
): boolean => {
  answer = answer.trim();
  correctAnswer = correctAnswer.trim();
  if (answerType === "number") {
    return Number(answer) === Number(correctAnswer);
  } else if (answerType === "float") {
    return Math.abs(Number(answer) - Number(correctAnswer)) < 0.0001;
  } else {
    return answer === correctAnswer;
  }
};

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
      isCorrect: checkAnswer(
        question.correctAnswer,
        answer,
        question.answerType,
      ),
    },
  });
  return { ok: true, isCorrect: res.isCorrect };
};
