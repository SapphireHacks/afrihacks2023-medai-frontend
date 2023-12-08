import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 8.07895V11.7632C12 12.1701 12.3299 12.5 12.7368 12.5L16.4211 12.5M12 19.5C8.13401 19.5 5 16.366 5 12.5C5 8.63401 8.13401 5.5 12 5.5C15.866 5.5 19 8.63401 19 12.5C19 16.366 15.866 19.5 12 19.5Z"
      stroke="#181818"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
