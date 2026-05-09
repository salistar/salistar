export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 px-6 py-10 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f5b13a] via-[#ec5990] to-[#5cd2c4] flex items-center justify-center font-bold text-[#0a0e1a] text-sm">
            ik
          </div>
          <div className="text-sm">
            <div className="font-semibold">Idriss Kriouile</div>
            <div className="text-xs text-[#97a0b4]">Founder · SallyStar</div>
          </div>
        </div>
        <div className="text-xs text-[#97a0b4]">
          © {year} Idriss Kriouile. Crafted with Next.js 15 + Tailwind CSS 4. Deployed via GitHub Actions to Hetzner +
          Cloudflare.
        </div>
      </div>
    </footer>
  );
}
