import { GlassButton } from '../components/ui/Button'
import { GlassCard } from '../components/ui/Card'
import { GlassInput } from '../components/ui/Input'

export function ComponentsPage() {
  return (
    <div className="rounded-[24px] border border-white/80 bg-white/60 p-6 shadow-[0_20px_70px_rgba(148,163,184,0.2)] backdrop-blur-2xl">
      <h1 className="text-lg font-bold text-slate-900">组件展示页</h1>
      <p className="mt-2 text-xs text-slate-600">这里展示当前封装的 Apple Glass 风格 UI 组件，可作为后续业务页面复用基础。</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <GlassCard title="Button 组件" desc="主按钮与次级按钮，带玻璃高光与悬浮动效。">
          <div className="mt-3 flex flex-wrap gap-2">
            <GlassButton>Primary</GlassButton>
            <GlassButton variant="ghost">Ghost</GlassButton>
            <GlassButton disabled>Disabled</GlassButton>
          </div>
        </GlassCard>

        <GlassCard title="Input 组件" desc="统一输入框风格，支持聚焦态光晕。">
          <div className="mt-3 space-y-2">
            <GlassInput placeholder="用户名" />
            <GlassInput placeholder="密码" type="password" />
          </div>
        </GlassCard>

        <GlassCard title="Card 组件" desc="业务信息容器，支持标题、描述与插槽内容。">
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white/70 p-3 text-xs text-slate-600">这是 Card 的插槽内容示例。</div>
        </GlassCard>

        <GlassCard title="动效示例" desc="按钮 hover、卡片上浮、弹窗浮入与菜单切换等动效已统一。">
          <div className="mt-3 flex gap-2">
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs text-cyan-700 animate-[pulseLite_1.6s_ease-in-out_infinite]">Pulse</span>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs text-violet-700 animate-[floatY_2.5s_ease-in-out_infinite]">Float</span>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
