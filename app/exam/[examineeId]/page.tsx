import prisma from "@/prisma/client";
import React from "react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import AnswerForm from "@/app/exam/[examineeId]/AnswerForm";
import InfoBoard from "@/app/exam/[examineeId]/InfoBoard";

interface Props {
  params: {
    examineeId: string;
  };
}

const ExamPage = async ({ params: { examineeId } }: Props) => {
  const examinee = await prisma.examinee.findUnique({
    where: {
      id: parseInt(examineeId),
    },
  });
  if (!examinee) {
    notFound();
  }
  const correctAnswer = await prisma.answer.count({
    where: {
      examineeId: parseInt(examineeId),
      isCorrect: true,
    },
  });

  const wrongAnswer = await prisma.answer.count({
    where: {
      examineeId: parseInt(examineeId),
      isCorrect: false,
    },
  });

  const nextQuestion = await prisma.question.findFirst({
    where: {
      testId: examinee.testId,
      NOT: {
        examineeAnswer: {
          some: {
            examineeId: parseInt(examineeId),
          },
        },
      },
    },
  });
  if (!nextQuestion) {
    redirect(`/exam/${examineeId}/result`);
  }

  const questionLeft = await prisma.question.count({
    where: {
      testId: examinee.testId,
      NOT: {
        examineeAnswer: {
          some: {
            examineeId: parseInt(examineeId),
          },
        },
      },
    },
  });

  return (
    <div>
      <Image
        src={"/teacher.svg"}
        alt={""}
        width={1920}
        height={1080}
        style={{
          height: "95vh",
          width: "100%",
          objectFit: "cover",
          position: "fixed",
          zIndex: "-1",
        }}
      />
      <div>
        <InfoBoard
          correctAnswer={correctAnswer}
          wrongAnswer={wrongAnswer}
          startTime={examinee.createdAt}
          questionLeft={questionLeft}
        />
        <div
          className="mt-5 chat chat-end text-6xl text-start"
          style={{ marginRight: "30vw" }}
        >
          <div className="chat-bubble bg-transparent">
            {nextQuestion?.question}
          </div>
        </div>
        <AnswerForm
          examineeId={parseInt(examineeId)}
          questionId={nextQuestion.id}
        />
      </div>
    </div>
  );
};

export default ExamPage;
