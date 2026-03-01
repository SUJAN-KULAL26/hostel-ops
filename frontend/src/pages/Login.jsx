import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user.role !== role) {
        toast.error(`This account is not registered as ${role}`);
        return;
      }
      toast.success('Welcome back! 🎉');
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-gray-950 transition-colors duration-500">
      {/* Left panel - immersive hero */}
      <div className="hidden lg:flex lg:w-[55%] gradient-hero relative overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-16 w-64 h-64 bg-white/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-32 right-16 w-80 h-80 bg-purple-300/10 rounded-full blur-2xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-300/10 rounded-full blur-xl animate-float-slow" />
          <div className="absolute top-10 right-32 w-32 h-32 bg-cyan-300/10 rounded-full blur-lg animate-pulse-slow" />
          <div className="absolute bottom-10 left-32 w-24 h-24 bg-yellow-300/10 rounded-full blur-lg animate-pulse-slow" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white max-w-xl">
          <div className="animate-slide-up">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-8 animate-glow">
              🏠
            </div>
            <h1 className="text-6xl font-black mb-4 leading-tight">
              Hostel<br/>
              <span className="text-white/80">Ops</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-md">
              Your one-stop solution for hostel complaint management. Submit, track, and resolve issues seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 animate-fade-in stagger-children">
            {[
              { icon: '⚡', label: 'Instant', sub: 'Submissions' },
              { icon: '📊', label: 'Real-time', sub: 'Tracking' },
              { icon: '✨', label: 'Smart', sub: 'Resolution' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover-lift animate-slide-up">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm">{item.label}</div>
                <div className="text-white/50 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* testimonial */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 animate-fade-in">
            <p className="text-white/70 text-sm italic">"HostelOps made managing complaints so much easier. Everything is tracked and resolved quickly!"</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-xs font-bold">S</div>
              <div>
                <div className="text-xs font-semibold">Student User</div>
                <div className="text-xs text-white/50">Room 103</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-8 relative">
        {/* Background mesh for right panel */}
        <div className="absolute inset-0 gradient-mesh dark:gradient-mesh-dark opacity-50" />

        <div className="w-full max-w-md relative z-10">
          {/* Top bar with theme toggle */}
          <div className="flex justify-between items-center mb-8">
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-xl animate-glow">🏠</div>
              <span className="text-xl font-bold text-gradient">HostelOps</span>
            </div>
            <div className="lg:ml-auto">
              <ThemeToggle />
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-300/30 dark:shadow-black/30 p-8 sm:p-10 border border-white/50 dark:border-gray-800/50 animate-scale-in">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Welcome back</h2>
              <p className="text-slate-500 dark:text-gray-400 mt-2">Sign in to continue to your dashboard</p>
            </div>

            {/* Role toggle - pill style */}
            <div className="relative flex bg-slate-100 dark:bg-gray-800/80 rounded-2xl p-1.5 mb-8">
              <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl transition-all duration-500 ease-out ${
                  role === 'student' ? 'left-1.5 gradient-primary shadow-lg shadow-indigo-500/25' : 'left-[calc(50%+3px)] gradient-accent shadow-lg shadow-pink-500/25'
                }`}
              />
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`relative z-10 flex-1 py-3 text-sm font-bold rounded-xl transition-colors duration-300 ${
                  role === 'student' ? 'text-white' : 'text-slate-500 dark:text-gray-400'
                }`}
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`relative z-10 flex-1 py-3 text-sm font-bold rounded-xl transition-colors duration-300 ${
                  role === 'admin' ? 'text-white' : 'text-slate-500 dark:text-gray-400'
                }`}
              >
                🛡️ Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Email address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-sm">✉️</span>
                  <input
                    type="email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-sm">🔒</span>
                  <input
                    type="password"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`relative w-full py-4 px-4 text-white font-bold rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden ${
                  loading ? 'opacity-80 cursor-wait' : 'hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0'
                } ${role === 'student' ? 'gradient-primary' : 'gradient-accent'}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign in
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200 dark:bg-gray-700" />
              <span className="text-xs text-slate-400 dark:text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-gray-700" />
            </div>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors underline decoration-2 decoration-indigo-200 dark:decoration-indigo-800 underline-offset-4 hover:decoration-indigo-500">
                Create one
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-gray-600 mt-6">
            Secured with end-to-end encryption 🔐
          </p>
        </div>
      </div>
    </div>
  );
}
