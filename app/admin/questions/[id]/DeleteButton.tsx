"use client";
import { deleteQuestion } from "@/app/admin/questions/actions";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteQuestion(id);
        router.back();
      }}
      className={"btn btn-sm btn-error"}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
