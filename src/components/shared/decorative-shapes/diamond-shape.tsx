export default function DiamondShape({
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
        <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
