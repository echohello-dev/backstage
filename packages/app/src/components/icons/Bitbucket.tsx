interface IconProps {
  width: number;
  height: number;
}

const icon = ({ width, height }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 63 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.02241 0C0.763589 0 -0.18052 1.14074 0.0292704 2.28148L8.52638 53.7185C8.73617 55.0668 9.89012 56 11.2538 56H52.3756C53.3199 56 54.1591 55.2742 54.3688 54.3408L62.9707 2.3852C63.1807 1.14074 62.2365 0.103722 60.9778 0.103722L2.02241 0ZM38.109 37.126H24.9961L21.5342 18.7705H41.3609L38.109 37.126Z"
        fill="#2684FF"
      />
      <path
        d="M60 19H41.3278L38.2158 37.2932H25.2488L10 55.3798C10 55.3798 10.7261 56 11.7635 56H52.4274C53.3611 56 54.1909 55.2764 54.3983 54.3461L60 19Z"
        fill="url(#paint0_linear_1_58)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_58"
          x1="64.3679"
          y1="24.1548"
          x2="33.5116"
          y2="48.3303"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.176" stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default icon;
