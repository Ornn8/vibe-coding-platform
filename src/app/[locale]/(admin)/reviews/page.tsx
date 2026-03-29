import { Button } from "@/components/ui/button";
import { getAdminReviews } from "@/lib/admin";
import { saveReviewDecision } from "../actions";

type AdminReviewsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminReviewsPage({ params }: AdminReviewsPageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const reviews = await getAdminReviews();
  const revalidateTarget = `/${locale}/reviews`;

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">项目评审</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          查看学员提交并更新评审状态
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          这里汇总所有模块项目提交。你可以查看项目内容、自检 checklist、补充评语，并将状态更新为已评审或已完成。
        </p>
      </div>

      <div className="grid gap-5">
        {reviews.map((review) => (
          <article
            key={review.submissionId}
            className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">
                  {review.moduleSlug.toUpperCase()} · {review.moduleTitle}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {review.projectTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {review.learnerName} · {review.learnerEmail}
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {review.status}
              </span>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_20rem]">
              <div className="space-y-5">
                <section className="rounded-2xl border border-border/70 bg-background px-4 py-4">
                  <p className="text-sm font-medium text-foreground">提交内容</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                    {review.contentText || "暂无文本内容"}
                  </p>
                  {review.contentLinks.length > 0 ? (
                    <div className="mt-4 grid gap-2">
                      {review.contentLinks.map((link) => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-primary underline-offset-4 hover:underline"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </section>

                <section className="rounded-2xl border border-border/70 bg-background px-4 py-4">
                  <p className="text-sm font-medium text-foreground">自检清单</p>
                  <div className="mt-4 grid gap-2">
                    {review.checklist.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 rounded-xl border border-border/70 px-3 py-3 text-sm"
                      >
                        <span>{item.label}</span>
                        <span className={item.checked ? "text-primary" : "text-muted-foreground"}>
                          {item.checked ? "已勾选" : "未勾选"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <form
                className="space-y-4 rounded-2xl border border-border/70 bg-background px-4 py-4"
                action={async (formData) => {
                  "use server";
                  await saveReviewDecision(formData, revalidateTarget);
                }}
              >
                <input type="hidden" name="submissionId" value={review.submissionId} />
                <div>
                  <p className="text-sm font-medium text-foreground">评审备注</p>
                  <textarea
                    name="reviewNote"
                    defaultValue={review.reviewNote}
                    placeholder="写下建议、亮点或需要补充的地方..."
                    className="mt-3 min-h-40 w-full rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div className="text-xs text-muted-foreground">
                  提交时间：{review.createdAt.toLocaleString("zh-CN")}
                  {review.reviewedAt ? ` · 上次评审：${review.reviewedAt.toLocaleString("zh-CN")}` : ""}
                </div>

                <Button type="submit" name="status" value="REVIEWED" variant="outline" className="w-full rounded-full">
                  标记为已评审
                </Button>
                <Button type="submit" name="status" value="COMPLETED" className="w-full rounded-full">
                  标记为已完成
                </Button>
              </form>
            </div>
          </article>
        ))}

        {reviews.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-border/70 bg-card/60 p-6 text-sm text-muted-foreground">
            当前没有可评审的项目提交
          </div>
        ) : null}
      </div>
    </section>
  );
}
