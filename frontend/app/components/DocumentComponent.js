
export default function DocumentComponent(props) {
  return (
    <div className="mt-3 flex justify-between px-2 py-5 m-1 w-[95%] sm:w-[90%] mx-auto text-lg bg-slate-200 rounded-md overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 " onClick={props.onClick}>
    <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto capitalize">
          <p className="text-sm font-semibold leading-6 text-gray-900">{props.doc.title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 pt-2">{props.doc.owner.name}</p>
        </div>
    </div>
    <div className="sm:flex sm:flex-col sm:items-end">
      
        {props.doc.status === "Accepted" ? (
          <p className="mt-1 text-xs leading-5 text-green-500 font-bold">
            Accepted
          </p>
        ) : (props.doc.status === "Rejected" ?(
            <p className="mt-1 text-xs leading-5 text-red-500 font-bold">
            Rejected
          </p>
        ) : 
        (
            <p className="mt-1 text-xs leading-5 text-yellow-500 font-bold">
            Under-consideration
            </p>
        ))}
        </div>
    </div>
  )
}
