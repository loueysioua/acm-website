export default function DecorativeShapes() {
  return (
    <>
      {/* Geometric shape 1 - Triangle/Diamond pattern */}
      <svg
        className="absolute"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 10 L90 50 L50 90 L10 50 Z"
          fill="currentColor"
          opacity="0.1"
        />
        <path
          d="M50 20 L80 50 L50 80 L20 50 Z"
          fill="currentColor"
          opacity="0.05"
        />
      </svg>

      {/* Geometric shape 2 - Hexagonal pattern */}
      <svg
        className="absolute"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 5 L85 25 L85 65 L50 85 L15 65 L15 25 Z"
          fill="currentColor"
          opacity="0.08"
        />
        <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.12" />
      </svg>

      {/* Geometric shape 3 - Circuit-like pattern */}
      <svg
        className="absolute"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="10"
          fill="currentColor"
          opacity="0.06"
        />
        <rect
          x="20"
          y="20"
          width="60"
          height="60"
          rx="5"
          fill="currentColor"
          opacity="0.08"
        />
        <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.15" />
        <circle cx="70" cy="30" r="3" fill="currentColor" opacity="0.15" />
        <circle cx="30" cy="70" r="3" fill="currentColor" opacity="0.15" />
        <circle cx="70" cy="70" r="3" fill="currentColor" opacity="0.15" />
      </svg>
    </>
  );
}
