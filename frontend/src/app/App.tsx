import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AuthUser, LoginModal } from "../components/ui/LoginModal";
import { Toast, ToastState } from "../components/ui/Toast";
import { ComponentsPage } from "../pages/ComponentsPage";
import { HomePage } from "../pages/HomePage";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { useCallback, useState } from "react";

const routes = [
  { path: "/enterprise/storage", title: "企业管理 / 仓储" },
  { path: "/enterprise/finance", title: "企业管理 / 财务" },
  { path: "/enterprise/sales", title: "企业管理 / 销售" },
  { path: "/enterprise/plan", title: "企业管理 / 计划" },
  { path: "/enterprise/production", title: "企业管理 / 生产" },
  { path: "/enterprise/hr", title: "企业管理 / 人事" },
  { path: "/enterprise/oa", title: "企业管理 / OA" },
  { path: "/family/album", title: "家庭数字化 / 相册" },
  { path: "/family/account", title: "家庭数字化 / 记账" },
  { path: "/family/events", title: "家庭数字化 / 事件" },
  { path: "/family/assets", title: "家庭数字化 / 资产" },
  { path: "/monitor", title: "系统监控" },
  { path: "/settings", title: "设置" },
];

export function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const pushToast = useCallback(
    (message: string, type: ToastState["type"] = "info") => {
      setToast({ id: Date.now(), message, type });
    },
    [],
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    pushToast("你已退出系统", "info");
  }, [pushToast]);

  return (
    <>
      <MainLayout
        userName={user?.username}
        userAvatar={user?.avatarUrl}
        onLogout={handleLogout}
      >
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <HomePage
                  user={user}
                  onAvatarUploaded={(avatarUrl) =>
                    setUser((prev) => (prev ? { ...prev, avatarUrl } : prev))
                  }
                  onNotify={pushToast}
                />
              ) : (
                <PlaceholderPage title="请先登录" />
              )
            }
          />
          <Route path="/components" element={<ComponentsPage />} />
          {routes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<PlaceholderPage title={item.title} />}
            />
          ))}
        </Routes>
      </MainLayout>

      <LoginModal
        isOpen={!user}
        onSuccess={setUser}
        onError={(message) => pushToast(message, "error")}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
