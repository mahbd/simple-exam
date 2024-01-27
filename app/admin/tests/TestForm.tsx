"use client";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Question, Test } from "@prisma/client";
import { testSchema } from "@/app/admin/tests/index";
import { createTest, updateTest } from "@/app/admin/tests/actions";

type TestFormData = z.infer<typeof testSchema>;

interface Props {
  test?: Test & { questions: Question[] };
}

const TestForm = ({ test }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: test?.name || "",
      // @ts-ignore
      questions: test ? test.questions : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-ignore
    name: "questions",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: TestFormData) => {
    console.log(data);
    setIsSubmitting(true);
    let res;
    if (!test) {
      res = await createTest(JSON.stringify(data));
    } else {
      res = await updateTest(test.id, JSON.stringify(data));
    }
    setIsSubmitting(false);
    if (res.ok) {
      window.location.href = "/admin/tests";
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
        <h1 className={"font-bold text-center text-2xl"}>Test Form</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className={`input input-sm input-bordered ${
              errors.name ? "input-error" : ""
            }`}
            {...register("name")}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Questions</span>
          </label>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <div
                  className={`p-2 ${errors.questions ? (errors.questions[index] ? "bg-red-200" : "bg-green-200") : "bg-green-200"}`}
                >
                  <ErrorMessage>
                    {errors.questions
                      ? [
                          errors.questions[index]?.id?.message,
                          errors.questions[index]?.question?.message,
                          errors.questions[index]?.answerType?.message,
                          errors.questions[index]?.correctAnswer?.message,
                        ].toString()
                      : undefined}
                  </ErrorMessage>
                  <div className={"flex"}>
                    <input
                      type="number"
                      className={`hidden`}
                      {...register(`questions.${index}.id`, {
                        valueAsNumber: true,
                      })}
                    />
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Question</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-sm input-bordered`}
                        {...register(`questions.${index}.question`)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Answer Type</span>
                      </label>
                      <select
                        className={`select select-sm select-bordered`}
                        {...register(`questions.${index}.answerType`)}
                      >
                        <option value="text">Text</option>
                        <option value="number">Numeric</option>
                        <option value="float">Decimal</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Correct Answer</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-sm input-bordered`}
                        {...register(`questions.${index}.correctAnswer`)}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className={"btn btn-sm btn-error"}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={"btn btn-sm btn-success"}
            onClick={() =>
              append({
                id: 0,
                question: "",
                correctAnswer: "",
                answerType: "number",
              })
            }
          >
            New Question
          </button>
          <ErrorMessage>{errors.questions?.message}</ErrorMessage>
        </div>

        <div className="form-control mt-5">
          <button className="btn btn-sm btn-primary" disabled={isSubmitting}>
            {isSubmitting && <Spinner color="text-secondary" />}{" "}
            {test ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestForm;
