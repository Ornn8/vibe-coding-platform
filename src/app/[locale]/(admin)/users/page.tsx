import { Button } from "@/components/ui/button";
import { getAdminUsers } from "@/lib/admin";
import { saveUserRole } from "../actions";

type AdminUsersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminUsersPage({ params }: AdminUsersPageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const users = await getAdminUsers();
  const revalidateTarget = `/${locale}/users`;

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">用户管理</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          查看学习活跃度并调整角色
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          当前支持查看用户列表、学习活跃度和角色切换，方便快速确认管理员账号与学习数据的分布情况。
        </p>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <article
            key={user.id}
            className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
          >
            <form
              className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_12rem]"
              action={async (formData) => {
                "use server";
                await saveUserRole(formData, revalidateTarget);
              }}
            >
              <input type="hidden" name="userId" value={user.id} />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">{user.name}</h2>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>注册于 {user.createdAt.toLocaleDateString("zh-CN")}</span>
                  <span>最近活跃 {user.lastActiveAt ? user.lastActiveAt.toLocaleDateString("zh-CN") : "暂无"}</span>
                  <span>完成课时 {user.completedLessons}</span>
                  <span>完成模块 {user.completedModules}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <select
                  name="role"
                  defaultValue={user.role}
                  className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <Button type="submit" className="rounded-full px-5">
                  保存角色
                </Button>
              </div>
            </form>
          </article>
        ))}

        {users.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-border/70 bg-card/60 p-6 text-sm text-muted-foreground">
            暂无用户数据
          </div>
        ) : null}
      </div>
    </section>
  );
}
