import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAdminUserPass } from "@/app/admin/index";

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
  const username = cookies().get("username");
  const password = cookies().get("password");
  if (!isAdminUserPass(username?.value, password?.value)) {
    return redirect("/login/?callbackUrl=/admin");
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
