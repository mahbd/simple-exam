"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { loginSchema } from "@/app/login/loginSchema";
import { login } from "@/app/login/actions";

type LoginFormData = z.infer<typeof loginSchema>;

export interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const LoginForm = ({ searchParams: { callbackUrl } }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    setIsSubmitting(true);
    let res = await login(data.username, data.password);
    setIsSubmitting(false);
    if (res) {
      window.location.href = callbackUrl || "/";
    } else {
      setError("username", {
        type: "manual",
        message: "Invalid username or password",
      });
    }
  };

  return (
    <div className={"flex justify-center"}>
      <form
        className="px-2 my-10 py-5 rounded-2xl flex flex-col gap-2 border-2 w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={"font-bold text-center text-2xl"}>Login Form</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className={`input input-sm input-bordered ${
              errors.username ? "input-error" : ""
            }`}
            {...register("username")}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className={`input input-sm input-bordered ${
              errors.password ? "input-error" : ""
            }`}
            {...register("password")}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>
        <div className="form-control mt-5">
          <button className="btn btn-sm btn-primary" disabled={isSubmitting}>
            {isSubmitting && <Spinner color="text-secondary" />} Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
