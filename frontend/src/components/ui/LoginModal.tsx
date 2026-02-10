import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { FormEvent, Fragment, useState } from 'react'
import { AppleButton } from './Button'
import { AppleCard } from './Card'
import { api } from '../../services/api'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess: (payload: { username: string; avatarUrl?: string }) => void
}

export function LoginModal({ isOpen, onClose, onSuccess }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      let avatarUrl = ''
      if (avatar) {
        const form = new FormData()
        form.append('avatar', avatar)
        const uploadRes = await api.post('/upload/avatar', form, {
          headers: { 'X-User-ID': userId },
        })
        avatarUrl = uploadRes.data.avatarUrl
      }
      onSuccess({ username, avatarUrl })
      onClose()
    } catch (e) {
      setError('登录失败，请检查输入并重试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md">
                <AppleCard>
                  <DialogTitle className="text-xl font-semibold text-apple-text">登录 YOS</DialogTitle>
                  <p className="mt-1 text-sm text-apple-subtext">支持阶段一：登录 + 头像上传。</p>
                  <form onSubmit={onSubmit} className="mt-5 space-y-4">
                    <input className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400" type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input className="w-full text-sm text-apple-subtext file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-apple-text" type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setAvatar(e.target.files?.[0] ?? null)} />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex justify-end gap-3">
                      <AppleButton type="button" variant="ghost" onClick={onClose}>取消</AppleButton>
                      <AppleButton type="submit" disabled={loading}>{loading ? '提交中...' : '登录'}</AppleButton>
                    </div>
                  </form>
                </AppleCard>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
