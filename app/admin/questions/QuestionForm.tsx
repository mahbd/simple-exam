"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { questionSchema } from "@/app/admin/questions";
import { createQuestion, updateQuestion } from "@/app/admin/questions/actions";
import { Question, Test } from "@prisma/client";

type QuestionFormData = z.infer<typeof questionSchema>;

interface Props {
  question?: Question;
  tests: Test[];
}

const QuestionForm = ({ question, tests }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: question?.question || "",
      correctAnswer: question?.correctAnswer || undefined,
      testId: question?.testId || 0,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);
    let res;
    if (!question) {
      res = await createQuestion(JSON.stringify(data));
    } else {
      res = await updateQuestion(question.id, JSON.stringify(data));
    }
    setIsSubmitting(false);
    if (res.ok) {
      window.location.href = "/admin/questions";
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <form
        className="px-2 my-10 py-5 rounded-2xl flex flex-col gap-2 border-2 w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={"font-bold text-center text-2xl"}>Question Form</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Question</span>
          </label>
          <input
            type="text"
            className={`input input-sm input-bordered ${
              errors.correctAnswer ? "input-error" : ""
            }`}
            {...register("question")}
          />
          <ErrorMessage>{errors.question?.message}</ErrorMessage>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Correct Answer</span>
          </label>
          <input
            type="number"
            className={`input input-sm input-bordered ${
              errors.correctAnswer ? "input-error" : ""
            }`}
            {...register("correctAnswer", { valueAsNumber: true })}
          />
          <ErrorMessage>{errors.correctAnswer?.message}</ErrorMessage>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Test Number</span>
          </label>
          <select
            className={`select select-sm select-bordered ${
              errors.testId ? "select-error" : ""
            }`}
            {...register("testId", { valueAsNumber: true })}
          >
            {tests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.name}
              </option>
            ))}
          </select>
          <ErrorMessage>{errors.testId?.message}</ErrorMessage>
        </div>
        <div className="form-control mt-5">
          <button className="btn btn-sm btn-primary" disabled={isSubmitting}>
            {isSubmitting && <Spinner color="text-secondary" />}{" "}
            {question ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
