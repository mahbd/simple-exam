import prisma from "@/prisma/client";
import ExamineeForm from "@/app/ExamineeForm";

const Home = async () => {
  const tests = await prisma.test.findMany();
  return (
    <div className={"flex justify-center"}>
      <ExamineeForm tests={tests} />
    </div>
  );
};

export default Home;
