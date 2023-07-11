import Link from "next/link";

export default function SvgComponent(props) {
  return (
    <Link className="max-w-[100%] flex bg-white mr-2 rounded-xl p-1 mt-2" href={props.doc.url} target='_blank'>
        <svg
        width="25px"
        height="25px"
        viewBox="0 0 307.2 307.2"
        className=""
        xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="m275.175 240.717 -39.204 -39.224c-0.889 -0.898 -3.097 0.078 -5.675 1.934l-3.203 -3.203c16.379 -21.283 15.422 -51.374 -2.559 -71.757v-11.047l0.039 0.137c0 -21.195 -20.237 -41.061 -31.107 -51.726l-2.481 -2.461c-32.055 -32.055 -45.415 -34.732 -56.335 -34.732l-3.711 -0.019H45.234c-5.099 0 -14.201 3.867 -14.201 11.603v226.807c0 6.407 5.196 11.623 11.602 11.623h170.277c6.407 0 11.623 -5.215 11.623 -11.623v-41.021a173301.291 173301.291 0 0 0 32.67 32.681c3.887 3.867 21.878 -14.065 17.971 -17.971z"
            fill="#27323A"
            />
            <path
            d="M212.169 195.652c-16.457 16.467 -43.278 16.487 -59.745 0 -16.466 -16.486 -16.466 -43.306 0 -59.773 7.97 -7.97 18.578 -12.346 29.868 -12.346 11.31 0 21.907 4.375 29.877 12.346 16.467 16.486 16.467 43.287 0 59.773z"
            fill="#FFFFFF"
            />
            <path
            d="m180.965 73.371 2.597 2.558c4.551 4.455 10.939 10.783 16.361 17.834 -10.657 -3.985 -22.533 -4.747 -33.101 -5.175 -0.332 -7.033 -1.68 -21.39 -6.446 -33.853 5.605 4.395 12.344 10.373 20.589 18.635z"
            fill="#79CCBF"
            />
            <path
            d="M45.194 264.49V42.84a4.189 4.189 0 0 1 0.195 -0.079h85.509l3.711 0.02c1.875 0 4.356 0.039 7.931 1.23l1.797 1.875c9.709 9.591 13.205 33.482 13.205 47.213 0 2.521 1.992 4.611 4.531 4.708l1.953 0.079c14.67 0.566 32.954 1.269 44.059 11.329l1.015 1.015c0.713 2.246 1.182 4.473 1.26 6.681 -21.614 -12.424 -49.586 -9.631 -68.055 8.849 -22.093 22.093 -22.093 57.918 0 80.011 18.479 18.478 46.452 21.292 68.066 8.848v49.871H45.194z"
            fill="#F4CE73"
            />
        </svg>
        {props.doc.name}
    </Link>
  )
}
