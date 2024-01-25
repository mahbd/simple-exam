"use client";
import { useRouter } from "next/navigation";
import { deleteTest } from "@/app/admin/tests/actions";

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteTest(id);
        router.back();
      }}
      className={"btn btn-sm btn-error"}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
