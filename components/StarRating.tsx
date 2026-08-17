interface StarRatingProps {
  value: string
  count: string
}

export default function StarRating({ value, count }: StarRatingProps) {
  const rating = parseFloat(value)
  const stars = 5

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: stars }).map((_, i) => {
          const fill = Math.min(1, Math.max(0, rating - i))
          return (
            <div key={i} className="relative w-5 h-5">
              {/* Empty star */}
              <svg viewBox="0 0 20 20" className="w-5 h-5 text-gold/20 absolute inset-0">
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.7,12 16.4,18.5 10,15 3.6,18.5 5.3,12 0.5,7.6 7.1,7"
                  fill="currentColor"
                />
              </svg>
              {/* Filled star with clip */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <svg viewBox="0 0 20 20" className="w-5 h-5 text-gold">
                  <polygon
                    points="10,1 12.9,7 19.5,7.6 14.7,12 16.4,18.5 10,15 3.6,18.5 5.3,12 0.5,7.6 7.1,7"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          )
        })}
      </div>
      <span className="text-gold font-bold text-sm">{value}</span>
      <span className="text-muted-foreground text-xs">
        ({parseInt(count).toLocaleString('ar-EG')} تقييم)
      </span>
    </div>
  )
}
