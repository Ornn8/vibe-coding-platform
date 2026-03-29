const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";

const checks = [
  {
    path: "/zh",
    expectStatus: 200
  },
  {
    path: "/en",
    expectStatus: 200
  },
  {
    path: "/zh/login",
    expectStatus: 200
  },
  {
    path: "/zh/modules",
    expectStatus: 200,
    expectIncludes: "/zh/login"
  },
  {
    path: "/zh/dashboard",
    expectStatus: 200,
    expectIncludes: "/zh/login"
  },
  {
    path: "/zh/tools",
    expectStatus: 200,
    expectIncludes: "/zh/login"
  }
];

let failures = 0;

for (const check of checks) {
  const response = await fetch(`${baseUrl}${check.path}`, {
    redirect: "follow"
  });
  const body = await response.text();

  const statusOk = response.status === check.expectStatus;
  const includesOk = check.expectIncludes ? body.includes(check.expectIncludes) : true;

  if (!statusOk || !includesOk) {
    failures += 1;
    console.error(`FAIL ${check.path} status=${response.status}`);
    if (check.expectIncludes && !includesOk) {
      console.error(`Missing marker: ${check.expectIncludes}`);
    }
  } else {
    console.log(`PASS ${check.path} status=${response.status}`);
  }
}

if (failures > 0) {
  process.exitCode = 1;
}
