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

  return (
    <div>
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
    </div>
  );
};

export default Result;
