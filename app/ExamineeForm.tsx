"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { examineeSchema } from "@/app/examineeSchema";
import { createExaminee } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Test } from "@prisma/client";

type ExamineeFormData = z.infer<typeof examineeSchema>;

const ExamineeForm = ({ tests }: { tests: Test[] }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExamineeFormData>({
    resolver: zodResolver(examineeSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ExamineeFormData) => {
    const st = window.localStorage;
    st.setItem("studentId", data.studentId);
    st.setItem("name", data.name);
    st.setItem("classNo", data.classNo.toString());
    st.setItem("school", data.school);

    setIsSubmitting(true);
    let res = await createExaminee(JSON.stringify(data));
    setIsSubmitting(false);
    if (res.examinee) {
      router.replace(`/exam/${res.examinee.id}`);
    }
  };

  useEffect(() => {
    const st = window.localStorage;
    setValue("studentId", st.getItem("studentId") || "");
    setValue("name", st.getItem("name") || "");
    setValue("classNo", parseInt(st.getItem("classNo") || "0"));
    setValue("school", st.getItem("school") || "");
  }, [setValue]);

  return (
    <div>
      <form
        className="px-2 my-10 py-5 rounded-2xl flex flex-col gap-2 border-2 w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={"font-bold text-center text-2xl"}>Examinee Form</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Student ID</span>
          </label>
          <input
            type="text"
            className={`input input-sm input-bordered ${
              errors.studentId ? "input-error" : ""
            }`}
            {...register("studentId")}
          />
          <ErrorMessage>{errors.studentId?.message}</ErrorMessage>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
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
            <span className="label-text">Class</span>
          </label>
          <input
            type="number"
            className={`input input-sm input-bordered ${
              errors.classNo ? "input-error" : ""
            }`}
            {...register("classNo", { valueAsNumber: true })}
          />
          <ErrorMessage>{errors.classNo?.message}</ErrorMessage>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">School</span>
          </label>
          <input
            type="text"
            className={`input input-sm input-bordered ${
              errors.school ? "input-error" : ""
            }`}
            {...register("school")}
          />
          <ErrorMessage>{errors.school?.message}</ErrorMessage>
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
            {isSubmitting && <Spinner color="text-secondary" />}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamineeForm;
