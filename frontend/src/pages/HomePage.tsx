import { useState } from 'react'
import { LoginModal } from '../components/ui/LoginModal'
import { AppleButton } from '../components/ui/Button'
import { AppleCard } from '../components/ui/Card'

export function HomePage() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<{ username: string; avatarUrl?: string } | null>(null)

  return (
    <div className="space-y-6">
      <AppleCard>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">面向未来的企业与家庭一体化平台</h1>
            <p className="mt-2 text-sm text-apple-subtext">苹果风格 UI · 响应式布局 · 阶段一已支持登录与头像上传</p>
          </div>
          <AppleButton onClick={() => setOpen(true)}>{user ? '重新登录' : '立即登录'}</AppleButton>
        </div>
      </AppleCard>

      {user && (
        <AppleCard>
          <div className="flex items-center gap-4">
            {user.avatarUrl ? <img src={user.avatarUrl} className="h-14 w-14 rounded-full object-cover" /> : <div className="h-14 w-14 rounded-full bg-slate-200" />}
            <div>
              <p className="text-sm text-apple-subtext">当前用户</p>
              <p className="text-lg font-semibold">{user.username}</p>
            </div>
          </div>
        </AppleCard>
      )}

      <LoginModal isOpen={open} onClose={() => setOpen(false)} onSuccess={setUser} />
    </div>
  )
}
