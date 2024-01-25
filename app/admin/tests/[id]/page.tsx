import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import React from "react";
import TestForm from "@/app/admin/tests/TestForm";
import DeleteButton from "@/app/admin/tests/[id]/DeleteButton";

interface Props {
  params: {
    id: string;
  };
}

const UpdateTest = async ({ params: { id } }: Props) => {
  const test = await prisma.test.findUnique({
    where: { id: parseInt(id) },
  });
  if (!test) {
    notFound();
  }
  return (
    <div className={"flex justify-center gap-2"}>
      <div>
        <TestForm test={test} />
        <DeleteButton id={test.id} />
      </div>
    </div>
  );
};

export default UpdateTest;
