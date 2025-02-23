import Link from "next/link";

const logo = "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738880266/Logo_n4drwz.png";

export default function Logo() {
  return (
    <div className="mnav flex gap-3">
      <div className="logo   w-full h-24">
        <Link href="/">
          <img className="w-full h-full object-contain" src={logo} alt="Logo" />
        </Link>
      </div>
    </div>
  );
}
