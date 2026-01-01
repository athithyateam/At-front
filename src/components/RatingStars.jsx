import { FiStar } from "react-icons/fi";

export default function RatingStars({ average = 0, count = 0 }) {
  const rounded = Math.round(average * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = rounded - i;
    if (diff >= 1) return "full";
    if (diff === 0.5) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-0.5">
        {stars.map((s, i) => (
          <FiStar
            key={i}
            className={
              s === "full"
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {count > 0 ? (
        <>
          <span className="font-medium text-gray-800">
            {average.toFixed(1)}
          </span>
          <span className="text-gray-500">({count})</span>
        </>
      ) : (
        <span className="text-xs text-gray-400">
          No ratings yet
        </span>
      )}
    </div>
  );
}
