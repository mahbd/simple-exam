import prisma from "@/prisma/client";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { AdminProps, generateQueryRecursive } from "@/app/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/examinees/DeleteButton";

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

interface ExamineeProps {
  searchParams: {
    test?: string;
  };
}

const Questions = async ({ searchParams }: AdminProps & ExamineeProps) => {
  const limit = Number(searchParams.limit) || 10;
  const offset = Number(searchParams.offset) || 0;
  const searchFields = ["studentId", "name", "school"];
  const searchQuery = searchFields.map((field) =>
    generateQueryRecursive(field, searchParams.search || ""),
  );

  const filterQuery =
    filterQueries[
      (searchParams.filter || "all") as keyof typeof filterQueries
    ] || {};

  const testFilter = searchParams.test
    ? { testId: parseInt(searchParams.test) }
    : {};

  const fullQuery = {
    where: {
      OR: searchQuery,
      ...filterQuery,
      ...testFilter,
    },
    include: { test: true },
    skip: offset,
    take: limit,
  };

  const examinees = await prisma.examinee.findMany(fullQuery);
  const itemCount = await prisma.examinee.count({ where: fullQuery.where });
  return (
    <div>
      <h1>Examinees</h1>
      <div className="md:flex gap-3">
        <div className="my-3">
          <SearchBar
            search={searchParams.search}
            placeholder="Search by examinee"
          />
        </div>
        <div className="my-3">
          <FilterBar filter={searchParams.filter} options={filterOptions} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Test</th>
            <th>Result</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {examinees.map((examinee) => (
            <tr key={examinee.id}>
              <td>{examinee.studentId}</td>
              <td>{examinee.name}</td>
              <td>{examinee.classNo}</td>
              <td>{examinee.test.name}</td>
              <td>
                <Link
                  href={`/exam/${examinee.secret}/result`}
                  className={"link link-primary"}
                >
                  Result
                </Link>
              </td>
              <td>
                <DeleteButton id={examinee.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination limit={limit} offset={offset} itemCount={itemCount} />
    </div>
  );
};

export default Questions;

export const metadata = {
  title: "Questions Admin",
  description: "Questions",
};
