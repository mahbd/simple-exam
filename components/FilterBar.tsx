"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filter?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const FilterBar = ({ filter, options }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex" style={{ width: "24rem" }}>
      <div className="rounded-lg">
        <label className="mt-1 ps-3">Filter by: </label>
        <select
          className="select select-bordered select-sm"
          value={filter}
          onChange={async (e) => {
            const params = new URLSearchParams(searchParams);
            params.set("filter", e.target.value);
            router.push("?" + params.toString());
            await new Promise((resolve) => setTimeout(resolve, 500));
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
