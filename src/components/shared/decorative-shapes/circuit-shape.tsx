export default function CircuitShape({
  className = "",
  size = "w-16 h-16",
  style,
}: {
  className?: string;
  size?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`${size} ${className}`} style={style}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="10"
          fill="currentColor"
          opacity="0.3"
        />
        <circle cx="30" cy="30" r="3" fill="currentColor" />
        <circle cx="70" cy="30" r="3" fill="currentColor" />
        <circle cx="30" cy="70" r="3" fill="currentColor" />
        <circle cx="70" cy="70" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
