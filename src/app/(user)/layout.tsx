import AppFooter from '@/components/appFooter';
import AppHeader from '@/components/appHeader';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}