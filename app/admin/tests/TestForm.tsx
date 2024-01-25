"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Test } from "@prisma/client";
import { testSchema } from "@/app/admin/tests/index";
import { createTest, updateTest } from "@/app/admin/tests/actions";
import { useRouter } from "next/navigation";

type TestFormData = z.infer<typeof testSchema>;

interface Props {
  test?: Test;
}

const TestForm = ({ test }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: test?.name || "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: TestFormData) => {
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
