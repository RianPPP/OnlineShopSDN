import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // 👈 để tránh hydration mismatch

  useEffect(() => {
    setIsMounted(true); // Đánh dấu đã mount (chạy trên client)

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // ❌ Tránh render sớm trước khi client mount
  if (!isMounted) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-200 to-blue-100 text-gray-800 shadow-lg px-6 py-4 flex justify-between items-center font-[cursive]">
      <Link
        href="/"
        className="text-2xl font-fantasy tracking-wide hover:underline hover:text-purple-600 transition-colors duration-300"
      >
        HomeShopping
      </Link>

      <div className="flex items-center gap-4 text-sm sm:text-base">
        {user && (
          <Link
            href="/products/add"
            className="hover:underline text-purple-700 hover:text-purple-900 font-semibold transition-all duration-300"
          >
            Add Product
          </Link>
        )}

        {user ? (
          <>
            <span className="hidden sm:inline text-gray-600 font-medium">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-purple-300 text-white hover:bg-purple-400 px-4 py-1.5 rounded-full font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="bg-purple-300 text-white hover:bg-purple-400 px-4 py-1.5 rounded-full font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>


  );
}
