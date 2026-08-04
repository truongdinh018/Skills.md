export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-[var(--muted)] sm:flex-row sm:px-6">
        <p>
          Skills<span className="text-indigo-500">Hub</span> — Thư viện kỹ năng
          nội bộ.
        </p>
        <p>Xây dựng nội bộ · Chia sẻ tri thức giữa các phòng ban.</p>
      </div>
    </footer>
  );
}
