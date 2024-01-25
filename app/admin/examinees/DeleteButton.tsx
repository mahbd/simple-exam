"use client";
import { useRouter } from "next/navigation";
import { deleteExaminee } from "@/app/admin/examinees/actions";

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteExaminee(id);
        router.refresh();
      }}
      className={"btn btn-sm btn-error"}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
