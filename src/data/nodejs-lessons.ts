import type { Exercise, Playground, Lesson } from "@/data/typescript-lessons";

export { Exercise, Playground, Lesson };

export const nodejsLessons: Lesson[] = [
  // ─────────────────────────────────────────────
  {
    id: "01-gioi-thieu",
    title: "Giới thiệu Node.js",
    description: "Node.js là gì, Event Loop, và tại sao Node.js nhanh",
    level: "Cơ bản",
    content: `
## Node.js là gì?

**Node.js** là môi trường chạy JavaScript ở phía server, xây dựng trên **V8 engine** của Google Chrome. Node.js cho phép bạn chạy JavaScript bên ngoài trình duyệt — dùng để xây dựng server, CLI tool, REST API, real-time app.

### Tại sao Node.js phổ biến?

- **Non-blocking I/O** — không chờ file đọc/ghi xong mới làm việc khác
- **Single thread** nhưng xử lý hàng nghìn request nhờ Event Loop
- **npm** — hệ sinh thái package lớn nhất thế giới
- **Full-stack JS** — dùng chung ngôn ngữ cho cả frontend và backend

### Event Loop

Node.js dùng một **thread duy nhất** nhưng không bị block nhờ Event Loop:

\`\`\`
┌─────────────┐
│   Call Stack │  ← Code đang chạy
└─────────────┘
       ↕
┌─────────────┐
│  Event Loop  │  ← Kiểm tra callback queue
└─────────────┘
       ↕
┌─────────────┐
│Callback Queue│  ← setTimeout, I/O callbacks...
└─────────────┘
\`\`\`

### Thứ tự thực thi

\`\`\`javascript
console.log("1 - Đồng bộ");

setTimeout(() => console.log("3 - Sau 0ms (macro task)"), 0);

Promise.resolve().then(() => console.log("2 - Microtask (Promise)"));

console.log("4 - Đồng bộ tiếp");
\`\`\`

Output sẽ là: 1 → 4 → 2 → 3 (microtask chạy trước macro task!)

### Global Objects trong Node.js

| Object | Mô tả |
|--------|-------|
| \`process\` | Thông tin về process đang chạy |
| \`__filename\` | Đường dẫn file hiện tại |
| \`__dirname\` | Thư mục chứa file hiện tại |
| \`Buffer\` | Làm việc với binary data |
| \`global\` | Global scope (như \`window\` trong browser) |
`,
    codeExample: `// Node.js Global Objects & Event Loop Demo

// process object
console.log("Node.js version:", process.version);
console.log("Platform:", process.platform);
console.log("Số CPU:", require("os").cpus().length);

// Memory usage
const mem = process.memoryUsage();
console.log("\\nMemory usage:");
console.log("  RSS:", Math.round(mem.rss / 1024 / 1024) + " MB");
console.log("  Heap used:", Math.round(mem.heapUsed / 1024 / 1024) + " MB");

// Event Loop order demo
console.log("\\n--- Event Loop Order ---");
console.log("1. Synchronous code bắt đầu");

setTimeout(() => console.log("4. setTimeout (macro task)"), 0);
setTimeout(() => console.log("5. setTimeout 2 (macro task)"), 0);

Promise.resolve().then(() => console.log("3. Promise.then (microtask)"));

console.log("2. Synchronous code kết thúc");

// process.hrtime for high-resolution timing
const start = process.hrtime.bigint();
let sum = 0;
for (let i = 0; i < 1_000_000; i++) sum += i;
const end = process.hrtime.bigint();
console.log("\\nTính tổng 1 triệu số:", sum);
console.log("Thời gian:", Number(end - start) / 1e6 + "ms");
`,
    exercises: [
      {
        title: "Thông tin hệ thống",
        description: "Dùng process và os module để in ra thông tin: Node version, OS platform, tổng RAM (GB), thư mục home.",
        starterCode: `const os = require("os");

// TODO: in ra:
// 1. Node.js version (process.version)
// 2. OS platform (process.platform)
// 3. Tổng RAM theo GB (os.totalmem() / 1024^3, làm tròn 2 chữ số)
// 4. Thư mục home (os.homedir())

`,
        solution: `const os = require("os");

console.log("Node.js version:", process.version);
console.log("OS platform:", process.platform);
console.log("Tổng RAM:", (os.totalmem() / 1024 ** 3).toFixed(2) + " GB");
console.log("Home dir:", os.homedir());
`,
        hint: "Dùng os.totalmem() trả về bytes, chia 1024^3 ra GB. os.homedir() trả về string đường dẫn.",
      },
      {
        title: "Event Loop thứ tự",
        description: "Dự đoán và kiểm tra thứ tự output của đoạn code có sync, Promise, và setTimeout.",
        starterCode: `// Hãy đoán output trước khi chạy!
// Thứ tự: ?, ?, ?, ?, ?

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

setTimeout(() => console.log("E"), 100);

console.log("F");

// Thêm: tạo Promise trả về giá trị sau 50ms rồi log kết quả
async function demo() {
  const val = await new Promise(resolve => setTimeout(() => resolve(42), 50));
  console.log("G - async result:", val);
}
demo();
`,
        hint: "Thứ tự: sync trước (A, F), rồi microtask Promise (C, D), rồi macro task setTimeout 0ms (B), rồi async G, rồi E (100ms).",
      },
      {
        title: "Process arguments",
        description: "Tạo hàm parseArgs() đọc process.argv và trả về object {name, age}. Simulate với mảng args giả.",
        starterCode: `// Simulate: node script.js --name=Alice --age=25
const args = ["node", "script.js", "--name=Alice", "--age=25"];

function parseArgs(argv) {
  // TODO: parse argv[2..] thành object
  // "--name=Alice" -> { name: "Alice" }
  // "--age=25" -> { age: "25" }
}

const parsed = parseArgs(args);
console.log(parsed);
// Expected: { name: 'Alice', age: '25' }
`,
        solution: `const args = ["node", "script.js", "--name=Alice", "--age=25"];

function parseArgs(argv) {
  const result = {};
  argv.slice(2).forEach(arg => {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      result[key] = value;
    }
  });
  return result;
}

const parsed = parseArgs(args);
console.log(parsed);
`,
        hint: "Dùng slice(2) để bỏ 'node' và tên file. Mỗi arg split('=') để tách key=value.",
      },
      {
        title: "Timer & clearTimeout",
        description: "Tạo countdown từ 5 xuống 0, mỗi 'giây' in một số. Dùng recursive setTimeout (không dùng setInterval).",
        starterCode: `// Implement countdown dùng setTimeout đệ quy
// Output: 5... 4... 3... 2... 1... Hết giờ!
// Dùng delay nhỏ (50ms) để test nhanh

function countdown(n, delay = 50) {
  // TODO: implement countdown đệ quy
}

countdown(5);
`,
        solution: `function countdown(n, delay = 50) {
  if (n < 0) {
    console.log("Hết giờ!");
    return;
  }
  console.log(n + "...");
  setTimeout(() => countdown(n - 1, delay), delay);
}

countdown(5);
`,
        hint: "Base case khi n < 0 thì in 'Hết giờ!'. Ngược lại in n rồi gọi setTimeout với countdown(n-1).",
      },
      {
        title: "Environment variables",
        description: "Tạo hàm getConfig() đọc process.env và trả về config với fallback defaults.",
        starterCode: `// Simulate environment variables
process.env.APP_NAME = "MyApp";
process.env.PORT = "3000";
// process.env.DEBUG không set -> dùng default

function getConfig() {
  // TODO: trả về object với:
  // appName: từ APP_NAME (default: "App")
  // port: từ PORT convert sang number (default: 8080)
  // debug: từ DEBUG === "true" (default: false)
  // env: từ NODE_ENV (default: "development")
}

const config = getConfig();
console.log(config);
`,
        solution: `process.env.APP_NAME = "MyApp";
process.env.PORT = "3000";

function getConfig() {
  return {
    appName: process.env.APP_NAME ?? "App",
    port: parseInt(process.env.PORT ?? "8080", 10),
    debug: process.env.DEBUG === "true",
    env: process.env.NODE_ENV ?? "development",
  };
}

const config = getConfig();
console.log(config);
`,
        hint: "Dùng ?? (nullish coalescing) để fallback. parseInt() để convert string sang number.",
      },
    ],
    playgrounds: [
      {
        title: "Khám phá process object",
        description: "Thử in các thuộc tính của process: versions, env, memoryUsage(), uptime(), pid. Xem Node.js expose những gì.",
        starterCode: `// Khám phá process object - thử bất kỳ thuộc tính nào!
const os = require("os");

// Thông tin cơ bản
console.log("PID:", process.pid);
console.log("Uptime:", process.uptime().toFixed(2) + "s");

// Thử thêm:
// console.log(process.versions);
// console.log(Object.keys(process.env).slice(0, 5));
// console.log(os.networkInterfaces());

// Benchmark nhỏ
const start = Date.now();
const arr = Array.from({ length: 1000000 }, (_, i) => i);
const sum = arr.reduce((a, b) => a + b, 0);
console.log("Sum:", sum, "in", Date.now() - start + "ms");
`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "02-modules",
    title: "Module System & Built-in APIs",
    description: "CommonJS require/exports, path, crypto, Buffer",
    level: "Cơ bản",
    content: `
## Module System trong Node.js

Node.js hỗ trợ hai hệ thống module: **CommonJS** (cũ, mặc định) và **ES Modules** (mới).

### CommonJS (CJS)

\`\`\`javascript
// math.js - xuất module
module.exports = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
};

// app.js - nhập module
const math = require("./math");
console.log(math.add(2, 3)); // 5
\`\`\`

### ES Modules (ESM)

\`\`\`javascript
// math.mjs
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// app.mjs
import { add } from "./math.mjs";
import multiply from "./math.mjs";
\`\`\`

### Built-in Modules quan trọng

| Module | Dùng để |
|--------|---------|
| \`path\` | Xử lý đường dẫn file/folder |
| \`os\` | Thông tin hệ điều hành |
| \`crypto\` | Mã hóa, hash, random |
| \`fs\` | Đọc/ghi file |
| \`events\` | EventEmitter pattern |
| \`url\` | Parse URL |
| \`util\` | Các hàm tiện ích |

### path module

\`\`\`javascript
const path = require("path");

path.join("/home", "user", "file.txt")    // /home/user/file.txt
path.resolve("src", "index.js")           // absolute path
path.basename("/home/user/file.txt")      // "file.txt"
path.extname("index.html")                // ".html"
path.dirname("/home/user/file.txt")       // "/home/user"
\`\`\`

### crypto module

\`\`\`javascript
const crypto = require("crypto");

// Hash
crypto.createHash("sha256").update("password").digest("hex");

// Random bytes
crypto.randomBytes(16).toString("hex");

// UUID v4 style
crypto.randomUUID();
\`\`\`
`,
    codeExample: `const path = require("path");
const crypto = require("crypto");
const os = require("os");

// ── path module ──
console.log("=== path ===");
const filePath = path.join("/var", "www", "html", "index.html");
console.log("join:", filePath);
console.log("basename:", path.basename(filePath));
console.log("dirname:", path.dirname(filePath));
console.log("extname:", path.extname(filePath));
console.log("parse:", path.parse(filePath));

// ── crypto module ──
console.log("\\n=== crypto ===");
const hash = crypto.createHash("sha256").update("hello world").digest("hex");
console.log("SHA256:", hash);
console.log("Random UUID:", crypto.randomUUID());
console.log("Random hex:", crypto.randomBytes(8).toString("hex"));

// HMAC
const hmac = crypto.createHmac("sha256", "secret-key")
  .update("message")
  .digest("hex");
console.log("HMAC:", hmac);

// ── Buffer ──
console.log("\\n=== Buffer ===");
const buf = Buffer.from("Hello, Node.js!", "utf8");
console.log("Buffer:", buf);
console.log("Base64:", buf.toString("base64"));
console.log("Hex:", buf.toString("hex"));
console.log("Back to string:", Buffer.from(buf.toString("base64"), "base64").toString());
`,
    exercises: [
      {
        title: "Path manipulation",
        description: "Dùng path module để xây dựng hàm getProjectPaths() trả về các đường dẫn quan trọng của project.",
        starterCode: `const path = require("path");

// Giả sử project root là /home/user/myproject
const PROJECT_ROOT = "/home/user/myproject";

function getProjectPaths(root) {
  // TODO: trả về object với:
  // src: thư mục src
  // dist: thư mục dist
  // configFile: file package.json ở root
  // envFile: file .env ở root
  // srcIndex: file index.js trong src
}

const paths = getProjectPaths(PROJECT_ROOT);
console.log(paths);
`,
        solution: `const path = require("path");
const PROJECT_ROOT = "/home/user/myproject";

function getProjectPaths(root) {
  return {
    src: path.join(root, "src"),
    dist: path.join(root, "dist"),
    configFile: path.join(root, "package.json"),
    envFile: path.join(root, ".env"),
    srcIndex: path.join(root, "src", "index.js"),
  };
}

const paths = getProjectPaths(PROJECT_ROOT);
console.log(paths);
`,
        hint: "Dùng path.join(root, 'src') để nối đường dẫn. path.join tự xử lý dấu / phù hợp với OS.",
      },
      {
        title: "Hash passwords",
        description: "Tạo hàm hashPassword() dùng crypto.createHash('sha256') với salt để hash password an toàn hơn.",
        starterCode: `const crypto = require("crypto");

function hashPassword(password, salt) {
  // TODO: nếu salt không có, tạo random salt (16 bytes, hex)
  // hash = sha256(salt + password)
  // trả về { hash, salt }
}

function verifyPassword(password, hash, salt) {
  // TODO: hash lại và so sánh
}

const { hash, salt } = hashPassword("mySecretPass");
console.log("Hash:", hash);
console.log("Salt:", salt);
console.log("Verify đúng:", verifyPassword("mySecretPass", hash, salt));
console.log("Verify sai:", verifyPassword("wrongPass", hash, salt));
`,
        solution: `const crypto = require("crypto");

function hashPassword(password, salt) {
  if (!salt) salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256").update(salt + password).digest("hex");
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const { hash: newHash } = hashPassword(password, salt);
  return newHash === hash;
}

const { hash, salt } = hashPassword("mySecretPass");
console.log("Hash:", hash);
console.log("Salt:", salt);
console.log("Verify đúng:", verifyPassword("mySecretPass", hash, salt));
console.log("Verify sai:", verifyPassword("wrongPass", hash, salt));
`,
        hint: "Salt là chuỗi random thêm vào trước password khi hash. Cần lưu salt lại để verify sau.",
      },
      {
        title: "Buffer encoding",
        description: "Tạo hàm encode() và decode() dùng Buffer để convert text sang Base64 và ngược lại. Dùng cho Basic Auth header.",
        starterCode: `// Basic Auth dùng Base64: "username:password" -> base64
function encodeCredentials(username, password) {
  // TODO: tạo "username:password" rồi encode Base64
}

function decodeCredentials(encoded) {
  // TODO: decode từ Base64 và split theo ":"
  // trả về { username, password }
}

const encoded = encodeCredentials("admin", "secret123");
console.log("Basic Auth header:", "Basic " + encoded);

const decoded = decodeCredentials(encoded);
console.log("Decoded:", decoded);
`,
        solution: `function encodeCredentials(username, password) {
  return Buffer.from(\`\${username}:\${password}\`).toString("base64");
}

function decodeCredentials(encoded) {
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [username, password] = decoded.split(":");
  return { username, password };
}

const encoded = encodeCredentials("admin", "secret123");
console.log("Basic Auth header:", "Basic " + encoded);
const decoded = decodeCredentials(encoded);
console.log("Decoded:", decoded);
`,
        hint: "Buffer.from(string).toString('base64') để encode. Buffer.from(b64, 'base64').toString() để decode.",
      },
      {
        title: "Module pattern",
        description: "Tạo một module Counter dùng closure (pattern tương tự CommonJS module) với get, increment, reset.",
        starterCode: `// CommonJS module pattern dùng closure
// Simulate exports = {} pattern
function createCounterModule() {
  // private state
  let count = 0;

  // public API (giống module.exports)
  return {
    // TODO: get() -> trả về count hiện tại
    // TODO: increment(n = 1) -> tăng count
    // TODO: decrement(n = 1) -> giảm count
    // TODO: reset() -> về 0
  };
}

const counter = createCounterModule();
counter.increment();
counter.increment();
counter.increment(5);
console.log("Count:", counter.get()); // 7
counter.decrement(2);
console.log("Count:", counter.get()); // 5
counter.reset();
console.log("Count:", counter.get()); // 0
`,
        solution: `function createCounterModule() {
  let count = 0;
  return {
    get: () => count,
    increment: (n = 1) => { count += n; },
    decrement: (n = 1) => { count -= n; },
    reset: () => { count = 0; },
  };
}

const counter = createCounterModule();
counter.increment();
counter.increment();
counter.increment(5);
console.log("Count:", counter.get());
counter.decrement(2);
console.log("Count:", counter.get());
counter.reset();
console.log("Count:", counter.get());
`,
        hint: "Dùng closure: count là biến private, các function bên trong đều có thể truy cập nó.",
      },
      {
        title: "URL parsing",
        description: "Dùng URL class của Node.js để parse URL và extract thông tin.",
        starterCode: `// Node.js có URL class built-in (giống browser)
const { URL } = require("url");

function parseAPIUrl(urlString) {
  // TODO: parse urlString thành URL object và trả về:
  // { protocol, hostname, port, pathname, params (object từ searchParams) }
}

const result = parseAPIUrl(
  "https://api.example.com:8080/v1/users?page=2&limit=10&role=admin"
);
console.log(result);
// Expected:
// {
//   protocol: 'https:',
//   hostname: 'api.example.com',
//   port: '8080',
//   pathname: '/v1/users',
//   params: { page: '2', limit: '10', role: 'admin' }
// }
`,
        solution: `const { URL } = require("url");

function parseAPIUrl(urlString) {
  const u = new URL(urlString);
  const params = {};
  u.searchParams.forEach((value, key) => { params[key] = value; });
  return {
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port,
    pathname: u.pathname,
    params,
  };
}

const result = parseAPIUrl(
  "https://api.example.com:8080/v1/users?page=2&limit=10&role=admin"
);
console.log(result);
`,
        hint: "new URL(string) tạo URL object. u.searchParams là URLSearchParams, dùng .forEach() hoặc Object.fromEntries(u.searchParams).",
      },
    ],
    playgrounds: [
      {
        title: "Tạo UUID và token",
        description: "Thử dùng crypto.randomUUID(), randomBytes(), và createHash() để tạo các loại token khác nhau. Xem sự khác biệt giữa các phương pháp.",
        starterCode: `const crypto = require("crypto");

// Thử các cách tạo unique ID / token:

// 1. UUID v4
console.log("UUID:", crypto.randomUUID());

// 2. Random hex token
console.log("Token hex:", crypto.randomBytes(32).toString("hex"));

// 3. Base64url token (thường dùng cho JWT, session)
const base64url = crypto.randomBytes(24).toString("base64url");
console.log("Token base64url:", base64url);

// 4. Numeric OTP (6 chữ số)
const otp = crypto.randomInt(100000, 999999);
console.log("OTP:", otp);

// Thử tự tạo token theo cách khác!
`,
        hint: "crypto.randomInt(min, max) tạo số ngẫu nhiên. randomBytes(n) tạo n bytes ngẫu nhiên.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "03-filesystem",
    title: "File System (fs module)",
    description: "Đọc, ghi file đồng bộ/bất đồng bộ, thao tác thư mục",
    level: "Cơ bản",
    content: `
## fs Module — File System

Module \`fs\` cho phép đọc/ghi file và thư mục. Có hai phong cách API:

### Sync vs Async

\`\`\`javascript
const fs = require("fs");

// SYNC (blocking) — tránh dùng ở server
const data = fs.readFileSync("file.txt", "utf8");

// ASYNC với callback — callback hell
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// ASYNC với Promise — hiện đại hơn
const { promises: fsp } = require("fs");
const data2 = await fsp.readFile("file.txt", "utf8");
\`\`\`

### Các thao tác cơ bản

\`\`\`javascript
const fs = require("fs");

// Đọc file
fs.readFileSync("input.txt", "utf8");

// Ghi file (tạo mới hoặc ghi đè)
fs.writeFileSync("output.txt", "Hello!", "utf8");

// Thêm vào cuối file
fs.appendFileSync("log.txt", "new line\\n");

// Kiểm tra file tồn tại
fs.existsSync("file.txt"); // true/false

// Xóa file
fs.unlinkSync("file.txt");

// Tạo thư mục
fs.mkdirSync("newFolder", { recursive: true });

// Đọc danh sách file trong thư mục
fs.readdirSync("./src");
\`\`\`

### Streams — xử lý file lớn

\`\`\`javascript
const fs = require("fs");

// Đọc file lớn từng chunk (stream)
const readable = fs.createReadStream("big-file.csv", { encoding: "utf8" });
readable.on("data", chunk => {
  // xử lý từng chunk thay vì đọc toàn bộ vào memory
});
readable.on("end", () => console.log("Done"));
\`\`\`
`,
    codeExample: `const fs = require("fs");
const path = require("path");
const os = require("os");

// Dùng tmp directory để test (luôn có sẵn)
const tmpDir = os.tmpdir();
const testFile = path.join(tmpDir, "nodejs-test.txt");
const jsonFile = path.join(tmpDir, "nodejs-data.json");

// ── Ghi file ──
console.log("=== Ghi file ===");
fs.writeFileSync(testFile, "Hello, Node.js!\\nLine 2\\nLine 3", "utf8");
console.log("Ghi xong:", testFile);

// ── Đọc file ──
console.log("\\n=== Đọc file ===");
const content = fs.readFileSync(testFile, "utf8");
console.log("Nội dung:", content);
console.log("Số dòng:", content.split("\\n").length);

// ── Append ──
fs.appendFileSync(testFile, "\\nLine 4 (appended)");
const updated = fs.readFileSync(testFile, "utf8");
console.log("\\nSau khi append:", updated);

// ── JSON file ──
console.log("\\n=== JSON file ===");
const data = { users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }], count: 2 };
fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), "utf8");
const loaded = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
console.log("JSON loaded:", loaded);

// ── File stats ──
const stats = fs.statSync(testFile);
console.log("\\nFile size:", stats.size, "bytes");
console.log("Modified:", stats.mtime.toISOString());

// Dọn dẹp
fs.unlinkSync(testFile);
fs.unlinkSync(jsonFile);
console.log("\\nĐã xóa file test.");
`,
    exercises: [
      {
        title: "Config file manager",
        description: "Tạo class ConfigManager đọc/ghi file JSON config, với get(key), set(key, value), và delete(key).",
        starterCode: `const fs = require("fs");
const os = require("os");
const path = require("path");

class ConfigManager {
  constructor(filePath) {
    this.filePath = filePath;
    // TODO: đọc file nếu tồn tại, ngược lại dùng {}
    this.data = {};
  }

  get(key) {
    // TODO: trả về giá trị theo key, hỗ trợ nested key "a.b.c"
  }

  set(key, value) {
    // TODO: set giá trị và lưu vào file
  }

  delete(key) {
    // TODO: xóa key và lưu vào file
  }

  _save() {
    // TODO: ghi this.data vào file dưới dạng JSON
  }
}

const configPath = path.join(os.tmpdir(), "test-config.json");
const cfg = new ConfigManager(configPath);

cfg.set("app.name", "MyApp");
cfg.set("app.port", 3000);
cfg.set("debug", true);

console.log("app.name:", cfg.get("app.name"));
console.log("app.port:", cfg.get("app.port"));
console.log("debug:", cfg.get("debug"));

cfg.delete("debug");
console.log("debug after delete:", cfg.get("debug"));

// Cleanup
fs.unlinkSync(configPath);
`,
        solution: `const fs = require("fs");
const os = require("os");
const path = require("path");

class ConfigManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : {};
  }

  get(key) {
    return key.split(".").reduce((obj, k) => obj?.[k], this.data);
  }

  set(key, value) {
    const keys = key.split(".");
    let obj = this.data;
    keys.slice(0, -1).forEach(k => {
      if (!obj[k] || typeof obj[k] !== "object") obj[k] = {};
      obj = obj[k];
    });
    obj[keys[keys.length - 1]] = value;
    this._save();
  }

  delete(key) {
    const keys = key.split(".");
    let obj = this.data;
    keys.slice(0, -1).forEach(k => { obj = obj?.[k]; });
    if (obj) delete obj[keys[keys.length - 1]];
    this._save();
  }

  _save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf8");
  }
}

const configPath = path.join(os.tmpdir(), "test-config.json");
const cfg = new ConfigManager(configPath);
cfg.set("app.name", "MyApp");
cfg.set("app.port", 3000);
cfg.set("debug", true);
console.log("app.name:", cfg.get("app.name"));
console.log("app.port:", cfg.get("app.port"));
console.log("debug:", cfg.get("debug"));
cfg.delete("debug");
console.log("debug after delete:", cfg.get("debug"));
fs.unlinkSync(configPath);
`,
        hint: "Dùng reduce() để traverse nested keys. Khi set nested key, tạo object trung gian nếu chưa có.",
      },
      {
        title: "Log file analyzer",
        description: "Đọc log file (giả lập bằng string), đếm số ERROR/WARN/INFO, và lấy 3 lỗi gần nhất.",
        starterCode: `const fs = require("fs");
const os = require("os");
const path = require("path");

// Giả lập file log
const LOG_CONTENT = \`
2024-01-15 10:00:01 INFO Server started
2024-01-15 10:01:23 INFO User Alice logged in
2024-01-15 10:02:45 WARN High memory usage: 85%
2024-01-15 10:03:12 ERROR Database connection failed
2024-01-15 10:03:15 INFO Retrying connection...
2024-01-15 10:04:00 ERROR Timeout after 5000ms
2024-01-15 10:05:00 WARN Slow query: 2500ms
2024-01-15 10:06:00 ERROR Unhandled exception in /api/users
2024-01-15 10:07:00 INFO Recovery successful
\`.trim();

function analyzeLog(content) {
  const lines = content.split("\\n");
  // TODO: trả về { total, counts: {INFO, WARN, ERROR}, recentErrors: [] (3 dòng ERROR gần nhất) }
}

const logFile = path.join(os.tmpdir(), "test.log");
fs.writeFileSync(logFile, LOG_CONTENT);
const result = analyzeLog(fs.readFileSync(logFile, "utf8"));
console.log(result);
fs.unlinkSync(logFile);
`,
        solution: `const fs = require("fs");
const os = require("os");
const path = require("path");

const LOG_CONTENT = \`2024-01-15 10:00:01 INFO Server started
2024-01-15 10:01:23 INFO User Alice logged in
2024-01-15 10:02:45 WARN High memory usage: 85%
2024-01-15 10:03:12 ERROR Database connection failed
2024-01-15 10:03:15 INFO Retrying connection...
2024-01-15 10:04:00 ERROR Timeout after 5000ms
2024-01-15 10:05:00 WARN Slow query: 2500ms
2024-01-15 10:06:00 ERROR Unhandled exception in /api/users
2024-01-15 10:07:00 INFO Recovery successful\`;

function analyzeLog(content) {
  const lines = content.split("\\n").filter(Boolean);
  const counts = { INFO: 0, WARN: 0, ERROR: 0 };
  const recentErrors = [];
  for (const line of lines) {
    for (const level of ["INFO", "WARN", "ERROR"]) {
      if (line.includes(" " + level + " ")) { counts[level]++; break; }
    }
    if (line.includes(" ERROR ")) recentErrors.push(line);
  }
  return { total: lines.length, counts, recentErrors: recentErrors.slice(-3) };
}

const logFile = path.join(os.tmpdir(), "test.log");
fs.writeFileSync(logFile, LOG_CONTENT);
const result = analyzeLog(fs.readFileSync(logFile, "utf8"));
console.log(result);
fs.unlinkSync(logFile);
`,
        hint: "Split theo \\n, dùng includes() để check level. slice(-3) lấy 3 phần tử cuối.",
      },
      {
        title: "CSV parser",
        description: "Đọc dữ liệu CSV từ string, parse thành array of objects dùng header row đầu tiên làm keys.",
        starterCode: `// CSV data
const CSV = \`id,name,email,age,city
1,Alice,alice@example.com,28,Hanoi
2,Bob,bob@example.com,35,HCMC
3,Charlie,charlie@example.com,22,Danang
4,Diana,diana@example.com,31,Hanoi
\`;

function parseCSV(csvString) {
  // TODO: parse CSV thành mảng objects
  // Dòng 1 là header (keys), các dòng sau là data
  // age convert sang number
}

function filterByCity(data, city) {
  // TODO: lọc theo city (case-insensitive)
}

const data = parseCSV(CSV);
console.log("All users:", data);
console.log("\\nHanoi users:", filterByCity(data, "hanoi"));
console.log("\\nAvg age:", data.reduce((s, u) => s + u.age, 0) / data.length);
`,
        solution: `const CSV = \`id,name,email,age,city
1,Alice,alice@example.com,28,Hanoi
2,Bob,bob@example.com,35,HCMC
3,Charlie,charlie@example.com,22,Danang
4,Diana,diana@example.com,31,Hanoi
\`;

function parseCSV(csvString) {
  const lines = csvString.trim().split("\\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = h === "age" || h === "id" ? Number(values[i]) : values[i];
    });
    return obj;
  });
}

function filterByCity(data, city) {
  return data.filter(u => u.city.toLowerCase() === city.toLowerCase());
}

const data = parseCSV(CSV);
console.log("All users:", data);
console.log("\\nHanoi users:", filterByCity(data, "hanoi"));
console.log("\\nAvg age:", data.reduce((s, u) => s + u.age, 0) / data.length);
`,
        hint: "Split theo \\n lấy lines, dòng đầu là headers, dùng map() + split(',') cho mỗi data line.",
      },
      {
        title: "Directory scanner",
        description: "Tạo hàm scanDir() dùng fs.readdirSync và fs.statSync để đệ quy liệt kê files với size.",
        starterCode: `const fs = require("fs");
const path = require("path");
const os = require("os");

// Tạo cấu trúc thư mục test
const root = path.join(os.tmpdir(), "scan-test");
fs.mkdirSync(path.join(root, "src"), { recursive: true });
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "package.json"), '{"name":"test"}');
fs.writeFileSync(path.join(root, "src", "index.js"), "console.log('hi')");
fs.writeFileSync(path.join(root, "src", "utils.js"), "// utils");
fs.writeFileSync(path.join(root, "dist", "bundle.js"), "// bundle");

function scanDir(dirPath, indent = 0) {
  // TODO: in cây thư mục kiểu:
  // scan-test/
  //   package.json (13 bytes)
  //   src/
  //     index.js (18 bytes)
  //     utils.js (7 bytes)
  //   dist/
  //     bundle.js (8 bytes)
}

scanDir(root);

// Cleanup
fs.rmSync(root, { recursive: true });
`,
        solution: `const fs = require("fs");
const path = require("path");
const os = require("os");

const root = path.join(os.tmpdir(), "scan-test");
fs.mkdirSync(path.join(root, "src"), { recursive: true });
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "package.json"), '{"name":"test"}');
fs.writeFileSync(path.join(root, "src", "index.js"), "console.log('hi')");
fs.writeFileSync(path.join(root, "src", "utils.js"), "// utils");
fs.writeFileSync(path.join(root, "dist", "bundle.js"), "// bundle");

function scanDir(dirPath, indent = 0) {
  const name = path.basename(dirPath);
  const pad = "  ".repeat(indent);
  const stats = fs.statSync(dirPath);
  if (stats.isDirectory()) {
    console.log(pad + name + "/");
    fs.readdirSync(dirPath).sort().forEach(item => {
      scanDir(path.join(dirPath, item), indent + 1);
    });
  } else {
    console.log(pad + name + " (" + stats.size + " bytes)");
  }
}

scanDir(root);
fs.rmSync(root, { recursive: true });
`,
        hint: "Dùng stats.isDirectory() để kiểm tra là thư mục hay file. Đệ quy vào từng mục con.",
      },
      {
        title: "File watcher simulation",
        description: "Simulate file watching: kiểm tra file có thay đổi không bằng cách so sánh mtime và hash nội dung.",
        starterCode: `const fs = require("fs");
const crypto = require("crypto");
const os = require("os");
const path = require("path");

function getFileHash(filePath) {
  // TODO: đọc file và trả về sha256 hash của nội dung
}

function watchFile(filePath, onChanged) {
  let lastHash = getFileHash(filePath);
  let lastMtime = fs.statSync(filePath).mtimeMs;

  // Simulate kiểm tra định kỳ (không thực sự watch)
  return function check() {
    // TODO: so sánh mtime và hash, nếu thay đổi gọi onChanged(oldHash, newHash)
    // Cập nhật lastHash và lastMtime nếu có thay đổi
  };
}

const testFile = path.join(os.tmpdir(), "watch-test.txt");
fs.writeFileSync(testFile, "version 1");

const check = watchFile(testFile, (oldH, newH) => {
  console.log("File đã thay đổi!");
  console.log("Old hash:", oldH.slice(0, 8) + "...");
  console.log("New hash:", newH.slice(0, 8) + "...");
});

check(); // lần 1: không thay đổi
fs.writeFileSync(testFile, "version 2");
check(); // lần 2: có thay đổi
check(); // lần 3: không thay đổi

fs.unlinkSync(testFile);
`,
        solution: `const fs = require("fs");
const crypto = require("crypto");
const os = require("os");
const path = require("path");

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

function watchFile(filePath, onChanged) {
  let lastHash = getFileHash(filePath);
  return function check() {
    const newHash = getFileHash(filePath);
    if (newHash !== lastHash) {
      onChanged(lastHash, newHash);
      lastHash = newHash;
    } else {
      console.log("Không có thay đổi.");
    }
  };
}

const testFile = path.join(os.tmpdir(), "watch-test.txt");
fs.writeFileSync(testFile, "version 1");
const check = watchFile(testFile, (oldH, newH) => {
  console.log("File đã thay đổi!");
  console.log("Old:", oldH.slice(0, 8) + "...");
  console.log("New:", newH.slice(0, 8) + "...");
});
check();
fs.writeFileSync(testFile, "version 2");
check();
check();
fs.unlinkSync(testFile);
`,
        hint: "Hash nội dung file rồi so sánh. Nếu hash khác nhau nghĩa là file thay đổi.",
      },
    ],
    playgrounds: [
      {
        title: "JSON database đơn giản",
        description: "Xây dựng một mini database dùng file JSON. Thêm user, tìm kiếm, cập nhật, xóa. Chạy và xem kết quả!",
        starterCode: `const fs = require("fs");
const os = require("os");
const path = require("path");

const DB_FILE = path.join(os.tmpdir(), "mini-db.json");

// Khởi tạo DB
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }));
}

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Thêm users
function addUser(name, email) {
  const db = readDB();
  const user = { id: Date.now(), name, email, createdAt: new Date().toISOString() };
  db.users.push(user);
  writeDB(db);
  return user;
}

// Thêm dữ liệu mẫu
addUser("Alice", "alice@example.com");
addUser("Bob", "bob@example.com");
addUser("Charlie", "charlie@example.com");

// Đọc và hiển thị
const db = readDB();
console.log("All users:", db.users);

// Tự thêm tính năng: findByName, updateEmail, deleteUser...

// Cleanup
fs.unlinkSync(DB_FILE);
`,
        hint: "Tạo thêm hàm findByEmail(email), updateUser(id, data), deleteUser(id).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "04-events-async",
    title: "Events & Async Programming",
    description: "EventEmitter, Callbacks, Promises, async/await",
    level: "Trung cấp",
    content: `
## EventEmitter

Node.js dùng pattern **Observer/EventEmitter** cho mọi thứ bất đồng bộ (HTTP, Stream, fs...).

\`\`\`javascript
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// Lắng nghe sự kiện
emitter.on("data", (message) => {
  console.log("Received:", message);
});

// Chỉ nghe một lần
emitter.once("connect", () => console.log("Connected!"));

// Phát sự kiện
emitter.emit("data", "Hello World");
emitter.emit("connect"); // in "Connected!"
emitter.emit("connect"); // bị ignore (once)
\`\`\`

## Callbacks → Promises → async/await

### Callback style (cũ, tránh dùng)
\`\`\`javascript
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) return handleError(err);
  processData(data, (err2, result) => {
    // callback hell...
  });
});
\`\`\`

### Promise style
\`\`\`javascript
fs.promises.readFile("data.txt", "utf8")
  .then(data => processData(data))
  .then(result => console.log(result))
  .catch(err => console.error(err));
\`\`\`

### async/await (khuyên dùng)
\`\`\`javascript
async function main() {
  try {
    const data = await fs.promises.readFile("data.txt", "utf8");
    const result = await processData(data);
    console.log(result);
  } catch (err) {
    console.error("Error:", err);
  }
}
\`\`\`

## Promise utilities

\`\`\`javascript
// Chạy song song
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
]);

// Race condition — lấy cái xong trước
const fastest = await Promise.race([api1(), api2(), api3()]);

// Đợi tất cả, kể cả reject
const results = await Promise.allSettled([p1(), p2(), p3()]);
\`\`\`
`,
    codeExample: `const { EventEmitter } = require("events");

// ── Custom EventEmitter ──
class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
    this.running = false;
  }

  add(name, fn) {
    this.tasks.push({ name, fn });
    this.emit("task:added", name);
    if (!this.running) this._run();
  }

  async _run() {
    this.running = true;
    while (this.tasks.length > 0) {
      const { name, fn } = this.tasks.shift();
      this.emit("task:start", name);
      try {
        const result = await fn();
        this.emit("task:done", name, result);
      } catch (err) {
        this.emit("task:error", name, err.message);
      }
    }
    this.running = false;
    this.emit("queue:empty");
  }
}

// Dùng TaskQueue
const queue = new TaskQueue();

queue.on("task:added", name => console.log("[+] Added:", name));
queue.on("task:start", name => console.log("[>] Running:", name));
queue.on("task:done", (name, result) => console.log("[✓] Done:", name, "->", result));
queue.on("task:error", (name, err) => console.log("[✗] Error:", name, err));
queue.on("queue:empty", () => console.log("Queue empty!"));

const delay = ms => new Promise(r => setTimeout(r, ms));

queue.add("fetch-users", async () => { await delay(50); return "3 users"; });
queue.add("send-email", async () => { await delay(30); return "email sent"; });
queue.add("cleanup", async () => { throw new Error("disk full"); });
queue.add("report", async () => { await delay(20); return "report ready"; });
`,
    exercises: [
      {
        title: "Promise.all parallel fetching",
        description: "Tạo hàm fetchUserData() chạy song song nhiều 'API calls' (simulate với delay) và trả về kết quả tổng hợp.",
        starterCode: `const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API calls
const api = {
  getUser: async (id) => { await delay(50); return { id, name: "User " + id }; },
  getPosts: async (userId) => { await delay(60); return [{ id: 1, title: "Post of " + userId }]; },
  getFollowers: async (userId) => { await delay(40); return userId * 10; },
};

async function fetchUserData(userId) {
  // TODO: fetch user, posts, và followers SONG SONG
  // Trả về { user, posts, followersCount, loadTime }
  const start = Date.now();
  // ...
}

fetchUserData(42).then(result => {
  console.log(result);
});
`,
        solution: `const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const api = {
  getUser: async (id) => { await delay(50); return { id, name: "User " + id }; },
  getPosts: async (userId) => { await delay(60); return [{ id: 1, title: "Post of " + userId }]; },
  getFollowers: async (userId) => { await delay(40); return userId * 10; },
};

async function fetchUserData(userId) {
  const start = Date.now();
  const [user, posts, followersCount] = await Promise.all([
    api.getUser(userId),
    api.getPosts(userId),
    api.getFollowers(userId),
  ]);
  return { user, posts, followersCount, loadTime: Date.now() - start + "ms" };
}

fetchUserData(42).then(result => console.log(result));
`,
        hint: "Promise.all nhận array of promises, chạy song song. Destructuring để lấy kết quả.",
      },
      {
        title: "Custom EventEmitter - Chat Room",
        description: "Tạo ChatRoom class extends EventEmitter với join, leave, message. Track online users.",
        starterCode: `const { EventEmitter } = require("events");

class ChatRoom extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.users = new Set();
  }

  join(username) {
    // TODO: thêm user vào Set, emit "join" event với {username, usersOnline}
  }

  leave(username) {
    // TODO: xóa user, emit "leave" event
  }

  sendMessage(from, text) {
    // TODO: nếu user chưa join, throw Error
    // emit "message" với {from, text, timestamp: new Date().toISOString()}
  }
}

const room = new ChatRoom("General");

room.on("join", ({ username, usersOnline }) =>
  console.log(\`[\${room.name}] \${username} joined. Online: \${usersOnline}\`));
room.on("leave", ({ username }) =>
  console.log(\`[\${room.name}] \${username} left\`));
room.on("message", ({ from, text }) =>
  console.log(\`[\${room.name}] \${from}: \${text}\`));

room.join("Alice");
room.join("Bob");
room.sendMessage("Alice", "Hello everyone!");
room.sendMessage("Bob", "Hi Alice!");
room.leave("Alice");

try {
  room.sendMessage("Alice", "Can I still chat?");
} catch (e) {
  console.log("Error:", e.message);
}
`,
        solution: `const { EventEmitter } = require("events");

class ChatRoom extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.users = new Set();
  }
  join(username) {
    this.users.add(username);
    this.emit("join", { username, usersOnline: this.users.size });
  }
  leave(username) {
    this.users.delete(username);
    this.emit("leave", { username });
  }
  sendMessage(from, text) {
    if (!this.users.has(from)) throw new Error(from + " chưa join room");
    this.emit("message", { from, text, timestamp: new Date().toISOString() });
  }
}

const room = new ChatRoom("General");
room.on("join", ({ username, usersOnline }) =>
  console.log(\`[\${room.name}] \${username} joined. Online: \${usersOnline}\`));
room.on("leave", ({ username }) =>
  console.log(\`[\${room.name}] \${username} left\`));
room.on("message", ({ from, text }) =>
  console.log(\`[\${room.name}] \${from}: \${text}\`));
room.join("Alice");
room.join("Bob");
room.sendMessage("Alice", "Hello everyone!");
room.sendMessage("Bob", "Hi Alice!");
room.leave("Alice");
try { room.sendMessage("Alice", "Can I still chat?"); }
catch (e) { console.log("Error:", e.message); }
`,
        hint: "this.users là Set để track online users. Dùng has() để kiểm tra user đã join chưa.",
      },
      {
        title: "Retry với exponential backoff",
        description: "Tạo hàm retry(fn, maxAttempts, baseDelay) tự động thử lại khi fail, tăng delay theo cấp số nhân.",
        starterCode: `const delay = ms => new Promise(r => setTimeout(r, ms));

// Simulate API call thất bại 70% lần đầu
let attempts = 0;
async function unreliableAPI() {
  attempts++;
  await delay(10);
  if (attempts < 3) throw new Error(\`Attempt \${attempts} failed\`);
  return { data: "success!", attempts };
}

async function retry(fn, maxAttempts = 5, baseDelay = 100) {
  // TODO: thử gọi fn()
  // Nếu fail: đợi baseDelay * 2^attempt ms rồi thử lại
  // Nếu hết lượt: throw error
  // Log mỗi lần retry
}

retry(unreliableAPI, 5, 20)
  .then(result => console.log("Success:", result))
  .catch(err => console.log("Failed after all retries:", err.message));
`,
        solution: `const delay = ms => new Promise(r => setTimeout(r, ms));
let attempts = 0;
async function unreliableAPI() {
  attempts++;
  await delay(10);
  if (attempts < 3) throw new Error(\`Attempt \${attempts} failed\`);
  return { data: "success!", attempts };
}

async function retry(fn, maxAttempts = 5, baseDelay = 100) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === maxAttempts - 1) throw err;
      const waitMs = baseDelay * Math.pow(2, i);
      console.log(\`Retry \${i + 1}/\${maxAttempts - 1} sau \${waitMs}ms: \${err.message}\`);
      await delay(waitMs);
    }
  }
}

retry(unreliableAPI, 5, 20)
  .then(result => console.log("Success:", result))
  .catch(err => console.log("Failed:", err.message));
`,
        hint: "Dùng for loop với try/catch. delay = baseDelay * 2^i. Throw error khi i === maxAttempts-1.",
      },
      {
        title: "Pipeline async functions",
        description: "Tạo hàm asyncPipeline() nhận data và array functions async, chạy lần lượt, truyền kết quả qua nhau.",
        starterCode: `const delay = ms => new Promise(r => setTimeout(r, ms));

// Pipeline steps
const steps = [
  async (text) => { await delay(10); return text.trim(); },
  async (text) => { await delay(10); return text.toLowerCase(); },
  async (text) => { await delay(10); return text.replace(/\\s+/g, "-"); },
  async (slug) => { await delay(10); return { slug, url: "/posts/" + slug, createdAt: new Date().toISOString() }; },
];

async function asyncPipeline(input, fns) {
  // TODO: chạy từng fn với kết quả của fn trước đó
  // Trả về kết quả cuối cùng
}

asyncPipeline("  Hello World  from Node.js  ", steps)
  .then(result => console.log("Result:", result));

// Expected slug: "hello-world-from-node.js"
`,
        solution: `const delay = ms => new Promise(r => setTimeout(r, ms));
const steps = [
  async (text) => { await delay(10); return text.trim(); },
  async (text) => { await delay(10); return text.toLowerCase(); },
  async (text) => { await delay(10); return text.replace(/\\s+/g, "-"); },
  async (slug) => { await delay(10); return { slug, url: "/posts/" + slug, createdAt: new Date().toISOString() }; },
];

async function asyncPipeline(input, fns) {
  let result = input;
  for (const fn of fns) {
    result = await fn(result);
  }
  return result;
}

asyncPipeline("  Hello World  from Node.js  ", steps)
  .then(result => console.log("Result:", result));
`,
        hint: "Dùng for...of với await mỗi function. result = await fn(result) để chain.",
      },
      {
        title: "Throttle & Debounce",
        description: "Implement throttle(fn, limit) và debounce(fn, delay) — hai pattern quan trọng trong Node.js app.",
        starterCode: `const delay = ms => new Promise(r => setTimeout(r, ms));

function throttle(fn, limitMs) {
  // TODO: fn chỉ được gọi tối đa 1 lần mỗi limitMs
  // Các lần gọi trong thời gian chờ bị bỏ qua
}

function debounce(fn, delayMs) {
  // TODO: fn chỉ chạy sau delayMs kể từ lần gọi cuối
  // Mỗi lần gọi mới reset timer
}

// Test throttle
const throttled = throttle((n) => console.log("Throttle:", n), 100);
throttled(1); throttled(2); throttled(3); // chỉ "1" chạy
setTimeout(() => throttled(4), 150); // "4" chạy sau 150ms

// Test debounce
const debounced = debounce((text) => console.log("Debounce:", text), 80);
debounced("a"); debounced("ab"); debounced("abc"); // chỉ "abc" chạy
`,
        solution: `function throttle(fn, limitMs) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limitMs) {
      lastCall = now;
      fn(...args);
    }
  };
}

function debounce(fn, delayMs) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

const throttled = throttle((n) => console.log("Throttle:", n), 100);
throttled(1); throttled(2); throttled(3);
setTimeout(() => throttled(4), 150);

const debounced = debounce((text) => console.log("Debounce:", text), 80);
debounced("a"); debounced("ab"); debounced("abc");
`,
        hint: "Throttle: lưu lastCall timestamp, so sánh với Date.now(). Debounce: clearTimeout rồi setTimeout mới.",
      },
    ],
    playgrounds: [
      {
        title: "Build your own Promise",
        description: "Tự implement một mini Promise class từ đầu để hiểu cách Promise hoạt động bên trong!",
        starterCode: `// Implement mini Promise!
class MiniPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.callbacks.forEach(cb => cb.onFulfilled?.(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = reason;
      this.callbacks.forEach(cb => cb.onRejected?.(reason));
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    // Thêm callback
    if (this.state === "fulfilled") onFulfilled?.(this.value);
    else if (this.state === "rejected") onRejected?.(this.value);
    else this.callbacks.push({ onFulfilled, onRejected });
    return this;
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}

// Test
new MiniPromise((resolve) => {
  setTimeout(() => resolve(42), 50);
}).then(val => console.log("Resolved:", val));

new MiniPromise((_, reject) => {
  setTimeout(() => reject("Something failed"), 30);
}).catch(err => console.log("Rejected:", err));

console.log("This runs first!");
`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "05-http-express",
    title: "HTTP Server & Express.js",
    description: "Tạo HTTP server, routing, middleware, REST API với Express",
    level: "Trung cấp",
    content: `
## HTTP Module thuần

\`\`\`javascript
const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Set response headers
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  if (url === "/api/users" && method === "GET") {
    res.end(JSON.stringify({ users: [] }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(3000, () => console.log("Server on port 3000"));
\`\`\`

## Express.js — Framework phổ biến nhất

\`\`\`bash
npm install express
\`\`\`

\`\`\`javascript
const express = require("express");
const app = express();

// Middleware
app.use(express.json());           // Parse JSON body
app.use(express.urlencoded());     // Parse form data
app.use(cors());                   // Allow CORS

// Routes
app.get("/api/users", (req, res) => {
  res.json({ users: [] });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: 1, name, email });
});

app.listen(3000);
\`\`\`

## Middleware Pattern

\`\`\`javascript
// Custom middleware
function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url} - \${Date.now()}\`);
  next(); // Quan trọng: gọi next để đến middleware tiếp theo
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  req.user = verifyToken(token); // Gắn thông tin user vào req
  next();
}

app.use(logger);
app.use("/api/protected", authMiddleware);
\`\`\`

## Router

\`\`\`javascript
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

app.use("/api/users", router);
\`\`\`
`,
    codeExample: `// Simulate Express-style request/response handling
// (không cần cài Express, chạy được trong Node.js thuần)

// Mini router implementation
function createRouter() {
  const routes = [];

  const addRoute = (method, path, handler) => {
    const pattern = path.replace(/:([^/]+)/g, "([^/]+)");
    const paramNames = (path.match(/:([^/]+)/g) || []).map(p => p.slice(1));
    routes.push({ method, pattern: new RegExp("^" + pattern + "$"), paramNames, handler });
  };

  return {
    get: (path, fn) => addRoute("GET", path, fn),
    post: (path, fn) => addRoute("POST", path, fn),
    put: (path, fn) => addRoute("PUT", path, fn),
    delete: (path, fn) => addRoute("DELETE", path, fn),

    handle(method, url, body = null) {
      for (const route of routes) {
        if (route.method !== method) continue;
        const match = url.match(route.pattern);
        if (!match) continue;

        const params = {};
        route.paramNames.forEach((name, i) => { params[name] = match[i + 1]; });

        const req = { method, url, params, body };
        const responses = [];
        const res = {
          json: (data) => responses.push({ status: 200, body: data }),
          status: (code) => ({ json: (data) => responses.push({ status: code, body: data }) }),
        };
        route.handler(req, res);
        return responses[0] ?? { status: 404, body: { error: "Not found" } };
      }
      return { status: 404, body: { error: "Route not found" } };
    }
  };
}

// Sử dụng mini router
const router = createRouter();
const db = { users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }] };

router.get("/api/users", (req, res) => {
  res.json({ users: db.users, total: db.users.length });
});

router.get("/api/users/:id", (req, res) => {
  const user = db.users.find(u => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/api/users", (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  db.users.push(newUser);
  res.status(201).json(newUser);
});

// Test
console.log("GET /api/users:", JSON.stringify(router.handle("GET", "/api/users").body));
console.log("GET /api/users/1:", JSON.stringify(router.handle("GET", "/api/users/1").body));
console.log("GET /api/users/99:", JSON.stringify(router.handle("GET", "/api/users/99").body));
console.log("POST /api/users:", JSON.stringify(router.handle("POST", "/api/users", { name: "Charlie" }).body));
`,
    exercises: [
      {
        title: "Middleware chain",
        description: "Implement middleware pipeline: logger, auth, validate, handler. Mỗi middleware có thể dừng chain hoặc gọi next().",
        starterCode: `// Implement middleware pattern
function createApp() {
  const middlewares = [];

  return {
    use(fn) {
      // TODO: thêm middleware vào mảng
    },

    async handle(req) {
      // TODO: chạy từng middleware theo thứ tự
      // Mỗi middleware nhận (req, next) trong đó next gọi middleware tiếp theo
      // Nếu một middleware không gọi next -> dừng chain
    }
  };
}

const app = createApp();

app.use(async (req, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  await next();
});

app.use(async (req, next) => {
  if (!req.headers.auth) {
    req.response = { status: 401, body: { error: "Unauthorized" } };
    return; // Dừng chain
  }
  req.user = { id: 1, name: "Alice" };
  await next();
});

app.use(async (req, next) => {
  req.response = { status: 200, body: { message: "Hello " + req.user.name } };
});

// Test
async function test() {
  const r1 = await app.handle({ method: "GET", url: "/api/data", headers: {} });
  console.log("No auth:", r1);

  const r2 = await app.handle({ method: "GET", url: "/api/data", headers: { auth: "token123" } });
  console.log("With auth:", r2);
}
test();
`,
        solution: `function createApp() {
  const middlewares = [];
  return {
    use(fn) { middlewares.push(fn); },
    async handle(req) {
      let i = 0;
      const next = async () => {
        if (i < middlewares.length) {
          const fn = middlewares[i++];
          await fn(req, next);
        }
      };
      await next();
      return req.response ?? { status: 404, body: { error: "Not found" } };
    }
  };
}

const app = createApp();
app.use(async (req, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  await next();
});
app.use(async (req, next) => {
  if (!req.headers.auth) {
    req.response = { status: 401, body: { error: "Unauthorized" } };
    return;
  }
  req.user = { id: 1, name: "Alice" };
  await next();
});
app.use(async (req, next) => {
  req.response = { status: 200, body: { message: "Hello " + req.user.name } };
});

async function test() {
  const r1 = await app.handle({ method: "GET", url: "/api/data", headers: {} });
  console.log("No auth:", r1);
  const r2 = await app.handle({ method: "GET", url: "/api/data", headers: { auth: "token123" } });
  console.log("With auth:", r2);
}
test();
`,
        hint: "Dùng index i để track vị trí trong middleware array. next() gọi middleware[i++].",
      },
      {
        title: "Request validation middleware",
        description: "Tạo hàm validate(schema) trả về middleware kiểm tra req.body theo schema định nghĩa.",
        starterCode: `// Schema validation middleware
function validate(schema) {
  return function(req, next) {
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body?.[field];

      if (rules.required && (value === undefined || value === null || value === "")) {
        errors.push(\`\${field} là bắt buộc\`);
        continue;
      }

      // TODO: validate thêm các rules:
      // minLength: kiểm tra string.length >= minLength
      // maxLength: kiểm tra string.length <= maxLength
      // min: kiểm tra number >= min
      // max: kiểm tra number <= max
      // pattern: kiểm tra regex
      // type: kiểm tra typeof
    }

    if (errors.length > 0) {
      req.response = { status: 400, body: { errors } };
      return;
    }
    next?.();
  };
}

const userSchema = {
  name: { required: true, minLength: 2, maxLength: 50, type: "string" },
  email: { required: true, pattern: /^[^@]+@[^@]+\\.[^@]+$/ },
  age: { required: true, type: "number", min: 18, max: 100 },
};

const req1 = { body: { name: "A", email: "not-email", age: 15 } };
validate(userSchema)(req1, () => {});
console.log("Invalid:", req1.response.body.errors);

const req2 = { body: { name: "Alice", email: "alice@example.com", age: 25 } };
let called = false;
validate(userSchema)(req2, () => { called = true; });
console.log("Valid (next called):", called);
`,
        solution: `function validate(schema) {
  return function(req, next) {
    const errors = [];
    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body?.[field];
      if (rules.required && (value === undefined || value === null || value === "")) {
        errors.push(\`\${field} là bắt buộc\`); continue;
      }
      if (value === undefined) continue;
      if (rules.type && typeof value !== rules.type) errors.push(\`\${field} phải là \${rules.type}\`);
      if (rules.minLength && value.length < rules.minLength) errors.push(\`\${field} tối thiểu \${rules.minLength} ký tự\`);
      if (rules.maxLength && value.length > rules.maxLength) errors.push(\`\${field} tối đa \${rules.maxLength} ký tự\`);
      if (rules.min !== undefined && value < rules.min) errors.push(\`\${field} tối thiểu \${rules.min}\`);
      if (rules.max !== undefined && value > rules.max) errors.push(\`\${field} tối đa \${rules.max}\`);
      if (rules.pattern && !rules.pattern.test(value)) errors.push(\`\${field} không đúng định dạng\`);
    }
    if (errors.length > 0) { req.response = { status: 400, body: { errors } }; return; }
    next?.();
  };
}

const userSchema = {
  name: { required: true, minLength: 2, maxLength: 50, type: "string" },
  email: { required: true, pattern: /^[^@]+@[^@]+\\.[^@]+$/ },
  age: { required: true, type: "number", min: 18, max: 100 },
};

const req1 = { body: { name: "A", email: "not-email", age: 15 } };
validate(userSchema)(req1, () => {});
console.log("Invalid:", req1.response.body.errors);

const req2 = { body: { name: "Alice", email: "alice@example.com", age: 25 } };
let called = false;
validate(userSchema)(req2, () => { called = true; });
console.log("Valid:", called);
`,
        hint: "Iterate qua từng field trong schema, check từng rule, push vào errors array.",
      },
      {
        title: "Rate limiter",
        description: "Implement rate limiter middleware: mỗi IP được phép tối đa N requests trong M giây.",
        starterCode: `function createRateLimiter({ maxRequests = 5, windowMs = 1000 }) {
  const store = new Map(); // ip -> { count, resetTime }

  return function rateLimiter(req, next) {
    const ip = req.ip ?? "127.0.0.1";
    const now = Date.now();

    // TODO:
    // 1. Lấy hoặc tạo record cho IP
    // 2. Nếu đã qua windowMs, reset count
    // 3. Tăng count
    // 4. Nếu count > maxRequests: set req.response = 429 Too Many Requests
    // 5. Ngược lại: gọi next()
    // Set header X-RateLimit-Remaining vào req (simulate)
  };
}

const limiter = createRateLimiter({ maxRequests: 3, windowMs: 500 });

async function simulateRequests() {
  for (let i = 1; i <= 6; i++) {
    const req = { ip: "192.168.1.1", headers: {} };
    let status = 200;
    limiter(req, () => {});
    if (req.response) status = req.response.status;
    console.log(\`Request \${i}: \${status === 200 ? "OK" : "Rate limited (" + status + ")"}\`);
    if (i === 3) await new Promise(r => setTimeout(r, 600)); // reset window
  }
}

simulateRequests();
`,
        solution: `function createRateLimiter({ maxRequests = 5, windowMs = 1000 }) {
  const store = new Map();
  return function rateLimiter(req, next) {
    const ip = req.ip ?? "127.0.0.1";
    const now = Date.now();
    let record = store.get(ip);
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + windowMs };
      store.set(ip, record);
    }
    record.count++;
    if (record.count > maxRequests) {
      req.response = { status: 429, body: { error: "Too Many Requests" } };
    } else {
      req.remaining = maxRequests - record.count;
      next?.();
    }
  };
}

const limiter = createRateLimiter({ maxRequests: 3, windowMs: 500 });

async function simulateRequests() {
  for (let i = 1; i <= 6; i++) {
    const req = { ip: "192.168.1.1", headers: {} };
    let status = 200;
    limiter(req, () => {});
    if (req.response) status = req.response.status;
    console.log(\`Request \${i}: \${status === 200 ? "OK" : "Rate limited (" + status + ")"}\`);
    if (i === 3) await new Promise(r => setTimeout(r, 600));
  }
}
simulateRequests();
`,
        hint: "Dùng Map để lưu {count, resetTime} theo IP. Reset khi now > resetTime.",
      },
      {
        title: "REST response helpers",
        description: "Tạo object res với các helper: ok(), created(), badRequest(), unauthorized(), notFound(), serverError().",
        starterCode: `function createResponse() {
  const res = {
    _data: null,

    ok(data) {
      // TODO: status 200, body: { success: true, data }
    },
    created(data) {
      // TODO: status 201, body: { success: true, data }
    },
    badRequest(errors) {
      // TODO: status 400, body: { success: false, errors }
    },
    unauthorized(message = "Unauthorized") {
      // TODO: status 401
    },
    notFound(resource = "Resource") {
      // TODO: status 404, message: resource + " not found"
    },
    serverError(message = "Internal Server Error") {
      // TODO: status 500
    },

    toJSON() {
      return this._data;
    }
  };
  return res;
}

const res = createResponse();
console.log(res.ok({ users: ["Alice", "Bob"] }).toJSON());
console.log(res.created({ id: 1, name: "Alice" }).toJSON());
console.log(res.badRequest(["email invalid", "name required"]).toJSON());
console.log(res.notFound("User").toJSON());
console.log(res.unauthorized().toJSON());
`,
        solution: `function createResponse() {
  const res = {
    _data: null,
    _set(status, body) { this._data = { status, body }; return this; },
    ok(data) { return this._set(200, { success: true, data }); },
    created(data) { return this._set(201, { success: true, data }); },
    badRequest(errors) { return this._set(400, { success: false, errors }); },
    unauthorized(message = "Unauthorized") { return this._set(401, { success: false, message }); },
    notFound(resource = "Resource") { return this._set(404, { success: false, message: resource + " not found" }); },
    serverError(message = "Internal Server Error") { return this._set(500, { success: false, message }); },
    toJSON() { return this._data; }
  };
  return res;
}

const res = createResponse();
console.log(res.ok({ users: ["Alice", "Bob"] }).toJSON());
console.log(res.created({ id: 1, name: "Alice" }).toJSON());
console.log(res.badRequest(["email invalid", "name required"]).toJSON());
console.log(res.notFound("User").toJSON());
console.log(res.unauthorized().toJSON());
`,
        hint: "Tạo helper _set(status, body) để tránh lặp code. Mỗi method gọi _set rồi return this để chain.",
      },
      {
        title: "In-memory CRUD store",
        description: "Tạo class Repository với findAll, findById, create, update, delete và phân trang.",
        starterCode: `class Repository {
  constructor(name) {
    this.name = name;
    this.items = [];
    this.nextId = 1;
  }

  findAll({ page = 1, limit = 10, filter = {} } = {}) {
    // TODO: lọc theo filter (Object.entries check từng key), phân trang
    // Trả về { data, total, page, totalPages }
  }

  findById(id) {
    // TODO: tìm theo id, trả về item hoặc null
  }

  create(data) {
    // TODO: tạo item mới với id tự tăng, createdAt timestamp
  }

  update(id, data) {
    // TODO: update item, thêm updatedAt
    // Trả về item đã update hoặc null nếu không tìm thấy
  }

  delete(id) {
    // TODO: xóa item, trả về true/false
  }
}

const users = new Repository("users");
users.create({ name: "Alice", city: "Hanoi", age: 28 });
users.create({ name: "Bob", city: "HCMC", age: 35 });
users.create({ name: "Charlie", city: "Hanoi", age: 22 });
users.create({ name: "Diana", city: "HCMC", age: 31 });

console.log("All:", users.findAll().data.map(u => u.name));
console.log("Hanoi:", users.findAll({ filter: { city: "Hanoi" } }).data.map(u => u.name));
console.log("Page 1 limit 2:", users.findAll({ limit: 2 }));

users.update(1, { age: 29 });
console.log("Updated Alice:", users.findById(1));

users.delete(2);
console.log("After delete Bob:", users.findAll().total);
`,
        solution: `class Repository {
  constructor(name) {
    this.name = name;
    this.items = [];
    this.nextId = 1;
  }
  findAll({ page = 1, limit = 10, filter = {} } = {}) {
    let data = this.items;
    for (const [k, v] of Object.entries(filter)) {
      data = data.filter(item => item[k] === v);
    }
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    data = data.slice((page - 1) * limit, page * limit);
    return { data, total, page, totalPages };
  }
  findById(id) { return this.items.find(i => i.id === id) ?? null; }
  create(data) {
    const item = { id: this.nextId++, ...data, createdAt: new Date().toISOString() };
    this.items.push(item);
    return item;
  }
  update(id, data) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...data, updatedAt: new Date().toISOString() };
    return this.items[idx];
  }
  delete(id) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }
}

const users = new Repository("users");
users.create({ name: "Alice", city: "Hanoi", age: 28 });
users.create({ name: "Bob", city: "HCMC", age: 35 });
users.create({ name: "Charlie", city: "Hanoi", age: 22 });
users.create({ name: "Diana", city: "HCMC", age: 31 });
console.log("All:", users.findAll().data.map(u => u.name));
console.log("Hanoi:", users.findAll({ filter: { city: "Hanoi" } }).data.map(u => u.name));
console.log("Page 1 limit 2:", users.findAll({ limit: 2 }));
users.update(1, { age: 29 });
console.log("Updated Alice:", users.findById(1));
users.delete(2);
console.log("After delete:", users.findAll().total);
`,
        hint: "filter dùng Object.entries để check từng key. Phân trang: slice((page-1)*limit, page*limit).",
      },
    ],
    playgrounds: [
      {
        title: "Build a mini Express app",
        description: "Xây dựng một mini REST API simulation hoàn chỉnh: routes, middleware, và data. Thử thêm features!",
        starterCode: `// Mini Express simulation - thêm routes tùy ý!
class MiniExpress {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  use(fn) { this.middlewares.push(fn); }

  get(path, fn) { this.routes.push({ method: "GET", path, fn }); }
  post(path, fn) { this.routes.push({ method: "POST", path, fn }); }
  put(path, fn) { this.routes.push({ method: "PUT", path, fn }); }
  delete(path, fn) { this.routes.push({ method: "DELETE", path, fn }); }

  request(method, path, body = null) {
    const req = { method, path, body, params: {}, user: null };
    const res = { status: 200, data: null };
    const helpers = {
      json: (d) => { res.data = d; return helpers; },
      status: (s) => { res.status = s; return helpers; },
    };

    // Run middlewares
    for (const mw of this.middlewares) mw(req, helpers);

    // Match route
    for (const route of this.routes) {
      if (route.method !== method) continue;
      const pattern = route.path.replace(/:([^/]+)/g, "([^/]+)");
      const match = path.match(new RegExp("^" + pattern + "$"));
      if (match) {
        const names = (route.path.match(/:([^/]+)/g) || []).map(p => p.slice(1));
        names.forEach((n, i) => req.params[n] = match[i + 1]);
        route.fn(req, helpers);
        return res;
      }
    }
    return { status: 404, data: { error: "Not found" } };
  }
}

const app = new MiniExpress();
const db = { products: [{ id: 1, name: "Laptop", price: 999 }, { id: 2, name: "Mouse", price: 25 }] };

// Logger middleware
app.use((req, res) => console.log(\`> \${req.method} \${req.path}\`));

// Routes
app.get("/products", (req, res) => {
  res.json({ products: db.products, total: db.products.length });
});

app.get("/products/:id", (req, res) => {
  const product = db.products.find(p => p.id === +req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

// Test
console.log(app.request("GET", "/products").data);
console.log(app.request("GET", "/products/1").data);
console.log(app.request("GET", "/products/99").data);

// Thêm route POST /products, PUT /products/:id, DELETE /products/:id...
`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "06-rest-api-thuc-te",
    title: "REST API thực tế với Authentication",
    description: "JWT, bcrypt, CRUD hoàn chỉnh, error handling, API design",
    level: "Nâng cao",
    content: `
## REST API Design chuẩn

### Conventions

| Method | URL | Action |
|--------|-----|--------|
| GET | /api/users | Lấy danh sách |
| GET | /api/users/:id | Lấy chi tiết |
| POST | /api/users | Tạo mới |
| PUT | /api/users/:id | Cập nhật toàn bộ |
| PATCH | /api/users/:id | Cập nhật một phần |
| DELETE | /api/users/:id | Xóa |

### HTTP Status Codes quan trọng

- **200 OK** — Thành công
- **201 Created** — Tạo thành công
- **400 Bad Request** — Dữ liệu không hợp lệ
- **401 Unauthorized** — Chưa đăng nhập
- **403 Forbidden** — Không có quyền
- **404 Not Found** — Không tìm thấy
- **409 Conflict** — Trùng lặp (email đã tồn tại)
- **422 Unprocessable Entity** — Validation error
- **429 Too Many Requests** — Rate limited
- **500 Internal Server Error** — Lỗi server

## JWT Authentication

\`\`\`javascript
const crypto = require("crypto");

// Tạo JWT
function createJWT(payload, secret, expiresIn = 3600) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + expiresIn * 1000 })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(header + "." + body).digest("base64url");
  return header + "." + body + "." + signature;
}

// Verify JWT
function verifyJWT(token, secret) {
  const [header, body, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", secret).update(header + "." + body).digest("base64url");
  if (sig !== expected) throw new Error("Invalid signature");
  const payload = JSON.parse(Buffer.from(body, "base64url").toString());
  if (payload.exp < Date.now()) throw new Error("Token expired");
  return payload;
}
\`\`\`

## Error Handling Pattern

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Global error handler middleware (Express)
app.use((err, req, res, next) => {
  const status = err.statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";
  res.status(status).json({ success: false, error: message });
});
\`\`\`
`,
    codeExample: `const crypto = require("crypto");

// ── JWT implementation ──
const JWT_SECRET = "my-super-secret-key";

function base64url(str) {
  return Buffer.from(str).toString("base64url");
}

function createJWT(payload, secret = JWT_SECRET, expiresInSec = 3600) {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSec,
  }));
  const sig = crypto.createHmac("sha256", secret)
    .update(header + "." + body)
    .digest("base64url");
  return header + "." + body + "." + sig;
}

function verifyJWT(token, secret = JWT_SECRET) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token format");
  const [header, body, sig] = parts;
  const expected = crypto.createHmac("sha256", secret)
    .update(header + "." + body)
    .digest("base64url");
  if (sig !== expected) throw new Error("Invalid signature");
  const payload = JSON.parse(Buffer.from(body, "base64url").toString());
  if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error("Token expired");
  return payload;
}

// ── Simulate password hashing (với crypto) ──
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256").update(salt + password).digest("hex");
  return salt + ":" + hash;
}

function checkPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  return crypto.createHash("sha256").update(salt + password).digest("hex") === hash;
}

// ── Demo ──
const token = createJWT({ userId: 1, role: "admin", email: "admin@example.com" });
console.log("JWT:", token.slice(0, 60) + "...");

const payload = verifyJWT(token);
console.log("Payload:", payload);

const hashed = hashPassword("myPassword123");
console.log("\\nHashed:", hashed.slice(0, 30) + "...");
console.log("Check correct:", checkPassword("myPassword123", hashed));
console.log("Check wrong:", checkPassword("wrongPassword", hashed));
`,
    exercises: [
      {
        title: "JWT authentication system",
        description: "Hoàn thiện hệ thống auth với register, login, và authMiddleware dùng JWT.",
        starterCode: `const crypto = require("crypto");

// Helper functions
const JWT_SECRET = "secret-key-123";

function createJWT(payload) {
  const h = Buffer.from(JSON.stringify({alg:"HS256"})).toString("base64url");
  const b = Buffer.from(JSON.stringify({...payload, exp: Date.now() + 3600000})).toString("base64url");
  const s = crypto.createHmac("sha256", JWT_SECRET).update(h+"."+b).digest("base64url");
  return h+"."+b+"."+s;
}

function verifyJWT(token) {
  const [h,b,s] = token.split(".");
  const exp = crypto.createHmac("sha256", JWT_SECRET).update(h+"."+b).digest("base64url");
  if (s !== exp) throw new Error("Invalid token");
  const p = JSON.parse(Buffer.from(b, "base64url").toString());
  if (p.exp < Date.now()) throw new Error("Expired");
  return p;
}

// In-memory user store
const users = [];

function hashPwd(pwd) {
  const salt = crypto.randomBytes(8).toString("hex");
  const hash = crypto.createHash("sha256").update(salt+pwd).digest("hex");
  return salt+":"+hash;
}

function checkPwd(pwd, stored) {
  const [salt, hash] = stored.split(":");
  return crypto.createHash("sha256").update(salt+pwd).digest("hex") === hash;
}

// TODO: implement
function register(email, password) {
  // Kiểm tra email đã tồn tại chưa, nếu có throw Error
  // Hash password
  // Lưu user, trả về { id, email, createdAt }
}

function login(email, password) {
  // Tìm user theo email, nếu không có throw Error "User not found"
  // Verify password, nếu sai throw Error "Invalid password"
  // Tạo và trả về JWT token
}

function authMiddleware(token) {
  // Verify JWT, trả về payload
  // Nếu invalid throw Error
}

// Test
try {
  const user = register("alice@example.com", "password123");
  console.log("Registered:", user);

  const token = login("alice@example.com", "password123");
  console.log("Token:", token.slice(0, 40) + "...");

  const payload = authMiddleware(token);
  console.log("Authenticated as:", payload.email);

  login("alice@example.com", "wrongpass");
} catch (e) {
  console.log("Error:", e.message);
}
`,
        hint: "Register: check duplicate email, hashPwd, push to users array. Login: find user, checkPwd, createJWT({userId, email}).",
      },
      {
        title: "Full CRUD API với validation",
        description: "Tạo ProductAPI hoàn chỉnh với validate, CRUD, và response format chuẩn REST.",
        starterCode: `class ProductAPI {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  validate(data) {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) errors.push("name tối thiểu 2 ký tự");
    if (!data.price || typeof data.price !== "number" || data.price <= 0) errors.push("price phải > 0");
    if (!data.category) errors.push("category bắt buộc");
    if (data.stock !== undefined && (typeof data.stock !== "number" || data.stock < 0)) errors.push("stock không hợp lệ");
    return errors;
  }

  // TODO: Implement các methods sau theo chuẩn REST
  // Trả về { success, data } hoặc { success: false, errors/error }

  getAll({ page = 1, limit = 10, category, minPrice, maxPrice } = {}) { }

  getById(id) { }

  create(data) { }

  update(id, data) { }

  delete(id) { }

  getStats() {
    // Trả về { total, byCategory: {}, avgPrice, totalValue }
  }
}

const api = new ProductAPI();

// Test
api.create({ name: "Laptop", price: 999, category: "Electronics", stock: 10 });
api.create({ name: "Mouse", price: 25, category: "Electronics", stock: 50 });
api.create({ name: "Desk", price: 299, category: "Furniture", stock: 5 });

console.log("All:", JSON.stringify(api.getAll().data.map(p => p.name)));
console.log("Electronics:", JSON.stringify(api.getAll({ category: "Electronics" }).data.map(p => p.name)));
console.log("Stats:", api.getStats());

api.update(1, { price: 899, stock: 8 });
console.log("Updated:", api.getById(1));

api.delete(2);
console.log("Total after delete:", api.getAll().total);

console.log("Invalid:", api.create({ name: "X", price: -5 }));
`,
        hint: "getAll: filter theo category/minPrice/maxPrice, rồi paginate. Stats: dùng reduce để group byCategory.",
      },
      {
        title: "API response wrapper",
        description: "Tạo APIResponse class theo chuẩn JSON:API với data, meta, links, errors.",
        starterCode: `class APIResponse {
  constructor() {
    this.result = {};
  }

  success(data, { message, meta, page, limit, total } = {}) {
    // TODO: trả về this với result = {
    //   success: true,
    //   message: message || "Success",
    //   data,
    //   meta: { ...meta, timestamp: ISO string },
    //   links: page ? { self, prev, next, first, last } : undefined
    // }
    return this;
  }

  error(message, { errors, statusCode = 400 } = {}) {
    // TODO: result = { success: false, statusCode, message, errors }
    return this;
  }

  paginate(items, { page, limit, total, baseUrl = "/api" }) {
    // TODO: success() với meta có pagination và links cho prev/next
    return this;
  }

  toJSON() {
    return this.result;
  }
}

const res = new APIResponse();
console.log(res.success({ id: 1, name: "Alice" }, { message: "User created" }).toJSON());
console.log(res.error("Validation failed", { errors: ["email invalid", "name required"] }).toJSON());
console.log(res.paginate([1,2,3,4,5], { page: 2, limit: 5, total: 23, baseUrl: "/api/users" }).toJSON());
`,
        hint: "Links: prev = page > 1 ? baseUrl + '?page=' + (page-1) : null. last = Math.ceil(total/limit).",
      },
      {
        title: "Event-driven order system",
        description: "Tạo OrderSystem dùng EventEmitter để xử lý đơn hàng: create, pay, ship, deliver với state machine.",
        starterCode: `const { EventEmitter } = require("events");

const ORDER_STATES = {
  PENDING: "pending",
  PAID: "paid",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

const TRANSITIONS = {
  [ORDER_STATES.PENDING]: [ORDER_STATES.PAID, ORDER_STATES.CANCELLED],
  [ORDER_STATES.PAID]: [ORDER_STATES.PROCESSING, ORDER_STATES.CANCELLED],
  [ORDER_STATES.PROCESSING]: [ORDER_STATES.SHIPPED],
  [ORDER_STATES.SHIPPED]: [ORDER_STATES.DELIVERED],
  [ORDER_STATES.DELIVERED]: [],
  [ORDER_STATES.CANCELLED]: [],
};

class OrderSystem extends EventEmitter {
  constructor() {
    super();
    this.orders = new Map();
  }

  createOrder(items) {
    // TODO: tạo order với id, items, status: PENDING, total, createdAt
    // emit "order:created"
  }

  transition(orderId, newState) {
    // TODO: kiểm tra transition hợp lệ, cập nhật state, emit "order:state_changed"
    // Throw Error nếu transition không hợp lệ
  }

  pay(orderId) { this.transition(orderId, ORDER_STATES.PAID); }
  process(orderId) { this.transition(orderId, ORDER_STATES.PROCESSING); }
  ship(orderId, trackingNumber) {
    this.transition(orderId, ORDER_STATES.SHIPPED);
    const order = this.orders.get(orderId);
    if (order) order.trackingNumber = trackingNumber;
  }
  deliver(orderId) { this.transition(orderId, ORDER_STATES.DELIVERED); }
  cancel(orderId, reason) {
    this.transition(orderId, ORDER_STATES.CANCELLED);
    const order = this.orders.get(orderId);
    if (order) order.cancelReason = reason;
  }
}

const sys = new OrderSystem();
sys.on("order:created", o => console.log("Created:", o.id, o.total));
sys.on("order:state_changed", ({orderId, from, to}) =>
  console.log(\`Order \${orderId}: \${from} -> \${to}\`));

const order = sys.createOrder([
  { name: "Laptop", price: 999, qty: 1 },
  { name: "Mouse", price: 25, qty: 2 },
]);

sys.pay(order.id);
sys.process(order.id);
sys.ship(order.id, "VN123456789");
sys.deliver(order.id);

try {
  sys.cancel(order.id, "Changed mind");
} catch (e) {
  console.log("Error:", e.message);
}
`,
        hint: "Dùng TRANSITIONS[currentState].includes(newState) để validate. Total = items.reduce((s,i) => s + i.price*i.qty, 0).",
      },
      {
        title: "API caching layer",
        description: "Implement cache middleware với TTL, invalidation, và statistics.",
        starterCode: `class APICache {
  constructor(defaultTTL = 60000) {
    this.store = new Map(); // key -> { value, expiresAt, hits }
    this.defaultTTL = defaultTTL;
    this.stats = { hits: 0, misses: 0, evictions: 0 };
  }

  get(key) {
    // TODO: trả về value nếu còn valid, null nếu expired hoặc không có
    // Cập nhật stats và hits counter
  }

  set(key, value, ttl) {
    // TODO: lưu với expiresAt = Date.now() + (ttl || defaultTTL)
  }

  invalidate(pattern) {
    // TODO: xóa tất cả keys khớp pattern (string.includes hoặc regex)
  }

  wrap(key, fn, ttl) {
    // TODO: nếu có cache -> trả về cached
    // Không có -> gọi fn(), cache kết quả, trả về
  }

  getStats() {
    const total = this.stats.hits + this.stats.misses;
    return { ...this.stats, hitRate: total ? (this.stats.hits / total * 100).toFixed(1) + "%" : "0%" };
  }
}

const cache = new APICache(5000);

// Simulate expensive operation
let dbCalls = 0;
async function fetchFromDB(userId) {
  dbCalls++;
  await new Promise(r => setTimeout(r, 10));
  return { id: userId, name: "User " + userId, fetchedAt: Date.now() };
}

async function main() {
  // Gọi 3 lần nhưng chỉ 1 lần hit DB
  for (let i = 0; i < 3; i++) {
    const data = await cache.wrap("user:1", () => fetchFromDB(1));
    console.log("Call", i+1, "- DB calls:", dbCalls, "- from cache:", i > 0);
  }

  console.log("Stats:", cache.getStats());

  cache.invalidate("user:");
  const fresh = await cache.wrap("user:1", () => fetchFromDB(1));
  console.log("After invalidate - DB calls:", dbCalls);
}

main();
`,
        hint: "wrap(): get(key) trước, nếu null thì gọi await fn(), set kết quả, return. invalidate: xóa keys có includes(pattern).",
      },
    ],
    playgrounds: [
      {
        title: "Tự xây dựng mini backend",
        description: "Combine tất cả kiến thức: tạo một mini backend với auth, CRUD, cache, và validation. Thử nghiệm!",
        starterCode: `const crypto = require("crypto");
const { EventEmitter } = require("events");

// ── JWT helper ──
const SECRET = "my-secret";
const sign = (payload) => {
  const h = Buffer.from('{"alg":"HS256"}').toString("base64url");
  const b = Buffer.from(JSON.stringify({...payload, exp: Date.now()+3600000})).toString("base64url");
  const s = crypto.createHmac("sha256", SECRET).update(h+"."+b).digest("base64url");
  return h+"."+b+"."+s;
};
const verify = (token) => {
  const [h,b,s] = token.split(".");
  if (crypto.createHmac("sha256",SECRET).update(h+"."+b).digest("base64url") !== s) throw new Error("Invalid token");
  const p = JSON.parse(Buffer.from(b,"base64url").toString());
  if (p.exp < Date.now()) throw new Error("Expired");
  return p;
};

// ── Data store ──
const db = {
  users: [],
  posts: [],
  nextUserId: 1,
  nextPostId: 1,
};

// ── Events ──
const events = new EventEmitter();
events.on("user:register", u => console.log("[EVENT] New user:", u.email));
events.on("post:create", p => console.log("[EVENT] New post:", p.title));

// ── Auth ──
function register(email, password) {
  if (db.users.find(u => u.email === email)) throw new Error("Email exists");
  const salt = crypto.randomBytes(8).toString("hex");
  const hash = crypto.createHash("sha256").update(salt+password).digest("hex");
  const user = { id: db.nextUserId++, email, password: salt+":"+hash };
  db.users.push(user);
  events.emit("user:register", { id: user.id, email });
  return sign({ userId: user.id, email });
}

function login(email, password) {
  const user = db.users.find(u => u.email === email);
  if (!user) throw new Error("User not found");
  const [salt, hash] = user.password.split(":");
  if (crypto.createHash("sha256").update(salt+password).digest("hex") !== hash) throw new Error("Wrong password");
  return sign({ userId: user.id, email });
}

// ── Posts CRUD ──
function createPost(token, title, content) {
  const { userId, email } = verify(token);
  const post = { id: db.nextPostId++, title, content, authorId: userId, authorEmail: email, createdAt: new Date().toISOString() };
  db.posts.push(post);
  events.emit("post:create", post);
  return post;
}

function getPosts(token, { authorId } = {}) {
  verify(token); // auth required
  return authorId ? db.posts.filter(p => p.authorId === authorId) : db.posts;
}

// ── Demo ──
const token1 = register("alice@example.com", "pass123");
const token2 = register("bob@example.com", "pass456");

createPost(token1, "Hello Node.js", "My first post!");
createPost(token1, "Async/Await Tips", "Great patterns...");
createPost(token2, "Express Guide", "Building REST APIs...");

console.log("All posts:", getPosts(token1).map(p => p.title));
console.log("Alice posts:", getPosts(token2, { authorId: 1 }).map(p => p.title));

// Thêm: update post, delete post, search by title...
`,
      },
    ],
  },
];
