import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/'); // chuyển về home sau đăng nhập thành công
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">Welcome Back</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-300 focus:outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-300 focus:outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && (
          <p className="text-sm text-red-500 text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-violet-300 hover:bg-violet-400 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link href="/auth/register" className="text-violet-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </form>

    </div>
  );
}
