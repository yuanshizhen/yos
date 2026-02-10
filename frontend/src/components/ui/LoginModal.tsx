import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'
import { GlassButton } from './Button'
import { GlassInput } from './Input'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess: (payload: { username: string; avatarUrl?: string }) => void
}

export function LoginModal({ isOpen, onClose, onSuccess }: Props) {
  const [username, setUsername] = useState('superadmin')
  const [password, setPassword] = useState('Admin@123456')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const loginRes = await api.post('/auth/login', { username, password })
      const userId = loginRes.data.user.id as string
      let avatarUrl = loginRes.data.user.avatarUrl as string | undefined
      if (avatar) {
        const form = new FormData()
        form.append('avatar', avatar)
        const uploadRes = await api.post('/upload/avatar', form, { headers: { 'X-User-ID': userId } })
        avatarUrl = uploadRes.data.avatarUrl
      }
      onSuccess({ username, avatarUrl })
      onClose()
    } catch {
      setError('登录失败，请检查数据库账号。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[70]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-[22px] border border-white/20 bg-black/35 p-6 backdrop-blur-xl">
          <DialogTitle className="text-xl font-semibold">登录 YOS</DialogTitle>
          <p className="mt-1 text-xs text-white/65">账号密码已自动填入超级管理员</p>
          <form className="mt-4 space-y-3" onSubmit={onSubmit}>
            <GlassInput placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
            <GlassInput type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="file" accept="image/png,image/jpeg,image/webp" className="text-xs text-white/70" onChange={(e) => setAvatar(e.target.files?.[0] ?? null)} />
            {error && <p className="text-xs text-red-300">{error}</p>}
            <div className="flex justify-end gap-2">
              <GlassButton type="button" onClick={onClose}>取消</GlassButton>
              <GlassButton type="submit" disabled={loading}>{loading ? '登录中...' : '登录'}</GlassButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
