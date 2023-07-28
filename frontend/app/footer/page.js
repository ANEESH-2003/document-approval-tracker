import Link from "next/link";

export default function Footer() {
  return (
        <div className="absolute bottom:0 w-[100%] flex flex-col bg-gray-800">
        <h1 className="text-white pt-5 text-center">Made By</h1>
        <div className="flex justify-center pt-2 pb-5">
          <Link href="https://github.com/ANEESH-2003" target="_blank">
          <h1 className="text-white text-center bg-cyan-300 font-bold rounded-2xl p-2 transform hover:scale-105 transition duration-100 hover:text-orange-500 mr-3">Aneesh Khunteta</h1>
          </Link>
          <Link href="https://github.com/Vatsal32" target="blank">
          <h1 className="text-white text-center bg-cyan-300 font-bold rounded-2xl p-2 transform hover:scale-105 transition duration-100 hover:text-orange-500 mr-3">Vatsal Mehta</h1>
          </Link>
        </div>
    </div>
  )
}
