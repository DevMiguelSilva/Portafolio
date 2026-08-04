import { formatDate, profileUrl, truncateText } from '../api/tmdb'
import type { Review } from '../types/movie'

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No reviews yet for this movie on TMDB.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const avatar = profileUrl(review.author_details.avatar_path)
        return (
          <article
            key={review.id}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-cinema-700 dark:bg-cinema-800"
          >
            <div className="mb-3 flex items-start gap-3">
              {avatar ? (
                <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cinema-700 text-sm font-bold">
                  {review.author.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold">{review.author}</h4>
                  {review.author_details.rating != null && (
                    <span className="rounded bg-cinema-gold/20 px-2 py-0.5 text-xs font-medium text-cinema-gold">
                      ★ {review.author_details.rating}/10
                    </span>
                  )}
                </div>
                <time className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(review.created_at)}
                </time>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {truncateText(review.content, 500)}
            </p>
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-medium text-cinema-accent hover:underline"
            >
              Read full review on TMDB →
            </a>
          </article>
        )
      })}
    </div>
  )
}
