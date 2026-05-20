import type { Exercise, Playground, Lesson } from "@/data/typescript-lessons";

export { Exercise, Playground, Lesson };

export const nextjsLessons: Lesson[] = [
  // ─────────────────────────────────────────────
  {
    id: "01-gioi-thieu",
    title: "Giới thiệu Next.js & App Router",
    description: "Next.js là gì, App Router, cấu trúc project chuẩn",
    level: "Cơ bản",
    content: `
## Next.js là gì?

**Next.js** là React framework được xây dựng bởi Vercel, cung cấp mọi thứ cần thiết để làm fullstack app:

- **Server-side Rendering (SSR)** — render HTML trên server
- **Static Site Generation (SSG)** — pre-render lúc build time
- **App Router** — file-based routing với React Server Components
- **API Routes** — backend endpoint ngay trong project
- **Built-in optimizations** — Image, Font, Script tối ưu sẵn

## App Router vs Pages Router

\`\`\`
Next.js 13+: App Router (khuyên dùng)
Next.js <13:  Pages Router (cũ)
\`\`\`

### Cấu trúc thư mục App Router

\`\`\`
my-app/
├── src/
│   └── app/
│       ├── layout.tsx          ← Root layout (HTML wrapper)
│       ├── page.tsx            ← Trang / (home)
│       ├── globals.css
│       ├── about/
│       │   └── page.tsx        ← Trang /about
│       ├── blog/
│       │   ├── page.tsx        ← Trang /blog
│       │   └── [slug]/
│       │       └── page.tsx    ← Trang /blog/:slug
│       └── api/
│           └── users/
│               └── route.ts    ← API /api/users
├── public/                     ← Static files
└── package.json
\`\`\`

### Các file đặc biệt

| File | Mô tả |
|------|-------|
| \`page.tsx\` | UI của một route |
| \`layout.tsx\` | Layout bao quanh page |
| \`loading.tsx\` | Skeleton khi loading |
| \`error.tsx\` | Error boundary |
| \`not-found.tsx\` | 404 page |
| \`route.ts\` | API endpoint |

## Server Components vs Client Components

\`\`\`tsx
// Server Component (mặc định) — chạy trên server
// Có thể dùng async/await, truy cập DB trực tiếp
export default async function Page() {
  const data = await fetchFromDB(); // OK!
  return <div>{data.title}</div>;
}

// Client Component — chạy trên browser
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // OK!
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

### Khi nào dùng Client Component?

- Cần \`useState\`, \`useEffect\`, \`useReducer\`
- Cần event handlers (onClick, onChange...)
- Cần Browser APIs (localStorage, window...)
- Cần third-party libraries yêu cầu browser
`,
    codeExample: `// Simulate Next.js App Router patterns trong TypeScript thuần
// (không cần Next.js để chạy demo này)

// ── Page metadata system ──
interface Metadata {
  title: string;
  description?: string;
  openGraph?: { title: string; image?: string };
}

// Mô phỏng generateMetadata
async function generateMetadata(params: { slug: string }): Promise<Metadata> {
  // Trong Next.js thực tế: fetch data từ DB dựa vào params
  return {
    title: "Blog: " + params.slug,
    description: "Post about " + params.slug,
    openGraph: { title: "Blog: " + params.slug },
  };
}

// ── Route params pattern ──
interface PageProps {
  params: { slug: string };
  searchParams: { page?: string; q?: string };
}

async function BlogPostPage({ params, searchParams }: PageProps) {
  const meta = await generateMetadata(params);
  const page = Number(searchParams.page ?? 1);

  // Simulate data fetching
  const post = { title: meta.title, content: "Content of " + params.slug };
  return { ...post, page, metadata: meta };
}

// ── Layout composition ──
function RootLayout({ children }: { children: React.ReactNode }) {
  return \`<html><body><nav>Nav</nav>\${children}<footer>Footer</footer></body></html>\`;
}

// ── Demo ──
async function demo() {
  const result = await BlogPostPage({
    params: { slug: "nextjs-app-router" },
    searchParams: { page: "2" },
  });
  console.log("Page data:", result);

  const layout = RootLayout({ children: "<main>Page content</main>" });
  console.log("Layout:", layout.slice(0, 80) + "...");
}

demo();
`,
    exercises: [
      {
        title: "Route matcher",
        description: "Implement hàm matchRoute() giống Next.js: khớp URL với pattern có dynamic segments và catch-all.",
        starterCode: `// Next.js route patterns:
// /about           -> exact match
// /blog/[slug]     -> dynamic: { slug: "hello-world" }
// /shop/[...path]  -> catch-all: { path: ["shoes", "nike"] }
// /[[...path]]     -> optional catch-all

function matchRoute(pattern: string, url: string): Record<string, string | string[]> | null {
  // TODO: trả về params object nếu match, null nếu không
  // /blog/[slug] + /blog/hello -> { slug: "hello" }
  // /shop/[...path] + /shop/a/b/c -> { path: ["a","b","c"] }
  return null;
}

// Tests
console.log(matchRoute("/about", "/about"));              // {}
console.log(matchRoute("/about", "/contact"));            // null
console.log(matchRoute("/blog/[slug]", "/blog/hello-world")); // { slug: "hello-world" }
console.log(matchRoute("/blog/[slug]", "/blog"));         // null
console.log(matchRoute("/shop/[...path]", "/shop/shoes/nike")); // { path: ["shoes","nike"] }
console.log(matchRoute("/user/[id]/posts", "/user/42/posts")); // { id: "42" }
`,
        solution: `function matchRoute(pattern: string, url: string): Record<string, string | string[]> | null {
  const patternParts = pattern.split("/").filter(Boolean);
  const urlParts = url.split("/").filter(Boolean);
  const params: Record<string, string | string[]> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    if (pp.startsWith("[...") && pp.endsWith("]")) {
      const key = pp.slice(4, -1);
      params[key] = urlParts.slice(i);
      return params;
    }
    if (pp.startsWith("[") && pp.endsWith("]")) {
      if (i >= urlParts.length) return null;
      params[pp.slice(1, -1)] = urlParts[i];
    } else {
      if (urlParts[i] !== pp) return null;
    }
  }
  if (urlParts.length !== patternParts.length && !patternParts.some(p => p.startsWith("[..."))) return null;
  return params;
}

console.log(matchRoute("/about", "/about"));
console.log(matchRoute("/about", "/contact"));
console.log(matchRoute("/blog/[slug]", "/blog/hello-world"));
console.log(matchRoute("/blog/[slug]", "/blog"));
console.log(matchRoute("/shop/[...path]", "/shop/shoes/nike"));
console.log(matchRoute("/user/[id]/posts", "/user/42/posts"));
`,
        hint: "Split cả pattern và url theo '/'. Xử lý [param], [...param] riêng. Catch-all lấy phần còn lại của url.",
      },
      {
        title: "Metadata builder",
        description: "Tạo hàm buildMetadata() merge metadata của page với layout, với page ưu tiên hơn layout.",
        starterCode: `interface Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: { title?: string; description?: string; image?: string };
  robots?: string;
}

// Next.js merge metadata từ layout -> page (page override layout)
function buildMetadata(layouts: Metadata[], page: Metadata): Metadata {
  // TODO: deep merge từ trái sang phải
  // layouts[0] (root) -> layouts[1] (nested) -> page
  // Arrays: concat (không override)
  // Objects: deep merge
  // Primitives: sau override trước
  return {};
}

const rootLayout: Metadata = {
  title: "My App",
  description: "Default description",
  keywords: ["app"],
  robots: "index,follow",
};

const blogLayout: Metadata = {
  title: "Blog | My App",
  keywords: ["blog"],
};

const postPage: Metadata = {
  title: "How to use Next.js | Blog",
  description: "Learn Next.js App Router",
  openGraph: { title: "How to use Next.js", image: "/og.jpg" },
};

const result = buildMetadata([rootLayout, blogLayout], postPage);
console.log(result);
`,
        solution: `interface Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: { title?: string; description?: string; image?: string };
  robots?: string;
}

function deepMerge(target: any, source: any): any {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key]) && Array.isArray(target[key])) {
      result[key] = [...target[key], ...source[key]];
    } else if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function buildMetadata(layouts: Metadata[], page: Metadata): Metadata {
  return [...layouts, page].reduce((acc, meta) => deepMerge(acc, meta), {} as Metadata);
}

const rootLayout: Metadata = { title: "My App", description: "Default description", keywords: ["app"], robots: "index,follow" };
const blogLayout: Metadata = { title: "Blog | My App", keywords: ["blog"] };
const postPage: Metadata = { title: "How to use Next.js | Blog", description: "Learn Next.js App Router", openGraph: { title: "How to use Next.js", image: "/og.jpg" } };

const result = buildMetadata([rootLayout, blogLayout], postPage);
console.log(result);
`,
        hint: "deepMerge: arrays concat, objects recurse, primitives override. Dùng reduce để merge lần lượt.",
      },
      {
        title: "generateStaticParams",
        description: "Implement hàm tương tự generateStaticParams để pre-compute tất cả dynamic routes.",
        starterCode: `// Simulate data source
const posts = [
  { slug: "nextjs-intro", category: "framework", lang: "vi" },
  { slug: "react-hooks", category: "react", lang: "vi" },
  { slug: "typescript-tips", category: "typescript", lang: "en" },
];

const categories = ["framework", "react", "typescript"];

// Trong Next.js:
// export async function generateStaticParams() {
//   return posts.map(p => ({ slug: p.slug }));
// }

// Task: tạo các hàm generate params cho từng route pattern
function paramsForBlogSlug(): Array<{ slug: string }> {
  // TODO: generate params cho /blog/[slug]
  return [];
}

function paramsForCategoryPost(): Array<{ category: string; slug: string }> {
  // TODO: generate params cho /[category]/[slug]
  return [];
}

function paramsForLangPost(): Array<{ lang: string; slug: string }> {
  // TODO: generate params cho /[lang]/blog/[slug]
  return [];
}

console.log("/blog/[slug]:", paramsForBlogSlug());
console.log("/[cat]/[slug]:", paramsForCategoryPost());
console.log("/[lang]/blog/[slug]:", paramsForLangPost());
`,
        solution: `const posts = [
  { slug: "nextjs-intro", category: "framework", lang: "vi" },
  { slug: "react-hooks", category: "react", lang: "vi" },
  { slug: "typescript-tips", category: "typescript", lang: "en" },
];

function paramsForBlogSlug() {
  return posts.map(p => ({ slug: p.slug }));
}

function paramsForCategoryPost() {
  return posts.map(p => ({ category: p.category, slug: p.slug }));
}

function paramsForLangPost() {
  return posts.map(p => ({ lang: p.lang, slug: p.slug }));
}

console.log("/blog/[slug]:", paramsForBlogSlug());
console.log("/[cat]/[slug]:", paramsForCategoryPost());
console.log("/[lang]/blog/[slug]:", paramsForLangPost());
`,
        hint: "Đơn giản là map qua posts và pick đúng fields cần thiết cho mỗi route pattern.",
      },
      {
        title: "Breadcrumb từ pathname",
        description: "Tạo hàm generateBreadcrumbs() từ URL pathname, trả về array {label, href}.",
        starterCode: `// /shop/electronics/laptops ->
//   [{ label: "Home", href: "/" },
//    { label: "Shop", href: "/shop" },
//    { label: "Electronics", href: "/shop/electronics" },
//    { label: "Laptops", href: "/shop/electronics/laptops" }]

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

function generateBreadcrumbs(pathname: string): Array<{ label: string; href: string }> {
  // TODO: split pathname và build breadcrumb array
  // Luôn bắt đầu với { label: "Home", href: "/" }
  return [];
}

console.log(generateBreadcrumbs("/shop/electronics/laptops"));
console.log(generateBreadcrumbs("/blog/nextjs-tips"));
console.log(generateBreadcrumbs("/"));
`,
        solution: `function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

function generateBreadcrumbs(pathname: string): Array<{ label: string; href: string }> {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];
  parts.forEach((part, i) => {
    crumbs.push({ label: capitalize(part), href: "/" + parts.slice(0, i + 1).join("/") });
  });
  return crumbs;
}

console.log(generateBreadcrumbs("/shop/electronics/laptops"));
console.log(generateBreadcrumbs("/blog/nextjs-tips"));
console.log(generateBreadcrumbs("/"));
`,
        hint: "Split pathname theo '/', filter empty. Dùng slice(0, i+1).join('/') để build href từng bước.",
      },
    ],
    playgrounds: [
      {
        title: "File-based routing simulator",
        description: "Simulate cách Next.js App Router map file paths sang URL routes. Thử thêm routes và xem output!",
        starterCode: `// Simulate Next.js App Router file -> route mapping
const fileTree = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/shop/[...path]/page.tsx",
  "app/api/users/route.ts",
  "app/api/users/[id]/route.ts",
  "app/(auth)/login/page.tsx",   // route group - () bị bỏ
  "app/(auth)/register/page.tsx",
];

function fileToRoute(filePath: string): string {
  return filePath
    .replace(/^app/, "")
    .replace(/\\/page\\.tsx$/, "")
    .replace(/\\/route\\.ts$/, "")
    .replace(/\\/\\([^)]+\\)/g, "") // remove route groups
    || "/";
}

console.log("=== File -> Route Mapping ===");
fileTree.forEach(f => {
  console.log(f.padEnd(45), "->", fileToRoute(f));
});

// Thêm files của bạn và xem chúng map sang route nào!
const myFiles = [
  "app/dashboard/page.tsx",
  "app/dashboard/settings/page.tsx",
  "app/products/[id]/reviews/page.tsx",
];

console.log("\\n=== My Routes ===");
myFiles.forEach(f => console.log(f, "->", fileToRoute(f)));
`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "02-data-fetching",
    title: "Data Fetching & Caching",
    description: "Server Components fetch, Static/Dynamic rendering, cache strategies",
    level: "Cơ bản",
    content: `
## Data Fetching trong Next.js

Next.js mở rộng \`fetch\` API với caching và revalidation built-in.

### Server Component — fetch data trực tiếp

\`\`\`tsx
// app/posts/page.tsx — Server Component (async)
export default async function PostsPage() {
  // Chạy trên server — không expose API key lên client
  const posts = await fetch("https://api.example.com/posts", {
    headers: { Authorization: "Bearer " + process.env.API_KEY },
  }).then(r => r.json());

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
\`\`\`

### Cache strategies

\`\`\`tsx
// Static (cache forever — mặc định)
fetch(url);
fetch(url, { cache: "force-cache" });

// Dynamic (no cache — luôn fetch mới)
fetch(url, { cache: "no-store" });

// ISR — revalidate sau N giây
fetch(url, { next: { revalidate: 60 } }); // 60 giây

// Tag-based revalidation
fetch(url, { next: { tags: ["posts"] } });
// Sau đó: revalidateTag("posts") trong Server Action
\`\`\`

### Render modes

\`\`\`tsx
// Static (SSG) — default, build time
export default async function Page() {
  const data = await fetch(url);         // cached
  return <div>{data}</div>;
}

// Dynamic (SSR) — mỗi request
import { cookies } from "next/headers";
export default async function Page() {
  const token = cookies().get("token");  // force dynamic
  const data = await fetch(url, { cache: "no-store" });
  return <div>{data}</div>;
}

// Opt out of caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
\`\`\`

### Parallel vs Sequential

\`\`\`tsx
// ❌ Sequential — chậm
const user = await getUser(id);     // 100ms
const posts = await getPosts(id);   // 100ms
// Total: 200ms

// ✅ Parallel — nhanh hơn
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id),
]);
// Total: ~100ms
\`\`\`
`,
    codeExample: `// Simulate Next.js data fetching patterns

interface Post { id: number; title: string; body: string; userId: number; }
interface User { id: number; name: string; email: string; }

// Simulate fetch với delay
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchPosts(): Promise<Post[]> {
  await delay(60);
  return [
    { id: 1, title: "Next.js 14 Features", body: "App Router improvements...", userId: 1 },
    { id: 2, title: "Server Components Deep Dive", body: "RSC explained...", userId: 1 },
    { id: 3, title: "Turbopack vs Webpack", body: "Performance comparison...", userId: 2 },
  ];
}

async function fetchUser(id: number): Promise<User> {
  await delay(40);
  const users: Record<number, User> = {
    1: { id: 1, name: "Alice", email: "alice@example.com" },
    2: { id: 2, name: "Bob", email: "bob@example.com" },
  };
  return users[id] ?? { id, name: "Unknown", email: "" };
}

// ── Cache simulation ──
const cache = new Map<string, { data: unknown; expiresAt: number }>();

async function cachedFetch<T>(key: string, fn: () => Promise<T>, ttl = 5000): Promise<T> {
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    console.log("  [cache HIT]", key);
    return cached.data as T;
  }
  console.log("  [cache MISS]", key);
  const data = await fn();
  cache.set(key, { data, expiresAt: Date.now() + ttl });
  return data;
}

// ── Demo: Static-like (cached) ──
async function getPostsPage() {
  console.log("\\n=== PostsPage (Static — cached) ===");
  const t0 = Date.now();

  // Fetch posts + author info in parallel
  const posts = await cachedFetch("posts", fetchPosts);
  const authorIds = [...new Set(posts.map(p => p.userId))];
  const authors = await Promise.all(
    authorIds.map(id => cachedFetch("user:" + id, () => fetchUser(id)))
  );

  const authorMap = Object.fromEntries(authors.map(a => [a.id, a]));
  const result = posts.map(p => ({ ...p, author: authorMap[p.userId]?.name }));

  console.log("  Time:", Date.now() - t0 + "ms");
  console.log("  Posts:", result.map(p => p.title + " by " + p.author));

  // Second call — all cached
  console.log("\\n--- Second request (all cached) ---");
  const t1 = Date.now();
  await cachedFetch("posts", fetchPosts);
  await Promise.all(authorIds.map(id => cachedFetch("user:" + id, () => fetchUser(id))));
  console.log("  Time:", Date.now() - t1 + "ms");
}

getPostsPage();
`,
    exercises: [
      {
        title: "Implement SWR-like hook (logic only)",
        description: "Tạo hàm createSWR() simulate SWR pattern: stale-while-revalidate — trả cache ngay, cập nhật ngầm.",
        starterCode: `const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// SWR: trả data cũ ngay lập tức, đồng thời fetch mới ngầm
// Khi data mới về -> gọi callback để notify

function createSWR<T>(fetcher: (key: string) => Promise<T>) {
  const cache = new Map<string, { data: T; fetchedAt: number }>();

  return async function swr(
    key: string,
    onUpdate: (data: T) => void,
    maxAge = 3000
  ): Promise<T | null> {
    // TODO:
    // 1. Nếu có cache: trả về data cũ ngay
    // 2. Luôn fetch lại nếu cache stale (fetchedAt + maxAge < now)
    // 3. Khi fetch xong: update cache và gọi onUpdate(newData)
    // 4. Nếu không có cache: đợi fetch xong rồi return
    return null;
  };
}

// Test
let dbFetchCount = 0;
const swrFetcher = async (key: string) => {
  await delay(30);
  dbFetchCount++;
  return { data: "result for " + key, fetchedAt: Date.now(), fetchCount: dbFetchCount };
};

const swr = createSWR(swrFetcher);

async function main() {
  // First call: no cache, waits
  const r1 = await swr("user:1", d => console.log("Background update:", d.fetchCount));
  console.log("Call 1 (fresh):", r1);

  // Second call: returns cache immediately, revalidates in bg
  const r2 = await swr("user:1", d => console.log("Background update:", d.fetchCount));
  console.log("Call 2 (stale):", r2?.fetchCount);

  await delay(100); // wait for background revalidation
  console.log("Total DB fetches:", dbFetchCount);
}
main();
`,
        hint: "Check cache: nếu có và chưa stale -> return ngay. Nếu stale: return cache cũ nhưng đồng thời fetch ngầm (không await, chạy async).",
      },
      {
        title: "Cache với tag invalidation",
        description: "Implement cache system hỗ trợ tag-based invalidation giống Next.js revalidateTag().",
        starterCode: `class TaggedCache {
  private store = new Map<string, { value: unknown; tags: string[]; expiresAt: number }>();

  set(key: string, value: unknown, tags: string[] = [], ttl = 60000): void {
    // TODO: lưu value với tags và expiry
  }

  get<T>(key: string): T | null {
    // TODO: trả về value nếu còn valid, null nếu expired
  }

  revalidateTag(tag: string): number {
    // TODO: xóa tất cả entries có tag này, trả về số lượng đã xóa
    return 0;
  }

  revalidatePath(path: string): number {
    // TODO: xóa tất cả entries có key bắt đầu bằng path
    return 0;
  }

  getStats() {
    const now = Date.now();
    const entries = [...this.store.entries()];
    return {
      total: entries.length,
      active: entries.filter(([, v]) => v.expiresAt > now).length,
      expired: entries.filter(([, v]) => v.expiresAt <= now).length,
    };
  }
}

const cache = new TaggedCache();

// Simulate cached data
cache.set("posts:all", [{ id: 1, title: "Post 1" }], ["posts"], 5000);
cache.set("posts:1", { id: 1, title: "Post 1" }, ["posts", "post-1"], 5000);
cache.set("users:all", [{ id: 1 }], ["users"], 5000);
cache.set("/blog/page", "<html>...", ["posts"], 5000);

console.log("Before:", cache.getStats());
console.log("posts:all:", cache.get("posts:all"));

const deleted = cache.revalidateTag("posts");
console.log("Deleted by tag 'posts':", deleted);
console.log("After revalidateTag:", cache.getStats());
console.log("posts:all after:", cache.get("posts:all")); // null
console.log("users:all after:", cache.get("users:all")); // still there
`,
        solution: `class TaggedCache {
  private store = new Map<string, { value: unknown; tags: string[]; expiresAt: number }>();

  set(key: string, value: unknown, tags: string[] = [], ttl = 60000): void {
    this.store.set(key, { value, tags, expiresAt: Date.now() + ttl });
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) { this.store.delete(key); return null; }
    return entry.value as T;
  }

  revalidateTag(tag: string): number {
    let count = 0;
    for (const [key, entry] of this.store.entries()) {
      if (entry.tags.includes(tag)) { this.store.delete(key); count++; }
    }
    return count;
  }

  revalidatePath(path: string): number {
    let count = 0;
    for (const key of this.store.keys()) {
      if (key.startsWith(path)) { this.store.delete(key); count++; }
    }
    return count;
  }

  getStats() {
    const now = Date.now();
    const entries = [...this.store.entries()];
    return { total: entries.length, active: entries.filter(([,v]) => v.expiresAt > now).length, expired: entries.filter(([,v]) => v.expiresAt <= now).length };
  }
}

const cache = new TaggedCache();
cache.set("posts:all", [{ id: 1, title: "Post 1" }], ["posts"], 5000);
cache.set("posts:1", { id: 1, title: "Post 1" }, ["posts", "post-1"], 5000);
cache.set("users:all", [{ id: 1 }], ["users"], 5000);
cache.set("/blog/page", "<html>...", ["posts"], 5000);
console.log("Before:", cache.getStats());
const deleted = cache.revalidateTag("posts");
console.log("Deleted:", deleted);
console.log("After:", cache.getStats());
console.log("posts:all:", cache.get("posts:all"));
console.log("users:all:", cache.get("users:all"));
`,
        hint: "store.entries() để iterate. includes(tag) để check. Dùng for...of với store.keys() cho revalidatePath.",
      },
      {
        title: "Data transformation pipeline",
        description: "Tạo hàm transformPageData() nhận raw API data và transform thành format phù hợp cho render.",
        starterCode: `// Raw API response (từ CMS hoặc DB)
const rawData = {
  items: [
    { _id: "a1", _type: "post", title: "Hello World", slug: { current: "hello-world" }, publishedAt: "2024-01-15T10:00:00Z", author: { _ref: "u1" }, body: [{ _type: "block", text: "Content here..." }], tags: ["nextjs", "react"] },
    { _id: "a2", _type: "post", title: "TypeScript Tips", slug: { current: "typescript-tips" }, publishedAt: "2024-02-01T10:00:00Z", author: { _ref: "u2" }, body: [{ _type: "block", text: "TS content..." }], tags: ["typescript"] },
  ],
  authors: {
    u1: { _id: "u1", name: "Alice", avatar: "/alice.jpg" },
    u2: { _id: "u2", name: "Bob", avatar: "/bob.jpg" },
  },
};

interface Post {
  id: string;
  title: string;
  slug: string;
  url: string;
  publishedAt: string;         // formatted: "15 Jan 2024"
  author: { name: string; avatar: string };
  excerpt: string;
  tags: string[];
  readingTime: string;         // "2 min read"
}

function transformPageData(raw: typeof rawData): Post[] {
  // TODO: transform raw.items thành Post[]
  // - Resolve author từ raw.authors
  // - Format publishedAt thành "DD MMM YYYY"
  // - Extract excerpt từ body[0].text (max 100 chars)
  // - Calculate readingTime: ~200 words/min
  // - Build url: /blog/ + slug.current
  return [];
}

const posts = transformPageData(rawData);
posts.forEach(p => console.log(JSON.stringify(p, null, 2)));
`,
        solution: `const rawData = {
  items: [
    { _id: "a1", _type: "post", title: "Hello World", slug: { current: "hello-world" }, publishedAt: "2024-01-15T10:00:00Z", author: { _ref: "u1" }, body: [{ _type: "block", text: "Content here..." }], tags: ["nextjs", "react"] },
    { _id: "a2", _type: "post", title: "TypeScript Tips", slug: { current: "typescript-tips" }, publishedAt: "2024-02-01T10:00:00Z", author: { _ref: "u2" }, body: [{ _type: "block", text: "TS content..." }], tags: ["typescript"] },
  ],
  authors: {
    u1: { _id: "u1", name: "Alice", avatar: "/alice.jpg" },
    u2: { _id: "u2", name: "Bob", avatar: "/bob.jpg" },
  },
};

function transformPageData(raw: typeof rawData) {
  return raw.items.map(item => {
    const author = raw.authors[item.author._ref as keyof typeof raw.authors];
    const text = item.body.map((b: any) => b.text).join(" ");
    const words = text.split(/\s+/).length;
    const date = new Date(item.publishedAt);
    return {
      id: item._id,
      title: item.title,
      slug: item.slug.current,
      url: "/blog/" + item.slug.current,
      publishedAt: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      author: { name: author.name, avatar: author.avatar },
      excerpt: text.slice(0, 100) + (text.length > 100 ? "..." : ""),
      tags: item.tags,
      readingTime: Math.max(1, Math.ceil(words / 200)) + " min read",
    };
  });
}

const posts = transformPageData(rawData);
posts.forEach(p => console.log(JSON.stringify(p, null, 2)));
`,
        hint: "author._ref là key trong raw.authors. toLocaleDateString cho format ngày. words/200 cho reading time.",
      },
      {
        title: "Optimistic UI update",
        description: "Implement optimistic update pattern: cập nhật UI ngay trước khi server xác nhận, rollback nếu lỗi.",
        starterCode: `const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Simulate server
let serverLikes: Record<number, number> = { 1: 10, 2: 5, 3: 8 };
async function toggleLikeAPI(postId: number, liked: boolean): Promise<{ likes: number }> {
  await delay(100);
  if (Math.random() < 0.3) throw new Error("Server error"); // 30% fail
  serverLikes[postId] = liked ? serverLikes[postId] + 1 : serverLikes[postId] - 1;
  return { likes: serverLikes[postId] };
}

// Client state (simulate React state)
class PostStore {
  private posts = [
    { id: 1, title: "Post A", likes: 10, liked: false },
    { id: 2, title: "Post B", likes: 5, liked: false },
  ];

  getPost(id: number) { return this.posts.find(p => p.id === id); }
  updatePost(id: number, data: Partial<{ likes: number; liked: boolean }>) {
    const post = this.posts.find(p => p.id === id);
    if (post) Object.assign(post, data);
  }
  display() { this.posts.forEach(p => console.log(\`  \${p.title}: \${p.likes} likes (\${p.liked ? "liked" : "not liked"})\`)); }
}

const store = new PostStore();

async function toggleLike(postId: number): Promise<void> {
  const post = store.getPost(postId);
  if (!post) return;

  // TODO: implement optimistic update
  // 1. Simpulkan state mới (liked, likes +/-)
  // 2. Update store NGAY (optimistic)
  // 3. Gọi API
  // 4. Nếu thành công: update với server value
  // 5. Nếu thất bại: rollback về state cũ, log error
}

async function main() {
  console.log("Initial state:");
  store.display();

  await toggleLike(1);
  console.log("\\nAfter toggle post 1:");
  store.display();
}
main();
`,
        hint: "Lưu originalData trước khi update. Update optimistically, rồi try/catch API. Trong catch: rollback bằng originalData.",
      },
    ],
    playgrounds: [
      {
        title: "Build a data fetching layer",
        description: "Tạo một complete data layer với caching, deduplication, và error handling. Thử nghiệm!",
        starterCode: `const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Simulate API responses
const API = {
  async getUser(id: number) { await delay(50); return { id, name: "User " + id, role: "user" }; },
  async getPosts(userId: number) { await delay(60); return [{ id: userId * 10, title: "Post by " + userId }]; },
  async getComments(postId: number) { await delay(40); return [{ id: postId, text: "Comment on " + postId }]; },
};

// Request deduplication: nếu có 2 request giống nhau cùng lúc -> chỉ gọi 1 lần
const inflight = new Map<string, Promise<unknown>>();

async function dedupe<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (inflight.has(key)) {
    console.log("  [deduped]", key);
    return inflight.get(key) as Promise<T>;
  }
  const promise = fn().finally(() => inflight.delete(key));
  inflight.set(key, promise);
  return promise;
}

// Simple cache layer
const cache = new Map<string, unknown>();

async function fetchWithCache<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (cache.has(key)) { console.log("  [cached]", key); return cache.get(key) as T; }
  const data = await dedupe(key, fn);
  cache.set(key, data);
  return data;
}

// Thử các pattern:
async function main() {
  console.log("=== Parallel fetch ===");
  const [u1, u2] = await Promise.all([
    fetchWithCache("user:1", () => API.getUser(1)),
    fetchWithCache("user:2", () => API.getUser(2)),
  ]);
  console.log(u1, u2);

  console.log("\\n=== Cache hit ===");
  const u1Cached = await fetchWithCache("user:1", () => API.getUser(1));
  console.log("Same data:", u1Cached);

  // Thử thêm: nested fetching, error handling, TTL cache...
}
main();
`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "03-api-routes",
    title: "API Routes (Route Handlers)",
    description: "Tạo backend API với Route Handlers, CRUD, middleware",
    level: "Trung cấp",
    content: `
## Route Handlers trong Next.js

Route Handlers thay thế API Routes cũ (pages/api). File \`route.ts\` trong App Router.

\`\`\`tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";

  const users = await db.users.findMany({ skip: (+page - 1) * 10 });
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await db.users.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
\`\`\`

### Dynamic Route Handler

\`\`\`tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.users.findUnique({ where: { id: +params.id } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(request, { params }) {
  const body = await request.json();
  const user = await db.users.update({ where: { id: +params.id }, data: body });
  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  await db.users.delete({ where: { id: +params.id } });
  return new NextResponse(null, { status: 204 });
}
\`\`\`

### Middleware cho API Routes

\`\`\`tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// middleware.ts (ở root)
export function middleware(request: NextRequest) {
  const token = request.headers.get("authorization");

  if (request.nextUrl.pathname.startsWith("/api/protected")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
\`\`\`

### Headers, Cookies, Response types

\`\`\`tsx
// Set cookie
const response = NextResponse.json({ ok: true });
response.cookies.set("token", "abc123", { httpOnly: true, maxAge: 86400 });
return response;

// Read cookie
const token = request.cookies.get("token")?.value;

// Stream response
return new Response(
  new ReadableStream({ start(c) { c.enqueue("hello"); c.close(); } }),
  { headers: { "Content-Type": "text/plain" } }
);
\`\`\`
`,
    codeExample: `// Simulate Next.js Route Handlers behavior

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface MockRequest {
  method: Method;
  url: string;
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

interface MockResponse {
  status: number;
  body: unknown;
  headers?: Record<string, string>;
}

// Simulate NextResponse.json
function json(data: unknown, init?: { status?: number; headers?: Record<string, string> }): MockResponse {
  return { status: init?.status ?? 200, body: data, headers: init?.headers };
}

// In-memory DB
const db = {
  users: [
    { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
  ],
  nextId: 3,
};

// ── Route Handlers ──
const handlers: Record<string, Partial<Record<Method, (req: MockRequest) => MockResponse>>> = {
  "/api/users": {
    GET: (req) => {
      const url = new URL("http://x" + req.url);
      const page = +(url.searchParams.get("page") ?? 1);
      const limit = +(url.searchParams.get("limit") ?? 10);
      const users = db.users.slice((page - 1) * limit, page * limit);
      return json({ users, total: db.users.length, page });
    },
    POST: (req) => {
      const body = req.body as { name: string; email: string };
      if (!body.name || !body.email) return json({ error: "name and email required" }, { status: 400 });
      const user = { id: db.nextId++, role: "user", ...body };
      db.users.push(user);
      return json(user, { status: 201 });
    },
  },
  "/api/users/:id": {
    GET: (req) => {
      const user = db.users.find(u => u.id === +req.params!.id);
      if (!user) return json({ error: "Not found" }, { status: 404 });
      return json(user);
    },
    PATCH: (req) => {
      const idx = db.users.findIndex(u => u.id === +req.params!.id);
      if (idx === -1) return json({ error: "Not found" }, { status: 404 });
      db.users[idx] = { ...db.users[idx], ...(req.body as object) };
      return json(db.users[idx]);
    },
    DELETE: (req) => {
      const idx = db.users.findIndex(u => u.id === +req.params!.id);
      if (idx === -1) return json({ error: "Not found" }, { status: 404 });
      db.users.splice(idx, 1);
      return json(null, { status: 204 });
    },
  },
};

function callAPI(method: Method, path: string, body?: unknown): MockResponse {
  for (const [pattern, methods] of Object.entries(handlers)) {
    const re = new RegExp("^" + pattern.replace(/:([^/]+)/g, "([^/]+)") + "$");
    const match = path.match(re);
    if (match) {
      const paramNames = (pattern.match(/:([^/]+)/g) ?? []).map(p => p.slice(1));
      const params: Record<string, string> = {};
      paramNames.forEach((n, i) => { params[n] = match[i + 1]; });
      const handler = methods[method];
      if (!handler) return { status: 405, body: { error: "Method Not Allowed" } };
      return handler({ method, url: path, body, params });
    }
  }
  return { status: 404, body: { error: "Not Found" } };
}

// Test
console.log("GET /api/users:", JSON.stringify(callAPI("GET", "/api/users").body));
console.log("POST /api/users:", JSON.stringify(callAPI("POST", "/api/users", { name: "Charlie", email: "c@c.com" }).body));
console.log("GET /api/users/1:", JSON.stringify(callAPI("GET", "/api/users/1").body));
console.log("PATCH /api/users/1:", JSON.stringify(callAPI("PATCH", "/api/users/1", { name: "Alice Updated" }).body));
console.log("DELETE /api/users/2:", callAPI("DELETE", "/api/users/2").status);
console.log("GET /api/users/2 after delete:", JSON.stringify(callAPI("GET", "/api/users/2").body));
`,
    exercises: [
      {
        title: "API với authentication",
        description: "Tạo route handler GET /api/me và POST /api/posts chỉ dành cho user đã auth, dùng token trong header.",
        starterCode: `// Simulate JWT verify
function verifyToken(token: string): { userId: number; email: string } | null {
  // Simulate: "Bearer valid-token-1" -> { userId: 1, email: "alice@..." }
  if (token === "Bearer valid-token-1") return { userId: 1, email: "alice@example.com" };
  if (token === "Bearer valid-token-2") return { userId: 2, email: "bob@example.com" };
  return null;
}

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const posts: Array<{ id: number; title: string; authorId: number; createdAt: string }> = [];

// TODO: implement handlers
function handleGetMe(headers: Record<string, string>) {
  // Verify Authorization header, trả về user info
  // 401 nếu không có token hoặc invalid
}

function handleCreatePost(headers: Record<string, string>, body: { title: string; content: string }) {
  // Verify token
  // Validate body (title required)
  // Create post với authorId từ token
}

// Tests
console.log("No auth:", handleGetMe({}));
console.log("Invalid token:", handleGetMe({ authorization: "Bearer fake-token" }));
console.log("Valid auth:", handleGetMe({ authorization: "Bearer valid-token-1" }));
console.log("Create post:", handleCreatePost(
  { authorization: "Bearer valid-token-1" },
  { title: "My Post", content: "Hello!" }
));
`,
        hint: "Extract header 'authorization', call verifyToken(). Nếu null -> return 401. Nếu ok -> dùng userId từ payload.",
      },
      {
        title: "File upload handler",
        description: "Simulate route handler cho file upload: validate type/size, generate unique filename.",
        starterCode: `// Simulate file upload handling (trong Next.js dùng FormData)
interface UploadedFile {
  name: string;
  type: string;
  size: number;       // bytes
  content: string;    // base64 (simulate)
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function handleFileUpload(file: UploadedFile): {
  status: number;
  body: { success?: boolean; url?: string; filename?: string; error?: string };
} {
  // TODO:
  // 1. Validate type (ALLOWED_TYPES)
  // 2. Validate size (MAX_SIZE)
  // 3. Generate unique filename: timestamp + random + ext
  // 4. Trả về { success: true, url: "/uploads/" + filename, filename }
  return { status: 500, body: { error: "Not implemented" } };
}

// Tests
const validFile: UploadedFile = { name: "photo.jpg", type: "image/jpeg", size: 1024 * 100, content: "data..." };
const tooLarge: UploadedFile = { name: "huge.png", type: "image/png", size: 10 * 1024 * 1024, content: "..." };
const wrongType: UploadedFile = { name: "doc.pdf", type: "application/pdf", size: 500, content: "..." };

console.log("Valid:", handleFileUpload(validFile));
console.log("Too large:", handleFileUpload(tooLarge));
console.log("Wrong type:", handleFileUpload(wrongType));
`,
        solution: `interface UploadedFile { name: string; type: string; size: number; content: string; }
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

function handleFileUpload(file: UploadedFile) {
  if (!ALLOWED_TYPES.includes(file.type))
    return { status: 400, body: { error: "Loại file không được phép. Chỉ chấp nhận: " + ALLOWED_TYPES.join(", ") } };
  if (file.size > MAX_SIZE)
    return { status: 400, body: { error: "File quá lớn. Tối đa 5MB" } };
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
  return { status: 200, body: { success: true, url: "/uploads/" + filename, filename } };
}

const validFile: UploadedFile = { name: "photo.jpg", type: "image/jpeg", size: 1024 * 100, content: "data..." };
const tooLarge: UploadedFile = { name: "huge.png", type: "image/png", size: 10 * 1024 * 1024, content: "..." };
const wrongType: UploadedFile = { name: "doc.pdf", type: "application/pdf", size: 500, content: "..." };
console.log("Valid:", handleFileUpload(validFile));
console.log("Too large:", handleFileUpload(tooLarge));
console.log("Wrong type:", handleFileUpload(wrongType));
`,
        hint: "Check ALLOWED_TYPES.includes(file.type), check file.size <= MAX_SIZE. Filename: Date.now() + random hex + ext.",
      },
      {
        title: "Search API với pagination",
        description: "Implement GET /api/search handler hỗ trợ q, page, limit, sortBy, sortOrder.",
        starterCode: `const products = [
  { id: 1, name: "iPhone 15 Pro", category: "phone", price: 999, rating: 4.8 },
  { id: 2, name: "Samsung Galaxy S24", category: "phone", price: 899, rating: 4.6 },
  { id: 3, name: "MacBook Pro M3", category: "laptop", price: 1999, rating: 4.9 },
  { id: 4, name: "Dell XPS 15", category: "laptop", price: 1599, rating: 4.7 },
  { id: 5, name: "iPad Pro", category: "tablet", price: 799, rating: 4.5 },
  { id: 6, name: "AirPods Pro", category: "audio", price: 249, rating: 4.7 },
  { id: 7, name: "Sony WH-1000XM5", category: "audio", price: 279, rating: 4.8 },
];

interface SearchParams {
  q?: string;
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "rating" | "name";
  sortOrder?: "asc" | "desc";
}

function handleSearch(params: SearchParams) {
  // TODO: filter by q (name contains), category, minPrice, maxPrice
  // Sort by sortBy (default: name), sortOrder (default: asc)
  // Paginate với page và limit (default: 1, 10)
  // Trả về { data, total, page, totalPages, query: params }
  return { data: [], total: 0, page: 1, totalPages: 0, query: params };
}

console.log("Search 'pro':", handleSearch({ q: "pro" }).data.map(p => p.name));
console.log("Category phone:", handleSearch({ category: "phone" }).data.map(p => p.name));
console.log("Price 200-500 sort price:", handleSearch({ minPrice: 200, maxPrice: 500, sortBy: "price" }).data.map(p => p.name + " $" + p.price));
console.log("Page 1 limit 3:", handleSearch({ limit: 3 }).data.map(p => p.name));
`,
        solution: `const products = [
  { id: 1, name: "iPhone 15 Pro", category: "phone", price: 999, rating: 4.8 },
  { id: 2, name: "Samsung Galaxy S24", category: "phone", price: 899, rating: 4.6 },
  { id: 3, name: "MacBook Pro M3", category: "laptop", price: 1999, rating: 4.9 },
  { id: 4, name: "Dell XPS 15", category: "laptop", price: 1599, rating: 4.7 },
  { id: 5, name: "iPad Pro", category: "tablet", price: 799, rating: 4.5 },
  { id: 6, name: "AirPods Pro", category: "audio", price: 249, rating: 4.7 },
  { id: 7, name: "Sony WH-1000XM5", category: "audio", price: 279, rating: 4.8 },
];

function handleSearch({ q, page = 1, limit = 10, category, minPrice, maxPrice, sortBy = "name", sortOrder = "asc" }: any) {
  let data = [...products];
  if (q) data = data.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  if (category) data = data.filter(p => p.category === category);
  if (minPrice !== undefined) data = data.filter(p => p.price >= minPrice);
  if (maxPrice !== undefined) data = data.filter(p => p.price <= maxPrice);
  data.sort((a, b) => {
    const va = (a as any)[sortBy], vb = (b as any)[sortBy];
    return sortOrder === "asc" ? (va < vb ? -1 : 1) : (va > vb ? -1 : 1);
  });
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  data = data.slice((page - 1) * limit, page * limit);
  return { data, total, page, totalPages };
}

console.log("Search 'pro':", handleSearch({ q: "pro" }).data.map((p:any) => p.name));
console.log("Category phone:", handleSearch({ category: "phone" }).data.map((p:any) => p.name));
console.log("Price 200-500:", handleSearch({ minPrice: 200, maxPrice: 500, sortBy: "price" }).data.map((p:any) => p.name + " $" + p.price));
console.log("Page 1 limit 3:", handleSearch({ limit: 3 }).data.map((p:any) => p.name));
`,
        hint: "Filter trước, sort sau, rồi paginate. Sort: compare [sortBy] của a và b, đổi dấu nếu desc.",
      },
      {
        title: "Webhook handler với signature verification",
        description: "Implement webhook handler xác thực HMAC signature (giống Stripe/GitHub webhooks).",
        starterCode: `// Webhook security: verify signature để đảm bảo request từ source hợp lệ
// Stripe dùng: Stripe-Signature header với HMAC-SHA256

// Note: trong browser environment dùng Web Crypto API
// Simulate HMAC với simple hash

function simpleHmac(key: string, data: string): string {
  // Simplified HMAC simulation (dùng cho demo)
  let hash = 0;
  const combined = key + data;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

const WEBHOOK_SECRET = "whsec_test123";

function generateWebhookSignature(payload: string, secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const sig = simpleHmac(secret, timestamp + "." + payload);
  return \`t=\${timestamp},v1=\${sig}\`;
}

interface WebhookRequest {
  body: string;             // raw JSON string
  signature: string;        // từ header
  timestamp?: number;       // để test expired
}

function verifyWebhook(req: WebhookRequest, secret: string): { valid: boolean; payload?: unknown; error?: string } {
  // TODO:
  // 1. Parse signature: "t=123456,v1=abc123" -> { t, v1 }
  // 2. Check timestamp không quá 5 phút cũ (300 giây)
  // 3. Recompute HMAC: simpleHmac(secret, t + "." + body)
  // 4. So sánh với v1 (timing-safe)
  // 5. Nếu valid: trả về { valid: true, payload: JSON.parse(body) }
  return { valid: false, error: "Not implemented" };
}

// Test
const payload = JSON.stringify({ event: "payment.success", amount: 99900, currency: "VND" });
const validSig = generateWebhookSignature(payload, WEBHOOK_SECRET);
const fakeSig = validSig.replace(/v1=.*/, "v1=fakehash123");

console.log("Valid:", verifyWebhook({ body: payload, signature: validSig }, WEBHOOK_SECRET));
console.log("Fake sig:", verifyWebhook({ body: payload, signature: fakeSig }, WEBHOOK_SECRET));
`,
        hint: "Parse 't=123,v1=hash' bằng split(',').map(x => x.split('=')). Check Math.floor(Date.now()/1000) - t < 300.",
      },
    ],
    playgrounds: [
      {
        title: "Full REST API với mock data",
        description: "Xây dựng complete REST API cho blog: posts, comments, users. Thử tất cả HTTP methods!",
        starterCode: `// Full Blog REST API Simulation

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// DB
const db = {
  users: [{ id: 1, name: "Alice", email: "alice@example.com" }],
  posts: [
    { id: 1, title: "Hello Next.js", content: "Getting started...", authorId: 1, published: true, createdAt: new Date().toISOString() },
  ],
  comments: [
    { id: 1, postId: 1, authorId: 1, text: "Great post!", createdAt: new Date().toISOString() },
  ],
  nextIds: { users: 2, posts: 2, comments: 2 },
};

function response(status: number, data: unknown) {
  return { status, data };
}

// ── Handlers ──
function handlePosts(method: Method, id?: number, body?: any) {
  if (method === "GET" && !id) {
    const published = db.posts.filter(p => p.published);
    return response(200, { posts: published, total: published.length });
  }
  if (method === "GET" && id) {
    const post = db.posts.find(p => p.id === id);
    return post ? response(200, post) : response(404, { error: "Not found" });
  }
  if (method === "POST") {
    if (!body?.title) return response(400, { error: "title required" });
    const post = { id: db.nextIds.posts++, ...body, authorId: 1, published: false, createdAt: new Date().toISOString() };
    db.posts.push(post);
    return response(201, post);
  }
  if (method === "DELETE" && id) {
    const idx = db.posts.findIndex(p => p.id === id);
    if (idx === -1) return response(404, { error: "Not found" });
    db.posts.splice(idx, 1);
    return response(204, null);
  }
  return response(405, { error: "Method not allowed" });
}

// Thêm handler cho comments và users...

// Test
console.log("GET /posts:", handlePosts("GET"));
console.log("POST /posts:", handlePosts("POST", undefined, { title: "New Post", content: "..." }));
console.log("GET /posts/1:", handlePosts("GET", 1));
console.log("GET /posts/99:", handlePosts("GET", 99));

// Thử thêm: PATCH /posts/:id để update, GET /posts/:id/comments...
`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "04-server-actions",
    title: "Server Actions & Forms",
    description: "Form handling với Server Actions, mutations, revalidation",
    level: "Trung cấp",
    content: `
## Server Actions

Server Actions là **async functions** chạy trên server, gọi trực tiếp từ client. Không cần tạo API endpoint.

\`\`\`tsx
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Validate
  if (!title || title.length < 3) {
    return { error: "Title phải ít nhất 3 ký tự" };
  }

  // Save to DB
  await db.posts.create({ data: { title, content } });

  // Revalidate cache
  revalidatePath("/blog");

  // Redirect (optional)
  redirect("/blog");
}
\`\`\`

### Dùng trong Form

\`\`\`tsx
// app/posts/new/page.tsx
import { createPost } from "@/app/actions";

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
\`\`\`

### useFormState & useFormStatus (React 19)

\`\`\`tsx
"use client";
import { useFormState, useFormStatus } from "react-dom";
import { createPost } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Saving..." : "Submit"}</button>;
}

export default function PostForm() {
  const [state, action] = useFormState(createPost, { error: null });

  return (
    <form action={action}>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <input name="title" />
      <SubmitButton />
    </form>
  );
}
\`\`\`

### Server Actions với validation (Zod)

\`\`\`tsx
import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  published: z.boolean().default(false),
});

export async function createPost(prevState: unknown, formData: FormData) {
  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await db.post.create({ data: parsed.data });
  revalidatePath("/blog");
  return { success: true };
}
\`\`\`
`,
    codeExample: `// Simulate Server Actions pattern (TypeScript)

type FormState<T = unknown> = {
  data?: T;
  errors?: Record<string, string[]>;
  error?: string;
  success?: boolean;
};

// ── Schema validation (simulate Zod) ──
type Rule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message?: string;
};

function validateSchema<T>(data: Record<string, unknown>, schema: Record<string, Rule>): {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
} {
  const errors: Record<string, string[]> = {};
  for (const [field, rules] of Object.entries(schema)) {
    const val = data[field];
    const errs: string[] = [];
    if (rules.required && !val) errs.push(rules.message ?? field + " là bắt buộc");
    if (val && rules.minLength && String(val).length < rules.minLength)
      errs.push(field + " tối thiểu " + rules.minLength + " ký tự");
    if (val && rules.maxLength && String(val).length > rules.maxLength)
      errs.push(field + " tối đa " + rules.maxLength + " ký tự");
    if (val && rules.pattern && !rules.pattern.test(String(val)))
      errs.push(rules.message ?? field + " không đúng định dạng");
    if (errs.length) errors[field] = errs;
  }
  if (Object.keys(errors).length > 0) return { success: false, errors };
  return { success: true, data: data as T };
}

// ── Server Actions ──
const posts: Array<{ id: number; title: string; content: string; published: boolean; createdAt: string }> = [];
let nextId = 1;

async function createPostAction(
  _prev: FormState,
  formData: Record<string, unknown>
): Promise<FormState> {
  const result = validateSchema(formData, {
    title: { required: true, minLength: 3, maxLength: 100 },
    content: { required: true, minLength: 10 },
  });

  if (!result.success) return { errors: result.errors };

  const post = { id: nextId++, ...(result.data as { title: string; content: string }), published: false, createdAt: new Date().toISOString() };
  posts.push(post);
  return { success: true, data: post };
}

async function publishPostAction(_prev: FormState, formData: Record<string, unknown>): Promise<FormState> {
  const id = Number(formData.id);
  const post = posts.find(p => p.id === id);
  if (!post) return { error: "Post not found" };
  post.published = true;
  return { success: true, data: post };
}

// ── Demo ──
async function demo() {
  // Validation fails
  const r1 = await createPostAction({}, { title: "Hi", content: "short" });
  console.log("Validation errors:", r1.errors);

  // Success
  const r2 = await createPostAction({}, { title: "Next.js Server Actions", content: "Server Actions là cách mới để handle mutations trong Next.js App Router." });
  console.log("Created:", r2.data);

  // Publish
  const r3 = await publishPostAction({}, { id: 1 });
  console.log("Published:", r3.data);

  console.log("All posts:", posts);
}

demo();
`,
    exercises: [
      {
        title: "Multi-step form state",
        description: "Implement multi-step form (3 bước) với validation từng bước và state accumulation.",
        starterCode: `type StepData = Record<string, unknown>;
type FormResult = { step: number; data: StepData; errors?: Record<string, string[]>; completed?: boolean };

const steps = [
  {
    name: "personal",
    fields: {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ },
    },
  },
  {
    name: "address",
    fields: {
      city: { required: true },
      phone: { required: true, pattern: /^[0-9]{10,11}$/ },
    },
  },
  {
    name: "confirm",
    fields: {
      agree: { required: true },
    },
  },
];

function validate(data: StepData, fields: Record<string, any>): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {};
  for (const [f, r] of Object.entries(fields)) {
    const v = data[f];
    const e: string[] = [];
    if (r.required && !v) e.push(f + " bắt buộc");
    if (v && r.minLength && String(v).length < r.minLength) e.push(f + " quá ngắn");
    if (v && r.pattern && !r.pattern.test(String(v))) e.push(f + " không hợp lệ");
    if (e.length) errors[f] = e;
  }
  return Object.keys(errors).length ? errors : null;
}

// TODO: implement multi-step form processor
function processStep(currentStep: number, accumulated: StepData, newData: StepData): FormResult {
  // Validate step data
  // Nếu pass: merge accumulated + newData, advance step
  // Nếu fail: return errors, giữ nguyên step
  // Nếu bước cuối: return { completed: true, data: all accumulated }
  return { step: currentStep, data: accumulated };
}

// Test flow
let state = { step: 0, data: {} as StepData };

// Step 1 - invalid
const r1 = processStep(0, state.data, { name: "A", email: "not-email" });
console.log("Step 1 fail:", r1.errors);

// Step 1 - valid
const r2 = processStep(0, state.data, { name: "Alice", email: "alice@example.com" });
console.log("Step 1 pass:", r2.step, r2.data);

// Step 2
const r3 = processStep(1, r2.data, { city: "Hanoi", phone: "0901234567" });
console.log("Step 2 pass:", r3.step, r3.data);

// Step 3 - final
const r4 = processStep(2, r3.data, { agree: "true" });
console.log("Completed:", r4.completed, r4.data);
`,
        hint: "Validate với steps[currentStep].fields. Nếu pass và là bước cuối -> completed: true. Ngược lại advance step.",
      },
      {
        title: "Optimistic mutations",
        description: "Implement optimistic update cho todo list: thêm item ngay, sync với 'server', rollback nếu lỗi.",
        starterCode: `const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Simulate server
async function serverAddTodo(text: string): Promise<{ id: number; text: string; done: boolean }> {
  await delay(50);
  if (text.toLowerCase().includes("fail")) throw new Error("Server rejected");
  return { id: Math.floor(Math.random() * 10000), text, done: false };
}

async function serverToggleTodo(id: number): Promise<void> {
  await delay(30);
  if (id === 999) throw new Error("Not found");
}

// Client state manager
class TodoManager {
  todos: Array<{ id: number | string; text: string; done: boolean; pending?: boolean }> = [
    { id: 1, text: "Learn Next.js", done: false },
    { id: 2, text: "Build a project", done: false },
  ];

  display() {
    this.todos.forEach(t => console.log(\`  [\${t.done ? "x" : " "}] \${t.text}\${t.pending ? " (pending...)" : ""}\`));
  }

  async addTodo(text: string): Promise<void> {
    // TODO: optimistic add với temp id "temp-" + Date.now(), pending: true
    // Sau khi server confirm: replace temp item với real item
    // Nếu lỗi: remove temp item, log error
  }

  async toggleTodo(id: number): Promise<void> {
    // TODO: optimistic toggle ngay
    // Nếu lỗi: toggle lại về trạng thái cũ
  }
}

async function main() {
  const mgr = new TodoManager();
  console.log("Initial:");
  mgr.display();

  await Promise.all([
    mgr.addTodo("Build REST API"),
    mgr.addTodo("Write tests"),
  ]);
  console.log("\nAfter adding:");
  mgr.display();

  await mgr.addTodo("This will fail");
  console.log("\nAfter failed add:");
  mgr.display();
}
main();
`,
        hint: "addTodo: push temp item ngay, gọi server, replace temp với real. Nếu fail: filter ra temp item.",
      },
      {
        title: "Form với file upload và preview",
        description: "Simulate form handler nhận mixed data: text fields + file, validate và process.",
        starterCode: `interface FormFile {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  description: string;
  image?: FormFile;
}

interface ProductResult {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string;
  slug: string;
  createdAt: string;
}

function processProductForm(data: ProductFormData): {
  success?: boolean;
  data?: ProductResult;
  errors?: Record<string, string>;
} {
  // TODO: validate all fields
  // name: required, 2-100 chars
  // price: required, valid number > 0
  // category: required, one of ["electronics","clothing","food","other"]
  // description: required, min 20 chars
  // image: if provided, must be image/* type and < 2MB

  // If valid: return ProductResult with:
  // - id: random
  // - price: parsed number
  // - slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
  // - imageUrl: "/uploads/" + Date.now() + ".jpg" (if image provided)
  // - createdAt: ISO string

  return { errors: { _: "Not implemented" } };
}

// Tests
console.log(processProductForm({ name: "iPhone 15", price: "999", category: "electronics", description: "The latest iPhone with amazing features and performance.", image: { name: "iphone.jpg", type: "image/jpeg", size: 500000, dataUrl: "data:image/jpeg;base64,..." } }));

console.log(processProductForm({ name: "X", price: "-5", category: "invalid", description: "short" }));
`,
        solution: `interface FormFile { name: string; type: string; size: number; dataUrl: string; }
interface ProductFormData { name: string; price: string; category: string; description: string; image?: FormFile; }

function processProductForm(data: ProductFormData) {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.length < 2 || data.name.length > 100) errors.name = "Tên 2-100 ký tự";
  const price = parseFloat(data.price);
  if (isNaN(price) || price <= 0) errors.price = "Giá phải > 0";
  if (!["electronics","clothing","food","other"].includes(data.category)) errors.category = "Category không hợp lệ";
  if (!data.description || data.description.length < 20) errors.description = "Mô tả tối thiểu 20 ký tự";
  if (data.image) {
    if (!data.image.type.startsWith("image/")) errors.image = "Chỉ chấp nhận ảnh";
    else if (data.image.size > 2 * 1024 * 1024) errors.image = "Ảnh tối đa 2MB";
  }
  if (Object.keys(errors).length) return { errors };
  const slug = data.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return { success: true, data: { id: Math.floor(Math.random()*10000), name: data.name, price, category: data.category, description: data.description, imageUrl: data.image ? "/uploads/" + Date.now() + ".jpg" : undefined, slug, createdAt: new Date().toISOString() } };
}

console.log(processProductForm({ name: "iPhone 15", price: "999", category: "electronics", description: "The latest iPhone with amazing features and performance.", image: { name: "iphone.jpg", type: "image/jpeg", size: 500000, dataUrl: "data:..." } }));
console.log(processProductForm({ name: "X", price: "-5", category: "invalid", description: "short" }));
`,
        hint: "parseFloat cho price, check isNaN. image.type.startsWith('image/') để validate. slug: replace spaces với -, remove non-alphanum.",
      },
      {
        title: "Optimistic Like/Bookmark",
        description: "Implement social actions: like và bookmark với optimistic UI, sync, và count aggregation.",
        starterCode: `const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Server state
const serverState = {
  likes: { post1: 42, post2: 15 } as Record<string, number>,
  userLikes: new Set(["post2"]),       // user đã like post2
  userBookmarks: new Set<string>(),
};

async function serverToggleLike(postId: string, liked: boolean): Promise<{ likes: number }> {
  await delay(80);
  serverState.likes[postId] = (serverState.likes[postId] ?? 0) + (liked ? 1 : -1);
  if (liked) serverState.userLikes.add(postId);
  else serverState.userLikes.delete(postId);
  return { likes: serverState.likes[postId] };
}

// Client store
const clientState = {
  posts: {
    post1: { likes: 42, liked: false, bookmarked: false },
    post2: { likes: 15, liked: true, bookmarked: false },
  } as Record<string, { likes: number; liked: boolean; bookmarked: boolean }>,
};

async function toggleLike(postId: string): Promise<void> {
  const post = clientState.posts[postId];
  if (!post) return;

  // TODO: optimistic update (toggle liked, adjust likes count)
  // Call server, update with real count
  // On error: rollback
}

async function toggleBookmark(postId: string): Promise<void> {
  const post = clientState.posts[postId];
  if (!post) return;
  // TODO: optimistic toggle bookmark (local only, no server)
}

async function main() {
  console.log("Before:", JSON.stringify(clientState.posts));

  await Promise.all([toggleLike("post1"), toggleBookmark("post2")]);
  console.log("After toggle:", JSON.stringify(clientState.posts));

  await toggleLike("post1"); // unlike
  console.log("After unlike:", JSON.stringify(clientState.posts.post1));
}
main();
`,
        hint: "Lưu previous state trước khi update. Update optimistically, gọi server, update với server result. Trong catch: restore previous.",
      },
    ],
    playgrounds: [
      {
        title: "Full form với validation, preview, submit",
        description: "Xây dựng complete form handler: validate, transform, preview trước khi submit. Thử nghiệm!",
        starterCode: `// Complete form processing pipeline
type FormData = Record<string, unknown>;

// ── Validators ──
const validators = {
  required: (v: unknown) => (!v ? "Bắt buộc" : null),
  email: (v: unknown) => (!/^[^@]+@[^@]+\.[^@]+$/.test(String(v)) ? "Email không hợp lệ" : null),
  minLength: (n: number) => (v: unknown) => (String(v).length < n ? \`Tối thiểu \${n} ký tự\` : null),
  maxLength: (n: number) => (v: unknown) => (String(v).length > n ? \`Tối đa \${n} ký tự\` : null),
  number: (v: unknown) => (isNaN(Number(v)) ? "Phải là số" : null),
  min: (n: number) => (v: unknown) => (Number(v) < n ? \`Tối thiểu \${n}\` : null),
};

// ── Form Schema ──
const registrationSchema: Record<string, Array<(v: unknown) => string | null>> = {
  name: [validators.required, validators.minLength(2), validators.maxLength(50)],
  email: [validators.required, validators.email],
  password: [validators.required, validators.minLength(8)],
  age: [validators.required, validators.number, validators.min(18)],
};

function validateForm(data: FormData, schema: typeof registrationSchema) {
  const errors: Record<string, string[]> = {};
  for (const [field, rules] of Object.entries(schema)) {
    const errs = rules.map(r => r(data[field])).filter(Boolean) as string[];
    if (errs.length) errors[field] = errs;
  }
  return Object.keys(errors).length ? errors : null;
}

// ── Submit handler ──
async function handleRegistration(rawData: FormData) {
  console.log("\\nSubmitting:", rawData);

  const errors = validateForm(rawData, registrationSchema);
  if (errors) { console.log("Validation errors:", errors); return { error: errors }; }

  // Transform
  const processed = {
    ...rawData,
    age: Number(rawData.age),
    name: String(rawData.name).trim(),
    email: String(rawData.email).toLowerCase().trim(),
    password: "hashed_" + rawData.password, // would use bcrypt
    createdAt: new Date().toISOString(),
    id: Math.random().toString(36).slice(2),
  };

  console.log("Processed:", processed);
  return { success: true, user: { id: processed.id, name: processed.name, email: processed.email } };
}

// Test various scenarios
handleRegistration({ name: "A", email: "bad", password: "123", age: "15" });
handleRegistration({ name: "Alice Nguyen", email: "alice@example.com", password: "securePass123", age: "25" });

// Thêm: confirmPassword check, phone validation, terms agreement...
`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  {
    id: "05-auth-middleware",
    title: "Authentication & Middleware",
    description: "NextAuth.js, JWT, protected routes, middleware",
    level: "Nâng cao",
    content: `
## Authentication trong Next.js

### Cách tiếp cận phổ biến

1. **NextAuth.js (Auth.js)** — thư viện OAuth/Email auth mạnh nhất
2. **Clerk** — auth-as-a-service, setup nhanh
3. **Custom JWT** — tự làm với jose hoặc jsonwebtoken

## NextAuth.js Setup

\`\`\`tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
    Google({ clientId: process.env.GOOGLE_ID!, clientSecret: process.env.GOOGLE_SECRET! }),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const user = await db.user.findUnique({ where: { email: credentials.email } });
        if (!user || !await bcrypt.compare(credentials.password, user.password)) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role; // thêm custom field
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // expose cho client
      return session;
    },
  },
});

export const { GET, POST } = handlers;
\`\`\`

### Sử dụng session

\`\`\`tsx
// Server Component
import { auth } from "@/auth";

export default async function ProtectedPage() {
  const session = await auth();
  if (!session) redirect("/login");
  return <div>Hello, {session.user.name}!</div>;
}

// Client Component
"use client";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();
  if (status === "loading") return <Spinner />;
  if (!session) return <SignInButton />;
  return <div>{session.user.email}</div>;
}
\`\`\`

## Middleware

\`\`\`tsx
// middleware.ts (root của project)
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
\`\`\`

## Role-based Authorization

\`\`\`tsx
// lib/auth-utils.ts
export function requireRole(requiredRole: string) {
  return async function(req: NextRequest) {
    const session = await auth();
    if (!session) throw new AuthError("Unauthorized");
    if (session.user.role !== requiredRole) throw new AuthError("Forbidden");
    return session;
  };
}

// Usage in Server Action
export async function deletePost(id: number) {
  const session = await requireRole("admin")();
  await db.post.delete({ where: { id } });
}
\`\`\`
`,
    codeExample: `// JWT Authentication system hoàn chỉnh (TypeScript)

// ── Types ──
interface User {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin" | "moderator";
  passwordHash: string;
}

interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface Session {
  user: { id: number; email: string; name: string; role: string };
  expires: string;
}

// ── Simple crypto (simulate jose/jsonwebtoken) ──
function btoa64(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}
function atob64(str: string): unknown {
  return JSON.parse(Buffer.from(str, "base64url").toString());
}

const JWT_SECRET = "nextjs-auth-secret";

function signJWT(payload: Omit<JWTPayload, "iat" | "exp">, expiresInSec = 3600): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = { ...payload, iat: now, exp: now + expiresInSec };
  const header = btoa64({ alg: "HS256", typ: "JWT" });
  const body = btoa64(fullPayload);
  const sig = require("crypto").createHmac("sha256", JWT_SECRET).update(header + "." + body).digest("base64url");
  return header + "." + body + "." + sig;
}

function verifyJWT(token: string): JWTPayload {
  const [h, b, s] = token.split(".");
  const expected = require("crypto").createHmac("sha256", JWT_SECRET).update(h + "." + b).digest("base64url");
  if (s !== expected) throw new Error("Invalid signature");
  const payload = atob64(b) as JWTPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error("Token expired");
  return payload;
}

// ── Auth System ──
const users: User[] = [];
let nextId = 1;

function hashPassword(pwd: string): string {
  const salt = require("crypto").randomBytes(8).toString("hex");
  const hash = require("crypto").createHash("sha256").update(salt + pwd).digest("hex");
  return salt + ":" + hash;
}

function verifyPassword(pwd: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  return require("crypto").createHash("sha256").update(salt + pwd).digest("hex") === hash;
}

async function register(email: string, password: string, name: string): Promise<{ token: string; user: Omit<User, "passwordHash"> }> {
  if (users.find(u => u.email === email)) throw new Error("Email already exists");
  const user: User = { id: nextId++, email, name, role: "user", passwordHash: hashPassword(password) };
  users.push(user);
  const token = signJWT({ userId: user.id, email: user.email, role: user.role });
  const { passwordHash: _, ...publicUser } = user;
  return { token, user: publicUser };
}

async function login(email: string, password: string): Promise<{ token: string; session: Session }> {
  const user = users.find(u => u.email === email);
  if (!user || !verifyPassword(password, user.passwordHash)) throw new Error("Invalid credentials");
  const token = signJWT({ userId: user.id, email: user.email, role: user.role });
  const session: Session = {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    expires: new Date(Date.now() + 3600000).toISOString(),
  };
  return { token, session };
}

function requireAuth(token: string): JWTPayload {
  return verifyJWT(token);
}

function requireRole(token: string, role: string): JWTPayload {
  const payload = verifyJWT(token);
  if (payload.role !== role) throw new Error("Forbidden: requires " + role + " role");
  return payload;
}

// ── Demo ──
async function demo() {
  const { token: t1, user } = await register("alice@example.com", "Password123!", "Alice");
  console.log("Registered:", user);

  const { token: t2, session } = await login("alice@example.com", "Password123!");
  console.log("Session:", session);

  const payload = requireAuth(t2);
  console.log("Auth payload:", payload);

  try {
    requireRole(t2, "admin");
  } catch (e: any) {
    console.log("Admin check:", e.message);
  }

  // Make user admin
  users[0].role = "admin";
  const adminToken = signJWT({ userId: 1, email: "alice@example.com", role: "admin" });
  const adminPayload = requireRole(adminToken, "admin");
  console.log("Admin access granted:", adminPayload.role);
}

demo();
`,
    exercises: [
      {
        title: "Middleware chain",
        description: "Implement Next.js style middleware chain: cors, rateLimit, auth, logging.",
        starterCode: `type MiddlewareFn = (req: MockReq, next: () => Response | null) => Response | null;
type Response = { status: number; body: unknown; headers?: Record<string, string> };

interface MockReq {
  method: string;
  url: string;
  headers: Record<string, string>;
  ip?: string;
}

// Middleware factory functions
function withCors(allowedOrigins: string[]): MiddlewareFn {
  return (req, next) => {
    const origin = req.headers.origin ?? "";
    if (req.method === "OPTIONS") {
      return { status: 204, body: null, headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Max-Age": "86400",
      }};
    }
    const res = next();
    if (res && allowedOrigins.includes(origin)) {
      res.headers = { ...res.headers, "Access-Control-Allow-Origin": origin };
    }
    return res;
  };
}

function withRateLimit(maxReq: number, windowMs: number): MiddlewareFn {
  const store = new Map<string, { count: number; reset: number }>();
  return (req, next) => {
    const key = req.ip ?? "unknown";
    const now = Date.now();
    let record = store.get(key);
    if (!record || now > record.reset) record = { count: 0, reset: now + windowMs };
    record.count++;
    store.set(key, record);
    if (record.count > maxReq)
      return { status: 429, body: { error: "Too Many Requests" }, headers: { "Retry-After": String(Math.ceil((record.reset - now) / 1000)) } };
    return next();
  };
}

function withAuth(secret: string): MiddlewareFn {
  // TODO: verify Bearer token, attach user to req, return 401 if invalid
  // Simple check: token === "valid-token-" + userId
  return (req, next) => {
    return next();
  };
}

function withLogging(): MiddlewareFn {
  return (req, next) => {
    const start = Date.now();
    const res = next();
    console.log(\`[\${req.method}] \${req.url} -> \${res?.status} (\${Date.now() - start}ms)\`);
    return res;
  };
}

function composeMiddleware(middlewares: MiddlewareFn[], finalHandler: (req: MockReq) => Response): (req: MockReq) => Response {
  // TODO: compose middlewares từ ngoài vào trong
  // Mỗi middleware nhận next = middleware tiếp theo (hoặc finalHandler)
  return (req) => finalHandler(req);
}

// Final handler
const handler = (req: MockReq): Response => ({ status: 200, body: { message: "Hello " + (req as any).user?.name ?? "Guest" } });

const app = composeMiddleware([
  withLogging(),
  withCors(["https://myapp.com"]),
  withRateLimit(3, 1000),
  withAuth("secret"),
], handler);

// Test
const req = { method: "GET", url: "/api/data", headers: { origin: "https://myapp.com", authorization: "Bearer valid-token-1" }, ip: "127.0.0.1" };
console.log(app(req));
console.log(app(req));
console.log(app(req));
console.log(app({ ...req, ip: "1.2.3.4" })); // rate limit fresh for new IP
`,
        hint: "composeMiddleware: reduceRight qua middlewares, mỗi lần wrap handler trong middleware. withAuth: check headers.authorization.",
      },
      {
        title: "RBAC — Role-Based Access Control",
        description: "Implement hệ thống permission: roles có nhiều permissions, resource actions được protect.",
        starterCode: `// RBAC system
type Permission = string; // e.g., "posts:read", "posts:write", "users:admin"
type Role = "guest" | "user" | "moderator" | "admin";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  guest: ["posts:read"],
  user: ["posts:read", "posts:write", "comments:read", "comments:write", "profile:edit"],
  moderator: ["posts:read", "posts:write", "posts:delete", "comments:read", "comments:write", "comments:delete", "users:read"],
  admin: ["*"], // wildcard = all permissions
};

interface AuthUser {
  id: number;
  email: string;
  role: Role;
}

class RBACService {
  hasPermission(user: AuthUser, permission: Permission): boolean {
    // TODO: check if user's role includes the permission
    // Admin với "*" có tất cả permissions
    return false;
  }

  requirePermission(user: AuthUser, permission: Permission): void {
    // TODO: throw Error nếu không có permission
  }

  canAccess(user: AuthUser, resource: string, action: string): boolean {
    // TODO: check permission "resource:action"
    return false;
  }

  getPermissions(user: AuthUser): Permission[] {
    // TODO: trả về tất cả permissions của user
    return [];
  }
}

const rbac = new RBACService();

const admin: AuthUser = { id: 1, email: "admin@x.com", role: "admin" };
const mod: AuthUser = { id: 2, email: "mod@x.com", role: "moderator" };
const user: AuthUser = { id: 3, email: "user@x.com", role: "user" };
const guest: AuthUser = { id: 0, email: "", role: "guest" };

console.log("Admin can delete posts:", rbac.canAccess(admin, "posts", "delete")); // true
console.log("User can delete posts:", rbac.canAccess(user, "posts", "delete"));   // false
console.log("Mod can read users:", rbac.canAccess(mod, "users", "read"));         // true
console.log("Guest posts:", rbac.getPermissions(guest));

try {
  rbac.requirePermission(user, "users:admin");
} catch (e: any) {
  console.log("Permission denied:", e.message);
}
`,
        solution: `type Permission = string;
type Role = "guest" | "user" | "moderator" | "admin";
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  guest: ["posts:read"],
  user: ["posts:read","posts:write","comments:read","comments:write","profile:edit"],
  moderator: ["posts:read","posts:write","posts:delete","comments:read","comments:write","comments:delete","users:read"],
  admin: ["*"],
};
interface AuthUser { id: number; email: string; role: Role; }

class RBACService {
  hasPermission(user: AuthUser, permission: Permission): boolean {
    const perms = ROLE_PERMISSIONS[user.role] ?? [];
    return perms.includes("*") || perms.includes(permission);
  }
  requirePermission(user: AuthUser, permission: Permission): void {
    if (!this.hasPermission(user, permission)) throw new Error("Forbidden: requires " + permission);
  }
  canAccess(user: AuthUser, resource: string, action: string): boolean {
    return this.hasPermission(user, resource + ":" + action);
  }
  getPermissions(user: AuthUser): Permission[] {
    return ROLE_PERMISSIONS[user.role] ?? [];
  }
}

const rbac = new RBACService();
const admin: AuthUser = { id: 1, email: "admin@x.com", role: "admin" };
const mod: AuthUser = { id: 2, email: "mod@x.com", role: "moderator" };
const user: AuthUser = { id: 3, email: "user@x.com", role: "user" };
const guest: AuthUser = { id: 0, email: "", role: "guest" };
console.log("Admin can delete:", rbac.canAccess(admin, "posts", "delete"));
console.log("User can delete:", rbac.canAccess(user, "posts", "delete"));
console.log("Mod read users:", rbac.canAccess(mod, "users", "read"));
console.log("Guest perms:", rbac.getPermissions(guest));
try { rbac.requirePermission(user, "users:admin"); } catch(e: any) { console.log("Denied:", e.message); }
`,
        hint: "Với admin: check includes('*'). RBAC.hasPermission kiểm tra 'resource:action' trong mảng permissions của role.",
      },
      {
        title: "Session management",
        description: "Implement session store với create, get, refresh, revoke và auto-cleanup expired sessions.",
        starterCode: `interface SessionData {
  userId: number;
  email: string;
  role: string;
  createdAt: number;
  expiresAt: number;
  lastActive: number;
  ip?: string;
  userAgent?: string;
}

class SessionStore {
  private sessions = new Map<string, SessionData>();
  private readonly TTL = 3600 * 1000; // 1 hour

  create(userId: number, email: string, role: string, meta?: { ip?: string; userAgent?: string }): string {
    // TODO: generate session ID (random hex), create session, store it
    // Cleanup expired sessions while we're at it
    return "";
  }

  get(sessionId: string): SessionData | null {
    // TODO: return session if valid, null if expired or not found
    // Update lastActive
  }

  refresh(sessionId: string): boolean {
    // TODO: extend TTL by this.TTL from now
    return false;
  }

  revoke(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  revokeAll(userId: number): number {
    // TODO: revoke all sessions for a userId, return count
    return 0;
  }

  getActiveSessions(userId: number): Array<Pick<SessionData, "createdAt" | "lastActive" | "ip">> {
    // TODO: return active sessions for user
    return [];
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [id, s] of this.sessions.entries()) {
      if (s.expiresAt < now) this.sessions.delete(id);
    }
  }
}

const store = new SessionStore();

const s1 = store.create(1, "alice@example.com", "user", { ip: "192.168.1.1" });
const s2 = store.create(1, "alice@example.com", "user", { ip: "10.0.0.1" });
const s3 = store.create(2, "bob@example.com", "admin", { ip: "172.16.0.1" });

console.log("Session valid:", !!store.get(s1));
console.log("Alice sessions:", store.getActiveSessions(1).length);

store.revoke(s1);
console.log("After revoke:", !!store.get(s1));

const revoked = store.revokeAll(1);
console.log("Revoked all for user 1:", revoked);
console.log("Alice sessions after revokeAll:", store.getActiveSessions(1).length);
console.log("Bob session still valid:", !!store.get(s3));
`,
        hint: "Session ID: crypto.randomBytes(32).toString('hex'). getActiveSessions: filter by userId và expiresAt > now.",
      },
      {
        title: "Protected route guard",
        description: "Tạo hàm withProtectedRoute() wrap handler với auth + permission check, cho cả pages và API.",
        starterCode: `// Route protection HOC pattern
interface AuthContext {
  user: { id: number; email: string; role: string };
}

type Handler<T = unknown> = (ctx: AuthContext, ...args: unknown[]) => Promise<T>;
type ProtectedHandler<T = unknown> = (...args: unknown[]) => Promise<T | { error: string; status: number }>;

// Simulate auth (trong Next.js dùng auth() từ NextAuth)
const tokens: Record<string, AuthContext> = {
  "token-user": { user: { id: 1, email: "user@x.com", role: "user" } },
  "token-admin": { user: { id: 2, email: "admin@x.com", role: "admin" } },
};

function getAuthContext(token: string): AuthContext | null {
  return tokens[token] ?? null;
}

function withAuth<T>(handler: Handler<T>): (token: string, ...args: unknown[]) => Promise<T | { error: string; status: number }> {
  // TODO: wrap handler, verify token, pass ctx
}

function withRole<T>(role: string, handler: Handler<T>): (token: string, ...args: unknown[]) => Promise<T | { error: string; status: number }> {
  // TODO: wrap with auth + role check
}

// Example handlers
const getProfile: Handler<{ profile: AuthContext["user"] }> = async (ctx) => {
  return { profile: ctx.user };
};

const deleteUser: Handler<{ deleted: boolean }> = async (ctx, userId: unknown) => {
  return { deleted: true };
};

async function main() {
  const protectedGetProfile = withAuth(getProfile);
  const adminDeleteUser = withRole("admin", deleteUser);

  console.log("No auth:", await protectedGetProfile("invalid-token"));
  console.log("Valid auth:", await protectedGetProfile("token-user"));
  console.log("User tries admin:", await adminDeleteUser("token-user", 5));
  console.log("Admin action:", await adminDeleteUser("token-admin", 5));
}
main();
`,
        hint: "withAuth: call getAuthContext(token), nếu null return 401. withRole: dùng withAuth + thêm role check.",
      },
    ],
    playgrounds: [
      {
        title: "Build your auth system",
        description: "Tạo complete auth system: register, login, JWT, sessions, RBAC. Thử nghiệm tự do!",
        starterCode: `// Complete Auth System Playground
const crypto = require("crypto");

// ── Config ──
const JWT_SECRET = "playground-secret";
const SESSION_TTL = 3600 * 1000;

// ── Helpers ──
const hashPwd = (pwd: string) => {
  const salt = crypto.randomBytes(8).toString("hex");
  return salt + ":" + crypto.createHash("sha256").update(salt + pwd).digest("hex");
};
const checkPwd = (pwd: string, h: string) => {
  const [s, hash] = h.split(":");
  return crypto.createHash("sha256").update(s + pwd).digest("hex") === hash;
};
const makeToken = (payload: object) => {
  const h = Buffer.from('{"alg":"HS256"}').toString("base64url");
  const b = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + SESSION_TTL })).toString("base64url");
  const s = crypto.createHmac("sha256", JWT_SECRET).update(h + "." + b).digest("base64url");
  return h + "." + b + "." + s;
};
const readToken = (token: string) => {
  const [h, b, s] = token.split(".");
  if (crypto.createHmac("sha256", JWT_SECRET).update(h + "." + b).digest("base64url") !== s) throw new Error("Invalid");
  const p: any = JSON.parse(Buffer.from(b, "base64url").toString());
  if (p.exp < Date.now()) throw new Error("Expired");
  return p;
};

// ── Store ──
const db = { users: [] as any[], posts: [] as any[], ids: { user: 1, post: 1 } };

// ── Actions ──
const auth = {
  register(email: string, pwd: string, name: string) {
    if (db.users.find(u => u.email === email)) throw new Error("Email exists");
    const user = { id: db.ids.user++, email, name, role: "user", pwd: hashPwd(pwd) };
    db.users.push(user);
    return { token: makeToken({ id: user.id, email, role: user.role }), name };
  },
  login(email: string, pwd: string) {
    const user = db.users.find(u => u.email === email);
    if (!user || !checkPwd(pwd, user.pwd)) throw new Error("Invalid credentials");
    return { token: makeToken({ id: user.id, email, role: user.role }), name: user.name };
  },
  me(token: string) { return readToken(token); },
};

// Test the system
const { token: t1 } = auth.register("alice@example.com", "pass123", "Alice");
const { token: t2 } = auth.login("alice@example.com", "pass123");
console.log("Registered & logged in:", auth.me(t2));

// Add your own features: posts CRUD with auth, admin panel, password reset...
`,
      },
    ],
  },
];
