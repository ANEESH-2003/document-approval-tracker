import Image from 'next/image'
export default function EmptyComponent() {
    return (
      <div className="">
          <Image
          className='mx-auto rounded-2xl w-[90%] h-[90%] sm:w-[90%] sm:h-[60%] m-10'
          src="/dog.jpg"
          width={1000}
          height={1000}/>
      </div>
    )
  }