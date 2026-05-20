export interface Exercise {
  title: string;
  description: string;
  starterCode: string;
  solution?: string;
  hint: string;
}

export interface Playground {
  title: string;
  description: string;
  starterCode: string;
  hint?: string;
}

export interface VideoItem {
  title: string;
  file: string; // relative path from VIDEO_BASE_PATH
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
  content: string;
  codeExample: string;
  exercises: Exercise[];
  playgrounds?: Playground[];
  videos?: VideoItem[];
}

export const typescriptLessons: Lesson[] = [
  {
    id: "01-gioi-thieu",
    title: "Giới thiệu TypeScript",
    description: "TypeScript là gì và tại sao nên dùng",
    level: "Cơ bản",
    content: `
## TypeScript là gì?

**TypeScript** là một superset của JavaScript được phát triển bởi Microsoft. TypeScript thêm **kiểu dữ liệu tĩnh (static typing)** vào JavaScript, giúp phát hiện lỗi ngay lúc viết code thay vì khi chạy chương trình.

### Lợi ích của TypeScript:
- ✅ **Phát hiện lỗi sớm** — Trình biên dịch báo lỗi trước khi chạy
- ✅ **IntelliSense tốt hơn** — Gợi ý code thông minh hơn
- ✅ **Code dễ đọc, dễ bảo trì** — Kiểu dữ liệu là tài liệu tự động
- ✅ **Tương thích JavaScript** — Mọi code JS đều là code TS hợp lệ

### Cách TypeScript hoạt động:
\`\`\`
TypeScript (.ts) → Biên dịch → JavaScript (.js) → Chạy trên trình duyệt/Node.js
\`\`\`

TypeScript không chạy trực tiếp — nó được **biên dịch** sang JavaScript trước khi thực thi.

### Khai báo biến có kiểu:
\`\`\`ts
let ten: string = "An";
let tuoi: number = 20;
let daHoc: boolean = true;
\`\`\`
    `,
    codeExample: `// JavaScript - không có kiểu dữ liệu, lỗi chỉ thấy khi chạy
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3));   // 8 ✓
// console.log(add(5, "3")); // Lỗi compile-time ✗

// TypeScript tự suy luận kiểu (type inference)
let so = 42;        // TypeScript tự biết đây là number
let chuoi = "hello"; // TypeScript tự biết đây là string

// Union type - có thể là một trong nhiều kiểu
let id: number | string = 123;
id = "ABC-456"; // cũng OK

console.log("TypeScript hoạt động!", so, chuoi, id);`,
    exercises: [
      {
        title: "Bài tập 1: Hàm chào hỏi có kiểu",
        description: "Viết hàm `greet(name: string): string` trả về chuỗi 'Xin chào, {name}!'",
        starterCode: `// Viết hàm greet nhận tham số name kiểu string
// và trả về chuỗi "Xin chào, {name}!"

function greet(name: string): string {
  // TODO: viết code ở đây
  return "";
}

console.log(greet("TypeScript")); // Xin chào, TypeScript!
console.log(greet("Việt Nam"));   // Xin chào, Việt Nam!`,
        solution: `function greet(name: string): string {
  return \`Xin chào, \${name}!\`;
}
console.log(greet("TypeScript"));
console.log(greet("Việt Nam"));`,
        hint: "Dùng template literal: `Xin chào, ${name}!`",
      },
      {
        title: "Bài tập 2: Tính diện tích hình chữ nhật",
        description: "Viết hàm `dienTich(dai: number, rong: number): number` tính diện tích hình chữ nhật. Thêm kiểm tra: nếu dai hoặc rong <= 0, trả về 0.",
        starterCode: `function dienTich(dai: number, rong: number): number {
  // TODO: kiểm tra dai và rong > 0
  // TODO: tính và trả về diện tích
  return 0;
}

console.log(dienTich(5, 3));   // 15
console.log(dienTich(10, 4));  // 40
console.log(dienTich(-1, 3));  // 0 (invalid)
console.log(dienTich(5, 0));   // 0 (invalid)`,
        solution: `function dienTich(dai: number, rong: number): number {
  if (dai <= 0 || rong <= 0) return 0;
  return dai * rong;
}

console.log(dienTich(5, 3));
console.log(dienTich(10, 4));
console.log(dienTich(-1, 3));
console.log(dienTich(5, 0));`,
        hint: "Dùng if để kiểm tra điều kiện hợp lệ trước khi tính",
      },
      {
        title: "Bài tập 3: Thông tin người dùng",
        description: "Khai báo biến `ten`, `tuoi`, `email` với kiểu tường minh. Viết hàm `inThongTin` nhận 3 tham số đó và in ra màn hình.",
        starterCode: `// Khai báo với kiểu tường minh
const ten: string = "Nguyen Van An";
const tuoi: number = // TODO
const email: string = // TODO

function inThongTin(ten: string, tuoi: number, email: string): void {
  // TODO: in ra định dạng:
  // Tên: Nguyen Van An
  // Tuổi: 20
  // Email: an@example.com
}

inThongTin(ten, tuoi, email);`,
        solution: `const ten: string = "Nguyen Van An";
const tuoi: number = 20;
const email: string = "an@example.com";

function inThongTin(ten: string, tuoi: number, email: string): void {
  console.log(\`Tên: \${ten}\`);
  console.log(\`Tuổi: \${tuoi}\`);
  console.log(\`Email: \${email}\`);
}

inThongTin(ten, tuoi, email);`,
        hint: "Return type là void khi hàm không trả về giá trị. Dùng console.log với template literal.",
      },
      {
        title: "Bài tập 4: Định dạng tiền VND",
        description: "Viết hàm `formatVND(amount: number): string` trả về dạng '1.500.000 ₫'. Viết thêm `formatCompact(amount: number): string` rút gọn: 1500000 → '1,5 triệu', 2500000000 → '2,5 tỷ'. Ứng dụng thực tế: hiển thị giá sản phẩm trên website.",
        starterCode: `function formatVND(amount: number): string {
  // TODO: dùng toLocaleString("vi-VN") và thêm ký hiệu ₫
  return "";
}

function formatCompact(amount: number): string {
  // TODO: >= 1_000_000_000 → "X tỷ"
  //        >= 1_000_000     → "X triệu"
  //        >= 1_000         → "X nghìn"
  return "";
}

// Ứng dụng: hiển thị giá sản phẩm
const products = [
  { ten: "MacBook Pro", gia: 49_990_000 },
  { ten: "iPhone 15",   gia: 23_990_000 },
  { ten: "AirPods",     gia: 4_990_000  },
];

products.forEach(p => {
  console.log(p.ten + ": " + formatVND(p.gia) + " (" + formatCompact(p.gia) + ")");
});`,
        solution: `function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + " ₫";
}

function formatCompact(amount: number): string {
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toLocaleString("vi-VN") + " tỷ";
  if (amount >= 1_000_000) return (amount / 1_000_000).toLocaleString("vi-VN") + " triệu";
  if (amount >= 1_000) return (amount / 1_000).toLocaleString("vi-VN") + " nghìn";
  return formatVND(amount);
}

const products = [
  { ten: "MacBook Pro", gia: 49_990_000 },
  { ten: "iPhone 15",   gia: 23_990_000 },
  { ten: "AirPods",     gia: 4_990_000  },
];

products.forEach(p => {
  console.log(p.ten + ": " + formatVND(p.gia) + " (" + formatCompact(p.gia) + ")");
});`,
        hint: "toLocaleString('vi-VN') tự thêm dấu chấm phân cách. Chia cho 1_000_000_000 / 1_000_000 / 1_000 để ra đơn vị lớn hơn.",
      },
      {
        title: "Bài tập 5: Validate email và số điện thoại",
        description: "Viết `validateEmail(email: string): boolean` và `validatePhone(phone: string): boolean` (10 số, bắt đầu 03/05/07/08/09). Viết `validate(value, type): { valid: boolean; error?: string }` dùng trong form đăng ký người dùng.",
        starterCode: `function validateEmail(email: string): boolean {
  // TODO: có đúng 1 ký tự @, phần local > 0, domain có dấu chấm
  return false;
}

function validatePhone(phone: string): boolean {
  // TODO: đúng 10 ký tự số, 2 số đầu thuộc ["03","05","07","08","09"]
  return false;
}

type ValidResult = { valid: boolean; error?: string };

function validate(value: string, type: "email" | "phone"): ValidResult {
  // TODO: trả về { valid: true } hoặc { valid: false, error: "..." }
  return { valid: false };
}

// Test form đăng ký
const formData = [
  { field: "email", value: "user@example.com" },
  { field: "email", value: "khong_hop_le" },
  { field: "phone", value: "0901234567" },
  { field: "phone", value: "1234567" },
];

formData.forEach(({ field, value }) => {
  const r = validate(value, field as "email" | "phone");
  console.log(field + " '" + value + "':", r.valid ? "OK" : "Lỗi: " + r.error);
});`,
        solution: `function validateEmail(email: string): boolean {
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  return local.length > 0 && domain.includes(".") && !domain.startsWith(".");
}

function validatePhone(phone: string): boolean {
  if (phone.length !== 10) return false;
  return ["03","05","07","08","09"].includes(phone.slice(0, 2));
}

type ValidResult = { valid: boolean; error?: string };

function validate(value: string, type: "email" | "phone"): ValidResult {
  if (type === "email")
    return validateEmail(value) ? { valid: true } : { valid: false, error: "Email không hợp lệ" };
  return validatePhone(value) ? { valid: true } : { valid: false, error: "SĐT phải 10 số, bắt đầu 03/05/07/08/09" };
}

const formData = [
  { field: "email", value: "user@example.com" },
  { field: "email", value: "khong_hop_le" },
  { field: "phone", value: "0901234567" },
  { field: "phone", value: "1234567" },
];

formData.forEach(({ field, value }) => {
  const r = validate(value, field as "email" | "phone");
  console.log(field + " '" + value + "':", r.valid ? "OK" : "Lỗi: " + r.error);
});`,
        hint: "Email: split('@') cho mảng 2 phần, domain phải có dấu chấm. Phone: .slice(0,2) lấy 2 số đầu rồi dùng .includes().",
      },
    ],
  },
  {
    id: "02-kieu-du-lieu",
    title: "Kiểu dữ liệu cơ bản",
    description: "number, string, boolean, null, undefined, any, union types",
    level: "Cơ bản",
    content: `
## Các kiểu dữ liệu cơ bản trong TypeScript

### Kiểu số — \`number\`
Bao gồm số nguyên và số thập phân:
\`\`\`ts
let tuoi: number = 25;
let diemTrungBinh: number = 8.5;
let soAm: number = -10;
\`\`\`

### Kiểu chuỗi — \`string\`
\`\`\`ts
let ten: string = "Nguyễn Văn An";
let loi: string = \`Xin chào, \${ten}!\`; // Template literal
\`\`\`

### Kiểu boolean — \`boolean\`
\`\`\`ts
let daHocXong: boolean = true;
let dangHoc: boolean = false;
\`\`\`

### Union Type — \`A | B\`
Biến có thể là **một trong nhiều kiểu**:
\`\`\`ts
let id: number | string = 123;
id = "ABC-456"; // OK
\`\`\`

### Kiểu đặc biệt
- **\`any\`** — Tắt kiểm tra kiểu (tránh dùng)
- **\`null\`** — Giá trị rỗng có chủ đích
- **\`undefined\`** — Chưa được gán giá trị
- **\`void\`** — Hàm không trả về gì
- **\`never\`** — Không bao giờ xảy ra

### Type Inference — Suy luận kiểu
TypeScript **tự động nhận biết kiểu** từ giá trị gán:
\`\`\`ts
let x = 42;        // TypeScript tự biết: number
let s = "hello";   // TypeScript tự biết: string
\`\`\`
    `,
    codeExample: `// Primitive types
let tuoi: number = 20;
let ten: string = "An";
let daHoc: boolean = true;

// TypeScript tự suy luận kiểu
let diem = 9.5;      // inferred: number
let truong = "HUST"; // inferred: string

// Union type
let id: number | string = 123;
id = "ABC-456";

// Literal type - chỉ nhận giá trị cố định
let huongGio: "Bắc" | "Nam" | "Đông" | "Tây" = "Bắc";
huongGio = "Nam"; // OK
// huongGio = "Tây Nam"; // Lỗi!

// Nullish coalescing (??) và optional chaining (?.)
let tenNguoiDung: string | null = null;
let hienThi = tenNguoiDung ?? "Khách";
console.log(hienThi); // "Khách"

// typeof để kiểm tra kiểu lúc runtime
function inKieu(x: number | string): void {
  if (typeof x === "number") {
    console.log("Số:", x * 2);
  } else {
    console.log("Chuỗi:", x.toUpperCase());
  }
}

inKieu(42);      // Số: 84
inKieu("hello"); // Chuỗi: HELLO`,
    exercises: [
      {
        title: "Bài tập 1: Phân loại giá trị",
        description: "Viết hàm `phanLoai(x: number | string | boolean): string` trả về mô tả kiểu và giá trị của x. Ví dụ: phanLoai(42) → 'Số: 42', phanLoai('hi') → 'Chuỗi: hi'",
        starterCode: `function phanLoai(x: number | string | boolean): string {
  // TODO: dùng typeof để kiểm tra kiểu
  // và trả về mô tả phù hợp
  return "";
}

console.log(phanLoai(42));      // Số: 42
console.log(phanLoai("hello")); // Chuỗi: hello
console.log(phanLoai(true));    // Boolean: true
console.log(phanLoai(3.14));    // Số: 3.14`,
        solution: `function phanLoai(x: number | string | boolean): string {
  if (typeof x === "number") return \`Số: \${x}\`;
  if (typeof x === "string") return \`Chuỗi: \${x}\`;
  return \`Boolean: \${x}\`;
}

console.log(phanLoai(42));
console.log(phanLoai("hello"));
console.log(phanLoai(true));
console.log(phanLoai(3.14));`,
        hint: "Dùng typeof để kiểm tra: typeof x === 'number', typeof x === 'string', typeof x === 'boolean'",
      },
      {
        title: "Bài tập 2: Xử lý giá trị nullable",
        description: "Viết hàm `layTen(ten: string | null | undefined): string` trả về tên nếu có, hoặc 'Khách vãng lai' nếu null/undefined.",
        starterCode: `function layTen(ten: string | null | undefined): string {
  // TODO: dùng ?? hoặc if để xử lý null/undefined
  return "";
}

console.log(layTen("Nguyễn An"));  // Nguyễn An
console.log(layTen(null));          // Khách vãng lai
console.log(layTen(undefined));     // Khách vãng lai
console.log(layTen(""));            // Khách vãng lai (chuỗi rỗng cũng tính là không có)`,
        solution: `function layTen(ten: string | null | undefined): string {
  return ten || "Khách vãng lai";
}

console.log(layTen("Nguyễn An"));
console.log(layTen(null));
console.log(layTen(undefined));
console.log(layTen(""));`,
        hint: "Dùng || để bắt cả null, undefined và chuỗi rỗng. Hoặc dùng if (!ten) return 'Khách vãng lai'",
      },
      {
        title: "Bài tập 3: Máy đổi tiền",
        description: "Viết hàm `doiTien(soTien: number, donVi: 'USD' | 'EUR' | 'JPY'): string`. Tỉ giá: 1 USD = 25000 VND, 1 EUR = 27000 VND, 1 JPY = 170 VND.",
        starterCode: `function doiTien(soTien: number, donVi: "USD" | "EUR" | "JPY"): string {
  // TODO: tính ra VND tương đương
  let vnd = 0;
  // ...
  return \`\${soTien} \${donVi} = \${vnd.toLocaleString()} VND\`;
}

console.log(doiTien(1, "USD"));   // 1 USD = 25,000 VND
console.log(doiTien(2, "EUR"));   // 2 EUR = 54,000 VND
console.log(doiTien(100, "JPY")); // 100 JPY = 17,000 VND`,
        solution: `function doiTien(soTien: number, donVi: "USD" | "EUR" | "JPY"): string {
  const tiGia = { USD: 25000, EUR: 27000, JPY: 170 };
  const vnd = soTien * tiGia[donVi];
  return \`\${soTien} \${donVi} = \${vnd.toLocaleString()} VND\`;
}

console.log(doiTien(1, "USD"));
console.log(doiTien(2, "EUR"));
console.log(doiTien(100, "JPY"));`,
        hint: "Dùng object literal làm bảng tỉ giá: const tiGia = { USD: 25000, EUR: 27000, JPY: 170 }",
      },
      {
        title: "Bài tập 4: Máy trạng thái đơn hàng",
        description: "Trong thực tế, đơn hàng có trạng thái rõ ràng. Định nghĩa type `OrderStatus` với 5 trạng thái. Viết `nextStatus(current: OrderStatus): OrderStatus | null` (null nếu đã kết thúc) và `canCancel(status: OrderStatus): boolean`.",
        starterCode: `type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";

// Định nghĩa các chuyển đổi hợp lệ
const transitions: Record<OrderStatus, OrderStatus | null> = {
  pending:   "confirmed",
  confirmed: "shipping",
  shipping:  "delivered",
  delivered: null,
  cancelled: null,
};

function nextStatus(current: OrderStatus): OrderStatus | null {
  // TODO: trả về trạng thái tiếp theo hoặc null
  return null;
}

function canCancel(status: OrderStatus): boolean {
  // TODO: chỉ có thể hủy khi pending hoặc confirmed
  return false;
}

function moTaTrangThai(status: OrderStatus): string {
  // TODO: trả về mô tả tiếng Việt
  const moTa: Record<OrderStatus, string> = {
    pending: "", confirmed: "", shipping: "", delivered: "", cancelled: "",
  };
  return moTa[status];
}

// Giả lập vòng đời đơn hàng
let trangThai: OrderStatus = "pending";
console.log("Bắt đầu:", trangThai);
while (nextStatus(trangThai) !== null) {
  trangThai = nextStatus(trangThai)!;
  console.log("→", trangThai, canCancel(trangThai) ? "(có thể hủy)" : "");
}`,
        solution: `type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";

const transitions: Record<OrderStatus, OrderStatus | null> = {
  pending: "confirmed", confirmed: "shipping", shipping: "delivered",
  delivered: null, cancelled: null,
};

function nextStatus(current: OrderStatus): OrderStatus | null {
  return transitions[current];
}

function canCancel(status: OrderStatus): boolean {
  return status === "pending" || status === "confirmed";
}

function moTaTrangThai(status: OrderStatus): string {
  const moTa: Record<OrderStatus, string> = {
    pending: "Chờ xác nhận", confirmed: "Đã xác nhận",
    shipping: "Đang giao", delivered: "Đã giao", cancelled: "Đã hủy",
  };
  return moTa[status];
}

let trangThai: OrderStatus = "pending";
console.log("Bắt đầu:", moTaTrangThai(trangThai));
while (nextStatus(trangThai) !== null) {
  trangThai = nextStatus(trangThai)!;
  console.log("→", moTaTrangThai(trangThai), canCancel(trangThai) ? "(có thể hủy)" : "");
}`,
        hint: "Dùng Record<OrderStatus, OrderStatus | null> để định nghĩa bảng chuyển trạng thái. Non-null assertion (!) khi đã kiểm tra null.",
      },
      {
        title: "Bài tập 5: Tạo URL slug",
        description: "Một kỹ năng thực tế: chuyển tiêu đề bài viết thành URL slug. Viết `toSlug(title: string): string` chuyển thành lowercase, thay ký tự đặc biệt/khoảng trắng bằng '-', bỏ dấu tiếng Việt. Viết `parseSlug(slug: string): string` ngược lại.",
        starterCode: `// Bảng chuyển đổi dấu tiếng Việt
const diacritics: Record<string, string> = {
  "à":"a","á":"a","ả":"a","ã":"a","ạ":"a",
  "ă":"a","ắ":"a","ặ":"a","ằ":"a","ẵ":"a","ẳ":"a",
  "â":"a","ấ":"a","ầ":"a","ẫ":"a","ẩ":"a","ậ":"a",
  "è":"e","é":"e","ẻ":"e","ẽ":"e","ẹ":"e",
  "ê":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e",
  "ì":"i","í":"i","ỉ":"i","ĩ":"i","ị":"i",
  "ò":"o","ó":"o","ỏ":"o","õ":"o","ọ":"o",
  "ô":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o",
  "ơ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o",
  "ù":"u","ú":"u","ủ":"u","ũ":"u","ụ":"u",
  "ư":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u",
  "ỳ":"y","ý":"y","ỷ":"y","ỹ":"y","ỵ":"y",
  "đ":"d",
};

function removeDiacritics(s: string): string {
  // TODO: thay thế từng ký tự dùng bảng diacritics
  return s;
}

function toSlug(title: string): string {
  // TODO: lowercase → bỏ dấu → thay ký tự không phải a-z0-9 bằng '-' → trim '-'
  return "";
}

console.log(toSlug("TypeScript Là Gì?"));     // typescript-la-gi
console.log(toSlug("Học lập trình Node.js")); // hoc-lap-trinh-node-js
console.log(toSlug("  Có Thể  Có  Spaces  ")); // co-the-co-spaces`,
        solution: `const diacritics: Record<string, string> = {
  "à":"a","á":"a","ả":"a","ã":"a","ạ":"a",
  "ă":"a","ắ":"a","ặ":"a","ằ":"a","ẵ":"a","ẳ":"a",
  "â":"a","ấ":"a","ầ":"a","ẫ":"a","ẩ":"a","ậ":"a",
  "è":"e","é":"e","ẻ":"e","ẽ":"e","ẹ":"e",
  "ê":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e",
  "ì":"i","í":"i","ỉ":"i","ĩ":"i","ị":"i",
  "ò":"o","ó":"o","ỏ":"o","õ":"o","ọ":"o",
  "ô":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o",
  "ơ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o",
  "ù":"u","ú":"u","ủ":"u","ũ":"u","ụ":"u",
  "ư":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u",
  "ỳ":"y","ý":"y","ỷ":"y","ỹ":"y","ỵ":"y",
  "đ":"d",
};

function removeDiacritics(s: string): string {
  return s.split("").map(c => diacritics[c] ?? c).join("");
}

function toSlug(title: string): string {
  return removeDiacritics(title.toLowerCase())
    .split("").map(c => /[a-z0-9]/.test(c) ? c : "-").join("")
    .replace(/-+/g, "-").replace(/^-|-$/g, "");
}

console.log(toSlug("TypeScript Là Gì?"));
console.log(toSlug("Học lập trình Node.js"));
console.log(toSlug("  Có Thể  Có  Spaces  "));`,
        hint: "Bước 1: toLowerCase(). Bước 2: thay ký tự có dấu dùng bảng diacritics. Bước 3: ký tự không phải a-z0-9 → '-'. Bước 4: gộp '-' liên tiếp, trim đầu cuối.",
      },
    ],
  },
  {
    id: "03-mang-tuple",
    title: "Mảng và Tuple",
    description: "Array, Tuple, và các thao tác cơ bản với mảng",
    level: "Cơ bản",
    content: `
## Mảng (Array) trong TypeScript

### Khai báo mảng
\`\`\`ts
// Cú pháp 1: kiểu[]
let soNguyen: number[] = [1, 2, 3, 4, 5];
let tenSach: string[] = ["TypeScript Handbook", "Clean Code"];

// Cú pháp 2: Array<kiểu>
let diemSo: Array<number> = [8, 9, 10, 7.5];

// Mảng readonly - không thể thay đổi
const NGAY: readonly string[] = ["T2","T3","T4","T5","T6","T7","CN"];
\`\`\`

### Các phương thức mảng quan trọng
\`\`\`ts
const arr = [1, 2, 3, 4, 5];

arr.push(6);               // Thêm vào cuối: [1,2,3,4,5,6]
arr.pop();                 // Xóa cuối
arr.unshift(0);            // Thêm vào đầu
arr.shift();               // Xóa đầu

arr.map(x => x * 2);       // [2,4,6,8,10] - biến đổi
arr.filter(x => x > 2);    // [3,4,5] - lọc
arr.find(x => x > 3);      // 4 - tìm phần tử đầu tiên
arr.findIndex(x => x > 3); // 3 - tìm vị trí
arr.reduce((a,b) => a+b, 0); // 15 - gộp
arr.some(x => x > 4);      // true - có phần tử nào thỏa?
arr.every(x => x > 0);     // true - tất cả thỏa?
arr.includes(3);            // true - có phần tử này không?
arr.sort((a,b) => a - b);   // Sắp xếp tăng dần
\`\`\`

## Tuple

Tuple là mảng có **số phần tử và kiểu cố định**:
\`\`\`ts
let sinhVien: [string, number, boolean] = ["An", 20, true];
let toaDo: [number, number] = [10.762, 106.660]; // [lat, lng]

// Destructuring tuple
const [ten, tuoi, daHoc] = sinhVien;
\`\`\`
    `,
    codeExample: `// Mảng với kiểu dữ liệu
let diem: number[] = [8, 9, 7, 10, 6, 8, 9, 5];
let monHoc: string[] = ["Toán", "Lý", "Hóa", "Anh", "Văn"];

// Map - nhân đôi điểm
const diemNhan2 = diem.map(d => d * 2);
console.log("Điểm x2:", diemNhan2);

// Filter - lọc điểm >= 8
const diemGioi = diem.filter(d => d >= 8);
console.log("Điểm giỏi (>=8):", diemGioi);

// Reduce - tính trung bình
const trungBinh = diem.reduce((acc, d) => acc + d, 0) / diem.length;
console.log("Điểm TB:", trungBinh.toFixed(2));

// Sort - sắp xếp giảm dần
const diemSapXep = [...diem].sort((a, b) => b - a);
console.log("Sắp xếp giảm dần:", diemSapXep);

// Find & Some & Every
console.log("Điểm > 9:", diem.find(d => d > 9));
console.log("Có điểm 10?", diem.some(d => d === 10));
console.log("Tất cả >= 5?", diem.every(d => d >= 5));

// Tuple
const ketQua: [string, number, string] = ["Nguyễn An", 8.5, "Giỏi"];
const [ten, gpa, xepLoai] = ketQua; // Destructuring
console.log(\`\${ten}: GPA \${gpa} - \${xepLoai}\`);`,
    exercises: [
      {
        title: "Bài tập 1: Thống kê điểm thi",
        description: "Cho mảng điểm, tính: điểm trung bình, điểm cao nhất, điểm thấp nhất, số lượng đạt (>=5) và số lượng rớt (<5).",
        starterCode: `const diem: number[] = [3, 7, 9, 5, 2, 8, 6, 10, 4, 7, 8, 1];

// TODO: Tính các thống kê
const trungBinh: number = 0;   // trung bình
const caoNhat: number = 0;     // cao nhất
const thapNhat: number = 0;    // thấp nhất
const soDat: number = 0;       // >= 5
const soRot: number = 0;       // < 5

console.log("Trung bình:", trungBinh.toFixed(2));
console.log("Cao nhất:", caoNhat);
console.log("Thấp nhất:", thapNhat);
console.log("Số đạt:", soDat);
console.log("Số rớt:", soRot);`,
        solution: `const diem: number[] = [3, 7, 9, 5, 2, 8, 6, 10, 4, 7, 8, 1];

const trungBinh = diem.reduce((a, b) => a + b, 0) / diem.length;
const caoNhat = Math.max(...diem);
const thapNhat = Math.min(...diem);
const soDat = diem.filter(d => d >= 5).length;
const soRot = diem.filter(d => d < 5).length;

console.log("Trung bình:", trungBinh.toFixed(2));
console.log("Cao nhất:", caoNhat);
console.log("Thấp nhất:", thapNhat);
console.log("Số đạt:", soDat);
console.log("Số rớt:", soRot);`,
        hint: "Dùng Math.max(...diem) và Math.min(...diem) để tìm max/min. Dùng .filter().length để đếm.",
      },
      {
        title: "Bài tập 2: Xử lý danh sách tên",
        description: "Cho mảng tên, hãy: (1) Lọc tên có độ dài > 4 ký tự, (2) Chuyển thành chữ hoa, (3) Sắp xếp theo bảng chữ cái, (4) Nối thành chuỗi phân cách bằng dấu ' | '.",
        starterCode: `const tenSinhVien: string[] = ["An", "Bình", "Ca", "Dung", "Em", "Phong", "Hoa", "Long"];

// Thực hiện theo chuỗi: filter → map → sort → join
const ketQua: string = tenSinhVien
  // TODO: filter tên dài > 4 ký tự
  // TODO: chuyển chữ hoa
  // TODO: sắp xếp
  // TODO: nối chuỗi
  .join("");

console.log(ketQua);
// Kết quả mong đợi: "BÌNH | DUNG | LONG | PHONG"`,
        solution: `const tenSinhVien: string[] = ["An", "Bình", "Ca", "Dung", "Em", "Phong", "Hoa", "Long"];

const ketQua: string = tenSinhVien
  .filter(t => t.length > 4)
  .map(t => t.toUpperCase())
  .sort()
  .join(" | ");

console.log(ketQua);`,
        hint: "Nối các phương thức: .filter(t => t.length > 4).map(t => t.toUpperCase()).sort().join(' | ')",
      },
      {
        title: "Bài tập 3: Tuple tọa độ và khoảng cách",
        description: "Dùng tuple `[number, number]` đại diện cho tọa độ (x, y). Viết hàm `khoangCach(a: [number, number], b: [number, number]): number` tính khoảng cách Euclid.",
        starterCode: `type DiemToa = [number, number]; // [x, y]

function khoangCach(a: DiemToa, b: DiemToa): number {
  // Công thức: sqrt((x2-x1)^2 + (y2-y1)^2)
  // TODO
  return 0;
}

const A: DiemToa = [0, 0];
const B: DiemToa = [3, 4];
const C: DiemToa = [6, 8];

console.log("A→B:", khoangCach(A, B).toFixed(2)); // 5.00
console.log("B→C:", khoangCach(B, C).toFixed(2)); // 5.00
console.log("A→C:", khoangCach(A, C).toFixed(2)); // 10.00`,
        solution: `type DiemToa = [number, number];

function khoangCach(a: DiemToa, b: DiemToa): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return Math.sqrt(dx * dx + dy * dy);
}

const A: DiemToa = [0, 0];
const B: DiemToa = [3, 4];
const C: DiemToa = [6, 8];

console.log("A→B:", khoangCach(A, B).toFixed(2));
console.log("B→C:", khoangCach(B, C).toFixed(2));
console.log("A→C:", khoangCach(A, C).toFixed(2));`,
        hint: "Destructuring tuple: const [x1, y1] = a; const [x2, y2] = b; rồi dùng Math.sqrt()",
      },
      {
        title: "Bài tập 4: Phân trang (Pagination)",
        description: "Pagination là kỹ năng cơ bản khi làm API. Viết generic function `paginate<T>(items: T[], page: number, pageSize: number): PageResult<T>` với interface `PageResult<T>` chứa đầy đủ thông tin phân trang.",
        starterCode: `interface PageResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

function paginate<T>(items: T[], page: number, pageSize: number): PageResult<T> {
  // TODO: tính các giá trị và cắt mảng
  return {
    data: [],
    page, pageSize,
    total: 0, totalPages: 0,
    hasNext: false, hasPrev: false,
  };
}

// Test với danh sách sản phẩm
const sanPham = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, ten: "SP " + (i + 1) }));

const trang1 = paginate(sanPham, 1, 5);
console.log("Trang 1:", trang1.data.map(s => s.ten));
console.log("Tổng:", trang1.total, "| Trang:", trang1.page + "/" + trang1.totalPages);
console.log("Có trang tiếp:", trang1.hasNext, "| Có trang trước:", trang1.hasPrev);

const trang5 = paginate(sanPham, 5, 5);
console.log("Trang 5:", trang5.data.map(s => s.ten));
console.log("Có trang tiếp:", trang5.hasNext);`,
        solution: `interface PageResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

function paginate<T>(items: T[], page: number, pageSize: number): PageResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * pageSize;
  return {
    data: items.slice(start, start + pageSize),
    page: safePage, pageSize, total, totalPages,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}

const sanPham = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, ten: "SP " + (i + 1) }));

const trang1 = paginate(sanPham, 1, 5);
console.log("Trang 1:", trang1.data.map(s => s.ten));
console.log("Tổng:", trang1.total, "| Trang:", trang1.page + "/" + trang1.totalPages);
console.log("Có trang tiếp:", trang1.hasNext, "| Có trang trước:", trang1.hasPrev);

const trang5 = paginate(sanPham, 5, 5);
console.log("Trang 5:", trang5.data.map(s => s.ten));
console.log("Có trang tiếp:", trang5.hasNext);`,
        hint: "start = (page - 1) * pageSize. totalPages = Math.ceil(total / pageSize). slice(start, start + pageSize) để lấy đúng phần.",
      },
      {
        title: "Bài tập 5: Giỏ hàng với giảm giá",
        description: "Viết các hàm xử lý giỏ hàng: `addItem`, `removeItem`, `updateQty`, `calcTotal`. Áp dụng giảm giá: mua >= 3 món giảm 5%, mua >= 5 món giảm 10%, mua >= 500k giảm thêm 2%.",
        starterCode: `interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

function addItem(cart: CartItem[], item: Omit<CartItem, "qty">): CartItem[] {
  // TODO: nếu đã có id thì tăng qty, nếu chưa có thì thêm mới
  return cart;
}

function removeItem(cart: CartItem[], id: number): CartItem[] {
  return cart.filter(item => item.id !== id);
}

function calcTotal(cart: CartItem[]): { subtotal: number; discount: number; total: number; pct: number } {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  // TODO: tính discount dựa trên tổng số lượng và subtotal
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  let pct = 0;
  if (totalQty >= 5) pct = 10;
  else if (totalQty >= 3) pct = 5;
  if (subtotal >= 500_000) pct += 2;
  const discount = Math.round(subtotal * pct / 100);
  return { subtotal, discount, total: subtotal - discount, pct };
}

let cart: CartItem[] = [];
cart = addItem(cart, { id: 1, name: "Chuột", price: 250_000 });
cart = addItem(cart, { id: 2, name: "Bàn phím", price: 350_000 });
cart = addItem(cart, { id: 1, name: "Chuột", price: 250_000 }); // tăng qty

cart.forEach(item => console.log(item.name, "x" + item.qty, "=", item.price * item.qty));
const t = calcTotal(cart);
console.log("Tổng:", t.subtotal, "| Giảm:", t.pct + "% =", t.discount, "| Thanh toán:", t.total);`,
        solution: `interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

function addItem(cart: CartItem[], item: Omit<CartItem, "qty">): CartItem[] {
  const existing = cart.find(c => c.id === item.id);
  if (existing) return cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
  return [...cart, { ...item, qty: 1 }];
}

function removeItem(cart: CartItem[], id: number): CartItem[] {
  return cart.filter(item => item.id !== id);
}

function calcTotal(cart: CartItem[]): { subtotal: number; discount: number; total: number; pct: number } {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  let pct = 0;
  if (totalQty >= 5) pct = 10;
  else if (totalQty >= 3) pct = 5;
  if (subtotal >= 500_000) pct += 2;
  const discount = Math.round(subtotal * pct / 100);
  return { subtotal, discount, total: subtotal - discount, pct };
}

let cart: CartItem[] = [];
cart = addItem(cart, { id: 1, name: "Chuột", price: 250_000 });
cart = addItem(cart, { id: 2, name: "Bàn phím", price: 350_000 });
cart = addItem(cart, { id: 1, name: "Chuột", price: 250_000 });

cart.forEach(item => console.log(item.name, "x" + item.qty, "=", item.price * item.qty));
const t = calcTotal(cart);
console.log("Tổng:", t.subtotal, "| Giảm:", t.pct + "% =", t.discount, "| Thanh toán:", t.total);`,
        hint: "addItem: dùng .find() kiểm tra id, nếu có thì .map() để tăng qty, nếu không thì spread thêm item mới với qty: 1.",
      },
    ],
  },
  {
    id: "04-interface-type",
    title: "Interface và Type Alias",
    description: "Định nghĩa cấu trúc đối tượng, kế thừa interface, so sánh interface vs type",
    level: "Cơ bản",
    content: `
## Interface — Hợp đồng cấu trúc

**Interface** định nghĩa "hình dạng" của đối tượng:

\`\`\`ts
interface NguoiDung {
  id: number;
  ten: string;
  email: string;
  tuoi?: number;           // ? = optional (không bắt buộc)
  readonly maSo: string;   // chỉ đọc, không thể thay đổi
}
\`\`\`

### Kế thừa Interface
\`\`\`ts
interface NhanVien extends NguoiDung {
  phongBan: string;
  luong: number;
}
\`\`\`

### Interface cho function
\`\`\`ts
interface HamTinh {
  (a: number, b: number): number;
}
\`\`\`

## Type Alias — Bí danh kiểu

\`\`\`ts
type DiemSo = number | string;           // Union type
type TrangThai = "active" | "inactive";  // Literal type
type ID = string;                         // Alias đơn giản
\`\`\`

### Intersection Type (&)
\`\`\`ts
type NhanVienDayDu = NguoiDung & { phongBan: string };
\`\`\`

### Interface vs Type
| | Interface | Type |
|---|---|---|
| Kế thừa | extends | & (intersection) |
| Union/Literal | ❌ | ✅ |
| Merge | ✅ (có thể mở rộng) | ❌ |

**Quy tắc:** Dùng **interface** cho object shapes, **type** cho union/literal.
    `,
    codeExample: `// Interface cơ bản
interface SanPham {
  id: number;
  ten: string;
  gia: number;
  moTa?: string;         // Optional
  readonly maSP: string; // Readonly
}

// Interface kế thừa
interface SanPhamKhuyenMai extends SanPham {
  phanTramGiam: number;
  giaGoc: number;
}

// Type alias
type DanhMuc = "dien_tu" | "thoi_trang" | "do_an" | "sach";
type TrangThaiKho = "con_hang" | "het_hang" | "sap_co";

// Intersection type
type SanPhamDayDu = SanPham & { danhMuc: DanhMuc; trangThai: TrangThaiKho };

// Sử dụng
const laptop: SanPhamDayDu = {
  id: 1,
  ten: "MacBook Air M3",
  gia: 28000000,
  maSP: "MBA-M3-2024",
  danhMuc: "dien_tu",
  trangThai: "con_hang",
};

const sale: SanPhamKhuyenMai = {
  id: 2,
  ten: "iPhone 15",
  gia: 20000000,
  maSP: "IP15-128",
  phanTramGiam: 10,
  giaGoc: 22000000,
};

function giaKhuyenMai(sp: SanPhamKhuyenMai): string {
  return \`\${sp.ten}: \${sp.gia.toLocaleString()} VND (-\${sp.phanTramGiam}%)\`;
}

console.log(laptop.ten, "-", laptop.trangThai);
console.log(giaKhuyenMai(sale));`,
    exercises: [
      {
        title: "Bài tập 1: Interface Sinh viên",
        description: "Định nghĩa interface `SinhVien` với: maSV (string), ten (string), tuoi (number), gpa (number), email (optional string). Tạo mảng 3 sinh viên và in ra người có GPA cao nhất.",
        starterCode: `// Định nghĩa interface SinhVien
interface SinhVien {
  // TODO: thêm các trường
}

const danhSach: SinhVien[] = [
  // TODO: thêm 3 sinh viên
];

// Tìm sinh viên có GPA cao nhất
// TODO

// In ra kết quả`,
        solution: `interface SinhVien {
  maSV: string;
  ten: string;
  tuoi: number;
  gpa: number;
  email?: string;
}

const danhSach: SinhVien[] = [
  { maSV: "SV001", ten: "Nguyễn An", tuoi: 20, gpa: 3.8, email: "an@hust.edu.vn" },
  { maSV: "SV002", ten: "Trần Bình", tuoi: 21, gpa: 3.5 },
  { maSV: "SV003", ten: "Lê Hoa", tuoi: 19, gpa: 3.9, email: "hoa@hust.edu.vn" },
];

const topSV = danhSach.reduce((best, sv) => sv.gpa > best.gpa ? sv : best);
console.log(\`GPA cao nhất: \${topSV.ten} - \${topSV.gpa}\`);
console.log(\`Email: \${topSV.email ?? "Chưa có"}\`);`,
        hint: "Dùng .reduce() để tìm phần tử có gpa lớn nhất. Optional email dùng ?? 'Chưa có'",
      },
      {
        title: "Bài tập 2: Interface kế thừa — Đơn hàng",
        description: "Tạo interface `KhachHang` (id, ten, diaChi). Tạo interface `DonHang` extends `KhachHang` thêm (maDH, ngayDat, tongTien, trangThai). Viết hàm in thông tin đơn hàng.",
        starterCode: `interface KhachHang {
  // TODO: id, ten, diaChi
}

interface DonHang extends KhachHang {
  // TODO: maDH, ngayDat, tongTien, trangThai: "cho_xac_nhan" | "dang_giao" | "da_giao"
}

function inDonHang(dh: DonHang): void {
  // TODO: in theo định dạng:
  // [DH001] Nguyễn An - 2024-01-15
  // Địa chỉ: 123 Đường ABC
  // Tổng tiền: 1,500,000 VND
  // Trạng thái: Đang giao
}

const donHang: DonHang = {
  // TODO: điền thông tin
};

inDonHang(donHang);`,
        solution: `interface KhachHang {
  id: number;
  ten: string;
  diaChi: string;
}

interface DonHang extends KhachHang {
  maDH: string;
  ngayDat: string;
  tongTien: number;
  trangThai: "cho_xac_nhan" | "dang_giao" | "da_giao";
}

function inDonHang(dh: DonHang): void {
  const trangThaiText = { cho_xac_nhan: "Chờ xác nhận", dang_giao: "Đang giao", da_giao: "Đã giao" };
  console.log(\`[\${dh.maDH}] \${dh.ten} - \${dh.ngayDat}\`);
  console.log(\`Địa chỉ: \${dh.diaChi}\`);
  console.log(\`Tổng tiền: \${dh.tongTien.toLocaleString()} VND\`);
  console.log(\`Trạng thái: \${trangThaiText[dh.trangThai]}\`);
}

const donHang: DonHang = {
  id: 1, ten: "Nguyễn An", diaChi: "123 Đường ABC, Hà Nội",
  maDH: "DH001", ngayDat: "2024-01-15", tongTien: 1500000, trangThai: "dang_giao",
};

inDonHang(donHang);`,
        hint: "extends để kế thừa interface. Dùng object literal để map trangThai sang text hiển thị.",
      },
      {
        title: "Bài tập 3: Type alias — Hệ thống màu sắc",
        description: "Tạo type `MauHex` (string bắt đầu bằng #), type `MauRGB` (tuple [number, number, number]), type `Mau = MauHex | MauRGB`. Viết hàm `layMoTaMau(mau: Mau): string`.",
        starterCode: `type MauHex = string; // convention: '#RRGGBB'
type MauRGB = [number, number, number]; // [r, g, b]
type Mau = MauHex | MauRGB;

function layMoTaMau(mau: Mau): string {
  if (typeof mau === "string") {
    // xử lý hex
    return \`Màu hex: \${mau}\`;
  } else {
    // TODO: xử lý RGB tuple
    return "";
  }
}

console.log(layMoTaMau("#FF5733"));       // Màu hex: #FF5733
console.log(layMoTaMau([255, 87, 51]));   // Màu RGB: rgb(255, 87, 51)
console.log(layMoTaMau("#3498DB"));       // Màu hex: #3498DB
console.log(layMoTaMau([52, 152, 219]));  // Màu RGB: rgb(52, 152, 219)`,
        solution: `type MauHex = string;
type MauRGB = [number, number, number];
type Mau = MauHex | MauRGB;

function layMoTaMau(mau: Mau): string {
  if (typeof mau === "string") {
    return \`Màu hex: \${mau}\`;
  } else {
    const [r, g, b] = mau;
    return \`Màu RGB: rgb(\${r}, \${g}, \${b})\`;
  }
}

console.log(layMoTaMau("#FF5733"));
console.log(layMoTaMau([255, 87, 51]));
console.log(layMoTaMau("#3498DB"));
console.log(layMoTaMau([52, 152, 219]));`,
        hint: "typeof mau === 'string' để phân biệt hex và RGB. Destructuring tuple: const [r, g, b] = mau",
      },
      {
        title: "Bài tập 4: Config hệ thống phân tầng",
        description: "Trong thực tế, config production override config default. Tạo interface `AppConfig` với cấu trúc lồng nhau (database, cache, server). Viết `mergeConfig(base, overrides)` để merge deep.",
        starterCode: `interface DbConfig   { host: string; port: number; name: string; ssl: boolean }
interface AppConfig {
  env: "dev" | "staging" | "prod";
  db: DbConfig;
  cache: { host: string; ttl: number };
  maxConnections: number;
  debug: boolean;
}

const defaultConfig: AppConfig = {
  env: "dev",
  db: { host: "localhost", port: 5432, name: "mydb", ssl: false },
  cache: { host: "localhost", ttl: 3600 },
  maxConnections: 10,
  debug: true,
};

function mergeConfig(base: AppConfig, overrides: Partial<AppConfig>): AppConfig {
  // TODO: merge, chú ý nested objects (db, cache) cũng cần merge
  return base;
}

const prodConfig = mergeConfig(defaultConfig, {
  env: "prod",
  db: { host: "prod-db.internal", port: 5432, name: "proddb", ssl: true },
  maxConnections: 100,
  debug: false,
});

console.log("Env:", prodConfig.env);
console.log("DB:", prodConfig.db.host, "ssl:", prodConfig.db.ssl);
console.log("Cache:", prodConfig.cache.host, "ttl:", prodConfig.cache.ttl);
console.log("Debug:", prodConfig.debug);`,
        solution: `interface DbConfig   { host: string; port: number; name: string; ssl: boolean }
interface AppConfig {
  env: "dev" | "staging" | "prod";
  db: DbConfig;
  cache: { host: string; ttl: number };
  maxConnections: number;
  debug: boolean;
}

const defaultConfig: AppConfig = {
  env: "dev",
  db: { host: "localhost", port: 5432, name: "mydb", ssl: false },
  cache: { host: "localhost", ttl: 3600 },
  maxConnections: 10,
  debug: true,
};

function mergeConfig(base: AppConfig, overrides: Partial<AppConfig>): AppConfig {
  return {
    ...base,
    ...overrides,
    db:    { ...base.db,    ...(overrides.db    ?? {}) },
    cache: { ...base.cache, ...(overrides.cache ?? {}) },
  };
}

const prodConfig = mergeConfig(defaultConfig, {
  env: "prod",
  db: { host: "prod-db.internal", port: 5432, name: "proddb", ssl: true },
  maxConnections: 100,
  debug: false,
});

console.log("Env:", prodConfig.env);
console.log("DB:", prodConfig.db.host, "ssl:", prodConfig.db.ssl);
console.log("Cache:", prodConfig.cache.host, "ttl:", prodConfig.cache.ttl);
console.log("Debug:", prodConfig.debug);`,
        hint: "Spread shallow trước: { ...base, ...overrides }, rồi merge riêng các nested object: db: { ...base.db, ...overrides.db }.",
      },
      {
        title: "Bài tập 5: API Response wrapper",
        description: "Chuẩn hóa response API là pattern quan trọng. Tạo generic `ApiResponse<T>`, và 2 factory function `ok<T>(data)` và `fail(code, message)`. Viết `handleResponse` xử lý kết quả an toàn.",
        starterCode: `interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: number; message: string };
  timestamp: string;
}

function ok<T>(data: T): ApiResponse<T> {
  // TODO: tạo response thành công với timestamp hiện tại
  return { success: true, data, timestamp: new Date().toISOString() };
}

function fail<T = never>(code: number, message: string): ApiResponse<T> {
  // TODO: tạo response lỗi
  return { success: false, error: { code, message }, timestamp: new Date().toISOString() };
}

function handleResponse<T>(response: ApiResponse<T>, onSuccess: (data: T) => void): void {
  // TODO: nếu success gọi onSuccess(data!), nếu lỗi in ra lỗi
}

// Giả lập API calls
interface User { id: number; name: string; email: string }

function getUser(id: number): ApiResponse<User> {
  if (id === 1) return ok({ id: 1, name: "Nguyễn An", email: "an@example.com" });
  return fail(404, "User không tồn tại");
}

handleResponse(getUser(1), user => console.log("User:", user.name, user.email));
handleResponse(getUser(99), user => console.log("User:", user));`,
        solution: `interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: number; message: string };
  timestamp: string;
}

function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data, timestamp: new Date().toISOString() };
}

function fail<T = never>(code: number, message: string): ApiResponse<T> {
  return { success: false, error: { code, message }, timestamp: new Date().toISOString() };
}

function handleResponse<T>(response: ApiResponse<T>, onSuccess: (data: T) => void): void {
  if (response.success && response.data !== undefined) {
    onSuccess(response.data);
  } else {
    console.log("Lỗi", response.error?.code + ":", response.error?.message);
  }
}

interface User { id: number; name: string; email: string }

function getUser(id: number): ApiResponse<User> {
  if (id === 1) return ok({ id: 1, name: "Nguyễn An", email: "an@example.com" });
  return fail(404, "User không tồn tại");
}

handleResponse(getUser(1), user => console.log("User:", user.name, user.email));
handleResponse(getUser(99), user => console.log("User:", user));`,
        hint: "ok() và fail() chỉ cần set success và timestamp. handleResponse kiểm tra response.success trước khi gọi onSuccess.",
      },
    ],
  },
  {
    id: "05-ham-va-kieu",
    title: "Hàm và Kiểu hàm",
    description: "Khai báo hàm, optional, default, rest params, function types, overloading",
    level: "Cơ bản",
    content: `
## Hàm trong TypeScript

### Cú pháp khai báo
\`\`\`ts
// Function declaration
function tinh(a: number, b: number): number { return a + b; }

// Arrow function
const tinh = (a: number, b: number): number => a + b;

// Return type inference (tự suy luận)
const nhanDoi = (x: number) => x * 2; // TypeScript biết return number
\`\`\`

### Optional & Default Parameters
\`\`\`ts
// Optional (?) - phải đứng sau required params
function chao(ten: string, loi?: string): string {
  return \`\${loi ?? "Xin chào"}, \${ten}!\`;
}

// Default value
function luyThua(co: number, mu: number = 2): number {
  return co ** mu;
}
\`\`\`

### Rest Parameters
\`\`\`ts
function tong(...so: number[]): number {
  return so.reduce((a, b) => a + b, 0);
}
tong(1, 2, 3, 4, 5); // 15
\`\`\`

### Function Types
\`\`\`ts
type Callback = (err: Error | null, data: string) => void;
type Predicate<T> = (item: T) => boolean;

// Higher-order function
function loc<T>(arr: T[], kiemTra: Predicate<T>): T[] {
  return arr.filter(kiemTra);
}
\`\`\`
    `,
    codeExample: `// Đầy đủ các kiểu hàm

// Optional + default
function xepLoai(diem: number, thangDiem: number = 10, inKetQua: boolean = true): string {
  const ty = diem / thangDiem;
  const loai = ty >= 0.9 ? "Xuất sắc"
    : ty >= 0.8 ? "Giỏi"
    : ty >= 0.65 ? "Khá"
    : ty >= 0.5 ? "Trung bình"
    : "Yếu";
  if (inKetQua) console.log(\`\${diem}/\${thangDiem} → \${loai}\`);
  return loai;
}

// Rest parameters
function thongKe(...so: number[]): { min: number; max: number; tb: number } {
  return {
    min: Math.min(...so),
    max: Math.max(...so),
    tb: so.reduce((a, b) => a + b, 0) / so.length,
  };
}

// Function type & higher-order
type BienDoi<T, R> = (x: T) => R;

function apDungHet<T, R>(arr: T[], f: BienDoi<T, R>): R[] {
  return arr.map(f);
}

xepLoai(8.5);          // 8.5/10 → Giỏi
xepLoai(45, 50);       // 45/50 → Khá
xepLoai(7, 10, false); // Không in

const kq = thongKe(3, 7, 2, 9, 5, 8);
console.log("Min:", kq.min, "Max:", kq.max, "TB:", kq.tb.toFixed(1));

const ketQuaMap = apDungHet([1, 2, 3, 4], x => x * x);
console.log("Bình phương:", ketQuaMap);`,
    exercises: [
      {
        title: "Bài tập 1: Máy tính đa năng",
        description: "Viết hàm `tinhToan(a: number, b: number, phep: '+' | '-' | '*' | '/'): number`. Sau đó viết hàm `tinhNhieu(so: number, ...phepTinh: ('+' | '-' | '*' | '/')[])` áp dụng nhiều phép tính liên tiếp.",
        starterCode: `function tinhToan(a: number, b: number, phep: "+" | "-" | "*" | "/"): number {
  // TODO
  return 0;
}

function tinhNhieu(so: number, ...phepTinh: Array<[string, number]>): number {
  // phepTinh là mảng các [phépTính, số]
  // Ví dụ: tinhNhieu(10, ["+", 5], ["*", 2]) = (10 + 5) * 2 = 30
  // TODO
  return so;
}

console.log(tinhToan(10, 3, "+"));  // 13
console.log(tinhToan(10, 3, "-"));  // 7
console.log(tinhToan(10, 3, "*"));  // 30
console.log(tinhToan(10, 4, "/"));  // 2.5
console.log(tinhNhieu(10, ["+", 5], ["*", 2])); // 30`,
        solution: `function tinhToan(a: number, b: number, phep: "+" | "-" | "*" | "/"): number {
  switch (phep) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : 0;
  }
}

function tinhNhieu(so: number, ...phepTinh: Array<[string, number]>): number {
  return phepTinh.reduce((acc, [phep, b]) => tinhToan(acc, b, phep as any), so);
}

console.log(tinhToan(10, 3, "+"));
console.log(tinhToan(10, 3, "-"));
console.log(tinhToan(10, 3, "*"));
console.log(tinhToan(10, 4, "/"));
console.log(tinhNhieu(10, ["+", 5], ["*", 2]));`,
        hint: "tinhNhieu dùng .reduce() với tinhToan bên trong. Mỗi bước: acc = tinhToan(acc, b, phep)",
      },
      {
        title: "Bài tập 2: Higher-order functions",
        description: "Viết các hàm: `debounceCounter(limit: number)` trả về hàm đếm chỉ chạy khi gọi đủ `limit` lần. Và `compose<T>(...fns)` nhận nhiều hàm và áp dụng từ phải sang trái.",
        starterCode: `// Hàm tạo bộ đếm với giới hạn
function taoBoLoc(gioi_han: number) {
  let dem = 0;
  // Trả về hàm: mỗi lần gọi tăng đếm
  // Khi đếm >= giới hạn, in ra "Đã đạt giới hạn!" và reset
  return function(ten: string): void {
    // TODO
  };
}

// Compose: áp dụng từ phải sang trái
// compose(f, g, h)(x) = f(g(h(x)))
function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  // TODO
  return (x) => x;
}

// Test bộ lọc
const boLoc = taoBoLoc(3);
boLoc("Lần 1"); // Lần 1: 1/3
boLoc("Lần 2"); // Lần 2: 2/3
boLoc("Lần 3"); // Đã đạt giới hạn!

// Test compose
const xuLyChuoi = compose<string>(
  s => s.trim(),
  s => s.toUpperCase(),
  s => s + "!"
);
console.log(xuLyChuoi("  hello  ")); // HELLO  !`,
        solution: `function taoBoLoc(gioi_han: number) {
  let dem = 0;
  return function(ten: string): void {
    dem++;
    if (dem >= gioi_han) {
      console.log(\`\${ten}: Đã đạt giới hạn! (reset)\`);
      dem = 0;
    } else {
      console.log(\`\${ten}: \${dem}/\${gioi_han}\`);
    }
  };
}

function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const boLoc = taoBoLoc(3);
boLoc("Lần 1");
boLoc("Lần 2");
boLoc("Lần 3");

const xuLyChuoi = compose<string>(
  s => s.trim(),
  s => s.toUpperCase(),
  s => s + "!"
);
console.log(xuLyChuoi("  hello  "));`,
        hint: "compose dùng reduceRight để áp dụng từ phải sang trái: fns.reduceRight((acc, fn) => fn(acc), x)",
      },
      {
        title: "Bài tập 3: Currying",
        description: "Viết hàm `curry(fn)` biến hàm 2 tham số thành curried function. Ví dụ: `const add = curry((a,b) => a+b); add(3)(4) // 7`",
        starterCode: `// Curry: biến f(a, b) thành f(a)(b)
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  // TODO
  return (a) => (b) => fn(a, b);
}

const cong = curry((a: number, b: number) => a + b);
const nhan = curry((a: number, b: number) => a * b);
const noi = curry((a: string, b: string) => a + " " + b);

// Partial application
const cong5 = cong(5);  // hàm cộng thêm 5
const nhan3 = nhan(3);  // hàm nhân 3

console.log(cong5(10));  // 15
console.log(cong5(20));  // 25
console.log(nhan3(7));   // 21
console.log(noi("Hello")("World")); // Hello World

// Áp dụng lên mảng
const soArr = [1, 2, 3, 4, 5];
console.log(soArr.map(cong5));  // [6,7,8,9,10]
console.log(soArr.map(nhan3)); // [3,6,9,12,15]`,
        solution: `function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => fn(a, b);
}

const cong = curry((a: number, b: number) => a + b);
const nhan = curry((a: number, b: number) => a * b);
const noi = curry((a: string, b: string) => a + " " + b);

const cong5 = cong(5);
const nhan3 = nhan(3);

console.log(cong5(10));
console.log(cong5(20));
console.log(nhan3(7));
console.log(noi("Hello")("World"));

const soArr = [1, 2, 3, 4, 5];
console.log(soArr.map(cong5));
console.log(soArr.map(nhan3));`,
        hint: "Curry rất đơn giản: return (a) => (b) => fn(a, b). Partial application là khi gọi curry(fn)(a) — ta nhận được hàm chờ tham số b.",
      },
      {
        title: "Bài tập 4: Form Validator Builder",
        description: "Pattern validator tái sử dụng rất phổ biến. Tạo type `Validator<T>` và các validators: `required()`, `minLength(n)`, `maxLength(n)`, `range(min, max)`. Viết `combine(...validators)` để áp dụng tất cả và trả về lỗi đầu tiên.",
        starterCode: `type Validator<T> = (value: T) => string | null; // null = không có lỗi

// Validators cho string
function required(): Validator<string> {
  // TODO: trả về lỗi nếu chuỗi rỗng hoặc chỉ có khoảng trắng
  return value => null;
}

function minLength(n: number): Validator<string> {
  // TODO: trả về lỗi nếu độ dài < n
  return value => null;
}

function maxLength(n: number): Validator<string> {
  return value => value.length > n ? "Tối đa " + n + " ký tự" : null;
}

// Validator cho number
function range(min: number, max: number): Validator<number> {
  return value => (value < min || value > max) ? "Phải từ " + min + " đến " + max : null;
}

function combine<T>(...validators: Validator<T>[]): Validator<T> {
  // TODO: chạy tất cả validators, trả về lỗi đầu tiên hoặc null
  return value => null;
}

// Test - form đăng ký
const validateTen  = combine(required(), minLength(2), maxLength(50));
const validateTuoi = combine<number>(range(18, 99));

console.log(validateTen(""));            // required error
console.log(validateTen("A"));           // minLength error
console.log(validateTen("Nguyễn An"));   // null (OK)
console.log(validateTuoi(15));           // range error
console.log(validateTuoi(25));           // null (OK)`,
        solution: `type Validator<T> = (value: T) => string | null;

function required(): Validator<string> {
  return value => value.trim().length === 0 ? "Trường này là bắt buộc" : null;
}

function minLength(n: number): Validator<string> {
  return value => value.length < n ? "Tối thiểu " + n + " ký tự" : null;
}

function maxLength(n: number): Validator<string> {
  return value => value.length > n ? "Tối đa " + n + " ký tự" : null;
}

function range(min: number, max: number): Validator<number> {
  return value => (value < min || value > max) ? "Phải từ " + min + " đến " + max : null;
}

function combine<T>(...validators: Validator<T>[]): Validator<T> {
  return value => {
    for (const v of validators) {
      const err = v(value);
      if (err !== null) return err;
    }
    return null;
  };
}

const validateTen  = combine(required(), minLength(2), maxLength(50));
const validateTuoi = combine<number>(range(18, 99));

console.log(validateTen(""));
console.log(validateTen("A"));
console.log(validateTen("Nguyễn An"));
console.log(validateTuoi(15));
console.log(validateTuoi(25));`,
        hint: "combine dùng for...of, return lỗi ngay khi gặp validator trả về non-null. return null nếu tất cả pass.",
      },
      {
        title: "Bài tập 5: Memoize — Cache kết quả hàm",
        description: "Memoization tối ưu hiệu năng bằng cách cache kết quả. Viết generic `memoize<T extends (...args: any[]) => any>(fn: T): T` dùng Map làm cache. Test với hàm Fibonacci đệ quy để thấy sự khác biệt.",
        starterCode: `function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  // TODO: trả về function mới:
  // - serialize args thành key (dùng JSON.stringify)
  // - nếu key có trong cache → trả về cached
  // - nếu không → gọi fn, lưu vào cache, trả về
  return fn;
}

// Fibonacci KHÔNG có memoize - rất chậm với n lớn
function fibSlow(n: number): number {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

// Fibonacci CÓ memoize
const fibFast = memoize(function fib(n: number): number {
  if (n <= 1) return n;
  return fibFast(n - 1) + fibFast(n - 2);
});

// So sánh
console.log("fib(10):", fibFast(10));   // 55
console.log("fib(20):", fibFast(20));   // 6765
console.log("fib(35):", fibFast(35));   // 9227465 (nhanh!)

// Test cache với hàm khác
const expensiveCalc = memoize((a: number, b: number) => {
  console.log("Đang tính...");
  return a * b + a + b;
});

console.log(expensiveCalc(5, 3)); // "Đang tính..." rồi 23
console.log(expensiveCalc(5, 3)); // chỉ 23 (không "Đang tính" nữa - từ cache)`,
        solution: `function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return function(...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T;
}

function fibSlow(n: number): number {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

const fibFast = memoize(function fib(n: number): number {
  if (n <= 1) return n;
  return fibFast(n - 1) + fibFast(n - 2);
});

console.log("fib(10):", fibFast(10));
console.log("fib(20):", fibFast(20));
console.log("fib(35):", fibFast(35));

const expensiveCalc = memoize((a: number, b: number) => {
  console.log("Đang tính...");
  return a * b + a + b;
});

console.log(expensiveCalc(5, 3));
console.log(expensiveCalc(5, 3));`,
        hint: "key = JSON.stringify(args). Nếu cache.has(key) → return cache.get(key). Gọi fn(...args) với spread operator để giữ nguyên arguments.",
      },
    ],
  },
  {
    id: "06-class-oop",
    title: "Class và OOP",
    description: "Class, constructor shorthand, access modifiers, getters/setters, kế thừa",
    level: "Trung cấp",
    content: `
## Class trong TypeScript

### Access Modifiers
| Modifier | Truy cập từ | Ghi chú |
|---|---|---|
| \`public\` | Mọi nơi | Mặc định |
| \`private\` | Chỉ trong class | Ẩn hoàn toàn |
| \`protected\` | Class + subclass | Cho kế thừa |
| \`readonly\` | Không thể thay đổi sau init | |

### Constructor Shorthand
\`\`\`ts
// Cách thông thường (dài dòng)
class A {
  public ten: string;
  private tuoi: number;
  constructor(ten: string, tuoi: number) {
    this.ten = ten;
    this.tuoi = tuoi;
  }
}

// Constructor shorthand (ngắn gọn, được ưa dùng)
class A {
  constructor(public ten: string, private tuoi: number) {}
}
\`\`\`

### Getters & Setters
\`\`\`ts
class NhietDo {
  private _celsius: number = 0;

  get fahrenheit(): number { return this._celsius * 9/5 + 32; }
  set celsius(value: number) {
    if (value < -273.15) throw new Error("Dưới 0 tuyệt đối!");
    this._celsius = value;
  }
}
\`\`\`

### Kế thừa
\`\`\`ts
class Con extends Cha {
  constructor(args) {
    super(args); // phải gọi trước
    // khởi tạo thêm của Con
  }
  override phuongThuc() { /* ghi đè */ }
}
\`\`\`
    `,
    codeExample: `// Class đầy đủ với TypeScript

class TaiKhoanNganHang {
  private _soDu: number;

  constructor(
    public chuTaiKhoan: string,
    readonly soTaiKhoan: string,
    soDuBanDau: number = 0
  ) {
    this._soDu = soDuBanDau;
  }

  get soDu(): number { return this._soDu; }

  napTien(soTien: number): this {
    if (soTien <= 0) throw new Error("Số tiền phải > 0");
    this._soDu += soTien;
    console.log(\`✅ Nạp \${soTien.toLocaleString()} VND. Dư: \${this._soDu.toLocaleString()} VND\`);
    return this; // method chaining
  }

  rutTien(soTien: number): this {
    if (soTien > this._soDu) throw new Error("Số dư không đủ");
    this._soDu -= soTien;
    console.log(\`💸 Rút \${soTien.toLocaleString()} VND. Dư: \${this._soDu.toLocaleString()} VND\`);
    return this;
  }

  toString(): string {
    return \`[\${this.soTaiKhoan}] \${this.chuTaiKhoan}: \${this._soDu.toLocaleString()} VND\`;
  }
}

class TaiKhoanVIP extends TaiKhoanNganHang {
  constructor(
    chuTK: string,
    soTK: string,
    private hanMucRut: number
  ) {
    super(chuTK, soTK, 5_000_000); // VIP bắt đầu với 5 triệu
  }

  override rutTien(soTien: number): this {
    if (soTien > this.hanMucRut) throw new Error(\`Vượt hạn mức \${this.hanMucRut.toLocaleString()} VND\`);
    return super.rutTien(soTien);
  }
}

const tk = new TaiKhoanNganHang("Nguyễn An", "VCB-001");
tk.napTien(2_000_000).napTien(500_000).rutTien(300_000); // method chaining
console.log(tk.toString());

const vip = new TaiKhoanVIP("Trần CEO", "VCB-VIP-001", 10_000_000);
console.log("VIP dư:", vip.soDu.toLocaleString(), "VND");`,
    exercises: [
      {
        title: "Bài tập 1: Class Hình học",
        description: "Tạo abstract-like class `HinhHoc` với `ten`, method `dienTich()` và `chuVi()`. Kế thừa để tạo `HinhTron(banKinh)` và `HinhChuNhat(dai, rong)`. Tạo mảng và dùng đa hình.",
        starterCode: `class HinhHoc {
  constructor(public ten: string) {}

  dienTich(): number { return 0; }
  chuVi(): number { return 0; }

  moTa(): string {
    return \`\${this.ten}: DT=\${this.dienTich().toFixed(2)}, CV=\${this.chuVi().toFixed(2)}\`;
  }
}

class HinhTron extends HinhHoc {
  constructor(public banKinh: number) {
    // TODO: gọi super với tên phù hợp
    super("");
  }
  // TODO: override dienTich và chuVi
}

class HinhChuNhat extends HinhHoc {
  constructor(public dai: number, public rong: number) {
    super("");
    // TODO
  }
  // TODO: override dienTich và chuVi
}

// Tạo mảng và dùng đa hình
const hinh: HinhHoc[] = [
  new HinhTron(5),
  new HinhChuNhat(4, 6),
  new HinhTron(3),
];

hinh.forEach(h => console.log(h.moTa()));`,
        solution: `class HinhHoc {
  constructor(public ten: string) {}
  dienTich(): number { return 0; }
  chuVi(): number { return 0; }
  moTa(): string {
    return \`\${this.ten}: DT=\${this.dienTich().toFixed(2)}, CV=\${this.chuVi().toFixed(2)}\`;
  }
}

class HinhTron extends HinhHoc {
  constructor(public banKinh: number) { super("Hình tròn"); }
  override dienTich(): number { return Math.PI * this.banKinh ** 2; }
  override chuVi(): number { return 2 * Math.PI * this.banKinh; }
}

class HinhChuNhat extends HinhHoc {
  constructor(public dai: number, public rong: number) { super("Hình chữ nhật"); }
  override dienTich(): number { return this.dai * this.rong; }
  override chuVi(): number { return 2 * (this.dai + this.rong); }
}

const hinh: HinhHoc[] = [new HinhTron(5), new HinhChuNhat(4, 6), new HinhTron(3)];
hinh.forEach(h => console.log(h.moTa()));`,
        hint: "HinhTron: dienTich = Math.PI * r², chuVi = 2 * Math.PI * r. Dùng override keyword.",
      },
      {
        title: "Bài tập 2: Class Stack",
        description: "Tạo class `Stack<T>` với private array items. Các method: push(), pop() (throw nếu rỗng), peek(), isEmpty(), size, toArray(). Dùng getter cho size.",
        starterCode: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    // TODO
  }

  pop(): T {
    // TODO: throw Error('Stack rỗng') nếu items rỗng
    return this.items[0];
  }

  peek(): T {
    // TODO: xem phần tử trên cùng (không xóa)
    return this.items[0];
  }

  get size(): number {
    // TODO
    return 0;
  }

  isEmpty(): boolean {
    // TODO
    return true;
  }

  toArray(): T[] {
    // TODO: trả về copy mảng (từ bottom đến top)
    return [];
  }
}

// Test
const stack = new Stack<number>();
stack.push(1); stack.push(2); stack.push(3);
console.log("Size:", stack.size);      // 3
console.log("Peek:", stack.peek());    // 3
console.log("Pop:", stack.pop());      // 3
console.log("Array:", stack.toArray()); // [1, 2]

const strStack = new Stack<string>();
strStack.push("a"); strStack.push("b");
console.log(strStack.toArray()); // ["a", "b"]`,
        solution: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void { this.items.push(item); }

  pop(): T {
    if (this.isEmpty()) throw new Error("Stack rỗng");
    return this.items.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) throw new Error("Stack rỗng");
    return this.items[this.items.length - 1];
  }

  get size(): number { return this.items.length; }

  isEmpty(): boolean { return this.items.length === 0; }

  toArray(): T[] { return [...this.items]; }
}

