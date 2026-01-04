const Check = (props: { className?: string; fill?: string; size?: string }) => {
  const { className, fill = '#6155F5', size = '14' } = props;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6654 3.5L5.2487 9.91667L2.33203 7"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Check;
