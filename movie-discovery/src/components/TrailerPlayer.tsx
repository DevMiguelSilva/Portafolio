interface TrailerPlayerProps {
  videoKey: string
  title: string
}

export function TrailerPlayer({ videoKey, title }: TrailerPlayerProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg dark:border-cinema-700">
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  )
}
