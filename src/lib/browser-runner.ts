export interface RunResult {
  output: string;
  exitCode: number;
}

// Best-effort TypeScript type stripping for tutorial-level code
function removeInterfaceBlocks(src: string): string {
  const re = /\binterface\s+\w[\w<>, ]*\s*\{/g;
  const ranges: Array<{ start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    let depth = 1;
    let j = m.index + m[0].length;
    while (j < src.length && depth > 0) {
      if (src[j] === "{") depth++;
      else if (src[j] === "}") depth--;
      j++;
    }
    ranges.push({ start: m.index, end: j });
  }
  let out = "";
  let pos = 0;
  for (const { start, end } of ranges) {
    if (start >= pos) { out += src.slice(pos, start); pos = end; }
  }
  return out + src.slice(pos);
}

function stripTypes(code: string): string {
  let result = removeInterfaceBlocks(code);

  return result
    // Remove type aliases (single or multi-line ending in ;)
    .replace(/^[ \t]*type\s+\w[\w<>, ]*=[\s\S]*?;/gm, "")
    // Remove import type
    .replace(/import\s+type\s+.*?;/g, "")
    // Remove export type
    .replace(/export\s+type\s+\w.*?;/g, "")
    // Remove primitive type annotations: : string, : number, etc.
    .replace(/:\s*(string|number|boolean|void|any|never|unknown|null|undefined|object)(\[\])?(\s*[|&]\s*(string|number|boolean|void|any|never|unknown|null|undefined|object)(\[\])?)*(?=[,=;)\s\n])/g, "")
    // Remove custom type annotations: : MyType, : MyType[], : MyType | OtherType
    .replace(/:\s*[A-Z]\w*(?:<[^>]*>)?(?:\[\])?(?:\s*[|&]\s*[\w<>\[\]?.]*)*(?=[,=;)\s\n{])/g, "")
    // Remove return type annotation before {
    .replace(/\)\s*:\s*[\w<>\[\]\s|,?.]+?(?=\s*\{)/g, ")")
    // Remove generic type params on function declarations: <T>(
    .replace(/<[A-Z]\w*(?:,\s*[A-Z]\w*)*>(?=\s*[(<])/g, "")
    // Remove 'as Type' casts — only outside string literals (best-effort: skip as in identifiers)
    .replace(/\bas\s+[A-Z]\w*(?:<[^>]*>)?(?:\[\])?/g, "")
    // Remove access modifiers
    .replace(/\b(public|private|protected|readonly|abstract|override|declare)\s+/g, "")
    // Remove decorators
    .replace(/^[ \t]*@\w+(?:\([^)]*\))?\s*\n/gm, "")
    .trim();
}

const WORKER_SRC = `
const _fmt = (args) => args.map(a => {
  if (a === null)      return 'null';
  if (a === undefined) return 'undefined';
  if (typeof a === 'object') { try { return JSON.stringify(a, null, 2); } catch { return String(a); } }
  return String(a);
}).join(' ');

self.console = {
  log:   (...a) => self.postMessage({ t: 'out', s: _fmt(a) }),
  info:  (...a) => self.postMessage({ t: 'out', s: _fmt(a) }),
  warn:  (...a) => self.postMessage({ t: 'out', s: '⚠ ' + _fmt(a) }),
  error: (...a) => self.postMessage({ t: 'err', s: _fmt(a) }),
};

self.onmessage = (e) => {
  try {
    eval(e.data);
    self.postMessage({ t: 'done', ok: true });
  } catch (err) {
    self.postMessage({ t: 'done', ok: false, s: err.message });
  }
};
`;

export function runInBrowser(code: string, language: string): Promise<RunResult> {
  if (language === "java") {
    return Promise.resolve({
      output: "☕ Chạy Java cần backend. Đang cập nhật...",
      exitCode: 1,
    });
  }

  const jsCode = language === "typescript" ? stripTypes(code) : code;

  return new Promise((resolve) => {
    const blob = new Blob([WORKER_SRC], { type: "application/javascript" });
    const url  = URL.createObjectURL(blob);
    const worker = new Worker(url);
    const lines: string[] = [];
    let exitCode = 0;

    const finish = () => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
    };

    const timer = setTimeout(() => {
      finish();
      resolve({ output: (lines.join("\n") + "\n⏱ Timeout: code chạy quá 6 giây").trim(), exitCode: 1 });
    }, 6000);

    worker.onmessage = (e) => {
      const { t, s, ok } = e.data as { t: string; s?: string; ok?: boolean };
      if (t === "out") {
        lines.push(s ?? "");
      } else if (t === "err") {
        lines.push(`❌ ${s}`);
        exitCode = 1;
      } else if (t === "done") {
        if (!ok && s) { lines.push(`❌ ${s}`); exitCode = 1; }
        finish();
        resolve({ output: lines.join("\n") || "(Không có output)", exitCode });
      }
    };

    worker.onerror = (e) => {
      finish();
      resolve({ output: `❌ ${e.message}`, exitCode: 1 });
    };

    worker.postMessage(jsCode);
  });
}
