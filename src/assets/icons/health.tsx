import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    {...props}
  >
    <path
      d="M21 12.5C21 17.4706 16.9706 21.5 12 21.5M21 12.5C21 7.52944 16.9706 3.5 12 3.5M21 12.5H3M12 21.5C7.02944 21.5 3 17.4706 3 12.5M12 21.5C13.6569 21.5 15 17.4706 15 12.5C15 7.52944 13.6569 3.5 12 3.5M12 21.5C10.3431 21.5 9 17.4706 9 12.5C9 7.52944 10.3431 3.5 12 3.5M3 12.5C3 7.52944 7.02944 3.5 12 3.5"
      stroke="#2E2E2E"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
