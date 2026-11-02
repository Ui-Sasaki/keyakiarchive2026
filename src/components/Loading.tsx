import Image from "next/image";
import Logo from "../../public/logo.webp";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image src={Logo} alt="Logo" className="w-24 h-24 animate-spin" />
      <div className="mt-5 text-xl text-gray-700 animate-pulse">loading...</div>
    </div>
  );
}
