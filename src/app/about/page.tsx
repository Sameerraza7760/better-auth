
import Image from "next/image";
import Link from "next/link";
import Logout from "../components/Logout";
export default function About() {


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
<div className="flex justify-center gap-2" >
  <Logout/>
   <Link href={'/home'}  >Home</Link>
       
   <Link href={'/about'}  >about</Link>
       
   <Link href={'/Service'}  >Service</Link>
   
       
   <Link href={'/Contact'}  >Contact</Link>






   
</div>
      
    </div>
  );
}
