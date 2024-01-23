"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  limit: number;
  offset: number;
}

const Pagination = ({ itemCount, limit, offset }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  if (itemCount <= limit) return null;

  const changePage = (offset: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("offset", offset.toString());
    params.set("limit", limit.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-3">
      <p className="text-sm">
        Showing {offset + 1} - {offset + limit} of {itemCount}
      </p>
      <button
        className="btn btn-sm rounded-md py-0 px-2  disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={offset === 0}
        onClick={() => changePage(0)}
      >
        <BiChevronsLeft />
      </button>
      <button
        className="btn btn-sm rounded-md py-0 px-2  disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={offset === 0}
        onClick={() => changePage(Math.max(0, offset - limit))}
      >
        <BiChevronLeft />
      </button>
      <button
        className="btn btn-sm rounded-md py-0 px-2  disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={offset + limit >= itemCount}
        onClick={() => changePage(offset + limit)}
      >
        <BiChevronRight />
      </button>
      <button
        className="btn btn-sm rounded-md py-0 px-2  disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={offset + limit >= itemCount}
        onClick={() => changePage(itemCount - limit)}
      >
        <BiChevronsRight />
      </button>
      <select
        className="select select-sm border border-gray-300 hover:bg-primary rounded-md"
        value={limit.toString()}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);
          params.set("limit", e.target.value);
          router.push("?" + params.toString());
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default Pagination;

const BiChevronLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chevron-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      />
    </svg>
  );
};

const BiChevronRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chevron-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  );
};

const BiChevronsLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chevron-double-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      />
      <path
        fill-rule="evenodd"
        d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      />
    </svg>
  );
};

const BiChevronsRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chevron-double-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
      />
      <path
        fill-rule="evenodd"
        d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  );
};
