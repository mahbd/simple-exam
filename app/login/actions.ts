"use server";

import { cookies } from "next/headers";

export const login = async (username: string, password: string) => {
  const au = process.env.ADMIN_USERNAME;
  const ap = process.env.ADMIN_PASSWORD;
  console.log("login", username, password, au, ap);
  if (username !== au || password !== ap) {
    return false;
  }
  cookies().set("username", username, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  cookies().set("password", password, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return true;
};
