"use client";

import { submitAnswer } from "@/app/exam/actions";

interface Props {
  examSecret: string;
  questionId: number;
  answerType: "text" | "number" | "float";
}

const AnswerForm = ({ examSecret, questionId, answerType }: Props) => {
  const onSubmit = async () => {
    document.getElementById("input-form")?.classList.add("hidden");
    const answer = (document.getElementById("answer-field") as HTMLInputElement)
      .value;
    const res = await submitAnswer(examSecret, questionId, answer);
    const clapping = document.getElementById("clapping") as HTMLAudioElement;
    const failed = document.getElementById("failed-sound") as HTMLAudioElement;
    if (res.isCorrect) {
      await clapping.play();
    } else {
      await failed.play();
    }
    await new Promise((resolve) => setTimeout(resolve, 4000));
    window.location.reload();
  };

  return (
    <div className={"mt-20"} id={"input-form"}>
      <audio id={"clapping"} className={"hidden"} src="/clapping.m4a"></audio>
      <audio id={"failed-sound"} className={"hidden"} src="/failed.m4a"></audio>
      <input
        id={"answer-field"}
        type={answerType === "text" ? "text" : "number"}
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
