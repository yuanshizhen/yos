import { ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Level3 = { name: string; path: string; tag?: string };
type Level2 = { name: string; path: string; tag?: string; actions: Level3[] };
type Menu = { name: string; path: string; children: Level2[] };

const menus: Menu[] = [
  {
    name: "主页",
    path: "/",
    children: [
      {
        name: "Dashboard 总览",
        path: "/",
        tag: "Live",
        actions: [
          { name: "系统概览", path: "/", tag: "Core" },
          { name: "性能看板", path: "/", tag: "Pulse" },
        ],
      },
    ],
  },
  {
    name: "企业管理",
    path: "/enterprise/storage",
    children: [
      {
        name: "仓储",
        path: "/enterprise/storage",
        tag: "Ops",
        actions: [
          { name: "库存台账", path: "/enterprise/storage", tag: "Stock" },
          { name: "出入库流转", path: "/enterprise/storage", tag: "Flow" },
        ],
      },
      {
        name: "财务",
        path: "/enterprise/finance",
        tag: "Money",
        actions: [
          { name: "利润分析", path: "/enterprise/finance", tag: "BI" },
          { name: "回款追踪", path: "/enterprise/finance", tag: "Track" },
        ],
      },
      {
        name: "销售",
        path: "/enterprise/sales",
        tag: "CRM",
        actions: [
          { name: "销售漏斗", path: "/enterprise/sales", tag: "Lead" },
          { name: "客户画像", path: "/enterprise/sales", tag: "Pro" },
        ],
      },
      {
        name: "计划/生产/人事/OA",
        path: "/enterprise/plan",
        tag: "Suite",
        actions: [
          { name: "计划", path: "/enterprise/plan" },
          { name: "生产", path: "/enterprise/production" },
          { name: "人事", path: "/enterprise/hr" },
          { name: "OA", path: "/enterprise/oa" },
        ],
      },
    ],
  },
  {
    name: "家庭数字化",
    path: "/family/album",
    children: [
      {
        name: "相册",
        path: "/family/album",
        tag: "Media",
        actions: [
          { name: "家庭相册", path: "/family/album" },
          { name: "时间轴", path: "/family/album", tag: "New" },
        ],
      },
      {
        name: "记账/事件/资产",
        path: "/family/account",
        tag: "Life",
        actions: [
          { name: "记账", path: "/family/account" },
          { name: "事件", path: "/family/events" },
          { name: "资产", path: "/family/assets" },
        ],
      },
    ],
  },
  {
    name: "系统监控",
    path: "/monitor",
    children: [
      {
        name: "系统监控",
        path: "/monitor",
        tag: "Infra",
        actions: [
          { name: "服务监控", path: "/monitor" },
          { name: "告警中心", path: "/monitor", tag: "Alert" },
        ],
      },
    ],
  },
  {
    name: "设置",
    path: "/settings",
    children: [
      {
        name: "系统设置",
        path: "/settings",
        tag: "Admin",
        actions: [
          { name: "权限设置", path: "/settings" },
          { name: "审计日志", path: "/settings", tag: "Audit" },
          { name: "组件展示", path: "/components", tag: "UI" },
        ],
      },
    ],
  },
];

export function MainLayout({
  children,
  userName,
  userAvatar,
  onLogout,
}: {
  children: ReactNode;
  userName?: string;
  userAvatar?: string;
  onLogout: () => void;
}) {
  const [active, setActive] = useState(menus[0]);
  const [open, setOpen] = useState(false);
  const [activeLv2, setActiveLv2] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);

  const lv2Items = useMemo(() => active.children, [active]);
  const lv3Items = lv2Items[activeLv2]?.actions ?? [];

  return (
    <div>
      <header className="glass-topbar" onMouseLeave={() => setOpen(false)}>
        <div className="glass-topbar-inner flex items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <div className="logo-bubble" />
            <div className="leading-tight">
              <strong className="block text-xs text-slate-900">
                HomeOS Console
              </strong>
              <span className="text-[11px] text-slate-500">
                Apple Glass Admin • Light Mode
              </span>
            </div>
          </div>

          <nav className="relative hidden h-11 items-center gap-1 rounded-full border border-white/70 bg-white/70 px-2 shadow-[0_8px_30px_rgba(148,163,184,0.24)] md:flex">
            {menus.map((menu) => (
              <Link
                key={menu.name}
                to={menu.path}
                className={`h-9 rounded-full px-4 text-xs leading-9 transition duration-300 ${active.name === menu.name ? "bg-gradient-to-r from-violet-200 to-cyan-100 text-slate-900 shadow-[0_6px_16px_rgba(99,102,241,0.2)]" : "text-slate-700 hover:bg-white/90"}`}
                onMouseEnter={() => {
                  setActive(menu);
                  setActiveLv2(0);
                  setOpen(true);
                }}
              >
                {menu.name}
              </Link>
            ))}

            {open && (
              <section className="dropdown-shell absolute left-1/2 top-14 z-20 w-[780px] -translate-x-1/2 rounded-[24px] border border-cyan-100/80 bg-gradient-to-b from-white/95 to-white/88 p-3 shadow-[0_26px_90px_rgba(56,189,248,0.25)] backdrop-blur-2xl">
                <div className="grid grid-cols-[1.12fr_1fr] gap-3">
                  <div className="rounded-2xl border border-cyan-100 bg-gradient-to-b from-white to-cyan-50/50 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <p className="text-xs font-medium tracking-wide text-slate-600">
                      二级菜单
                    </p>
                    <div className="mt-2 space-y-2">
                      {lv2Items.map((m, idx) => (
                        <Link
                          key={m.path}
                          to={m.path}
                          className={`menu-lv2-item group flex items-center justify-between rounded-2xl border px-3 py-2 text-xs transition duration-300 ${activeLv2 === idx ? "border-cyan-300 bg-gradient-to-r from-cyan-100 to-violet-100 text-slate-900 shadow-[0_8px_18px_rgba(56,189,248,0.2)]" : "border-slate-200/80 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50/60"}`}
                          onMouseEnter={() => setActiveLv2(idx)}
                        >
                          <span>{m.name}</span>
                          <span className="rounded-full border border-slate-200/90 px-2 py-0.5 text-[10px] text-slate-500">
                            {m.tag ?? "Open"}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-violet-100 bg-gradient-to-b from-white to-violet-50/40 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <p className="text-xs font-medium tracking-wide text-slate-600">
                      三级菜单（鼠标划入二级后显示）
                    </p>
                    <div className="mt-2 space-y-2">
                      {lv3Items.map((item) => (
                        <Link
                          key={item.path + item.name}
                          to={item.path}
                          className="menu-lv3-item flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-[0_8px_16px_rgba(139,92,246,0.18)]"
                        >
                          <span>{item.name}</span>
                          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">
                            {item.tag ?? "Go"}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </nav>

          <div
            className="relative flex items-center gap-2"
            onMouseLeave={() => setProfileOpen(false)}
          >
            <div className="rounded-full border border-white/75 bg-white/70 px-3 py-2 text-xs text-slate-600">
              {userName ?? "未登录"}
            </div>
            <button
              className="h-10 w-10 overflow-hidden rounded-full border border-white/80 bg-gradient-to-br from-violet-200 to-cyan-100 shadow-[0_10px_20px_rgba(125,211,252,0.35)] transition duration-300 hover:-translate-y-0.5"
              onMouseEnter={() => setProfileOpen(true)}
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              ) : null}
            </button>

            {profileOpen && (
              <div className="avatar-menu absolute right-0 top-12 z-30 w-44 rounded-2xl border border-white/80 bg-white/92 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
                <Link
                  className="avatar-menu-item block rounded-xl px-3 py-2 text-xs text-slate-700 transition hover:bg-cyan-50"
                  to="/settings"
                >
                  账户设置
                </Link>
                <Link
                  className="avatar-menu-item block rounded-xl px-3 py-2 text-xs text-slate-700 transition hover:bg-violet-50"
                  to="/components"
                >
                  组件展示页
                </Link>
                <button
                  className="avatar-menu-item mt-1 w-full rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-left text-xs text-rose-600 transition hover:bg-rose-100"
                  onClick={onLogout}
                  type="button"
                >
                  退出系统
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main
        className={`glass-main pb-16 transition duration-300 ${open ? "content-muted" : ""}`}
      >
        {children}
      </main>
    </div>
  );
}
