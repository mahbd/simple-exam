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
        <div className={"flex justify-center"}>
          <InfoBoard
            correctAnswer={correctAnswer}
            wrongAnswer={wrongAnswer}
            startTime={examinee.createdAt}
            questionLeft={questionLeft}
          />
        </div>
        <div className="mt-5 chat chat-start text-6xl text-start ms-2 md:ms-[5vw]">
          <div className="chat-bubble chat-bubble-accent p-5">
            {nextQuestion?.question}
          </div>
        </div>
        <AnswerForm
          examSecret={examSecret}
          questionId={nextQuestion.id}
          answerType={nextQuestion.answerType as "text" | "number" | "float"}
        />
      </div>
    </div>
  );
};

export default ExamPage;
