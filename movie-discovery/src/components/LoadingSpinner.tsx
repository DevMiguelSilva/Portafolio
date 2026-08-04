export function LoadingSpinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cinema-accent/30 border-t-cinema-accent" />
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  )
}
