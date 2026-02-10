export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="rounded-[24px] border border-white/80 bg-white/60 p-5 shadow-[0_20px_70px_rgba(148,163,184,0.2)] backdrop-blur-2xl">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-xs text-slate-600">该页面为占位测试页，后续阶段将逐步替换为业务模块。</p>
    </div>
  )
}
