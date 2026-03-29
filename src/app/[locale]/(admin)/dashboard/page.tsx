import { getAdminDashboardData } from "@/lib/admin";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">数据总览</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          管理平台当前的学习与提交状态
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          这里聚合注册用户、活跃度、完课率、提交量，以及每个模块的开学和完成情况，方便快速判断平台进展。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <article key={stat.label} className="rounded-[1.5rem] border border-border/70 bg-card/85 p-5 shadow-lg shadow-primary/5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">模块漏斗</p>
          <div className="mt-5 space-y-4">
            {data.funnel.map((item) => {
              const max = Math.max(item.startedCount, 1);
              const completionWidth = Math.round((item.completedCount / max) * 100);

              return (
                <div key={item.moduleSlug} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium">{item.moduleTitle}</span>
                    <span className="text-muted-foreground">
                      开始 {item.startedCount} / 完成 {item.completedCount}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-secondary" style={{ width: "100%" }} />
                    <div className="-mt-3 h-3 rounded-full bg-primary" style={{ width: `${completionWidth}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">最近 30 天活跃</p>
          <div className="mt-5 space-y-3">
            {data.activity.length > 0 ? (
              data.activity.map((item) => (
                <div key={item.date} className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm">
                  <span>{item.date}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted-foreground">
                暂无活跃趋势数据
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
