import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const menus = [
  { title: '主页', path: '/' },
  { title: '企业管理', path: '/enterprise/storage' },
  { title: '家庭数字化', path: '/family/album' },
  { title: '系统监控', path: '/monitor' },
  { title: '设置', path: '/settings' },
]

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-apple-bg text-apple-text">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/65 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="text-lg font-semibold">YOS</div>
          <div className="flex gap-2 overflow-x-auto text-sm md:gap-4">
            {menus.map((menu) => (
              <Link key={menu.path} className="rounded-xl px-3 py-2 text-apple-subtext hover:bg-white/80 hover:text-apple-text" to={menu.path}>{menu.title}</Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">{children}</main>
    </div>
  )
}
