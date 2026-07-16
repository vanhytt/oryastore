"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/src/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      if (!supabase) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/admin");
      }
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!supabase) {
      setError("Cấu hình Supabase chưa sẵn sàng. Vui lòng kiểm tra biến môi trường.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Email không hợp lệ.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Sai tài khoản hoặc mật khẩu.");
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (data.user) {
        router.replace("/admin");
      }
    } catch {
      setError("Đăng nhập thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(93,141,74,0.18),_transparent_40%),linear-gradient(135deg,_#f7fff2_0%,_#eef9ea_100%)] px-4 py-10 text-[#404041] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-[#DCEED7] bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur lg:grid-cols-[1.15fr_0.85fr]">
          <section className="hidden bg-gradient-to-br from-[#5D8D4A] via-[#6CA356] to-[#95C66D] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm font-semibold">
                <ShieldCheck size={16} />
                Orya Admin Portal
              </div>
              <h1 className="mb-3 text-3xl font-black leading-tight">
                Quản trị nội dung Orya Babycare
              </h1>
              <p className="max-w-md text-sm leading-6 text-white/85">
                Đăng nhập để quản lý sản phẩm, tin tức, đối tác và các nội dung hiển thị trên website.
              </p>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-sm text-white/90">
              <p className="font-semibold">Lưu ý bảo mật</p>
              <p className="mt-1 text-sm text-white/80">
                Chỉ sử dụng tài khoản admin đã được cấp quyền. Mật khẩu của bạn sẽ được bảo vệ bởi Supabase Auth.
              </p>
            </div>
          </section>

          <section className="p-8 sm:p-10 lg:p-12">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5D8D4A]">
                Đăng nhập Admin
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#404041]">
                Chào mừng trở lại
              </h2>
              <p className="mt-2 text-sm text-[#6b7280]">
                Nhập email và mật khẩu để vào khu vực quản trị.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#404041]">
                  Email đăng nhập
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@orya.com"
                  className="w-full rounded-xl border border-[#D9E7D2] bg-[#F8FCF6] px-4 py-3 text-sm outline-none transition focus:border-[#5D8D4A] focus:ring-2 focus:ring-[#5D8D4A]/20"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#404041]">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full rounded-xl border border-[#D9E7D2] bg-[#F8FCF6] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#5D8D4A] focus:ring-2 focus:ring-[#5D8D4A]/20"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D8D4A] transition hover:text-[#4A7A38]"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-[#5D8D4A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4A7A38] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-[#E8F2E2] bg-[#F8FCF6] p-4 text-sm text-[#6b7280]">
              <p className="font-semibold text-[#404041]">Cần tạo tài khoản admin?</p>
              <p className="mt-1">
                Bạn có thể tạo tài khoản trực tiếp trên Supabase Dashboard ở mục Authentication → Users.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
