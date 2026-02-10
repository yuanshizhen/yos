import { ReactNode, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Menu = { name: string; path: string; children: { name: string; path: string }[] }

const menus: Menu[] = [
  { name: '主页', path: '/', children: [{ name: 'Dashboard 总览', path: '/' }] },
  { name: '企业管理', path: '/enterprise/storage', children: [{ name: '仓储', path: '/enterprise/storage' }, { name: '财务', path: '/enterprise/finance' }, { name: '销售', path: '/enterprise/sales' }, { name: '计划', path: '/enterprise/plan' }, { name: '生产', path: '/enterprise/production' }, { name: '人事', path: '/enterprise/hr' }, { name: 'OA', path: '/enterprise/oa' }] },
  { name: '家庭数字化', path: '/family/album', children: [{ name: '相册', path: '/family/album' }, { name: '记账', path: '/family/account' }, { name: '事件', path: '/family/events' }, { name: '资产', path: '/family/assets' }] },
  { name: '系统监控', path: '/monitor', children: [{ name: '系统监控', path: '/monitor' }] },
  { name: '设置', path: '/settings', children: [{ name: '设置中心', path: '/settings' }] },
]

export function MainLayout({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(menus[0])
  const [open, setOpen] = useState(false)
  const actions = useMemo(() => active.children, [active])

  return (
    <div>
      <header className="glass-topbar" onMouseLeave={() => setOpen(false)}>
        <div className="glass-topbar-inner flex items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400" />
            <div className="leading-tight">
              <strong className="block text-xs">HomeOS Console</strong>
              <span className="text-[11px] text-white/60">Apple Glass Admin • Topbar v3</span>
            </div>
          </div>

          <nav className="relative hidden h-11 items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2 md:flex">
            {menus.map((menu) => (
              <button
                key={menu.name}
                className={`h-9 rounded-full px-4 text-xs transition ${active.name === menu.name ? 'bg-gradient-to-r from-violet-500/30 to-cyan-400/20' : 'hover:bg-white/10'}`}
                onMouseEnter={() => {
                  setActive(menu)
                  setOpen(true)
                }}
              >
                {menu.name}
              </button>
            ))}

            {open && (
              <div className="absolute left-1/2 top-14 z-20 w-[680px] -translate-x-1/2 rounded-[22px] border border-white/15 bg-black/40 p-3 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-white/60">Level 2</p>
                    <div className="mt-2 space-y-2">
                      {active.children.map((m) => (
                        <Link key={m.path} to={m.path} className="block rounded-2xl border border-transparent bg-white/5 px-3 py-2 text-xs hover:border-white/15 hover:bg-white/10">
                          {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-white/60">Level 3</p>
                    <div className="mt-2 space-y-2">
                      {actions.map((a) => (
                        <Link key={a.path + '-action'} to={a.path} className="block rounded-2xl border border-transparent bg-white/5 px-3 py-2 text-xs hover:border-white/15 hover:bg-white/10">
                          {a.name} 操作
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button className="h-10 rounded-full border border-white/15 bg-white/10 px-4 text-xs">Theme</button>
            <button className="h-10 w-10 rounded-full border border-white/15 bg-gradient-to-br from-violet-400/60 to-cyan-300/50" />
          </div>
        </div>
      </header>

      <main className="glass-main pb-16">{children}</main>
    </div>
  )
}
