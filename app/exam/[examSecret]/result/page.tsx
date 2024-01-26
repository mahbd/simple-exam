import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    examSecret: string;
  };
}

const Result = async ({ params: { examSecret } }: Props) => {
  const examinee = await prisma.examinee.findUnique({
    where: {
      secret: examSecret,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
      test: true,
    },
  });
  if (!examinee) notFound();

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

  const lastAnswer = await prisma.answer.findFirst({
    where: {
      examineeId: examinee.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!lastAnswer) notFound();

  let seconds = Math.floor(
    (lastAnswer.createdAt.getTime() - examinee.createdAt.getTime()) / 1000,
  );
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  return (
    <div>
      <h2 className={"text-xl font-bold"}>Student Information</h2>
      <table>
        <tbody>
          <tr>
            <td>Test Name</td>
            <td>{examinee.test.name}</td>
          </tr>
          <tr>
            <td>Student Name</td>
            <td>{examinee.name}</td>
          </tr>
          <tr>
            <td>Student Id</td>
            <td>{examinee.studentId}</td>
          </tr>
          <tr>
            <td>Class</td>
            <td>{examinee.classNo}</td>
          </tr>
          <tr>
            <td>School</td>
            <td>{examinee.school}</td>
          </tr>
        </tbody>
      </table>
      <h2 className={"mt-5 text-xl font-bold"}>Exam Result</h2>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Question</th>
            <th>Cor. Answer</th>
            <th>Given Answer</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {examinee.answers.map((answer, index) => (
            <tr key={answer.id}>
              <td>{index + 1}</td>
              <td>{answer.question.question}</td>
              <td>{answer.question.correctAnswer}</td>
              <td>{answer.answer}</td>
              <td>{answer.isCorrect ? "Correct" : "Wrong"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={"mt-5 font-bold"}>Correct Answer: {correctAnswer}</h2>
      <h2 className={"font-bold"}>Wrong Answer: {wrongAnswer}</h2>
      <h2 className={"font-bold"}>
        Time Taken: {minutes} minutes {seconds} seconds
      </h2>
    </div>
  );
};
export default Result;
