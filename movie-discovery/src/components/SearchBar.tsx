interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search movies…',
}: SearchBarProps) {
  return (
    <form
      className="relative w-full max-w-xl"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-300 bg-white py-3 pl-5 pr-12 text-sm shadow-sm outline-none transition focus:border-cinema-accent focus:ring-2 focus:ring-cinema-accent/20 dark:border-cinema-700 dark:bg-cinema-800 dark:text-white"
        aria-label="Search movies"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-cinema-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Search
      </button>
    </form>
  )
}
