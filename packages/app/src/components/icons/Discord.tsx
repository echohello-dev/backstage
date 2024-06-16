import React from 'react';

interface IconProps {
  width: number;
  height: number;
}

const icon: React.FC<IconProps> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 74 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.3404 50.3919L54.9405 57C54.9405 57 66.0375 53.178 73.7435 47.331C73.7435 47.331 76.6624 26.1949 62.8067 4.78941C62.8067 4.78941 59.5444 2.33512 47.7496 0L45.3398 4.17909C45.3398 4.17909 44.071 3.37386 37.1643 3.36161L37 3.36124C29.9489 3.36124 28.6602 4.17909 28.6602 4.17909L26.2504 0C14.4556 2.33512 11.1933 4.78941 11.1933 4.78941C-2.66243 26.1949 0.256495 47.331 0.256495 47.331C7.96247 53.178 19.0595 57 19.0595 57L22.6596 50.3919L16.6597 47.3421L17.8596 46.0576C17.8596 46.0576 24.6494 50.3581 36.8561 50.3919H37C49.2969 50.3919 56.1404 46.0576 56.1404 46.0576L57.3403 47.3421L51.3404 50.3919ZM24.6257 23.6323C28.315 23.6323 31.3102 27.0492 31.3102 31.258C31.3102 35.4671 28.315 38.8841 24.6257 38.8841C20.9365 38.8841 17.9413 35.4671 17.9413 31.258C17.9413 27.0492 20.9365 23.6323 24.6257 23.6323ZM49.3742 23.6323C45.685 23.6323 42.6898 27.0492 42.6898 31.258C42.6898 35.4671 45.685 38.8841 49.3742 38.8841C53.0635 38.8841 56.0586 35.4671 56.0586 31.258C56.0586 27.0492 53.0635 23.6323 49.3742 23.6323Z"
        fill="#5865F2"
      />
    </svg>
  );
};

export default icon;