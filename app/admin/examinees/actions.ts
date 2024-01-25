import prisma from "@/prisma/client";

export const deleteExaminee = async (id: number) => {
  await prisma.examinee.delete({
    where: {
      id,
    },
  });
  return { ok: true };
};
