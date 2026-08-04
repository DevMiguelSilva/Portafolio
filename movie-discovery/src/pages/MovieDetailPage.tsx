import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  backdropUrl,
  formatDate,
  formatScore,
  getMovieDetails,
  getMovieReviews,
  getMovieVideos,
  getYoutubeTrailer,
  posterUrl,
  scoreColor,
} from '../api/tmdb'
import type { Movie, Review, Video } from '../types/movie'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ReviewList } from '../components/ReviewList'
import { ScoreBadge } from '../components/ScoreBadge'
import { TrailerPlayer } from '../components/TrailerPlayer'
import { useFavorites } from '../hooks/useFavorites'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [trailer, setTrailer] = useState<Video | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const movieId = Number(id)
    if (Number.isNaN(movieId)) {
      setError('Invalid movie ID')
      setLoading(false)
      return
    }

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [details, reviewData, videoData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieReviews(movieId),
          getMovieVideos(movieId),
        ])
        setMovie(details)
        setReviews(reviewData.results.slice(0, 5))
        setTrailer(getYoutubeTrailer(videoData.results))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movie')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) return <LoadingSpinner label="Loading movie details…" />

  if (error || !movie) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-red-500">{error ?? 'Movie not found'}</p>
        <Link to="/" className="text-cinema-accent hover:underline">
          ← Back to discover
        </Link>
      </div>
    )
  }

  const backdrop = backdropUrl(movie.backdrop_path)
  const poster = posterUrl(movie.poster_path)
  const favorite = isFavorite(movie.id)

  return (
    <div className="space-y-10">
      <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-cinema-accent dark:text-gray-400">
        ← Back to discover
      </Link>

      <section className="relative overflow-hidden rounded-2xl">
        {backdrop && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdrop})` }}
          />
        )}
        <div className="relative bg-gradient-to-t from-cinema-950 via-cinema-950/90 to-cinema-950/60 px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {poster && (
              <img
                src={poster}
                alt={movie.title}
                className="poster-shadow mx-auto w-48 shrink-0 rounded-xl object-cover md:mx-0 md:w-56"
              />
            )}
            <div className="flex-1">
              <h1 className="font-display text-4xl tracking-wide text-white sm:text-5xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-2 italic text-gray-300">&ldquo;{movie.tagline}&rdquo;</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span>{formatDate(movie.release_date)}</span>
                {movie.runtime && <span>{movie.runtime} min</span>}
                <span className={scoreColor(movie.vote_average)}>
                  ★ {formatScore(movie.vote_average)}/10
                </span>
                <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
              </div>
              {movie.genres && movie.genres.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-6 max-w-2xl leading-relaxed text-gray-200">{movie.overview}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ScoreBadge score={movie.vote_average} size="lg" showLabel />
                <button
                  type="button"
                  onClick={() => toggleFavorite(movie)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    favorite
                      ? 'bg-cinema-accent text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {favorite ? '❤️ Saved to favorites' : '🤍 Add to favorites'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {trailer && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">Trailer</h2>
          <TrailerPlayer videoKey={trailer.key} title={trailer.name} />
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
        <ReviewList reviews={reviews} />
      </section>
    </div>
  )
}
