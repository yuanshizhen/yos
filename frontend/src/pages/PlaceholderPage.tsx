export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="rounded-[22px] border border-white/15 bg-white/5 p-5 backdrop-blur-xl">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-xs text-white/65">该页面为占位测试页，后续阶段将逐步替换为业务模块。</p>
    </div>
  )
}
