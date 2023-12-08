import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={30}
    viewBox="0 0 31 30"
    fill="none"
    {...props}
  >
    <path
      d="M6.75 12.5L15.5 3.75M15.5 3.75L24.25 12.5M15.5 3.75V26.25"
      stroke="#2E2E2E"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
