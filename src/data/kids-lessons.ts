import type { Lesson } from "./typescript-lessons";

export const kidsLessons: Lesson[] = [
  {
    id: "01-xin-chao-the-gioi",
    title: "Xin chào thế giới! 🌍",
    description: "Bài học đầu tiên — in chữ lên màn hình",
    level: "Cơ bản",
    content: `
## Viết chương trình đầu tiên!

**console.log()** là lệnh dùng để in chữ ra màn hình. Đây là lệnh bạn sẽ dùng rất nhiều!

\`\`\`js
console.log("Xin chào thế giới!");
console.log("Tôi đang học lập trình!");
\`\`\`

### Quy tắc quan trọng:
- Chữ phải nằm trong dấu nháy \`""\` hoặc \`''\`
- Không được quên dấu ngoặc \`()\`
- Mỗi lệnh nên viết trên 1 dòng

### In số:
\`\`\`js
console.log(42);        // In số — không cần nháy
console.log(3.14);      // Số thập phân
console.log(2 + 3);     // In kết quả tính toán = 5
\`\`\`
    `,
    codeExample: `// Chương trình đầu tiên của bạn!
console.log("Xin chào thế giới! 🌍");
console.log("Tên tôi là Lập Trình Viên Nhí");
console.log("2 + 3 =", 2 + 3);
console.log("10 - 4 =", 10 - 4);
console.log("Học lập trình rất vui! 🎉");`,
    exercises: [
      { title: "In tên của bạn", description: "Dùng console.log() để in tên của bạn ra màn hình", starterCode: `// In tên của bạn ở đây\nconsole.log("Tên tôi là ...");`, solution: `console.log("Tên tôi là Minh An");`, hint: "Thay ... bằng tên thật của bạn trong dấu nháy" },
      { title: "In 3 câu yêu thích", description: "In ra 3 câu bất kỳ bạn thích", starterCode: `console.log("...");\nconsole.log("...");\nconsole.log("...");`, solution: `console.log("Tôi yêu lập trình!");\nconsole.log("Code rất thú vị!");\nconsole.log("Tôi sẽ trở thành dev!");`, hint: "Mỗi console.log() in 1 dòng" },
      { title: "Tính và in kết quả", description: "In kết quả của 5 + 8, 20 - 7, và 3 * 4", starterCode: `console.log(5 + 8);\nconsole.log(...);\nconsole.log(...);`, solution: `console.log(5 + 8);\nconsole.log(20 - 7);\nconsole.log(3 * 4);`, hint: "Dùng +, -, * cho cộng, trừ, nhân" },
      { title: "Giới thiệu bản thân", description: "In ra: tên, tuổi, và sở thích của bạn (3 dòng)", starterCode: `console.log("Tôi tên là ...");\nconsole.log("Tôi ... tuổi");\nconsole.log("Tôi thích ...");`, solution: `console.log("Tôi tên là An");\nconsole.log("Tôi 10 tuổi");\nconsole.log("Tôi thích chơi game");`, hint: "Điền thông tin thật của bạn vào" },
      { title: "Bài thơ mini", description: "Viết một bài thơ 4 dòng bất kỳ dùng console.log()", starterCode: `// Bài thơ của tôi:\nconsole.log("...");\nconsole.log("...");\nconsole.log("...");\nconsole.log("...");`, solution: `console.log("Mặt trời hồng tươi sáng");\nconsole.log("Em học code mỗi ngày");\nconsole.log("Chương trình chạy thật hay");\nconsole.log("Tương lai sáng rực rỡ!");`, hint: "Thơ có vần hoặc không đều được!" },
    ],
  },
  {
    id: "02-bien-va-kieu-du-lieu",
    title: "Biến — Hộp chứa dữ liệu 📦",
    description: "Học cách lưu trữ thông tin bằng biến",
    level: "Cơ bản",
    content: `
## Biến là gì?

**Biến** giống như một cái hộp có nhãn — bạn có thể bỏ thứ gì đó vào hộp, lấy ra, hoặc thay bằng thứ khác.

\`\`\`js
let ten = "An";          // Hộp "ten" chứa chữ "An"
let tuoi = 12;           // Hộp "tuoi" chứa số 12
let thichCode = true;    // Hộp "thichCode" chứa true/false
\`\`\`

### 3 kiểu dữ liệu cơ bản:
| Kiểu | Ví dụ | Gọi là |
|------|-------|--------|
| Chữ | \`"Xin chào"\` | String |
| Số | \`42\`, \`3.14\` | Number |
| Đúng/Sai | \`true\`, \`false\` | Boolean |

### let vs const:
- \`let\` — có thể thay đổi giá trị sau
- \`const\` — không thay đổi được (hằng số)

\`\`\`js
let diem = 8;
diem = 9;        // OK - let cho phép thay đổi

const PI = 3.14;
// PI = 3;       // Lỗi! const không đổi được
\`\`\`
    `,
    codeExample: `// Tạo biến cho thông tin cá nhân
let ten = "Lập Trình Viên Nhí";
let tuoi = 10;
let thichCode = true;
const QUOC_TICH = "Việt Nam";

console.log("Tên:", ten);
console.log("Tuổi:", tuoi);
console.log("Thích code:", thichCode);
console.log("Quốc tịch:", QUOC_TICH);

// Thay đổi giá trị biến
tuoi = 11;
console.log("Tuổi mới:", tuoi);`,
    exercises: [
      { title: "Tạo biến cá nhân", description: "Tạo biến ten, tuoi, lop và in ra", starterCode: `let ten = "...";\nlet tuoi = ...;\nlet lop = "...";\nconsole.log(ten, tuoi, lop);`, solution: `let ten = "An";\nlet tuoi = 12;\nlet lop = "6A";\nconsole.log(ten, tuoi, lop);`, hint: "String trong nháy, số không cần nháy" },
      { title: "Biến số học", description: "Tạo 2 biến số a=15, b=7. In tổng, hiệu, tích của chúng", starterCode: `let a = 15;\nlet b = 7;\nconsole.log("Tổng:", ...);\nconsole.log("Hiệu:", ...);\nconsole.log("Tích:", ...);`, solution: `let a = 15;\nlet b = 7;\nconsole.log("Tổng:", a + b);\nconsole.log("Hiệu:", a - b);\nconsole.log("Tích:", a * b);`, hint: "Dùng a + b, a - b, a * b" },
      { title: "Thay đổi biến", description: "Tạo biến diem=7, in ra, rồi đổi thành 9, in ra lại", starterCode: `let diem = 7;\nconsole.log("Điểm cũ:", diem);\ndiem = ...;\nconsole.log("Điểm mới:", diem);`, solution: `let diem = 7;\nconsole.log("Điểm cũ:", diem);\ndiem = 9;\nconsole.log("Điểm mới:", diem);`, hint: "Gán lại bằng diem = giá_trị_mới" },
      { title: "Boolean thú vị", description: "Tạo biến dangMua=false, hocBai=true. In câu hỏi và trả lời", starterCode: `let dangMua = false;\nlet hocBai = true;\nconsole.log("Đang mưa?", dangMua);\nconsole.log("Đã học bài?", hocBai);`, solution: `let dangMua = false;\nlet hocBai = true;\nconsole.log("Đang mưa?", dangMua);\nconsole.log("Đã học bài?", hocBai);`, hint: "true/false không cần dấu nháy" },
      { title: "Hằng số PI", description: "Dùng const PI=3.14159, tính chu vi vòng tròn bán kính 5 (= 2 * PI * 5)", starterCode: `const PI = 3.14159;\nlet banKinh = 5;\nlet chuVi = ...;\nconsole.log("Chu vi:", chuVi);`, solution: `const PI = 3.14159;\nlet banKinh = 5;\nlet chuVi = 2 * PI * banKinh;\nconsole.log("Chu vi:", chuVi);`, hint: "chuVi = 2 * PI * banKinh" },
    ],
  },
  {
    id: "03-so-hoc-toan-tu",
    title: "Toán học và toán tử ➕",
    description: "Cộng, trừ, nhân, chia và nhiều hơn nữa",
    level: "Cơ bản",
    content: `
## Các toán tử số học

\`\`\`js
console.log(10 + 3);   // 13 — Cộng
console.log(10 - 3);   // 7  — Trừ
console.log(10 * 3);   // 30 — Nhân
console.log(10 / 3);   // 3.333... — Chia
console.log(10 % 3);   // 1  — Chia lấy dư (modulo)
console.log(2 ** 8);   // 256 — Lũy thừa (2^8)
\`\`\`

### Toán tử rút gọn:
\`\`\`js
let x = 10;
x += 5;   // x = x + 5 = 15
x -= 3;   // x = x - 3 = 12
x *= 2;   // x = x * 2 = 24
x /= 4;   // x = x / 4 = 6
x++;      // x = x + 1 = 7
x--;      // x = x - 1 = 6
\`\`\`

### Độ ưu tiên (như Toán học):
\`\`\`js
console.log(2 + 3 * 4);    // 14, không phải 20
console.log((2 + 3) * 4);  // 20, dùng () để ưu tiên
\`\`\`
    `,
    codeExample: `// Tính điểm trung bình
let toan = 9, van = 8, anh = 7;
let trungBinh = (toan + van + anh) / 3;
console.log("Điểm TB:", trungBinh.toFixed(2));

// Chia lấy dư — rất hữu ích!
console.log("10 chia 3 dư:", 10 % 3);     // 1
console.log("15 chia 4 dư:", 15 % 4);     // 3
console.log("8 có chẵn không?", 8 % 2 === 0);  // true

// Lũy thừa
console.log("2^10 =", 2 ** 10);  // 1024`,
    exercises: [
      { title: "Diện tích hình chữ nhật", description: "Tính diện tích HCN rộng=8, dài=12", starterCode: `let rong = 8;\nlet dai = 12;\nlet dienTich = ...;\nconsole.log("Diện tích:", dienTich);`, solution: `let rong = 8;\nlet dai = 12;\nlet dienTich = rong * dai;\nconsole.log("Diện tích:", dienTich);`, hint: "Diện tích = rộng × dài" },
      { title: "Điểm trung bình", description: "Tính TB của 4 môn: Toán=9, Văn=7, Anh=8, Lý=6", starterCode: `let toan=9, van=7, anh=8, ly=6;\nlet tb = ...;\nconsole.log("Điểm TB:", tb);`, solution: `let toan=9, van=7, anh=8, ly=6;\nlet tb = (toan + van + anh + ly) / 4;\nconsole.log("Điểm TB:", tb);`, hint: "Tổng 4 điểm chia 4, dùng ()" },
      { title: "Chia hết hay không?", description: "Kiểm tra 17 có chia hết cho 3 không (dùng %)", starterCode: `let so = 17;\nlet duKhiChia3 = so % 3;\nconsole.log("Số dư khi chia 3:", duKhiChia3);\nconsole.log("Chia hết?", duKhiChia3 === 0);`, solution: `let so = 17;\nlet duKhiChia3 = so % 3;\nconsole.log("Số dư khi chia 3:", duKhiChia3);\nconsole.log("Chia hết?", duKhiChia3 === 0);`, hint: "Nếu số dư = 0 thì chia hết" },
      { title: "Tính chu vi tam giác", description: "Tam giác 3 cạnh a=5, b=7, c=9. Tính chu vi", starterCode: `let a=5, b=7, c=9;\nlet chuVi = ...;\nconsole.log("Chu vi:", chuVi);`, solution: `let a=5, b=7, c=9;\nlet chuVi = a + b + c;\nconsole.log("Chu vi:", chuVi);`, hint: "Chu vi = a + b + c" },
      { title: "Toán tử ++ và --", description: "Bắt đầu biem=0. Tăng 3 lần (++), rồi giảm 1 lần (--). In kết quả", starterCode: `let diem = 0;\ndiem++;\ndiem++;\ndiem++;\ndiem--;\nconsole.log("Điểm:", diem);`, solution: `let diem = 0;\ndiem++;\ndiem++;\ndiem++;\ndiem--;\nconsole.log("Điểm:", diem);`, hint: "++ tăng 1, -- giảm 1" },
      { title: "Lũy thừa", description: "Tính 2^8, 3^4, và 10^3", starterCode: `console.log("2^8 =", 2 ** 8);\nconsole.log("3^4 =", ...);\nconsole.log("10^3 =", ...);`, solution: `console.log("2^8 =", 2 ** 8);\nconsole.log("3^4 =", 3 ** 4);\nconsole.log("10^3 =", 10 ** 3);`, hint: "Dùng ** cho lũy thừa" },
    ],
  },
  {
    id: "04-chuoi-van-ban",
    title: "Chuỗi và văn bản 📝",
    description: "Làm việc với chữ và câu trong JavaScript",
    level: "Cơ bản",
    content: `
## Chuỗi (String) là gì?

**Chuỗi** là tập hợp các ký tự — chữ, số, dấu câu... nằm trong dấu nháy.

\`\`\`js
let ten = "Nguyễn Văn An";
let city = 'Hà Nội';           // nháy đơn cũng OK
let hello = \`Xin chào \${ten}!\`;  // template literal
\`\`\`

### Nối chuỗi:
\`\`\`js
let ho = "Nguyễn";
let ten = "An";
console.log(ho + " " + ten);      // "Nguyễn An"
console.log(\`\${ho} \${ten}\`);       // cách đẹp hơn
\`\`\`

### Thuộc tính và phương thức hay dùng:
\`\`\`js
let s = "Xin chào!";
console.log(s.length);           // 9 — độ dài
console.log(s.toUpperCase());    // "XIN CHÀO!"
console.log(s.toLowerCase());    // "xin chào!"
console.log(s.includes("chào")); // true
console.log(s.replace("chào", "hi")); // "Xin hi!"
\`\`\`
    `,
    codeExample: `let ho = "Trần";
let ten = "Minh";
let hoTen = ho + " " + ten;

// Template literal (cách hiện đại)
let giaTri = 100;
console.log(\`Họ tên: \${hoTen}\`);
console.log(\`Giá trị nhân đôi: \${giaTri * 2}\`);

// Phương thức chuỗi
let cau = "JavaScript rất thú vị!";
console.log("Độ dài:", cau.length);
console.log("Hoa:", cau.toUpperCase());
console.log("Có 'thú vị'?", cau.includes("thú vị"));`,
    exercises: [
      { title: "Nối tên đầy đủ", description: "Tạo ho='Lê', ten='Hoa'. Nối thành họ tên đầy đủ", starterCode: `let ho = "Lê";\nlet ten = "Hoa";\nlet hoTen = ho + " " + ten;\nconsole.log(hoTen);`, solution: `let ho = "Lê";\nlet ten = "Hoa";\nlet hoTen = ho + " " + ten;\nconsole.log(hoTen);`, hint: "Dùng + để nối, thêm ' ' ở giữa" },
      { title: "Template literal", description: "Dùng template literal để in 'Tôi là [tên], [tuổi] tuổi'", starterCode: `let ten = "An";\nlet tuoi = 12;\nconsole.log(\`Tôi là \${...}, \${...} tuổi\`);`, solution: "let ten = \"An\";\nlet tuoi = 12;\nconsole.log(`Tôi là ${ten}, ${tuoi} tuổi`);", hint: "Dùng ${biến} bên trong dấu backtick" },
      { title: "Đếm ký tự", description: "Đếm độ dài của chuỗi 'Học lập trình mỗi ngày'", starterCode: `let cau = "Học lập trình mỗi ngày";\nconsole.log("Độ dài:", ...);`, solution: `let cau = "Học lập trình mỗi ngày";\nconsole.log("Độ dài:", cau.length);`, hint: "Dùng .length" },
      { title: "VIẾT HOA / viết thường", description: "In 'hello world' ở dạng HOA, rồi dạng thường", starterCode: `let s = "Hello World";\nconsole.log(...);\nconsole.log(...);`, solution: `let s = "Hello World";\nconsole.log(s.toUpperCase());\nconsole.log(s.toLowerCase());`, hint: "toUpperCase() và toLowerCase()" },
      { title: "Tìm kiếm trong chuỗi", description: "Kiểm tra chuỗi 'Tôi yêu Việt Nam' có chứa 'Việt' không", starterCode: `let cau = "Tôi yêu Việt Nam";\nconsole.log("Có 'Việt'?", ...);`, solution: `let cau = "Tôi yêu Việt Nam";\nconsole.log("Có 'Việt'?", cau.includes("Việt"));`, hint: "Dùng .includes('từ cần tìm')" },
      { title: "Thẻ tên", description: "In thẻ tên dạng: '=== TÊN BẠN === | 12 TUỔI'", starterCode: "let ten = \"Bình\";\nlet tuoi = 12;\nconsole.log(`=== ${ten.toUpperCase()} === | ${tuoi} TUỔI`);", solution: "let ten = \"Bình\";\nlet tuoi = 12;\nconsole.log(`=== ${ten.toUpperCase()} === | ${tuoi} TUỔI`);", hint: "Kết hợp toUpperCase() với template literal" },
    ],
  },
  {
    id: "05-dieu-kien-if-else",
    title: "Điều kiện if/else 🚦",
    description: "Ra quyết định trong lập trình",
    level: "Cơ bản",
    content: `
## if/else — Nếu... thì... không thì...

Giống như: *Nếu trời mưa thì mang ô, không thì mặc áo mỏng.*

\`\`\`js
let troimua = true;

if (troimua) {
  console.log("Mang ô đi!");
} else {
  console.log("Mặc áo mỏng thôi!");
}
\`\`\`

### Toán tử so sánh:
\`\`\`js
5 > 3    // true  — lớn hơn
5 < 3    // false — nhỏ hơn
5 >= 5   // true  — lớn hơn hoặc bằng
5 <= 4   // false — nhỏ hơn hoặc bằng
5 === 5  // true  — bằng nhau (dùng ===)
5 !== 3  // true  — khác nhau
\`\`\`

### else if — nhiều lựa chọn:
\`\`\`js
let diem = 8;
if (diem >= 9)       console.log("Xuất sắc!");
else if (diem >= 7)  console.log("Khá!");
else if (diem >= 5)  console.log("Trung bình");
else                 console.log("Cần cố gắng hơn");
\`\`\`
    `,
    codeExample: `let diem = 8.5;

if (diem >= 9) {
  console.log("Loại Xuất sắc 🏆");
} else if (diem >= 8) {
  console.log("Loại Giỏi 🌟");
} else if (diem >= 6.5) {
  console.log("Loại Khá 👍");
} else if (diem >= 5) {
  console.log("Loại Trung bình");
} else {
  console.log("Cần cố gắng hơn 💪");
}

// Số chẵn hay lẻ
let so = 17;
if (so % 2 === 0) console.log(so, "là số chẵn");
else console.log(so, "là số lẻ");`,
    exercises: [
      { title: "Chẵn hay lẻ", description: "Kiểm tra số 42 là chẵn hay lẻ", starterCode: `let so = 42;\nif (so % 2 === 0) {\n  console.log(so, "là số chẵn");\n} else {\n  console.log(so, "là số lẻ");\n}`, solution: `let so = 42;\nif (so % 2 === 0) {\n  console.log(so, "là số chẵn");\n} else {\n  console.log(so, "là số lẻ");\n}`, hint: "Số chẵn chia 2 dư 0" },
      { title: "Xếp loại học sinh", description: "diem=7.5: Xuất sắc(9+), Giỏi(8+), Khá(6.5+), TB(5+), Yếu", starterCode: `let diem = 7.5;\nif (diem >= 9) console.log("Xuất sắc");\nelse if (diem >= 8) console.log("Giỏi");\nelse if (diem >= 6.5) console.log("...");\nelse if (diem >= 5) console.log("...");\nelse console.log("...");`, solution: `let diem = 7.5;\nif (diem >= 9) console.log("Xuất sắc");\nelse if (diem >= 8) console.log("Giỏi");\nelse if (diem >= 6.5) console.log("Khá");\nelse if (diem >= 5) console.log("Trung bình");\nelse console.log("Yếu");`, hint: "Kiểm tra từ cao xuống thấp" },
      { title: "Đủ tuổi xem phim", description: "tuoi=15. Nếu >= 18 in 'Được xem', không thì in 'Chưa đủ tuổi'", starterCode: `let tuoi = 15;\nif (...) {\n  console.log("Được xem phim!");\n} else {\n  console.log("Chưa đủ tuổi!");\n}`, solution: `let tuoi = 15;\nif (tuoi >= 18) {\n  console.log("Được xem phim!");\n} else {\n  console.log("Chưa đủ tuổi!");\n}`, hint: "Kiểm tra tuoi >= 18" },
      { title: "Mùa trong năm", description: "thang=7: xuân(3-5), hạ(6-8), thu(9-11), đông(12,1,2)", starterCode: `let thang = 7;\nif (thang >= 3 && thang <= 5) console.log("Mùa xuân");\nelse if (thang >= 6 && thang <= 8) console.log("...");\nelse if (thang >= 9 && thang <= 11) console.log("...");\nelse console.log("...");`, solution: `let thang = 7;\nif (thang >= 3 && thang <= 5) console.log("Mùa xuân");\nelse if (thang >= 6 && thang <= 8) console.log("Mùa hạ");\nelse if (thang >= 9 && thang <= 11) console.log("Mùa thu");\nelse console.log("Mùa đông");`, hint: "Dùng && để kiểm tra hai điều kiện cùng lúc" },
      { title: "Số dương âm hay không", description: "so=0: kiểm tra dương (>0), âm (<0), hay không (=0)", starterCode: `let so = 0;\nif (so > 0) console.log("Số dương");\nelse if (...) console.log("Số âm");\nelse console.log("Số không");`, solution: `let so = 0;\nif (so > 0) console.log("Số dương");\nelse if (so < 0) console.log("Số âm");\nelse console.log("Số không");`, hint: "3 trường hợp: > 0, < 0, và = 0" },
    ],
  },
  {
    id: "06-vong-lap-for",
    title: "Vòng lặp for 🔄",
    description: "Lặp đi lặp lại mà không cần viết nhiều lần",
    level: "Cơ bản",
    content: `
## Vòng lặp for

Thay vì viết console.log 100 lần, bạn dùng vòng lặp!

\`\`\`js
for (let i = 1; i <= 5; i++) {
  console.log("Lần thứ", i);
}
// In ra: Lần thứ 1, 2, 3, 4, 5
\`\`\`

### Cấu trúc:
\`\`\`
for (khởi_đầu; điều_kiện; bước_nhảy) {
    // code chạy mỗi vòng
}
\`\`\`

### Ví dụ:
\`\`\`js
// Đếm xuôi
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Đếm ngược
for (let i = 10; i >= 1; i--) {
  console.log(i);
}

// Bước nhảy 2
for (let i = 0; i <= 20; i += 2) {
  console.log(i); // 0, 2, 4, 6...
}
\`\`\`
    `,
    codeExample: `// Bảng cửu chương 5
console.log("=== Bảng cửu chương 5 ===");
for (let i = 1; i <= 10; i++) {
  console.log(\`5 x \${i} = \${5 * i}\`);
}

// Tổng 1+2+...+100
let tong = 0;
for (let i = 1; i <= 100; i++) {
  tong += i;
}
console.log("Tổng 1→100:", tong); // 5050

// In số chẵn từ 1-20
for (let i = 2; i <= 20; i += 2) {
  process.stdout.write(i + " ");
}`,
    exercises: [
      { title: "Đếm từ 1 đến 10", description: "Dùng vòng for in ra các số từ 1 đến 10", starterCode: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`, solution: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`, hint: "i bắt đầu từ 1, điều kiện i <= 10" },
      { title: "Bảng nhân của 3", description: "In bảng cửu chương 3 từ 3x1 đến 3x10", starterCode: `for (let i = 1; i <= 10; i++) {\n  console.log(\`3 x \${i} = \${3 * i}\`);\n}`, solution: `for (let i = 1; i <= 10; i++) {\n  console.log(\`3 x \${i} = \${3 * i}\`);\n}`, hint: "Kết quả = 3 * i" },
      { title: "Tổng từ 1 đến 50", description: "Tính tổng 1+2+3+...+50", starterCode: `let tong = 0;\nfor (let i = 1; i <= 50; i++) {\n  tong += i;\n}\nconsole.log("Tổng:", tong);`, solution: `let tong = 0;\nfor (let i = 1; i <= 50; i++) {\n  tong += i;\n}\nconsole.log("Tổng:", tong);`, hint: "Dùng tong += i mỗi vòng" },
      { title: "Số lẻ từ 1-19", description: "In tất cả số lẻ từ 1 đến 19", starterCode: `for (let i = 1; i <= 19; i += ...) {\n  console.log(i);\n}`, solution: `for (let i = 1; i <= 19; i += 2) {\n  console.log(i);\n}`, hint: "Bắt đầu từ 1, mỗi bước nhảy 2" },
      { title: "Đếm ngược rocket", description: "Đếm ngược 10,9,8...1 rồi in 'Phóng!'", starterCode: `for (let i = 10; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log("🚀 Phóng!");`, solution: `for (let i = 10; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log("🚀 Phóng!");`, hint: "i bắt đầu từ 10, mỗi vòng i--" },
    ],
  },
  {
    id: "07-vong-lap-while",
    title: "Vòng lặp while ⏳",
    description: "Lặp cho đến khi điều kiện sai",
    level: "Cơ bản",
    content: `
## while — Lặp khi còn đúng

\`\`\`js
let so = 1;
while (so <= 5) {
  console.log(so);
  so++;           // PHẢI tăng, không vòng lặp vô tận!
}
\`\`\`

### Khi nào dùng while thay for?
- Khi **không biết trước** sẽ lặp bao nhiêu lần
- Khi điều kiện dừng phức tạp hơn

\`\`\`js
// Nhân đôi cho đến khi > 1000
let n = 1;
let buoc = 0;
while (n <= 1000) {
  n *= 2;
  buoc++;
}
console.log("Sau", buoc, "bước:", n);
\`\`\`

### do...while — Chạy ít nhất 1 lần:
\`\`\`js
let x = 0;
do {
  console.log("Chạy lần:", x);
  x++;
} while (x < 3);
\`\`\`
    `,
    codeExample: `// Tìm số mũ nhỏ nhất của 2 lớn hơn 100
let n = 1;
let mu = 0;
while (n <= 100) {
  n *= 2;
  mu++;
}
console.log(\`2^\${mu} = \${n} > 100\`);

// Tổng cho đến khi vượt 500
let tong = 0, i = 1;
while (tong + i <= 500) {
  tong += i;
  i++;
}
console.log("Tổng:", tong, "— dừng ở i =", i);`,
    exercises: [
      { title: "Đếm đến 10 bằng while", description: "Dùng while in ra 1 đến 10", starterCode: `let i = 1;\nwhile (i <= 10) {\n  console.log(i);\n  i++;\n}`, solution: `let i = 1;\nwhile (i <= 10) {\n  console.log(i);\n  i++;\n}`, hint: "Nhớ i++ để thoát vòng lặp" },
      { title: "Nhân đôi từ 1", description: "Từ 1, nhân đôi liên tục. In ra mỗi bước cho đến khi > 100", starterCode: `let n = 1;\nwhile (n <= 100) {\n  console.log(n);\n  n *= 2;\n}`, solution: `let n = 1;\nwhile (n <= 100) {\n  console.log(n);\n  n *= 2;\n}`, hint: "n *= 2 mỗi vòng" },
      { title: "Tổng cho đến 1000", description: "Cộng dần 1+2+3... cho đến khi tổng >= 1000. In tổng và số i", starterCode: `let tong = 0, i = 1;\nwhile (tong < 1000) {\n  tong += i;\n  i++;\n}\nconsole.log("Tổng:", tong, "| i =", i - 1);`, solution: `let tong = 0, i = 1;\nwhile (tong < 1000) {\n  tong += i;\n  i++;\n}\nconsole.log("Tổng:", tong, "| i =", i - 1);`, hint: "Điều kiện tong < 1000" },
      { title: "Tìm ước số", description: "Tìm tất cả ước số của 36 (1,2,3,4,6,9,12,18,36)", starterCode: `let so = 36, i = 1;\nwhile (i <= so) {\n  if (so % i === 0) console.log(i, "là ước của", so);\n  i++;\n}`, solution: `let so = 36, i = 1;\nwhile (i <= so) {\n  if (so % i === 0) console.log(i, "là ước của", so);\n  i++;\n}`, hint: "i là ước nếu so % i === 0" },
      { title: "Ký tự bậc thang", description: "In *\\n**\\n***\\n****\\n***** bằng while", starterCode: `let dong = 1;\nwhile (dong <= 5) {\n  console.log("*".repeat(dong));\n  dong++;\n}`, solution: `let dong = 1;\nwhile (dong <= 5) {\n  console.log("*".repeat(dong));\n  dong++;\n}`, hint: "'*'.repeat(n) tạo n dấu *" },
    ],
  },
  {
    id: "08-mang-arrays",
    title: "Mảng — Danh sách dữ liệu 📋",
    description: "Lưu nhiều giá trị trong một biến",
    level: "Cơ bản",
    content: `
## Mảng (Array)

Mảng giống như một danh sách có đánh số thứ tự (bắt đầu từ 0!).

\`\`\`js
let trai_cay = ["táo", "cam", "xoài", "dưa hấu"];
//               [0]    [1]    [2]       [3]

console.log(trai_cay[0]);   // "táo"
console.log(trai_cay[2]);   // "xoài"
console.log(trai_cay.length); // 4
\`\`\`

### Thêm / xóa phần tử:
\`\`\`js
let ds = [1, 2, 3];
ds.push(4);      // thêm vào cuối → [1,2,3,4]
ds.pop();        // xóa cuối → [1,2,3]
ds.unshift(0);   // thêm đầu → [0,1,2,3]
ds.shift();      // xóa đầu → [1,2,3]
\`\`\`

### Duyệt mảng bằng for:
\`\`\`js
let mon = ["Toán", "Văn", "Anh"];
for (let i = 0; i < mon.length; i++) {
  console.log(i + 1, ".", mon[i]);
}
\`\`\`
    `,
    codeExample: `let diem = [8, 9, 7, 6, 8, 10, 5];
console.log("Số lượng điểm:", diem.length);

// Tính tổng và trung bình
let tong = 0;
for (let i = 0; i < diem.length; i++) {
  tong += diem[i];
}
let tb = tong / diem.length;
console.log("Tổng:", tong);
console.log("TB:", tb.toFixed(2));

// Tìm điểm cao nhất
let max = diem[0];
for (let i = 1; i < diem.length; i++) {
  if (diem[i] > max) max = diem[i];
}
console.log("Điểm cao nhất:", max);`,
    exercises: [
      { title: "Tạo danh sách môn học", description: "Tạo mảng 5 môn học, in từng môn với số thứ tự", starterCode: `let mon = ["Toán", "Văn", "Anh", "Lý", "Hóa"];\nfor (let i = 0; i < mon.length; i++) {\n  console.log(i + 1, ".", mon[i]);\n}`, solution: `let mon = ["Toán", "Văn", "Anh", "Lý", "Hóa"];\nfor (let i = 0; i < mon.length; i++) {\n  console.log(i + 1, ".", mon[i]);\n}`, hint: "Vị trí bắt đầu từ 0, nên in i+1 cho số thứ tự" },
      { title: "Tính tổng mảng", description: "Mảng [3,5,7,2,8,1,9]. Tính tổng tất cả", starterCode: `let so = [3,5,7,2,8,1,9];\nlet tong = 0;\nfor (let i = 0; i < so.length; i++) {\n  tong += so[i];\n}\nconsole.log("Tổng:", tong);`, solution: `let so = [3,5,7,2,8,1,9];\nlet tong = 0;\nfor (let i = 0; i < so.length; i++) {\n  tong += so[i];\n}\nconsole.log("Tổng:", tong);`, hint: "tong += so[i] mỗi vòng" },
      { title: "Tìm phần tử lớn nhất", description: "Tìm số lớn nhất trong [4,9,2,7,1,8,3]", starterCode: `let so = [4,9,2,7,1,8,3];\nlet max = so[0];\nfor (let i = 1; i < so.length; i++) {\n  if (so[i] > max) max = so[i];\n}\nconsole.log("Max:", max);`, solution: `let so = [4,9,2,7,1,8,3];\nlet max = so[0];\nfor (let i = 1; i < so.length; i++) {\n  if (so[i] > max) max = so[i];\n}\nconsole.log("Max:", max);`, hint: "Giả sử max = phần tử đầu, so sánh dần" },
      { title: "Thêm và xóa", description: "Mảng [1,2,3]. Thêm 4 vào cuối, thêm 0 vào đầu, xóa phần tử cuối", starterCode: `let ds = [1,2,3];\nds.push(4);\nconsole.log("Sau push:", ds);\nds.unshift(0);\nconsole.log("Sau unshift:", ds);\nds.pop();\nconsole.log("Sau pop:", ds);`, solution: `let ds = [1,2,3];\nds.push(4);\nconsole.log("Sau push:", ds);\nds.unshift(0);\nconsole.log("Sau unshift:", ds);\nds.pop();\nconsole.log("Sau pop:", ds);`, hint: "push=cuối, unshift=đầu, pop=xóa cuối" },
      { title: "Đếm số chẵn trong mảng", description: "Đếm số phần tử chẵn trong [1,4,7,2,9,6,3,8]", starterCode: `let so = [1,4,7,2,9,6,3,8];\nlet demChan = 0;\nfor (let i = 0; i < so.length; i++) {\n  if (so[i] % 2 === 0) demChan++;\n}\nconsole.log("Số chẵn:", demChan);`, solution: `let so = [1,4,7,2,9,6,3,8];\nlet demChan = 0;\nfor (let i = 0; i < so.length; i++) {\n  if (so[i] % 2 === 0) demChan++;\n}\nconsole.log("Số chẵn:", demChan);`, hint: "Chẵn khi % 2 === 0" },
    ],
  },
  {
    id: "09-ham-co-ban",
    title: "Hàm — Đóng gói code 📦",
    description: "Tạo và gọi hàm trong JavaScript",
    level: "Cơ bản",
    content: `
## Hàm là gì?

**Hàm** là một đoạn code có tên, có thể gọi nhiều lần.

\`\`\`js
// Định nghĩa hàm
function xinChao() {
  console.log("Xin chào!");
  console.log("Chào mừng đến với lập trình!");
}

// Gọi hàm
xinChao();   // Gọi lần 1
xinChao();   // Gọi lần 2 — không cần viết lại!
\`\`\`

### Hàm với tham số:
\`\`\`js
function chaoNguoi(ten) {
  console.log("Xin chào,", ten + "!");
}
chaoNguoi("An");    // "Xin chào, An!"
chaoNguoi("Bình");  // "Xin chào, Bình!"
\`\`\`

### Hàm trả về giá trị:
\`\`\`js
function cong(a, b) {
  return a + b;
}
let ket_qua = cong(5, 3);
console.log(ket_qua);  // 8
\`\`\`
    `,
    codeExample: `function tinhDienTich(dai, rong) {
  return dai * rong;
}

function xepLoai(diem) {
  if (diem >= 9) return "Xuất sắc 🏆";
  if (diem >= 8) return "Giỏi 🌟";
  if (diem >= 6.5) return "Khá 👍";
  if (diem >= 5) return "Trung bình";
  return "Yếu 😢";
}

console.log("DT phòng 4x5:", tinhDienTich(4, 5), "m²");
console.log("DT sân 10x20:", tinhDienTich(10, 20), "m²");

let diem = 8.5;
console.log("Điểm", diem, "→", xepLoai(diem));`,
    exercises: [
      { title: "Hàm chào hỏi", description: "Viết hàm chaoNguoi(ten) in 'Xin chào, [tên]!'", starterCode: `function chaoNguoi(ten) {\n  console.log("Xin chào, " + ten + "!");\n}\nchaoNguoi("An");\nchaoNguoi("Bình");`, solution: `function chaoNguoi(ten) {\n  console.log("Xin chào, " + ten + "!");\n}\nchaoNguoi("An");\nchaoNguoi("Bình");`, hint: "Dùng + để nối chuỗi" },
      { title: "Hàm tính bình phương", description: "Viết hàm binhPhuong(n) trả về n^2", starterCode: `function binhPhuong(n) {\n  return n * n;\n}\nconsole.log(binhPhuong(5));  // 25\nconsole.log(binhPhuong(8));  // 64`, solution: `function binhPhuong(n) {\n  return n * n;\n}\nconsole.log(binhPhuong(5));\nconsole.log(binhPhuong(8));`, hint: "return n * n" },
      { title: "Hàm tính chu vi hình vuông", description: "Viết hàm chuViHinhVuong(canh) trả về chu vi", starterCode: `function chuViHinhVuong(canh) {\n  return ...;\n}\nconsole.log(chuViHinhVuong(5));   // 20\nconsole.log(chuViHinhVuong(12));  // 48`, solution: `function chuViHinhVuong(canh) {\n  return canh * 4;\n}\nconsole.log(chuViHinhVuong(5));\nconsole.log(chuViHinhVuong(12));`, hint: "Chu vi HV = cạnh × 4" },
      { title: "Hàm chẵn lẻ", description: "Viết hàm laChanHayLe(n) trả về 'chẵn' hoặc 'lẻ'", starterCode: `function laChanHayLe(n) {\n  if (n % 2 === 0) return "chẵn";\n  return "lẻ";\n}\nconsole.log(laChanHayLe(4));   // chẵn\nconsole.log(laChanHayLe(7));   // lẻ`, solution: `function laChanHayLe(n) {\n  if (n % 2 === 0) return "chẵn";\n  return "lẻ";\n}\nconsole.log(laChanHayLe(4));\nconsole.log(laChanHayLe(7));`, hint: "% 2 === 0 là chẵn" },
      { title: "Hàm in bảng nhân", description: "Viết hàm bangNhan(so) in bảng cửu chương của 'so'", starterCode: `function bangNhan(so) {\n  for (let i = 1; i <= 10; i++) {\n    console.log(\`\${so} x \${i} = \${so * i}\`);\n  }\n}\nbangNhan(7);`, solution: `function bangNhan(so) {\n  for (let i = 1; i <= 10; i++) {\n    console.log(\`\${so} x \${i} = \${so * i}\`);\n  }\n}\nbangNhan(7);`, hint: "Vòng for i từ 1 đến 10" },
    ],
  },
  {
    id: "10-phuong-thuc-mang",
    title: "Phương thức mảng nâng cao 🔧",
    description: "forEach, map, filter, reduce — công cụ mạnh nhất",
    level: "Trung cấp",
    content: `
## Phương thức mảng hiện đại

### forEach — duyệt từng phần tử:
\`\`\`js
let trai_cay = ["táo", "cam", "xoài"];
trai_cay.forEach(trai => {
  console.log("Quả:", trai);
});
\`\`\`

### map — biến đổi từng phần tử:
\`\`\`js
let so = [1, 2, 3, 4];
let binh_phuong = so.map(x => x * x);
console.log(binh_phuong); // [1, 4, 9, 16]
\`\`\`

### filter — lọc phần tử:
\`\`\`js
let diem = [9, 4, 8, 3, 7, 5];
let qua = diem.filter(d => d >= 5);
console.log(qua); // [9, 8, 7, 5]
\`\`\`

### reduce — tính toán tổng hợp:
\`\`\`js
let so = [1, 2, 3, 4, 5];
let tong = so.reduce((acc, x) => acc + x, 0);
console.log(tong); // 15
\`\`\`
    `,
    codeExample: `let hocSinh = [
  { ten: "An", diem: 9 },
  { ten: "Bình", diem: 5 },
  { ten: "Chi", diem: 8 },
  { ten: "Đạt", diem: 3 },
];

// Lấy tên tất cả học sinh
let tenDS = hocSinh.map(hs => hs.ten);
console.log("Danh sách:", tenDS);

// Học sinh đậu (diem >= 5)
let dau = hocSinh.filter(hs => hs.diem >= 5);
console.log("Đậu:", dau.map(hs => hs.ten));

// Điểm trung bình lớp
let tb = hocSinh.reduce((s, hs) => s + hs.diem, 0) / hocSinh.length;
console.log("TB lớp:", tb);`,
    exercises: [
      { title: "forEach in danh sách", description: "Dùng forEach in từng tên trong ['An','Bình','Chi','Đạt']", starterCode: `let ten = ["An","Bình","Chi","Đạt"];\nten.forEach(t => console.log("Học sinh:", t));`, solution: `let ten = ["An","Bình","Chi","Đạt"];\nten.forEach(t => console.log("Học sinh:", t));`, hint: "forEach(phần_tử => code)" },
      { title: "map nhân đôi", description: "Dùng map tạo mảng mới với mỗi phần tử nhân đôi", starterCode: `let so = [1,2,3,4,5];\nlet nhanDoi = so.map(x => x * 2);\nconsole.log(nhanDoi);`, solution: `let so = [1,2,3,4,5];\nlet nhanDoi = so.map(x => x * 2);\nconsole.log(nhanDoi);`, hint: "map trả về mảng mới" },
      { title: "filter số lớn hơn 5", description: "Lọc ra các số > 5 từ [1,8,3,9,2,7,4,6]", starterCode: `let so = [1,8,3,9,2,7,4,6];\nlet lonHon5 = so.filter(x => x > 5);\nconsole.log(lonHon5);`, solution: `let so = [1,8,3,9,2,7,4,6];\nlet lonHon5 = so.filter(x => x > 5);\nconsole.log(lonHon5);`, hint: "filter(x => điều_kiện)" },
      { title: "reduce tính tổng", description: "Dùng reduce tính tổng [10,20,30,40,50]", starterCode: `let so = [10,20,30,40,50];\nlet tong = so.reduce((acc, x) => acc + x, 0);\nconsole.log("Tổng:", tong);`, solution: `let so = [10,20,30,40,50];\nlet tong = so.reduce((acc, x) => acc + x, 0);\nconsole.log("Tổng:", tong);`, hint: "Giá trị đầu là 0" },
      { title: "Kết hợp filter + map", description: "Từ [3,8,1,9,4,7,2], lọc số >5 rồi nhân đôi", starterCode: `let so = [3,8,1,9,4,7,2];\nlet ketQua = so.filter(x => x > 5).map(x => x * 2);\nconsole.log(ketQua);`, solution: `let so = [3,8,1,9,4,7,2];\nlet ketQua = so.filter(x => x > 5).map(x => x * 2);\nconsole.log(ketQua);`, hint: "Xích .filter().map()" },
    ],
  },
  {
    id: "11-doi-tuong-objects",
    title: "Đối tượng — Objects 🧩",
    description: "Nhóm nhiều thông tin liên quan với nhau",
    level: "Trung cấp",
    content: `
## Object là gì?

Object nhóm nhiều thông tin liên quan vào 1 biến, dùng cặp **key: value**.

\`\`\`js
let hocSinh = {
  ten: "Nguyễn Văn An",
  tuoi: 12,
  lop: "7A",
  diem: 9.0
};

console.log(hocSinh.ten);    // "Nguyễn Văn An"
console.log(hocSinh["tuoi"]); // 12
\`\`\`

### Thêm / sửa thuộc tính:
\`\`\`js
hocSinh.truong = "THCS Nguyễn Du"; // Thêm mới
hocSinh.diem = 9.5;                 // Cập nhật
\`\`\`

### Phương thức trong Object:
\`\`\`js
let mayTinh = {
  thuongHieu: "Lenovo",
  tinh: function(a, b) {
    return a + b;
  }
};
console.log(mayTinh.tinh(5, 3)); // 8
\`\`\`
    `,
    codeExample: `let xe = {
  hang: "Honda",
  mau: "đỏ",
  namSX: 2022,
  tuoi: function() {
    return 2024 - this.namSX;
  }
};

console.log("Hãng:", xe.hang);
console.log("Màu:", xe.mau);
console.log("Tuổi xe:", xe.tuoi(), "năm");

// Mảng objects
let lopHoc = [
  { ten: "An", diem: 9 },
  { ten: "Bình", diem: 7 },
  { ten: "Chi", diem: 8.5 },
];
lopHoc.forEach(hs => console.log(hs.ten, ":", hs.diem));`,
    exercises: [
      { title: "Tạo object học sinh", description: "Tạo object với ten, tuoi, lop, diemTB và in ra", starterCode: `let hocSinh = {\n  ten: "An",\n  tuoi: 12,\n  lop: "7A",\n  diemTB: 8.5\n};\nconsole.log(hocSinh.ten, "|", hocSinh.lop, "|", hocSinh.diemTB);`, solution: `let hocSinh = {\n  ten: "An",\n  tuoi: 12,\n  lop: "7A",\n  diemTB: 8.5\n};\nconsole.log(hocSinh.ten, "|", hocSinh.lop, "|", hocSinh.diemTB);`, hint: "Truy cập bằng object.thuocTinh" },
      { title: "Thêm thuộc tính", description: "Tạo object xe, thêm trường mauSac='xanh' sau đó in", starterCode: `let xe = { hang: "Toyota", namSX: 2020 };\nxe.mauSac = "xanh";\nconsole.log(xe);`, solution: `let xe = { hang: "Toyota", namSX: 2020 };\nxe.mauSac = "xanh";\nconsole.log(xe);`, hint: "Thêm bằng object.thuocTinhMoi = giaTri" },
      { title: "Object có phương thức", description: "Thêm phương thức gioiThieu() in 'Tôi là [ten], [tuoi] tuổi'", starterCode: `let nguoi = {\n  ten: "Minh",\n  tuoi: 15,\n  gioiThieu: function() {\n    console.log("Tôi là " + this.ten + ", " + this.tuoi + " tuổi");\n  }\n};\nnguoi.gioiThieu();`, solution: `let nguoi = {\n  ten: "Minh",\n  tuoi: 15,\n  gioiThieu: function() {\n    console.log("Tôi là " + this.ten + ", " + this.tuoi + " tuổi");\n  }\n};\nnguoi.gioiThieu();`, hint: "this.ten truy cập thuộc tính trong object" },
      { title: "Mảng objects", description: "Mảng 3 học sinh. In tên và điểm của từng người", starterCode: `let ds = [\n  { ten: "An", diem: 9 },\n  { ten: "Bình", diem: 7 },\n  { ten: "Chi", diem: 8 }\n];\nds.forEach(hs => console.log(hs.ten, ":", hs.diem));`, solution: `let ds = [\n  { ten: "An", diem: 9 },\n  { ten: "Bình", diem: 7 },\n  { ten: "Chi", diem: 8 }\n];\nds.forEach(hs => console.log(hs.ten, ":", hs.diem));`, hint: "hs.ten, hs.diem" },
      { title: "Tìm học sinh giỏi nhất", description: "Từ mảng objects học sinh, tìm người có điểm cao nhất", starterCode: `let ds = [\n  { ten: "An", diem: 9 },\n  { ten: "Bình", diem: 7 },\n  { ten: "Chi", diem: 9.5 }\n];\nlet gioi = ds[0];\nds.forEach(hs => {\n  if (hs.diem > gioi.diem) gioi = hs;\n});\nconsole.log("Giỏi nhất:", gioi.ten, gioi.diem);`, solution: `let ds = [\n  { ten: "An", diem: 9 },\n  { ten: "Bình", diem: 7 },\n  { ten: "Chi", diem: 9.5 }\n];\nlet gioi = ds[0];\nds.forEach(hs => {\n  if (hs.diem > gioi.diem) gioi = hs;\n});\nconsole.log("Giỏi nhất:", gioi.ten, gioi.diem);`, hint: "So sánh hs.diem > gioi.diem" },
    ],
  },
  {
    id: "12-chuoi-nang-cao",
    title: "Chuỗi nâng cao 🔍",
    description: "Tách, ghép, tìm kiếm trong chuỗi",
    level: "Trung cấp",
    content: `
## Phương thức chuỗi nâng cao

\`\`\`js
let s = "  Hello World  ";
console.log(s.trim());           // "Hello World" — bỏ khoảng trắng
console.log(s.split(" "));       // ["Hello", "World"] — tách
console.log(s.indexOf("World")); // 7 — vị trí xuất hiện
console.log(s.slice(2, 7));      // "Hello" — cắt lấy đoạn
console.log(s.startsWith("He")); // true
console.log(s.endsWith("ld"));   // true
\`\`\`

### Tách và ghép:
\`\`\`js
let chuoi = "a,b,c,d";
let mang = chuoi.split(",");  // ["a","b","c","d"]
let ghep = mang.join("-");    // "a-b-c-d"
\`\`\`

### Thay thế:
\`\`\`js
let s = "Tôi yêu JavaScript và JavaScript rất cool";
console.log(s.replace("JavaScript", "Python"));
// Chỉ thay lần đầu
console.log(s.replaceAll("JavaScript", "Python"));
// Thay tất cả
\`\`\`
    `,
    codeExample: `// Đếm từ trong câu
let cau = "Học lập trình JavaScript mỗi ngày";
let mang_tu = cau.split(" ");
console.log("Số từ:", mang_tu.length);
console.log("Từ thứ 3:", mang_tu[2]);

// Kiểm tra email đơn giản
let email = "hocsinh@gmail.com";
console.log("Có @?", email.includes("@"));
console.log("Có .com?", email.endsWith(".com"));

// Đảo ngược chuỗi
let ten = "JavaScript";
let dao = ten.split("").reverse().join("");
console.log("Đảo ngược:", dao);`,
    exercises: [
      { title: "Đếm từ", description: "Đếm số từ trong câu 'Tôi yêu lập trình JavaScript'", starterCode: `let cau = "Tôi yêu lập trình JavaScript";\nlet soTu = cau.split(" ").length;\nconsole.log("Số từ:", soTu);`, solution: `let cau = "Tôi yêu lập trình JavaScript";\nlet soTu = cau.split(" ").length;\nconsole.log("Số từ:", soTu);`, hint: "split(' ') tách theo khoảng trắng" },
      { title: "Đảo ngược chuỗi", description: "Đảo ngược chuỗi 'abcde' thành 'edcba'", starterCode: `let s = "abcde";\nlet dao = s.split("").reverse().join("");\nconsole.log(dao);`, solution: `let s = "abcde";\nlet dao = s.split("").reverse().join("");\nconsole.log(dao);`, hint: "split('')→reverse()→join('')" },
      { title: "Trim khoảng trắng", description: "Bỏ khoảng trắng đầu/cuối rồi in độ dài thực", starterCode: `let s = "   Xin chào   ";\nlet trimmed = s.trim();\nconsole.log("Sau trim:", trimmed);\nconsole.log("Độ dài:", trimmed.length);`, solution: `let s = "   Xin chào   ";\nlet trimmed = s.trim();\nconsole.log("Sau trim:", trimmed);\nconsole.log("Độ dài:", trimmed.length);`, hint: "trim() bỏ khoảng trắng 2 đầu" },
      { title: "Thay thế từ", description: "Thay 'xấu' bằng 'tốt' trong 'Code xấu thường tạo ra kết quả xấu'", starterCode: `let s = "Code xấu thường tạo ra kết quả xấu";\nconsole.log(s.replaceAll("xấu", "tốt"));`, solution: `let s = "Code xấu thường tạo ra kết quả xấu";\nconsole.log(s.replaceAll("xấu", "tốt"));`, hint: "replaceAll thay tất cả lần xuất hiện" },
      { title: "Tách CSV", description: "Tách '10,20,30,40,50' thành mảng số và tính tổng", starterCode: `let csv = "10,20,30,40,50";\nlet mang = csv.split(",").map(x => Number(x));\nlet tong = mang.reduce((s,x) => s+x, 0);\nconsole.log(mang, "Tổng:", tong);`, solution: `let csv = "10,20,30,40,50";\nlet mang = csv.split(",").map(x => Number(x));\nlet tong = mang.reduce((s,x) => s+x, 0);\nconsole.log(mang, "Tổng:", tong);`, hint: "Number() chuyển string sang số" },
    ],
  },
  {
    id: "13-ham-math",
    title: "Thư viện Math 🔢",
    description: "Các hàm toán học có sẵn trong JavaScript",
    level: "Trung cấp",
    content: `
## Thư viện Math

JavaScript có sẵn thư viện Math với nhiều hàm toán học:

\`\`\`js
Math.PI          // 3.14159...
Math.round(4.6)  // 5  — làm tròn
Math.floor(4.9)  // 4  — làm tròn xuống
Math.ceil(4.1)   // 5  — làm tròn lên
Math.abs(-7)     // 7  — trị tuyệt đối
Math.max(3,7,1)  // 7  — lớn nhất
Math.min(3,7,1)  // 1  — nhỏ nhất
Math.sqrt(16)    // 4  — căn bậc 2
Math.pow(2,8)    // 256 — lũy thừa
\`\`\`

### Random — số ngẫu nhiên:
\`\`\`js
Math.random()              // 0.0 → <1.0
Math.random() * 10         // 0.0 → <10.0
Math.floor(Math.random() * 10)     // 0 → 9
Math.floor(Math.random() * 10) + 1 // 1 → 10
\`\`\`
    `,
    codeExample: `// Tung xúc xắc (1-6)
function tungXucXac() {
  return Math.floor(Math.random() * 6) + 1;
}
console.log("Xúc xắc 1:", tungXucXac());
console.log("Xúc xắc 2:", tungXucXac());
console.log("Xúc xắc 3:", tungXucXac());

// Tính đường chéo hình chữ nhật
let a = 3, b = 4;
let duongCheo = Math.sqrt(a**2 + b**2);
console.log("Đường chéo:", duongCheo); // 5

// Làm tròn điểm
let diem = 7.666;
console.log("Làm tròn:", Math.round(diem * 10) / 10);`,
    exercises: [
      { title: "Làm tròn số", description: "Làm tròn 3.14159 theo 3 cách: round, floor, ceil", starterCode: `let n = 3.14159;\nconsole.log("round:", Math.round(n));\nconsole.log("floor:", Math.floor(n));\nconsole.log("ceil:", Math.ceil(n));`, solution: `let n = 3.14159;\nconsole.log("round:", Math.round(n));\nconsole.log("floor:", Math.floor(n));\nconsole.log("ceil:", Math.ceil(n));`, hint: "round=gần nhất, floor=xuống, ceil=lên" },
      { title: "Số ngẫu nhiên 1-100", description: "Sinh số nguyên ngẫu nhiên từ 1 đến 100", starterCode: `let n = Math.floor(Math.random() * 100) + 1;\nconsole.log("Số ngẫu nhiên:", n);`, solution: `let n = Math.floor(Math.random() * 100) + 1;\nconsole.log("Số ngẫu nhiên:", n);`, hint: "Math.floor(Math.random()*100)+1" },
      { title: "Tính căn bậc 2", description: "Tính căn bậc 2 của 25, 49, 144", starterCode: `console.log("√25 =", Math.sqrt(25));\nconsole.log("√49 =", Math.sqrt(49));\nconsole.log("√144 =", Math.sqrt(144));`, solution: `console.log("√25 =", Math.sqrt(25));\nconsole.log("√49 =", Math.sqrt(49));\nconsole.log("√144 =", Math.sqrt(144));`, hint: "Math.sqrt()" },
      { title: "Tìm max và min", description: "Tìm số lớn nhất và nhỏ nhất trong danh sách", starterCode: `let so = [5, 2, 8, 1, 9, 3, 7];\nconsole.log("Max:", Math.max(...so));\nconsole.log("Min:", Math.min(...so));`, solution: `let so = [5, 2, 8, 1, 9, 3, 7];\nconsole.log("Max:", Math.max(...so));\nconsole.log("Min:", Math.min(...so));`, hint: "Dùng ...mang để truyền mảng vào Math.max" },
      { title: "Tính diện tích hình tròn", description: "Tính S = π × r² với r=7", starterCode: `let r = 7;\nlet S = Math.PI * r ** 2;\nconsole.log("Diện tích:", S.toFixed(2));`, solution: `let r = 7;\nlet S = Math.PI * r ** 2;\nconsole.log("Diện tích:", S.toFixed(2));`, hint: "Math.PI * r * r hoặc r**2" },
    ],
  },
  {
    id: "14-game-doan-so",
    title: "Game đoán số 🎮",
    description: "Xây dựng game đoán số đơn giản",
    level: "Trung cấp",
    content: `
## Xây dựng game!

Bây giờ bạn đã đủ kiến thức để làm một **game đoán số**:

1. Máy chọn số bí mật từ 1-100
2. Người chơi đoán
3. Máy gợi ý: "Cao hơn" hay "Thấp hơn"
4. Đếm số lần đoán

### Cách giả lập người chơi trong code:
\`\`\`js
let soBiMat = 42; // cố định để test
let doanNhieu = [50, 25, 37, 43, 42]; // giả lập 5 lần đoán
\`\`\`

### Logic game:
\`\`\`js
if (doan === soBiMat) console.log("Đúng rồi!");
else if (doan < soBiMat) console.log("Cao hơn!");
else console.log("Thấp hơn!");
\`\`\`
    `,
    codeExample: `// Game đoán số — giả lập người chơi
let soBiMat = Math.floor(Math.random() * 100) + 1;
console.log("(Đáp án ẩn):", soBiMat); // Chỉ để xem khi test

// Giả lập chiến thuật nhị phân (binary search)
let thap = 1, cao = 100, lanDoan = 0;
while (thap <= cao) {
  let doan = Math.floor((thap + cao) / 2);
  lanDoan++;
  console.log(\`Lần \${lanDoan}: đoán \${doan}\`);

  if (doan === soBiMat) {
    console.log(\`🎉 Đúng! Chỉ cần \${lanDoan} lần!\`);
    break;
  } else if (doan < soBiMat) {
    console.log("  → Cao hơn!");
    thap = doan + 1;
  } else {
    console.log("  → Thấp hơn!");
    cao = doan - 1;
  }
}`,
    exercises: [
      { title: "Logic đoán số", description: "Số bí mật=73. Người đoán 50. In kết quả gợi ý", starterCode: `let soBiMat = 73;\nlet doan = 50;\nif (doan === soBiMat) console.log("Đúng!");\nelse if (doan < soBiMat) console.log("Cao hơn!");\nelse console.log("Thấp hơn!");`, solution: `let soBiMat = 73;\nlet doan = 50;\nif (doan === soBiMat) console.log("Đúng!");\nelse if (doan < soBiMat) console.log("Cao hơn!");\nelse console.log("Thấp hơn!");`, hint: "Doan < bí mật → cần cao hơn" },
      { title: "Đếm lần đoán đúng", description: "Người đoán [30, 60, 80, 70, 75]. Số bí mật=75. Đếm lần đến khi đúng", starterCode: `let soBiMat = 75;\nlet danhSachDoan = [30, 60, 80, 70, 75];\nfor (let i = 0; i < danhSachDoan.length; i++) {\n  let doan = danhSachDoan[i];\n  console.log("Đoán:", doan);\n  if (doan === soBiMat) {\n    console.log("Đúng! Sau", i+1, "lần");\n    break;\n  }\n}`, solution: `let soBiMat = 75;\nlet danhSachDoan = [30, 60, 80, 70, 75];\nfor (let i = 0; i < danhSachDoan.length; i++) {\n  let doan = danhSachDoan[i];\n  console.log("Đoán:", doan);\n  if (doan === soBiMat) {\n    console.log("Đúng! Sau", i+1, "lần");\n    break;\n  }\n}`, hint: "Dùng break khi đoán đúng" },
      { title: "Random số bí mật", description: "Sinh số ngẫu nhiên 1-50, in 'Số bí mật đã chọn'", starterCode: `let soBiMat = Math.floor(Math.random() * 50) + 1;\nconsole.log("Số bí mật đã chọn trong khoảng 1-50");`, solution: `let soBiMat = Math.floor(Math.random() * 50) + 1;\nconsole.log("Số bí mật đã chọn trong khoảng 1-50");`, hint: "Math.floor(Math.random()*50)+1" },
    ],
  },
  {
    id: "15-so-nguyen-to",
    title: "Tìm số nguyên tố 🔬",
    description: "Thuật toán kiểm tra và tìm số nguyên tố",
    level: "Trung cấp",
    content: `
## Số nguyên tố là gì?

Số nguyên tố là số chỉ chia hết cho 1 và chính nó: 2, 3, 5, 7, 11, 13...

### Cách kiểm tra:
\`\`\`js
function laSoNguyenTo(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;  // Chia hết → không phải NT
  }
  return true;
}
\`\`\`

**Tại sao đến sqrt(n)?** Vì nếu n có ước số > sqrt(n), thì nó cũng có ước số < sqrt(n). Kiểm tra đến sqrt là đủ — nhanh hơn nhiều!
    `,
    codeExample: `function laSoNguyenTo(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Tìm tất cả số nguyên tố từ 1-50
let ketQua = [];
for (let i = 2; i <= 50; i++) {
  if (laSoNguyenTo(i)) ketQua.push(i);
}
console.log("SNT từ 1-50:", ketQua);
console.log("Có", ketQua.length, "số");

// Kiểm tra một số
[17, 20, 31, 100].forEach(n => {
  console.log(n, laSoNguyenTo(n) ? "là SNT" : "không phải SNT");
});`,
    exercises: [
      { title: "Hàm kiểm tra SNT", description: "Viết hàm laSoNguyenTo(n) và kiểm tra 17, 20, 97", starterCode: `function laSoNguyenTo(n) {\n  if (n < 2) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}\nconsole.log(laSoNguyenTo(17));\nconsole.log(laSoNguyenTo(20));\nconsole.log(laSoNguyenTo(97));`, solution: `function laSoNguyenTo(n) {\n  if (n < 2) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}\nconsole.log(laSoNguyenTo(17));\nconsole.log(laSoNguyenTo(20));\nconsole.log(laSoNguyenTo(97));`, hint: "Kiểm tra từ 2 đến sqrt(n)" },
      { title: "Liệt kê SNT đến 100", description: "In tất cả số nguyên tố từ 1 đến 100", starterCode: `function laSoNguyenTo(n) {\n  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;\n  return true;\n}\nfor (let i = 2; i <= 100; i++) {\n  if (laSoNguyenTo(i)) console.log(i);\n}`, solution: `function laSoNguyenTo(n) {\n  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;\n  return true;\n}\nfor (let i = 2; i <= 100; i++) {\n  if (laSoNguyenTo(i)) console.log(i);\n}`, hint: "Vòng for từ 2 đến 100" },
    ],
  },
  {
    id: "16-fibonacci",
    title: "Dãy Fibonacci 🐚",
    description: "Dãy số tự nhiên đẹp nhất trong toán học",
    level: "Trung cấp",
    content: `
## Dãy Fibonacci

0, 1, 1, 2, 3, 5, 8, 13, 21, 34...

Mỗi số = tổng 2 số trước: F(n) = F(n-1) + F(n-2)

\`\`\`js
// Cách 1: Vòng lặp
function fibonacci(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}

// Cách 2: Đệ quy
function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}
\`\`\`
    `,
    codeExample: `// In dãy Fibonacci đến 20 số
let a = 0, b = 1;
let day = [];
for (let i = 0; i < 20; i++) {
  day.push(a);
  [a, b] = [b, a + b];
}
console.log("Fibonacci:", day.join(", "));

// Fibonacci số thứ N
function fib(n) {
  if (n <= 1) return n;
  let x = 0, y = 1;
  for (let i = 2; i <= n; i++) [x, y] = [y, x+y];
  return y;
}
console.log("Fib(10) =", fib(10));  // 55
console.log("Fib(20) =", fib(20));  // 6765`,
    exercises: [
      { title: "In 10 số Fibonacci đầu", description: "In ra 10 số đầu: 0,1,1,2,3,5,8,13,21,34", starterCode: `let a = 0, b = 1;\nfor (let i = 0; i < 10; i++) {\n  console.log(a);\n  [a, b] = [b, a + b];\n}`, solution: `let a = 0, b = 1;\nfor (let i = 0; i < 10; i++) {\n  console.log(a);\n  [a, b] = [b, a + b];\n}`, hint: "[a,b] = [b, a+b] là cú pháp hoán vị" },
      { title: "Tổng dãy Fibonacci", description: "Tính tổng 10 số Fibonacci đầu", starterCode: `let a = 0, b = 1, tong = 0;\nfor (let i = 0; i < 10; i++) {\n  tong += a;\n  [a, b] = [b, a + b];\n}\nconsole.log("Tổng:", tong);`, solution: `let a = 0, b = 1, tong = 0;\nfor (let i = 0; i < 10; i++) {\n  tong += a;\n  [a, b] = [b, a + b];\n}\nconsole.log("Tổng:", tong);`, hint: "Cộng dồn vào tong" },
    ],
  },
  {
    id: "17-giai-thua-de-quy",
    title: "Giai thừa và Đệ quy 🌀",
    description: "Hàm tự gọi chính mình",
    level: "Trung cấp",
    content: `
## Giai thừa

5! = 5 × 4 × 3 × 2 × 1 = 120

## Đệ quy — hàm gọi chính mình

\`\`\`js
function giaiThua(n) {
  if (n === 0 || n === 1) return 1;  // Điều kiện dừng!
  return n * giaiThua(n - 1);         // Gọi chính mình
}

console.log(giaiThua(5));  // 120
// giaiThua(5) = 5 × giaiThua(4)
//             = 5 × 4 × giaiThua(3)
//             = 5 × 4 × 3 × giaiThua(2)
//             = 5 × 4 × 3 × 2 × giaiThua(1)
//             = 5 × 4 × 3 × 2 × 1 = 120
\`\`\`

⚠️ **Phải có điều kiện dừng** hoặc sẽ chạy vô tận!
    `,
    codeExample: `function giaiThua(n) {
  if (n <= 1) return 1;
  return n * giaiThua(n - 1);
}

for (let i = 0; i <= 10; i++) {
  console.log(\`\${i}! = \${giaiThua(i)}\`);
}

// Đệ quy tính tổng
function tongDenN(n) {
  if (n === 0) return 0;
  return n + tongDenN(n - 1);
}
console.log("Tổng 1→10:", tongDenN(10));`,
    exercises: [
      { title: "Tính 7!", description: "Dùng hàm đệ quy tính 7 giai thừa", starterCode: `function giaiThua(n) {\n  if (n <= 1) return 1;\n  return n * giaiThua(n - 1);\n}\nconsole.log("7! =", giaiThua(7));`, solution: `function giaiThua(n) {\n  if (n <= 1) return 1;\n  return n * giaiThua(n - 1);\n}\nconsole.log("7! =", giaiThua(7));`, hint: "7! = 5040" },
      { title: "Tổng đệ quy", description: "Viết hàm đệ quy tính tổng từ 1 đến n", starterCode: `function tong(n) {\n  if (n === 0) return 0;\n  return n + tong(n - 1);\n}\nconsole.log("Tổng 1→15:", tong(15));`, solution: `function tong(n) {\n  if (n === 0) return 0;\n  return n + tong(n - 1);\n}\nconsole.log("Tổng 1→15:", tong(15));`, hint: "Điều kiện dừng: n===0 return 0" },
    ],
  },
  {
    id: "18-sap-xep",
    title: "Sắp xếp dữ liệu 📊",
    description: "Bubble sort và các thuật toán sắp xếp cơ bản",
    level: "Nâng cao",
    content: `
## Sắp xếp nổi bọt (Bubble Sort)

Ý tưởng: So sánh 2 phần tử liền kề, đổi chỗ nếu sai thứ tự.

\`\`\`js
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Đổi chỗ
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
\`\`\`

### JavaScript có sẵn .sort():
\`\`\`js
let so = [5,2,8,1,9];
so.sort((a, b) => a - b);  // Tăng dần
so.sort((a, b) => b - a);  // Giảm dần
\`\`\`
    `,
    codeExample: `// Bubble sort tự viết
function bubbleSort(arr) {
  let a = [...arr]; // Copy để không sửa original
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]]; // Hoán vị
      }
    }
  }
  return a;
}

let so = [64, 25, 12, 22, 11];
console.log("Trước:", so);
console.log("Sau:", bubbleSort(so));

// JavaScript .sort()
let ten = ["Chi", "An", "Đạt", "Bình"];
console.log("Tên A-Z:", [...ten].sort());`,
    exercises: [
      { title: "Sort tăng dần", description: "Sắp xếp [3,1,4,1,5,9,2,6] theo thứ tự tăng dần", starterCode: `let so = [3,1,4,1,5,9,2,6];\nso.sort((a,b) => a - b);\nconsole.log(so);`, solution: `let so = [3,1,4,1,5,9,2,6];\nso.sort((a,b) => a - b);\nconsole.log(so);`, hint: "(a,b) => a-b cho tăng dần" },
      { title: "Sort giảm dần", description: "Sắp xếp điểm [8,5,9,7,6,10,3] từ cao xuống thấp", starterCode: `let diem = [8,5,9,7,6,10,3];\ndiem.sort((a,b) => b - a);\nconsole.log(diem);`, solution: `let diem = [8,5,9,7,6,10,3];\ndiem.sort((a,b) => b - a);\nconsole.log(diem);`, hint: "(a,b) => b-a cho giảm dần" },
      { title: "Sort mảng tên", description: "Sắp xếp ['Zhi','An','Minh','Bình'] theo alphabet", starterCode: `let ten = ["Zhi","An","Minh","Bình"];\nten.sort();\nconsole.log(ten);`, solution: `let ten = ["Zhi","An","Minh","Bình"];\nten.sort();\nconsole.log(ten);`, hint: ".sort() mặc định là alphabet" },
    ],
  },
  {
    id: "19-du-an-may-tinh",
    title: "Dự án: Máy tính mini 🖩",
    description: "Áp dụng tất cả kiến thức làm máy tính",
    level: "Nâng cao",
    content: `
## Dự án tổng hợp!

Bạn sẽ xây dựng một **máy tính mini** hoàn chỉnh có thể:
- Cộng, trừ, nhân, chia
- Kiểm tra lỗi (chia cho 0)
- Tính phần trăm
- Lịch sử tính toán

### Thiết kế:
\`\`\`js
function mayTinh(a, phepTinh, b) {
  switch(phepTinh) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Lỗi: chia 0";
    default: return "Phép tính không hợp lệ";
  }
}
\`\`\`
    `,
    codeExample: `// Máy tính mini hoàn chỉnh
function mayTinh(a, phep, b) {
  let kq;
  switch(phep) {
    case "+": kq = a + b; break;
    case "-": kq = a - b; break;
    case "*": kq = a * b; break;
    case "/": kq = b !== 0 ? a / b : "Lỗi!"; break;
    case "%": kq = a % b; break;
    case "**": kq = a ** b; break;
    default: kq = "?";
  }
  console.log(\`\${a} \${phep} \${b} = \${kq}\`);
  return kq;
}

// Thực hành
mayTinh(10, "+", 5);
mayTinh(20, "-", 8);
mayTinh(6, "*", 7);
mayTinh(15, "/", 4);
mayTinh(10, "/", 0);
mayTinh(2, "**", 10);

// Tính điểm trung bình từ mảng
function diemTrungBinh(diem) {
  let tong = diem.reduce((s,d) => s+d, 0);
  return (tong / diem.length).toFixed(2);
}
console.log("TB:", diemTrungBinh([9,8,7,10,6]));`,
    exercises: [
      { title: "Hoàn thiện máy tính", description: "Dùng hàm mayTinh() tính: 100+50, 200-75, 12*15, 100/4", starterCode: `function mayTinh(a, phep, b) {\n  switch(phep) {\n    case "+": return a + b;\n    case "-": return a - b;\n    case "*": return a * b;\n    case "/": return b !== 0 ? a / b : "Lỗi: chia 0";\n    default: return "Lỗi";\n  }\n}\nconsole.log(mayTinh(100, "+", 50));\nconsole.log(mayTinh(200, "-", 75));\nconsole.log(mayTinh(12, "*", 15));\nconsole.log(mayTinh(100, "/", 4));`, solution: `function mayTinh(a, phep, b) {\n  switch(phep) {\n    case "+": return a + b;\n    case "-": return a - b;\n    case "*": return a * b;\n    case "/": return b !== 0 ? a / b : "Lỗi: chia 0";\n    default: return "Lỗi";\n  }\n}\nconsole.log(mayTinh(100, "+", 50));\nconsole.log(mayTinh(200, "-", 75));\nconsole.log(mayTinh(12, "*", 15));\nconsole.log(mayTinh(100, "/", 4));`, hint: "Gọi hàm với 3 tham số: số, phép, số" },
      { title: "Tính điểm trung bình", description: "Tính TB của [8,9,7,10,6,8] và xếp loại", starterCode: `let diem = [8,9,7,10,6,8];\nlet tong = diem.reduce((s,d) => s+d, 0);\nlet tb = tong / diem.length;\nconsole.log("TB:", tb.toFixed(2));\nif (tb >= 9) console.log("Xuất sắc");\nelse if (tb >= 8) console.log("Giỏi");\nelse if (tb >= 6.5) console.log("Khá");\nelse console.log("Trung bình");`, solution: `let diem = [8,9,7,10,6,8];\nlet tong = diem.reduce((s,d) => s+d, 0);\nlet tb = tong / diem.length;\nconsole.log("TB:", tb.toFixed(2));\nif (tb >= 9) console.log("Xuất sắc");\nelse if (tb >= 8) console.log("Giỏi");\nelse if (tb >= 6.5) console.log("Khá");\nelse console.log("Trung bình");`, hint: "reduce để tính tổng" },
    ],
  },
  {
    id: "20-du-an-cuoi-khoa",
    title: "Dự án cuối khóa — Mini Game 🏆",
    description: "Tổng hợp mọi thứ: game quản lý học sinh",
    level: "Nâng cao",
    content: `
## 🎓 Tốt nghiệp khóa học!

Bạn đã học:
- ✅ Biến, kiểu dữ liệu
- ✅ Toán tử và điều kiện
- ✅ Vòng lặp for/while
- ✅ Mảng và Object
- ✅ Hàm và đệ quy
- ✅ Phương thức chuỗi và mảng
- ✅ Math và thuật toán

## Dự án: Hệ thống quản lý lớp học

Xây dựng chương trình quản lý điểm học sinh với đầy đủ chức năng!
    `,
    codeExample: `// Hệ thống quản lý lớp học
const lopHoc = [
  { ten: "Nguyễn An", diem: [9, 8, 7, 9, 10] },
  { ten: "Trần Bình", diem: [7, 6, 8, 7, 8] },
  { ten: "Lê Chi", diem: [10, 9, 10, 9, 10] },
  { ten: "Phạm Đạt", diem: [5, 4, 6, 5, 7] },
  { ten: "Hoàng Em", diem: [8, 9, 7, 8, 8] },
];

function tinhTB(diem) {
  return diem.reduce((s,d) => s+d, 0) / diem.length;
}

function xepLoai(tb) {
  if (tb >= 9) return "Xuất sắc 🏆";
  if (tb >= 8) return "Giỏi ⭐";
  if (tb >= 6.5) return "Khá 👍";
  if (tb >= 5) return "Trung bình";
  return "Yếu 😢";
}

console.log("=== KẾT QUẢ HỌC TẬP ===");
let tbLop = 0;
lopHoc.forEach(hs => {
  let tb = tinhTB(hs.diem);
  tbLop += tb;
  console.log(\`\${hs.ten}: TB=\${tb.toFixed(1)} | \${xepLoai(tb)}\`);
});

console.log("\\n=== THỐNG KÊ LỚP ===");
console.log("TB lớp:", (tbLop / lopHoc.length).toFixed(2));

let gioi = lopHoc.filter(hs => tinhTB(hs.diem) >= 8);
console.log("Học sinh giỏi:", gioi.map(hs => hs.ten).join(", "));

// Xếp hạng
let xepHang = [...lopHoc].sort((a,b) => tinhTB(b.diem) - tinhTB(a.diem));
console.log("\\nXẾP HẠNG:");
xepHang.forEach((hs, i) => {
  console.log(\`\${i+1}. \${hs.ten} — \${tinhTB(hs.diem).toFixed(1)}\`);
});`,
    exercises: [
      { title: "Tính TB từng học sinh", description: "Tính điểm TB của mỗi học sinh trong lopHoc", starterCode: `const lopHoc = [\n  { ten: "An", diem: [9,8,7] },\n  { ten: "Bình", diem: [7,6,8] },\n  { ten: "Chi", diem: [10,9,10] },\n];\nlopHoc.forEach(hs => {\n  let tb = hs.diem.reduce((s,d) => s+d, 0) / hs.diem.length;\n  console.log(hs.ten, ":", tb.toFixed(1));\n});`, solution: `const lopHoc = [\n  { ten: "An", diem: [9,8,7] },\n  { ten: "Bình", diem: [7,6,8] },\n  { ten: "Chi", diem: [10,9,10] },\n];\nlopHoc.forEach(hs => {\n  let tb = hs.diem.reduce((s,d) => s+d, 0) / hs.diem.length;\n  console.log(hs.ten, ":", tb.toFixed(1));\n});`, hint: "reduce để tính tổng điểm" },
      { title: "Xếp hạng lớp", description: "Sắp xếp học sinh theo điểm TB giảm dần", starterCode: `const ds = [\n  { ten: "An", tb: 8.5 },\n  { ten: "Bình", tb: 7.2 },\n  { ten: "Chi", tb: 9.8 },\n];\nds.sort((a,b) => b.tb - a.tb);\nds.forEach((hs,i) => console.log(i+1 + ". " + hs.ten, hs.tb));`, solution: `const ds = [\n  { ten: "An", tb: 8.5 },\n  { ten: "Bình", tb: 7.2 },\n  { ten: "Chi", tb: 9.8 },\n];\nds.sort((a,b) => b.tb - a.tb);\nds.forEach((hs,i) => console.log(i+1 + ". " + hs.ten, hs.tb));`, hint: "sort((a,b) => b.tb - a.tb)" },
    ],
  },
];
