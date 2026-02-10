import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'
import { GlassButton } from './Button'
import { GlassInput } from './Input'

export type AuthUser = {
  id: string
  username: string
  avatarUrl?: string
  token: string
}

type Props = {
  isOpen: boolean
  onSuccess: (user: AuthUser) => void
}

export function LoginModal({ isOpen, onSuccess }: Props) {
  const [username, setUsername] = useState('superadmin')
  const [password, setPassword] = useState('Admin@123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const loginRes = await api.post('/auth/login', { username, password })
      const token = loginRes.data.token as string
      const user = loginRes.data.user as { id: string; username: string; avatarUrl?: string }

      onSuccess({ id: user.id, username: user.username, avatarUrl: user.avatarUrl, token })
    } catch {
      setError('登录失败，请检查数据库中的账号密码。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => undefined} className="relative z-[100]">
      <div className="fixed inset-0 bg-slate-900/25 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-[26px] border border-white/75 bg-white/78 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.25)] backdrop-blur-2xl animate-[floatIn_.4s_ease-out]">
          <DialogTitle className="text-xl font-semibold tracking-[0.2px] text-slate-900">登录 YOS</DialogTitle>
          <p className="mt-1 text-xs text-slate-500">已填入超级管理员账号，请先登录后使用系统。</p>
          <form className="mt-4 space-y-3" onSubmit={onSubmit}>
            <GlassInput placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
            <GlassInput type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-xs text-rose-500">{error}</p>}
            <div className="flex justify-end gap-2 pt-1">
              <GlassButton type="submit" disabled={loading} className="min-w-[96px]">
                {loading ? '登录中...' : '登录系统'}
              </GlassButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
