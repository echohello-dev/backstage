import * as React from 'react';

interface IconProps {
  width: number;
  height: number;
}

const icon: React.FC<IconProps> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M68.9 0H34.3C34.3 8.6 41.3 15.6 49.9 15.6H56.3V21.7C56.3 30.3 63.3 37.3 71.9 37.3V3C71.9 1.3 70.5 0 68.9 0Z"
        fill="#0082FF"
      />
      <path
        d="M51.8 17.2H17.2C17.2 25.8 24.2 32.8 32.8 32.8H39.2V39C39.2 47.6 46.2 54.6 54.8 54.6V20.3C54.8 18.6 53.4 17.2 51.8 17.2Z"
        fill="url(#paint0_linear_1_25)"
      />
      <path
        d="M34.7 34.4H0.0999985C0.0999985 43 7.1 50 15.7 50H22V56.1C22 64.7 29 71.7 37.6 71.7V37.3C37.7 35.8 36.3 34.4 34.7 34.4Z"
        fill="url(#paint1_linear_1_25)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_25"
          x1="54.0326"
          y1="17.2728"
          x2="39.3226"
          y2="32.4428"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stopColor="#0050D3" />
          <stop offset="1" stopColor="#0082FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_25"
          x1="37.8974"
          y1="34.5974"
          x2="20.8874"
          y2="51.1474"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stopColor="#0050D3" />
          <stop offset="1" stopColor="#0082FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default icon;
