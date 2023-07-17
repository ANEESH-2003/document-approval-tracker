import Link from "next/link";

export default function page(props) {
  const active = props.active;
  return (
    <div className="w-[100%]">
      <div className="flex justify-between py-2 my-3 w-[100%] text-lg bg-slate-100 rounded-md overflow-hidden shadow-lg transform hover:scale-105 transition duration-100">
        <div className="pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 bg-white rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p>{props.user.name}</p>
        {active ? (
          <Link href={props.user.versionurl} target="_blank">
            {
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            }
          </Link>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
