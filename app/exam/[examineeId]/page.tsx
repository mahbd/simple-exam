import prisma from "@/prisma/client";
import React from "react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import AnswerForm from "@/app/exam/[examineeId]/AnswerForm";

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

interface InfoProps {
  correctAnswer: number;
  wrongAnswer: number;
  startTime: Date;
  questionLeft: number;
}

const InfoBoard = ({
  correctAnswer,
  wrongAnswer,
  startTime,
  questionLeft,
}: InfoProps) => {
  return (
    <div
      className={
        "bg-info bg-transparent/30 rounded-3xl p-5 pb-7 w-[30rem] ms-[8vw] grid grid-cols-2 gap-1"
      }
    >
      <p
        className={
          "bg-success text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Correct Answers: {correctAnswer}
      </p>
      <p
        className={
          "bg-error text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Wrong Answers: {wrongAnswer}
      </p>
      <p
        className={
          "bg-info text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Question Left: {questionLeft}
      </p>
      <p
        className={
          "bg-info text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Time Elapsed:
      </p>
    </div>
  );
};
