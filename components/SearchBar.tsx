"use client";

import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  placeholder: string;
  search?: string;
}

const SearchBar = ({ search: _search, placeholder }: Props) => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(_search || "");
  const [isSearching, setIsSearching] = useState(false);
  const searchNow = async () => {
    setIsSearching(true);
    const params = new URLSearchParams(searchParams);
    const fullURL = window.location.href.replace(window.location.search, "");
    params.set("search", search);
    window.location.href = `${fullURL}?${params.toString()}`;
  };

  return (
    <div className="form-control border-2 rounded">
      <div className="flex rounded-lg" style={{ width: "20rem" }}>
        <div className="inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="input input-sm ps-5 w-full"
          placeholder={placeholder}
          value={search}
          autoComplete="off"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              searchNow();
            }
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          disabled={isSearching}
          onClick={searchNow}
        >
          {isSearching && <Spinner color="text-secondary" />} Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
