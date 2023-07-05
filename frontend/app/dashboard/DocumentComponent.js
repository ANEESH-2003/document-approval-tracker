

export default function DocumentComponent(props) {
  return (
    <div className="flex justify-between py-5 m-1 text-lg max-w-full mx-auto bg-white rounded-md overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ">
    <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto sm:capitalize">
          <p className="text-sm font-semibold leading-6 text-gray-900">{props.doc.title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 pt-2">{props.doc.assignedBy}</p>
        </div>
    </div>
    <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 bg-red-100 rounded-full border-black p-1">{props.doc.completion}</p>
        {props.doc.status=="accepted" ? (
          <p className="mt-1 text-xs leading-5 text-green-500 font-bold">
            Accepted
          </p>
        ) : (props.doc.status=="rejected" ?(
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
