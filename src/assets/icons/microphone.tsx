import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 51 50"
    fill="none"
    {...props}
  >
    <path
      d="M40.0833 22.9165C40.0833 30.9707 33.5541 37.4998 25.5 37.4998M25.5 37.4998C17.4458 37.4998 10.9166 30.9707 10.9166 22.9165M25.5 37.4998V45.8332M25.5 45.8332H17.1666M25.5 45.8332H33.8333M25.5 29.1665C22.0482 29.1665 19.25 26.3683 19.25 22.9165V10.4165C19.25 6.96472 22.0482 4.1665 25.5 4.1665C28.9517 4.1665 31.75 6.96472 31.75 10.4165V22.9165C31.75 26.3683 28.9517 29.1665 25.5 29.1665Z"
      stroke={"currentColor" || "#2E2E2E"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
