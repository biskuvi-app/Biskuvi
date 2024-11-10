//experimental: failing

await Bun.build({
  entrypoints: ["./src/main.ts"],
  outdir: "./scripts",
  minify: true,
  drop: ["console", "log", "debugger"],
});
