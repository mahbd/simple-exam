import prisma from "@/prisma/client";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { AdminProps, generateQueryRecursive } from "@/app/admin";
import Link from "next/link";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "today", label: "Today" },
];

const filterQueries = {
  all: {},
  today: {
    createdAt: {
      gte: new Date(new Date().setHours(0, 0, 0, 0)),
      lte: new Date(new Date().setHours(23, 59, 59, 999)),
    },
  },
};

const Tests = async ({ searchParams }: AdminProps) => {
  const limit = Number(searchParams.limit) || 10;
  const offset = Number(searchParams.offset) || 0;
  const searchFields = ["name"];
  const searchQuery = searchFields.map((field) =>
    generateQueryRecursive(field, searchParams.search || ""),
  );

  const filterQuery =
    filterQueries[
      (searchParams.filter || "all") as keyof typeof filterQueries
    ] || {};

  const fullQuery = {
    where: {
      OR: searchQuery,
      ...filterQuery,
    },
    skip: offset,
    take: limit,
  };

  const tests = await prisma.test.findMany(fullQuery);
  const itemCount = await prisma.test.count({ where: fullQuery.where });
  return (
    <div>
      <h1>Tests</h1>
      <div className="md:flex gap-3">
        <div className="my-3">
          <SearchBar
            search={searchParams.search}
            placeholder="Search by test name"
          />
        </div>
        <div className="my-3">
          <FilterBar filter={searchParams.filter} options={filterOptions} />
        </div>
        <Link href={`/admin/tests/new`}>
          <button className="btn btn-sm btn-primary">New Test</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Questions</th>
            <th>Examinee</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id}>
              <td>
                <Link href={`/admin/tests/${test.id}`} className={"link"}>
                  {test.id}
                </Link>
              </td>
              <td>{test.name}</td>
              <td>
                <Link
                  href={`/admin/questions/?filter=test${test.id}`}
                  className={"link link-primary"}
                >
                  Questions
                </Link>
              </td>
              <td>
                <Link
                  href={`/admin/examinees/?filter=test${test.id}`}
                  className={"link link-primary"}
                >
                  Examinees
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination limit={limit} offset={offset} itemCount={itemCount} />
    </div>
  );
};

export default Tests;

export const metadata = {
  title: "Tests Admin",
  description: "Tests",
};
