import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative w-16 h-8 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        dark
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30'
          : 'bg-gradient-to-r from-amber-300 to-orange-400 shadow-lg shadow-amber-400/30'
      } ${className}`}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Stars (visible in dark mode) */}
      <span className={`absolute top-1.5 left-2 w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${dark ? 'opacity-60' : 'opacity-0'}`} />
      <span className={`absolute top-3 left-4 w-0.5 h-0.5 rounded-full bg-white transition-opacity duration-500 ${dark ? 'opacity-40' : 'opacity-0'}`} />
      <span className={`absolute bottom-2 left-3 w-0.5 h-0.5 rounded-full bg-white transition-opacity duration-700 ${dark ? 'opacity-50' : 'opacity-0'}`} />

      {/* Toggle circle */}
      <span
        className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
          dark
            ? 'translate-x-9 bg-gray-900 shadow-inner rotate-[360deg]'
            : 'translate-x-1 bg-white shadow-md rotate-0'
        }`}
      >
        <span className={`transition-all duration-500 ${dark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} absolute`}>
          🌙
        </span>
        <span className={`transition-all duration-500 ${dark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} absolute`}>
          ☀️
        </span>
      </span>

      {/* Cloud puffs (visible in light mode) */}
      <span className={`absolute top-2 right-3 w-2 h-1.5 rounded-full bg-white/60 transition-opacity duration-300 ${dark ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute bottom-2 right-2 w-3 h-1.5 rounded-full bg-white/40 transition-opacity duration-500 ${dark ? 'opacity-0' : 'opacity-100'}`} />
    </button>
  );
}
