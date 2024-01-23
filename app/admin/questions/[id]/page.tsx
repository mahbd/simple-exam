import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import QuestionForm from "@/app/admin/questions/QuestionForm";
import React from "react";
import DeleteButton from "@/app/admin/questions/[id]/DeleteButton";

interface Props {
  params: {
    id: string;
  };
}

const UpdateQuestion = async ({ params: { id } }: Props) => {
  const tests = await prisma.test.findMany();
  const question = await prisma.question.findUnique({
    where: { id: parseInt(id) },
  });
  if (!question) {
    notFound();
  }
  return (
    <div className={"flex justify-center gap-2"}>
      <div>
        <QuestionForm question={question} tests={tests} />
        <DeleteButton id={question.id} />
      </div>
    </div>
  );
};

export default UpdateQuestion;
