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

const Questions = async ({ searchParams }: AdminProps) => {
  const limit = Number(searchParams.limit) || 10;
  const offset = Number(searchParams.offset) || 0;
  const searchFields = ["question"];
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

  const questions = await prisma.question.findMany(fullQuery);
  const itemCount = await prisma.question.count({ where: fullQuery.where });
  return (
    <div>
      <h1>Questions</h1>
      <div className="md:flex gap-3">
        <div className="my-3">
          <SearchBar
            search={searchParams.search}
            placeholder="Search by question"
          />
        </div>
        <div className="my-3">
          <FilterBar filter={searchParams.filter} options={filterOptions} />
        </div>
        <Link href={`/admin/questions/new`}>
          <button className="btn btn-sm btn-primary">Create Question</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>
                <Link
                  href={`/admin/questions/${question.id}`}
                  className={"link"}
                >
                  {question.id}
                </Link>
              </td>
              <td>{question.question}</td>
              <td>{question.correctAnswer}</td>
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
  title: "Enrollments Admin",
  description: "Enrollments",
};