const stack = new Stack<number>();
stack.push(1); stack.push(2); stack.push(3);
console.log("Size:", stack.size);
console.log("Peek:", stack.peek());
console.log("Pop:", stack.pop());
console.log("Array:", stack.toArray());

const strStack = new Stack<string>();
strStack.push("a"); strStack.push("b");
console.log(strStack.toArray());`,
        hint: "pop() xóa và trả về phần tử cuối: this.items.pop(). Dùng ! (non-null assertion) sau khi kiểm tra isEmpty.",
      },
      {
        title: "Bài tập 3: Getter/Setter với validation",
        description: "Tạo class `NhietDo` với private `_celsius`. Getter `fahrenheit` và `kelvin`. Setter `celsius` với validation (không nhỏ hơn -273.15). Setter `fahrenheit` để gán qua °F.",
        starterCode: `class NhietDo {
  private _celsius: number;

  constructor(celsius: number = 0) {
    this._celsius = celsius;
  }

  get celsius(): number { return this._celsius; }

  set celsius(value: number) {
    // TODO: throw nếu value < -273.15 (độ 0 tuyệt đối)
    this._celsius = value;
  }

  get fahrenheit(): number {
    // TODO: C * 9/5 + 32
    return 0;
  }

  set fahrenheit(f: number) {
    // TODO: gán celsius từ fahrenheit: (F - 32) * 5/9
  }

  get kelvin(): number {
    // TODO: C + 273.15
    return 0;
  }

  toString(): string {
    return \`\${this._celsius}°C = \${this.fahrenheit}°F = \${this.kelvin}K\`;
  }
}

const n = new NhietDo(100);
console.log(n.toString()); // 100°C = 212°F = 373.15K

n.fahrenheit = 32;
console.log(n.celsius);    // 0

try {
  n.celsius = -300; // Lỗi!
} catch (e: any) {
  console.log("Lỗi:", e.message);
}`,
        solution: `class NhietDo {
  private _celsius: number;

  constructor(celsius: number = 0) { this._celsius = celsius; }

  get celsius(): number { return this._celsius; }
  set celsius(value: number) {
    if (value < -273.15) throw new Error("Dưới độ 0 tuyệt đối!");
    this._celsius = value;
  }

  get fahrenheit(): number { return this._celsius * 9 / 5 + 32; }
  set fahrenheit(f: number) { this.celsius = (f - 32) * 5 / 9; }

  get kelvin(): number { return this._celsius + 273.15; }

  toString(): string {
    return \`\${this._celsius}°C = \${this.fahrenheit}°F = \${this.kelvin}K\`;
  }
}

const n = new NhietDo(100);
console.log(n.toString());

n.fahrenheit = 32;
console.log(n.celsius);

try {
  n.celsius = -300;
} catch (e: any) {
  console.log("Lỗi:", e.message);
}`,
        hint: "Setter fahrenheit gọi setter celsius: this.celsius = (f - 32) * 5/9 — validation tự áp dụng!",
      },
      {
        title: "Bài tập 4: Class GioHang (Shopping Cart)",
        description: "Xây dựng class GioHang hoàn chỉnh dùng Map để lưu items. Method chaining pattern (return this) cho phép viết: `cart.them(1,'Laptop',25e6).them(2,'Mouse',500e3)`. Tính tổng, áp mã giảm giá.",
        starterCode: `interface CartItem { id: number; ten: string; gia: number; soLuong: number }

class GioHang {
  private items = new Map<number, CartItem>();
  private maGiamGia: Map<string, number> = new Map([
    ["GIAM10", 10], ["GIAM20", 20], ["VIP30", 30],
  ]);
  private appliedCode: string | null = null;

  them(id: number, ten: string, gia: number, soLuong: number = 1): this {
    // TODO: nếu đã có id, tăng soLuong; nếu chưa, thêm mới
    return this;
  }

  bot(id: number, soLuong: number = 1): this {
    // TODO: giảm soLuong, nếu <= 0 thì xóa khỏi cart
    return this;
  }

  xoa(id: number): this {
    this.items.delete(id);
    return this;
  }

  apMaGiam(code: string): this {
    // TODO: kiểm tra code hợp lệ, nếu có thì lưu appliedCode
    return this;
  }

  tinhTong(): { subtotal: number; discount: number; total: number } {
    const subtotal = Array.from(this.items.values())
      .reduce((sum, item) => sum + item.gia * item.soLuong, 0);
    // TODO: tính discount theo appliedCode
    const pct = this.appliedCode ? (this.maGiamGia.get(this.appliedCode) ?? 0) : 0;
    const discount = Math.round(subtotal * pct / 100);
    return { subtotal, discount, total: subtotal - discount };
  }

  inGioHang(): void {
    console.log("=== GIỎ HÀNG ===");
    this.items.forEach(item =>
      console.log(item.ten + " x" + item.soLuong + " = " + (item.gia * item.soLuong).toLocaleString("vi-VN"))
    );
    const { subtotal, discount, total } = this.tinhTong();
    if (discount > 0) console.log("Giảm giá:", discount.toLocaleString("vi-VN"));
    console.log("Tổng thanh toán:", total.toLocaleString("vi-VN") + " ₫");
  }
}

new GioHang()
  .them(1, "Laptop", 25_000_000)
  .them(2, "Mouse", 500_000)
  .them(2, "Mouse", 500_000) // thêm 1 cái nữa
  .apMaGiam("GIAM10")
  .inGioHang();`,
        solution: `interface CartItem { id: number; ten: string; gia: number; soLuong: number }

class GioHang {
  private items = new Map<number, CartItem>();
  private maGiamGia: Map<string, number> = new Map([
    ["GIAM10", 10], ["GIAM20", 20], ["VIP30", 30],
  ]);
  private appliedCode: string | null = null;

  them(id: number, ten: string, gia: number, soLuong: number = 1): this {
    const existing = this.items.get(id);
    if (existing) existing.soLuong += soLuong;
    else this.items.set(id, { id, ten, gia, soLuong });
    return this;
  }

  bot(id: number, soLuong: number = 1): this {
    const item = this.items.get(id);
    if (item) {
      item.soLuong -= soLuong;
      if (item.soLuong <= 0) this.items.delete(id);
    }
    return this;
  }

  xoa(id: number): this {
    this.items.delete(id);
    return this;
  }

  apMaGiam(code: string): this {
    if (this.maGiamGia.has(code)) this.appliedCode = code;
    else console.log("Mã giảm giá không hợp lệ:", code);
    return this;
  }

  tinhTong(): { subtotal: number; discount: number; total: number } {
    const subtotal = Array.from(this.items.values())
      .reduce((sum, item) => sum + item.gia * item.soLuong, 0);
    const pct = this.appliedCode ? (this.maGiamGia.get(this.appliedCode) ?? 0) : 0;
    const discount = Math.round(subtotal * pct / 100);
    return { subtotal, discount, total: subtotal - discount };
  }

  inGioHang(): void {
    console.log("=== GIỎ HÀNG ===");
    this.items.forEach(item =>
      console.log(item.ten + " x" + item.soLuong + " = " + (item.gia * item.soLuong).toLocaleString("vi-VN"))
    );
    const { subtotal, discount, total } = this.tinhTong();
    if (discount > 0) console.log("Giảm giá:", discount.toLocaleString("vi-VN"));
    console.log("Tổng thanh toán:", total.toLocaleString("vi-VN") + " ₫");
  }
}

new GioHang()
  .them(1, "Laptop", 25_000_000)
  .them(2, "Mouse", 500_000)
  .them(2, "Mouse", 500_000)
  .apMaGiam("GIAM10")
  .inGioHang();`,
        hint: "Dùng Map.get() để lấy item, nếu tồn tại tăng soLuong trực tiếp. Method chaining: return this ở cuối mỗi method.",
      },
      {
        title: "Bài tập 5: EventEmitter — Pub/Sub Pattern",
        description: "EventEmitter là pattern quan trọng trong Node.js. Implement class `EventEmitter` với on(), off(), emit(), once(). Ứng dụng: hệ thống thông báo khi giá sản phẩm thay đổi.",
        starterCode: `class EventEmitter {
  private listeners = new Map<string, Array<(...args: any[]) => void>>();

  on(event: string, fn: (...args: any[]) => void): this {
    // TODO: thêm fn vào danh sách listeners của event
    return this;
  }

  off(event: string, fn: (...args: any[]) => void): this {
    // TODO: xóa fn khỏi danh sách
    return this;
  }

  emit(event: string, ...args: any[]): void {
    // TODO: gọi tất cả listeners của event với args
  }

  once(event: string, fn: (...args: any[]) => void): this {
    // TODO: đăng ký nhưng tự động hủy sau khi gọi 1 lần
    const wrapper = (...args: any[]) => {
      fn(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

// Ứng dụng: theo dõi giá sản phẩm
const store = new EventEmitter();

store.on("price-change", (product: string, oldPrice: number, newPrice: number) => {
  const diff = newPrice - oldPrice;
  console.log(product + ": " + oldPrice.toLocaleString() + " → " + newPrice.toLocaleString() + " (" + (diff > 0 ? "+" : "") + diff.toLocaleString() + ")");
});

store.once("sale-start", (discount: number) => {
  console.log("FLASH SALE " + discount + "% BẮT ĐẦU! (thông báo 1 lần)");
});

store.emit("price-change", "iPhone 15", 23_990_000, 21_990_000);
store.emit("price-change", "MacBook",   49_990_000, 52_990_000);
store.emit("sale-start", 20);
store.emit("sale-start", 30); // không in nữa (once)`,
        solution: `class EventEmitter {
  private listeners = new Map<string, Array<(...args: any[]) => void>>();

  on(event: string, fn: (...args: any[]) => void): this {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(fn);
    return this;
  }

  off(event: string, fn: (...args: any[]) => void): this {
    const fns = this.listeners.get(event);
    if (fns) this.listeners.set(event, fns.filter(f => f !== fn));
    return this;
  }

  emit(event: string, ...args: any[]): void {
    this.listeners.get(event)?.forEach(fn => fn(...args));
  }

  once(event: string, fn: (...args: any[]) => void): this {
    const wrapper = (...args: any[]) => {
      fn(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

const store = new EventEmitter();

store.on("price-change", (product: string, oldPrice: number, newPrice: number) => {
  const diff = newPrice - oldPrice;
  console.log(product + ": " + oldPrice.toLocaleString() + " → " + newPrice.toLocaleString() + " (" + (diff > 0 ? "+" : "") + diff.toLocaleString() + ")");
});

store.once("sale-start", (discount: number) => {
  console.log("FLASH SALE " + discount + "% BẮT ĐẦU! (thông báo 1 lần)");
});

store.emit("price-change", "iPhone 15", 23_990_000, 21_990_000);
store.emit("price-change", "MacBook",   49_990_000, 52_990_000);
store.emit("sale-start", 20);
store.emit("sale-start", 30);`,
        hint: "on(): thêm vào Map. off(): filter ra fn đó. emit(): get listeners rồi forEach gọi. once(): wrap fn, trong wrapper gọi this.off(event, wrapper) sau khi gọi fn.",
      },
    ],
  },
  {
    id: "07-generics",
    title: "Generics",
    description: "Generic functions, classes, constraints, utility types cơ bản",
    level: "Trung cấp",
    content: `
## Generics — Kiểu tổng quát

Generics cho phép code **linh hoạt** mà vẫn **type-safe**:

\`\`\`ts
// Không Generics - phải viết nhiều lần
function getFirstNum(arr: number[]): number { return arr[0]; }
function getFirstStr(arr: string[]): string { return arr[0]; }

// Với Generics - viết một lần dùng mọi kiểu
function getFirst<T>(arr: T[]): T { return arr[0]; }
getFirst([1, 2, 3]);         // T được suy ra là number
getFirst(["a", "b", "c"]);  // T được suy ra là string
\`\`\`

### Nhiều Type Parameters
\`\`\`ts
function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((item, i) => [item, b[i]]);
}
zip([1,2], ["a","b"]); // [[1,"a"],[2,"b"]]
\`\`\`

### Generic Constraints
\`\`\`ts
// T phải có thuộc tính length
function inDoDai<T extends { length: number }>(item: T): void {
  console.log(item.length);
}
inDoDai("hello");  // 5 ✓
inDoDai([1,2,3]);  // 3 ✓
// inDoDai(42);    // ❌ Lỗi: number không có length
\`\`\`

### keyof constraint
\`\`\`ts
function layGiaTri<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { ten: "An", tuoi: 20 };
layGiaTri(user, "ten");  // "An" - type string
layGiaTri(user, "tuoi"); // 20  - type number
// layGiaTri(user, "xyz"); // ❌ Lỗi!
\`\`\`
    `,
    codeExample: `// Generic functions
function dao<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function nhom<T, K extends string | number>(
  arr: T[],
  layKhoa: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = layKhoa(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

// Generic class
class Cache<T> {
  private store = new Map<string, { value: T; expires: number }>();

  set(key: string, value: T, ttlMs: number = 60000): void {
    this.store.set(key, { value, expires: Date.now() + ttlMs });
  }

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry || Date.now() > entry.expires) return undefined;
    return entry.value;
  }
}

// Sử dụng
console.log(dao([1,2,3,4,5]));
console.log(unique([1,2,2,3,3,3]));

interface SinhVien { ten: string; khoa: string; gpa: number }
const svList: SinhVien[] = [
  { ten: "An", khoa: "CNTT", gpa: 3.8 },
  { ten: "B", khoa: "Toán", gpa: 3.5 },
  { ten: "C", khoa: "CNTT", gpa: 3.9 },
];

const theoKhoa = nhom(svList, sv => sv.khoa);
console.log("Nhóm CNTT:", theoKhoa["CNTT"].map(s => s.ten));`,
    exercises: [
      {
        title: "Bài tập 1: Generic Result type",
        description: "Tạo generic type `Result<T>` = `{ ok: true; value: T } | { ok: false; error: string }`. Viết hàm `chia(a, b): Result<number>` và `parseJSON(s): Result<unknown>` dùng kiểu này.",
        starterCode: `// Định nghĩa Result<T>
type Result<T> = // TODO

function chia(a: number, b: number): Result<number> {
  // TODO: trả về ok nếu b !== 0, error nếu b === 0
  return { ok: false, error: "" };
}

function parseJSON(json: string): Result<unknown> {
  // TODO: dùng try-catch với JSON.parse
  return { ok: false, error: "" };
}

// Xử lý Result
function xuLyKetQua<T>(result: Result<T>): string {
  // TODO: nếu ok in value, nếu lỗi in error
  return "";
}

console.log(xuLyKetQua(chia(10, 2)));   // Kết quả: 5
console.log(xuLyKetQua(chia(10, 0)));   // Lỗi: Chia cho 0
console.log(xuLyKetQua(parseJSON('{"a":1}'))); // Kết quả: [object Object]
console.log(xuLyKetQua(parseJSON("invalid")));  // Lỗi: ...`,
        solution: `type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function chia(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: "Chia cho 0" };
  return { ok: true, value: a / b };
}

function parseJSON(json: string): Result<unknown> {
  try {
    return { ok: true, value: JSON.parse(json) };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

function xuLyKetQua<T>(result: Result<T>): string {
  if (result.ok) return \`Kết quả: \${result.value}\`;
  return \`Lỗi: \${result.error}\`;
}

console.log(xuLyKetQua(chia(10, 2)));
console.log(xuLyKetQua(chia(10, 0)));
console.log(xuLyKetQua(parseJSON('{"a":1}')));
console.log(xuLyKetQua(parseJSON("invalid")));`,
        hint: "Result<T> là discriminated union với thuộc tính ok: boolean để phân biệt. TypeScript tự thu hẹp kiểu khi kiểm tra result.ok",
      },
      {
        title: "Bài tập 2: Generic Pipeline",
        description: "Viết class `Pipeline<T>` cho phép chain nhiều bước xử lý. `.pipe(fn)` thêm bước, `.run(value)` thực thi tất cả từ đầu đến cuối.",
        starterCode: `class Pipeline<T> {
  private steps: Array<(x: T) => T> = [];

  pipe(fn: (x: T) => T): Pipeline<T> {
    // TODO: thêm fn vào steps, trả về this để chain
    return this;
  }

  run(value: T): T {
    // TODO: áp dụng tất cả steps theo thứ tự
    return value;
  }
}

// Test với số
const soXuLy = new Pipeline<number>()
  .pipe(x => x * 2)
  .pipe(x => x + 10)
  .pipe(x => x / 2);

console.log(soXuLy.run(5));  // (5*2 + 10) / 2 = 10

// Test với chuỗi
const chuoiXuLy = new Pipeline<string>()
  .pipe(s => s.trim())
  .pipe(s => s.toLowerCase())
  .pipe(s => s.replace(/\s+/g, "-"));

console.log(chuoiXuLy.run("  Hello World  ")); // hello-world`,
        solution: `class Pipeline<T> {
  private steps: Array<(x: T) => T> = [];

  pipe(fn: (x: T) => T): Pipeline<T> {
    this.steps.push(fn);
    return this;
  }

  run(value: T): T {
    return this.steps.reduce((acc, fn) => fn(acc), value);
  }
}

const soXuLy = new Pipeline<number>()
  .pipe(x => x * 2)
  .pipe(x => x + 10)
  .pipe(x => x / 2);

console.log(soXuLy.run(5));

const chuoiXuLy = new Pipeline<string>()
  .pipe(s => s.trim())
  .pipe(s => s.toLowerCase())
  .pipe(s => s.replace(/\s+/g, "-"));

console.log(chuoiXuLy.run("  Hello World  "));`,
        hint: "pipe() push vào mảng và return this. run() dùng reduce để áp dụng lần lượt.",
      },
      {
        title: "Bài tập 3: keyof và typeof trong Generics",
        description: "Viết hàm `pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>` và `omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>` không dùng Utility Types.",
        starterCode: `// Tự implement Pick
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  // TODO: tạo object chỉ chứa các key được chọn
  return {} as Pick<T, K>;
}

// Tự implement Omit
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  // TODO: tạo object bỏ các key được chỉ định
  return {} as Omit<T, K>;
}

const user = { id: 1, ten: "An", email: "an@test.com", matKhau: "secret", tuoi: 20 };

const preview = pick(user, ["id", "ten"]);
console.log(preview); // { id: 1, ten: "An" }

const safe = omit(user, ["matKhau"]);
console.log(safe); // { id, ten, email, tuoi }`,
        solution: `function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete (result as any)[key];
  }
  return result as Omit<T, K>;
}

const user = { id: 1, ten: "An", email: "an@test.com", matKhau: "secret", tuoi: 20 };

const preview = pick(user, ["id", "ten"]);
console.log(JSON.stringify(preview));

const safe = omit(user, ["matKhau"]);
console.log(JSON.stringify(safe));`,
        hint: "pick: loop qua keys và gán obj[key]. omit: spread object rồi delete các key không muốn.",
      },
      {
        title: "Bài tập 4: Generic Repository Pattern",
        description: "Repository pattern tách biệt logic truy xuất dữ liệu. Implement `InMemoryRepository<T>` với các method CRUD type-safe. Dùng để quản lý Users và Products mà không cần viết lại code.",
        starterCode: `interface Entity { id: number }

interface Repository<T extends Entity> {
  findById(id: number): T | undefined;
  findAll(): T[];
  save(item: T): T;
  delete(id: number): boolean;
  findBy<K extends keyof T>(key: K, value: T[K]): T[];
}

class InMemoryRepository<T extends Entity> implements Repository<T> {
  private store = new Map<number, T>();

  findById(id: number): T | undefined {
    // TODO
    return undefined;
  }

  findAll(): T[] {
    // TODO: trả về tất cả values
    return [];
  }

  save(item: T): T {
    // TODO: lưu vào store theo item.id, trả về item
    return item;
  }

  delete(id: number): boolean {
    // TODO: trả về true nếu xóa thành công
    return false;
  }

  findBy<K extends keyof T>(key: K, value: T[K]): T[] {
    // TODO: tìm tất cả items có item[key] === value
    return [];
  }
}

// Test
interface User extends Entity { name: string; role: "admin" | "user" }
interface Product extends Entity { name: string; price: number; category: string }

const userRepo = new InMemoryRepository<User>();
userRepo.save({ id: 1, name: "An", role: "admin" });
userRepo.save({ id: 2, name: "Binh", role: "user" });
userRepo.save({ id: 3, name: "Ca", role: "user" });

console.log("All users:", userRepo.findAll().map(u => u.name));
console.log("Find id=2:", userRepo.findById(2)?.name);
console.log("Users:", userRepo.findBy("role", "user").map(u => u.name));

const productRepo = new InMemoryRepository<Product>();
productRepo.save({ id: 1, name: "Laptop", price: 25_000_000, category: "dien-tu" });
productRepo.save({ id: 2, name: "Mouse", price: 500_000, category: "phu-kien" });
console.log("Products:", productRepo.findAll().map(p => p.name));`,
        solution: `interface Entity { id: number }

interface Repository<T extends Entity> {
  findById(id: number): T | undefined;
  findAll(): T[];
  save(item: T): T;
  delete(id: number): boolean;
  findBy<K extends keyof T>(key: K, value: T[K]): T[];
}

class InMemoryRepository<T extends Entity> implements Repository<T> {
  private store = new Map<number, T>();

  findById(id: number): T | undefined { return this.store.get(id); }
  findAll(): T[] { return Array.from(this.store.values()); }
  save(item: T): T { this.store.set(item.id, item); return item; }
  delete(id: number): boolean {
    if (!this.store.has(id)) return false;
    this.store.delete(id);
    return true;
  }
  findBy<K extends keyof T>(key: K, value: T[K]): T[] {
    return this.findAll().filter(item => item[key] === value);
  }
}

interface User extends Entity { name: string; role: "admin" | "user" }
interface Product extends Entity { name: string; price: number; category: string }

const userRepo = new InMemoryRepository<User>();
userRepo.save({ id: 1, name: "An", role: "admin" });
userRepo.save({ id: 2, name: "Binh", role: "user" });
userRepo.save({ id: 3, name: "Ca", role: "user" });

console.log("All users:", userRepo.findAll().map(u => u.name));
console.log("Find id=2:", userRepo.findById(2)?.name);
console.log("Users:", userRepo.findBy("role", "user").map(u => u.name));

const productRepo = new InMemoryRepository<Product>();
productRepo.save({ id: 1, name: "Laptop", price: 25_000_000, category: "dien-tu" });
productRepo.save({ id: 2, name: "Mouse", price: 500_000, category: "phu-kien" });
console.log("Products:", productRepo.findAll().map(p => p.name));`,
        hint: "store là Map<number, T>. findAll = Array.from(store.values()). findBy dùng .filter() và generic constraint K extends keyof T để type-safe.",
      },
      {
        title: "Bài tập 5: Generic Queue (FIFO)",
        description: "Queue (hàng đợi) là cấu trúc dữ liệu quan trọng trong xử lý task, message queue. Implement generic `Queue<T>` với enqueue, dequeue, peek, size, isEmpty. Áp dụng mô phỏng hàng đợi in ấn.",
        starterCode: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    // TODO: thêm vào cuối
  }

  dequeue(): T {
    // TODO: lấy ra đầu hàng, throw nếu rỗng
    throw new Error("Queue rỗng");
  }

  peek(): T {
    // TODO: xem phần tử đầu mà không xóa
    throw new Error("Queue rỗng");
  }

  get size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
  toArray(): T[] { return [...this.items]; }
}

// Ứng dụng: hàng đợi in ấn
interface PrintJob {
  id: number;
  document: string;
  priority: "normal" | "urgent";
  pages: number;
}

const printQueue = new Queue<PrintJob>();

// Thêm các lệnh in
[
  { id: 1, document: "Báo cáo Q4.pdf", priority: "normal", pages: 20 },
  { id: 2, document: "Hợp đồng KHẨN.pdf", priority: "urgent", pages: 5 },
  { id: 3, document: "Slide thuyết trình.pptx", priority: "normal", pages: 15 },
].forEach(job => printQueue.enqueue(job as PrintJob));

console.log("Hàng đợi in:", printQueue.size, "lệnh");
console.log("Tiếp theo:", printQueue.peek().document);

while (!printQueue.isEmpty()) {
  const job = printQueue.dequeue();
  console.log("In:", job.document, "(" + job.pages + " trang, " + job.priority + ")");
}`,
        solution: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void { this.items.push(item); }

  dequeue(): T {
    if (this.isEmpty()) throw new Error("Queue rỗng");
    return this.items.shift()!;
  }

  peek(): T {
    if (this.isEmpty()) throw new Error("Queue rỗng");
    return this.items[0];
  }

  get size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
  toArray(): T[] { return [...this.items]; }
}

interface PrintJob {
  id: number;
  document: string;
  priority: "normal" | "urgent";
  pages: number;
}

const printQueue = new Queue<PrintJob>();

[
  { id: 1, document: "Báo cáo Q4.pdf", priority: "normal", pages: 20 },
  { id: 2, document: "Hợp đồng KHẨN.pdf", priority: "urgent", pages: 5 },
  { id: 3, document: "Slide thuyết trình.pptx", priority: "normal", pages: 15 },
].forEach(job => printQueue.enqueue(job as PrintJob));

console.log("Hàng đợi in:", printQueue.size, "lệnh");
console.log("Tiếp theo:", printQueue.peek().document);

while (!printQueue.isEmpty()) {
  const job = printQueue.dequeue();
  console.log("In:", job.document, "(" + job.pages + " trang, " + job.priority + ")");
}`,
        hint: "enqueue dùng push(). dequeue dùng shift() — lấy phần tử đầu tiên. peek() chỉ return items[0] không xóa.",
      },
    ],
  },
  {
    id: "08-utility-types",
    title: "Utility Types",
    description: "Partial, Required, Pick, Omit, Record, Readonly, ReturnType, Parameters",
    level: "Nâng cao",
    content: `
## Utility Types — Kiểu tiện ích có sẵn

TypeScript cung cấp nhiều **utility types** để biến đổi kiểu hiện có.

### Thay đổi optionality
\`\`\`ts
Partial<T>   // Tất cả optional
Required<T>  // Tất cả required
\`\`\`

### Chọn/loại trừ fields
\`\`\`ts
Pick<T, "a" | "b">    // Chỉ giữ a, b
Omit<T, "a" | "b">    // Bỏ a, b
\`\`\`

### Tạo kiểu mới
\`\`\`ts
Record<K, V>           // { [key: K]: V }
Readonly<T>            // Tất cả readonly
\`\`\`

### Từ Union
\`\`\`ts
Exclude<T, U>    // Bỏ các kiểu trong U khỏi T
Extract<T, U>    // Chỉ giữ kiểu trong cả T và U
NonNullable<T>   // Bỏ null và undefined
\`\`\`

### Từ Function
\`\`\`ts
ReturnType<typeof fn>    // Kiểu trả về của hàm
Parameters<typeof fn>    // Tuple các tham số
ConstructorParameters<typeof Class> // Params của constructor
InstanceType<typeof Class>  // Kiểu instance
\`\`\`

### Thao tác String
\`\`\`ts
Uppercase<"hello">    // "HELLO"
Lowercase<"HELLO">    // "hello"
Capitalize<"hello">   // "Hello"
Uncapitalize<"Hello"> // "hello"
\`\`\`
    `,
    codeExample: `interface NguoiDung {
  id: number;
  ten: string;
  email: string;
  matKhau: string;
  tuoi?: number;
  readonly ngayTao: Date;
}

// Các derived types phổ biến trong thực tế
type TaoNguoiDungDto = Omit<NguoiDung, "id" | "ngayTao">;
type CapNhatNguoiDungDto = Partial<Omit<NguoiDung, "id" | "ngayTao">>;
type NguoiDungCong = Omit<NguoiDung, "matKhau">;
type NguoiDungThuGon = Pick<NguoiDung, "id" | "ten">;

// ReturnType và Parameters
function layNguoiDung(id: number, include: string[] = []) {
  return { id, ten: "An", email: "an@test.com", ngayTao: new Date() };
}

type KetQuaLayND = ReturnType<typeof layNguoiDung>;      // Kiểu kết quả
type ThamSoLayND = Parameters<typeof layNguoiDung>;       // [number, string[]?]

// Record cho map
type VaiTro = "admin" | "user" | "moderator";
type PhanQuyen = Record<VaiTro, { docDuoc: string[]; ghiDuoc: string[] }>;

const phanQuyen: PhanQuyen = {
  admin: { docDuoc: ["*"], ghiDuoc: ["*"] },
  moderator: { docDuoc: ["posts", "comments"], ghiDuoc: ["posts"] },
  user: { docDuoc: ["posts"], ghiDuoc: [] },
};

// Template literal types
type EventName = "click" | "focus" | "change";
type Handler = \`on\${Capitalize<EventName>}\`; // "onClick" | "onFocus" | "onChange"

const handler: Handler = "onClick";
console.log("Handler:", handler);
console.log("Admin có thể đọc:", phanQuyen.admin.docDuoc);`,
    exercises: [
      {
        title: "Bài tập 1: API Types thực tế",
        description: "Cho interface `SanPham`, tạo: `TaoSPDto` (bỏ id, createdAt), `CapNhatSPDto` (Partial, bỏ id), `SPCong` (bỏ giaNhap), `SPThuGon` (chỉ id, ten, gia). Dùng trong các mock functions.",
        starterCode: `interface SanPham {
  id: number;
  ten: string;
  gia: number;
  giaNhap: number;
  soLuong: number;
  danhMuc: string;
  createdAt: string;
}

// TODO: Tạo các derived types
type TaoSPDto = // Omit id và createdAt
type CapNhatSPDto = // Partial, bỏ id và createdAt
type SPCong = // Bỏ giaNhap
type SPThuGon = // Chỉ id, ten, gia

// Mock functions sử dụng types
function taoSP(dto: TaoSPDto): SanPham {
  return { ...dto, id: Date.now(), createdAt: new Date().toISOString() };
}

function capNhatSP(id: number, dto: CapNhatSPDto): void {
  console.log(\`Cập nhật SP \${id}:\`, JSON.stringify(dto));
}

const sp = taoSP({ ten: "Laptop", gia: 15_000_000, giaNhap: 12_000_000, soLuong: 5, danhMuc: "dien_tu" });
console.log("Tạo:", sp.ten, "-", sp.id);

capNhatSP(1, { gia: 14_000_000, soLuong: 10 });`,
        solution: `interface SanPham {
  id: number;
  ten: string;
  gia: number;
  giaNhap: number;
  soLuong: number;
  danhMuc: string;
  createdAt: string;
}

type TaoSPDto = Omit<SanPham, "id" | "createdAt">;
type CapNhatSPDto = Partial<Omit<SanPham, "id" | "createdAt">>;
type SPCong = Omit<SanPham, "giaNhap">;
type SPThuGon = Pick<SanPham, "id" | "ten" | "gia">;

function taoSP(dto: TaoSPDto): SanPham {
  return { ...dto, id: Date.now(), createdAt: new Date().toISOString() };
}

function capNhatSP(id: number, dto: CapNhatSPDto): void {
  console.log(\`Cập nhật SP \${id}:\`, JSON.stringify(dto));
}

const sp = taoSP({ ten: "Laptop", gia: 15_000_000, giaNhap: 12_000_000, soLuong: 5, danhMuc: "dien_tu" });
console.log("Tạo:", sp.ten, "-", sp.id);
capNhatSP(1, { gia: 14_000_000, soLuong: 10 });`,
        hint: "TaoSPDto = Omit<SanPham, 'id' | 'createdAt'>. CapNhatSPDto = Partial<Omit<SanPham, 'id' | 'createdAt'>>",
      },
      {
        title: "Bài tập 2: ReturnType và Parameters thực tế",
        description: "Viết một hàm `retry<T>(fn: () => Promise<T>, times: number): Promise<T>` dùng ReturnType. Tạo type-safe wrapper cho setTimeout.",
        starterCode: `// Lấy kiểu trả về của một hàm bất kỳ
function layNguoiDung(id: number) {
  return { id, ten: "Nguyễn An", email: "an@test.com", roles: ["user"] };
}

// Dùng ReturnType để không phải viết lại interface
type NguoiDungKetQua = ReturnType<typeof layNguoiDung>;

// Hàm cache dùng ReturnType
function taoCache<T extends (...args: any[]) => any>(fn: T) {
  const cache = new Map<string, ReturnType<T>>();
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key)!;
  };
}

// TODO: dùng taoCache để cache layNguoiDung
const layNguoiDungCache = taoCache(layNguoiDung);

// Test cache
console.log(layNguoiDungCache(1)); // Gọi thực
console.log(layNguoiDungCache(1)); // Từ cache
console.log(layNguoiDungCache(2)); // Gọi thực với id khác

// TODO: In thông tin về kiểu
// type check (không cần code thêm nếu đã dùng đúng types)
const user: NguoiDungKetQua = layNguoiDungCache(1);
console.log(user.ten, user.roles);`,
        solution: `function layNguoiDung(id: number) {
  return { id, ten: "Nguyễn An", email: "an@test.com", roles: ["user"] };
}

type NguoiDungKetQua = ReturnType<typeof layNguoiDung>;

function taoCache<T extends (...args: any[]) => any>(fn: T) {
  const cache = new Map<string, ReturnType<T>>();
  let hits = 0, misses = 0;
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      misses++;
      console.log(\`[Cache MISS] args=\${key}\`);
      cache.set(key, fn(...args));
    } else {
      hits++;
      console.log(\`[Cache HIT] args=\${key} (hits=\${hits})\`);
    }
    return cache.get(key)!;
  };
}

const layNguoiDungCache = taoCache(layNguoiDung);

console.log(layNguoiDungCache(1));
console.log(layNguoiDungCache(1));
console.log(layNguoiDungCache(2));

const user: NguoiDungKetQua = layNguoiDungCache(1);
console.log(user.ten, user.roles);`,
        hint: "ReturnType<typeof fn> tự động lấy kiểu trả về. Parameters<T> lấy tuple các tham số — dùng để spread: fn(...args)",
      },
      {
        title: "Bài tập 3: DeepPartial — Cập nhật cài đặt người dùng",
        description: "Partial<T> chỉ shallow. Trong thực tế cần DeepPartial<T> để update nested config. Tạo type `DeepPartial<T>` và hàm `deepMerge<T>(base: T, patch: DeepPartial<T>): T` cho phép update từng field sâu.",
        starterCode: `// DeepPartial: tất cả fields đều optional, kể cả nested
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface UserSettings {
  profile: { name: string; avatar: string; bio: string };
  notifications: { email: boolean; push: boolean; sms: boolean };
  theme: { mode: "light" | "dark"; color: string; fontSize: number };
}

function deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T {
  const result = { ...base } as T;
  for (const key in patch) {
    const patchVal = patch[key as keyof typeof patch];
    const baseVal = base[key as keyof T];
    if (patchVal !== undefined && typeof patchVal === "object" && typeof baseVal === "object") {
      // TODO: đệ quy merge nested objects
      (result as any)[key] = deepMerge(baseVal as object, patchVal as object);
    } else if (patchVal !== undefined) {
      (result as any)[key] = patchVal;
    }
  }
  return result;
}

const defaultSettings: UserSettings = {
  profile:       { name: "Guest", avatar: "/default.png", bio: "" },
  notifications: { email: true,  push: false, sms: false },
  theme:         { mode: "light", color: "#007bff", fontSize: 14 },
};

// Chỉ update những gì thay đổi
const updated = deepMerge(defaultSettings, {
  profile: { name: "Nguyễn An", bio: "TypeScript developer" },
  theme:   { mode: "dark", fontSize: 16 },
});

console.log("Name:", updated.profile.name);
console.log("Avatar:", updated.profile.avatar);    // giữ nguyên
console.log("Theme:", updated.theme.mode, updated.theme.fontSize);
console.log("Color:", updated.theme.color);         // giữ nguyên`,
        solution: `type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface UserSettings {
  profile: { name: string; avatar: string; bio: string };
  notifications: { email: boolean; push: boolean; sms: boolean };
  theme: { mode: "light" | "dark"; color: string; fontSize: number };
}

function deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T {
  const result = { ...base } as T;
  for (const key in patch) {
    const patchVal = patch[key as keyof typeof patch];
    const baseVal = base[key as keyof T];
    if (patchVal !== undefined && typeof patchVal === "object" && typeof baseVal === "object") {
      (result as any)[key] = deepMerge(baseVal as object, patchVal as object);
    } else if (patchVal !== undefined) {
      (result as any)[key] = patchVal;
    }
  }
  return result;
}

const defaultSettings: UserSettings = {
  profile:       { name: "Guest", avatar: "/default.png", bio: "" },
  notifications: { email: true,  push: false, sms: false },
  theme:         { mode: "light", color: "#007bff", fontSize: 14 },
};

const updated = deepMerge(defaultSettings, {
  profile: { name: "Nguyễn An", bio: "TypeScript developer" },
  theme:   { mode: "dark", fontSize: 16 },
});

console.log("Name:", updated.profile.name);
console.log("Avatar:", updated.profile.avatar);
console.log("Theme:", updated.theme.mode, updated.theme.fontSize);
console.log("Color:", updated.theme.color);`,
        hint: "DeepPartial: dùng mapped type với T[K] extends object ? DeepPartial<T[K]> : T[K]. deepMerge đệ quy khi cả hai values đều là object.",
      },
      {
        title: "Bài tập 4: Mapped Types — Tạo Form Schema",
        description: "Mapped types cho phép biến đổi toàn bộ interface. Tạo type `FormField<T>` (mỗi field thành { value, error, touched }), `FormState<T>` áp lên interface. Viết `createForm` và `validateForm`.",
        starterCode: `// Biến mỗi field T thành một form field object
type FormField<T> = { value: T; error: string | null; touched: boolean };

// Áp FormField lên tất cả fields của T
type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

interface RegisterData {
  username: string;
  email: string;
  age: number;
  password: string;
}

// Factory tạo FormState từ giá trị ban đầu
function createForm<T extends object>(initial: T): FormState<T> {
  const result = {} as FormState<T>;
  for (const key in initial) {
    (result as any)[key] = { value: initial[key], error: null, touched: false };
  }
  return result;
}

// Lấy giá trị từ form state
function getValues<T>(form: FormState<T>): T {
  const result = {} as T;
  for (const key in form) {
    (result as any)[key] = form[key].value;
  }
  return result;
}

// Test
const form = createForm<RegisterData>({
  username: "nguyenan", email: "an@test.com", age: 20, password: "secret123",
});

console.log("Username value:", form.username.value);
console.log("Touched:", form.email.touched);

// Simulate user interaction
form.username.touched = true;
form.username.error = form.username.value.length < 3 ? "Tối thiểu 3 ký tự" : null;

console.log("Username error:", form.username.error);
console.log("Values:", JSON.stringify(getValues(form)));`,
        solution: `type FormField<T> = { value: T; error: string | null; touched: boolean };
type FormState<T> = { [K in keyof T]: FormField<T[K]> };

interface RegisterData {
  username: string;
  email: string;
  age: number;
  password: string;
}

function createForm<T extends object>(initial: T): FormState<T> {
  const result = {} as FormState<T>;
  for (const key in initial) {
    (result as any)[key] = { value: initial[key], error: null, touched: false };
  }
  return result;
}

function getValues<T>(form: FormState<T>): T {
  const result = {} as T;
  for (const key in form) {
    (result as any)[key] = form[key].value;
  }
  return result;
}

const form = createForm<RegisterData>({
  username: "nguyenan", email: "an@test.com", age: 20, password: "secret123",
});

console.log("Username value:", form.username.value);
console.log("Touched:", form.email.touched);

form.username.touched = true;
form.username.error = form.username.value.length < 3 ? "Tối thiểu 3 ký tự" : null;

console.log("Username error:", form.username.error);
console.log("Values:", JSON.stringify(getValues(form)));`,
        hint: "FormState<T> dùng mapped type [K in keyof T]: FormField<T[K]>. createForm lặp qua keys của initial và wrap mỗi value.",
      },
      {
        title: "Bài tập 5: Readonly Deep — Bảo vệ config bất biến",
        description: "Trong production, config không nên bị thay đổi sau khi load. Tạo type `DeepReadonly<T>` và viết hàm `freeze<T>(obj: T): DeepReadonly<T>` dùng Object.freeze đệ quy. Test với config object.",
        starterCode: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

function freeze<T extends object>(obj: T): DeepReadonly<T> {
  // TODO: Object.freeze(obj) rồi đệ quy freeze tất cả properties là object
  Object.freeze(obj);
  return obj as DeepReadonly<T>;
}

interface ServerConfig {
  host: string;
  port: number;
  database: { url: string; pool: number };
  features: { logging: boolean; debug: boolean };
}

const config = freeze<ServerConfig>({
  host: "localhost",
  port: 3000,
  database: { url: "postgres://localhost/mydb", pool: 10 },
  features: { logging: true, debug: false },
});

console.log("Host:", config.host);
console.log("DB URL:", config.database.url);
console.log("Pool:", config.database.pool);

// Thử thay đổi (sẽ bị TypeScript báo lỗi khi compile, và throw ở strict mode)
try {
  (config as any).port = 9999;
  console.log("Port sau khi thay đổi:", config.port); // vẫn 3000 vì đã freeze
} catch(e: any) {
  console.log("Không thể thay đổi config đã freeze:", e.message);
}`,
        solution: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

function freeze<T extends object>(obj: T): DeepReadonly<T> {
  Object.freeze(obj);
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === "object" && val !== null && !Object.isFrozen(val)) {
      freeze(val as object);
    }
  }
  return obj as DeepReadonly<T>;
}

interface ServerConfig {
  host: string;
  port: number;
  database: { url: string; pool: number };
  features: { logging: boolean; debug: boolean };
}

const config = freeze<ServerConfig>({
  host: "localhost",
  port: 3000,
  database: { url: "postgres://localhost/mydb", pool: 10 },
  features: { logging: true, debug: false },
});

console.log("Host:", config.host);
console.log("DB URL:", config.database.url);
console.log("Pool:", config.database.pool);

try {
  (config as any).port = 9999;
  console.log("Port sau khi thay đổi:", config.port);
} catch(e: any) {
  console.log("Không thể thay đổi:", e.message);
}`,
        hint: "freeze() đệ quy: sau Object.freeze(obj), loop qua tất cả properties, nếu là object thì gọi freeze(val) tiếp. Kiểm tra Object.isFrozen để tránh lặp vô hạn.",
      },
    ],
  },
];
