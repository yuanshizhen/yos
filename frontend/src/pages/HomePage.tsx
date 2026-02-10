import { ChangeEvent, useState } from "react";
import { GlassButton } from "../components/ui/Button";
import { GlassCard } from "../components/ui/Card";
import { api } from "../services/api";
import { AuthUser } from "../components/ui/LoginModal";
import { ToastState } from "../components/ui/Toast";

export function HomePage({
  user,
  onAvatarUploaded,
  onNotify,
}: {
  user: AuthUser;
  onAvatarUploaded: (url: string) => void;
  onNotify: (message: string, type?: ToastState["type"]) => void;
}) {
  const [avatarUploading, setAvatarUploading] = useState(false);

  const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatarUploading(true);

    try {
      const form = new FormData();
      form.append("avatar", file);
      const uploadRes = await api.post("/upload/avatar", form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "X-User-ID": user.id,
        },
      });
      onAvatarUploaded(uploadRes.data.avatarUrl as string);
      onNotify("头像上传成功", "success");
    } catch {
      onNotify("头像上传失败，请稍后重试", "error");
    } finally {
      setAvatarUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="rounded-[24px] border border-white/80 bg-white/60 p-5 shadow-[0_20px_70px_rgba(148,163,184,0.2)] backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-xs text-slate-600">
            亮色 Apple Glass
            模式已启用。二级菜单打开时内容区会半透明，三级菜单跟随二级 hover
            动态显示。
          </p>
        </div>
        <label className="inline-block">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={onAvatarChange}
            disabled={avatarUploading}
          />
          <span>
            <GlassButton>
              {avatarUploading ? "上传中..." : "上传头像"}
            </GlassButton>
          </span>
        </label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <GlassCard
          title="System Pulse"
          desc="系统运行状态、调用量、模块健康度。"
        >
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 animate-[riseUp_.45s_ease-out]">
              <strong className="block text-base text-slate-900">99.1%</strong>
              <span className="text-slate-500">Uptime</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 animate-[riseUp_.55s_ease-out]">
              <strong className="block text-base text-slate-900">18ms</strong>
              <span className="text-slate-500">Latency</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 animate-[riseUp_.65s_ease-out]">
              <strong className="block text-base text-slate-900">3.1K</strong>
              <span className="text-slate-500">Events/min</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard
          title="AI Operator"
          desc="AI 调度中心：策略、路由、提示词资产管理。"
        >
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 animate-[riseUp_.45s_ease-out]">
              <strong className="block text-base text-slate-900">12</strong>
              <span className="text-slate-500">Agents</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 animate-[riseUp_.55s_ease-out]">
              <strong className="block text-base text-slate-900">9</strong>
              <span className="text-slate-500">Workflows</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 animate-[riseUp_.65s_ease-out]">
              <strong className="block text-base text-slate-900">0.9s</strong>
              <span className="text-slate-500">Response</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-200 to-cyan-100" />
        )}
        <div>
          <p className="text-xs text-slate-500">当前用户</p>
          <p className="text-sm font-semibold text-slate-900">
            {user.username}
          </p>
        </div>
      </div>
    </div>
  );
}
