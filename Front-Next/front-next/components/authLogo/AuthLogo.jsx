import Image from "next/image";
import { logo } from "@/data/Data";
import Link from "next/link";

export default function Authlogo(){

      <div className="absolute top-0 right-0  z-[10000000000]  w-[150px]">
          <Link href="/">
            <Image src={logo} alt="El Hayl Logo" width={150} height={50} />
          </Link>
        </div>

} 