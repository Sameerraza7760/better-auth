import Image from "next/image";
import Link from "next/link";
import Logout from "../components/Logout";
import {redirect} from "next/navigation"
import {auth} from "@/lib/auth"
import { headers } from "next/headers";
export default async function About () {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
     redirect('/signin')
    }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex justify-center gap-2">
        <Logout />
        <p>{`Welcome to ${session.user.email} `}</p>
        <Link href={"/home"}>Home</Link>
        <Link href={"/about"}>about</Link>
        <Link href={"/Service"}>Service</Link>
        <Link href={"/Contact"}>Contact</Link>
        <Link href={"/Dashboard"}>Dashboard</Link>
      </div>
    </div>
  );
}
