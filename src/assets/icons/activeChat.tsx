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
      d="M8 10.5H8.01M12 10.5H12.01M16 10.5H16.01M9 16.5H5C3.89543 16.5 3 15.6046 3 14.5V6.5C3 5.39543 3.89543 4.5 5 4.5H19C20.1046 4.5 21 5.39543 21 6.5V14.5C21 15.6046 20.1046 16.5 19 16.5H14L9 21.5V16.5Z"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
