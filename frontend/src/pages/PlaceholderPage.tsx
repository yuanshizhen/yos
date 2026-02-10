import { AppleCard } from '../components/ui/Card'

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <AppleCard>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-apple-subtext">该页面为占位测试页，后续阶段将逐步替换为业务模块。</p>
    </AppleCard>
  )
}
