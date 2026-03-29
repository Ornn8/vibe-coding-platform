import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const required = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "AUTH_GITHUB_ID",
  "AUTH_GITHUB_SECRET",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET"
];

const placeholderMatchers = {
  DATABASE_URL: [/^postgresql:\/\/user:password@localhost:5432\/vibe_coding_platform$/i],
  AUTH_SECRET: [/^replace-with-a-long-random-string$/i]
};

let hasMissing = false;

for (const key of required) {
  const value = process.env[key]?.trim() ?? "";
  const isPlaceholder = (placeholderMatchers[key] ?? []).some((matcher) => matcher.test(value));
  const present = Boolean(value) && !isPlaceholder;

  if (!present) {
    hasMissing = true;
  }

  if (!value) {
    console.log(`${key}: missing`);
    continue;
  }

  if (isPlaceholder) {
    console.log(`${key}: placeholder`);
    continue;
  }

  console.log(`${key}: present`);
}

if (hasMissing) {
  process.exitCode = 1;
}
