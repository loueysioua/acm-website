export default function HexagonShape({
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
        <path
          d="M50 5 L85 25 L85 65 L50 85 L15 65 L15 25 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
