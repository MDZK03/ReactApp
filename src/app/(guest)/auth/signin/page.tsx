import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthSignIn from "@/components/authSignIn";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function SignIn() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/")
    }
    return (
        <AuthSignIn />
    )
}