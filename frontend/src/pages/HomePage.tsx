import { useState } from 'react'
import { LoginModal } from '../components/ui/LoginModal'
import { GlassButton } from '../components/ui/Button'
import { GlassCard } from '../components/ui/Card'

export function HomePage() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<{ username: string; avatarUrl?: string } | null>(null)

  return (
    <div className="rounded-[22px] border border-white/15 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold">Dashboard</h1>
          <p className="mt-2 text-xs text-white/65">顶部导航升级为 Apple 风格三级菜单：Hover 一级显示二级，Hover 二级显示三级。</p>
        </div>
        <GlassButton onClick={() => setOpen(true)}>{user ? '重新登录' : '超级管理员登录'}</GlassButton>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <GlassCard title="System Pulse" desc="系统运行状态、调用量、模块健康度。">
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><strong className="block text-base">99.1%</strong><span className="text-white/60">Uptime</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><strong className="block text-base">18ms</strong><span className="text-white/60">Latency</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><strong className="block text-base">3.1K</strong><span className="text-white/60">Events/min</span></div>
          </div>
        </GlassCard>

        <GlassCard title="AI Operator" desc="AI 调度中心：策略、路由、提示词资产管理。">
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><strong className="block text-base">12</strong><span className="text-white/60">Agents</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><strong className="block text-base">9</strong><span className="text-white/60">Workflows</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><strong className="block text-base">0.9s</strong><span className="text-white/60">Response</span></div>
          </div>
        </GlassCard>
      </div>

      {user && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          {user.avatarUrl ? <img src={user.avatarUrl} className="h-12 w-12 rounded-full object-cover" /> : <div className="h-12 w-12 rounded-full bg-white/20" />}
          <div>
            <p className="text-xs text-white/60">当前用户</p>
            <p className="text-sm font-semibold">{user.username}</p>
          </div>
        </div>
      )}

      <LoginModal isOpen={open} onClose={() => setOpen(false)} onSuccess={setUser} />
    </div>
  )
}
