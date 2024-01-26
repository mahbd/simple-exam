import prisma from "@/prisma/client";
import React from "react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import AnswerForm from "@/app/exam/[examSecret]/AnswerForm";
import InfoBoard from "@/app/exam/[examSecret]/InfoBoard";

interface Props {
  params: {
    examSecret: string;
  };
}

const ExamPage = async ({ params: { examSecret } }: Props) => {
  const examinee = await prisma.examinee.findUnique({
    where: {
      secret: examSecret,
    },
  });
  if (!examinee) {
    notFound();
  }
  const correctAnswer = await prisma.answer.count({
    where: {
      examineeId: examinee.id,
      isCorrect: true,
    },
  });

  const wrongAnswer = await prisma.answer.count({
    where: {
      examineeId: examinee.id,
      isCorrect: false,
    },
  });

  const nextQuestion = await prisma.question.findFirst({
    where: {
      testId: examinee.testId,
      NOT: {
        examineeAnswer: {
          some: {
            examineeId: examinee.id,
          },
        },
      },
    },
  });
  if (!nextQuestion) {
    redirect(`/exam/${examSecret}/result`);
  }

  const questionLeft = await prisma.question.count({
    where: {
      testId: examinee.testId,
      NOT: {
        examineeAnswer: {
          some: {
            examineeId: examinee.id,
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
        <AnswerForm examSecret={examSecret} questionId={nextQuestion.id} />
      </div>
    </div>
  );
};

export default ExamPage;
