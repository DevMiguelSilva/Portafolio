import { Link } from 'react-router-dom'
import { formatScore, posterUrl, scoreColor } from '../api/tmdb'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
}

export function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  const image = posterUrl(movie.poster_path, 'w342')

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-cinema-800">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-cinema-700">
          {image ? (
            <img
              src={image}
              alt={movie.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl text-gray-400">🎬</div>
          )}
          <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-cinema-gold backdrop-blur">
            ★ {formatScore(movie.vote_average)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 font-semibold leading-snug">{movie.title}</h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {movie.release_date?.slice(0, 4) || 'TBA'}
            <span className={`ml-2 font-medium ${scoreColor(movie.vote_average)}`}>
              {formatScore(movie.vote_average)}/10
            </span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => onToggleFavorite(movie)}
        className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-lg backdrop-blur transition hover:bg-cinema-accent"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </article>
  )
}
