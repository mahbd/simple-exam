"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    const getTimePassed = () => {
      const currentTime = new Date();
      const timePassed = currentTime.getTime() - startTime.getTime();
      const secondsPassed = Math.floor(timePassed / 1000);
      const minutes = Math.floor(secondsPassed / 60);
      const seconds = secondsPassed % 60;

      return `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    };
    setInterval(() => {
      document.getElementById("time-passed")!.innerText = getTimePassed();
    }, 1000);
  }, [startTime]);

  return (
    <div
      className={
        "bg-info bg-transparent/30 rounded-3xl p-5 pb-7 w-[15rem] md:w-[30rem] grid grid-cols-1 md:grid-cols-2 gap-1"
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
        Time Elapsed: <span id={"time-passed"}>0:0</span>
      </p>
    </div>
  );
};

export default InfoBoard;
