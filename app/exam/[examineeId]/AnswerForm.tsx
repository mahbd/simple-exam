"use client";

import { submitAnswer } from "@/app/exam/actions";
import { useRouter } from "next/navigation";

interface Props {
  examineeId: number;
  questionId: number;
}

const AnswerForm = ({ examineeId, questionId }: Props) => {
  const router = useRouter();
  const onSubmit = async () => {
    const answer = (document.getElementById("answer-field") as HTMLInputElement)
      .value;
    await submitAnswer(examineeId, questionId, answer);
    router.refresh();
  };
  return (
    <div className={"mt-20"}>
      <input
        id={"answer-field"}
        type="text"
        className={"ms-[8vw] mt-1 input rounded-s-2xl rounded-e-none"}
      />
      <button
        className={"btn btn-primary mt-0 rounded-e-2xl rounded-s-none"}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default AnswerForm;
