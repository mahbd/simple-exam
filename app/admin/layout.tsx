import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

const adminNavItems = [
  {
    text: "Examinees",
    href: "/admin/examinees",
  },
  {
    text: "Questions",
    href: "/admin/questions",
  },
  {
    text: "Tests",
    href: "/admin/tests",
  },
];

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect("/api/auth/signin?callbackUrl=/admin");
  }
  // @ts-ignore
  if (session.user.role !== "ADMIN") {
    console.log(session.user);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return redirect("/denied");
  }
  return (
    <div>
      {adminNavItems.map((navItem) => (
        <Link
          key={navItem.text}
          className={`btn btn-ghost`}
          href={navItem.href}
        >
          {navItem.text}
        </Link>
      ))}
      {children}
    </div>
  );
};

export default AdminLayout;
