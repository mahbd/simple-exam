import React from "react";
import QuestionForm from "@/app/admin/questions/QuestionForm";
import prisma from "@/prisma/client";

const NewQuestion = async () => {
  const tests = await prisma.test.findMany();
  return (
    <div className={"flex justify-center gap-2"}>
      <QuestionForm tests={tests} />
    </div>
  );
};

export default NewQuestion;
