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

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
  content: string;
  codeExample: string;
  exercises: Exercise[];
  playgrounds?: Playground[];
}

export const javaLessons: Lesson[] = [
  {
    id: "01-gioi-thieu",
    title: "Giới thiệu Java",
    description: "JVM, cấu trúc chương trình, kiểu dữ liệu và biến",
    level: "Cơ bản",
    content: `
## Java là gì?

**Java** là ngôn ngữ lập trình hướng đối tượng do Oracle phát triển. Triết lý **"Write Once, Run Anywhere"** — viết code một lần, chạy trên mọi hệ điều hành.

### Kiến trúc Java
\`\`\`
Code (.java) → javac biên dịch → Bytecode (.class) → JVM thực thi
\`\`\`

### Cấu trúc cơ bản
\`\`\`java
public class TenFile {           // Tên class = tên file
    public static void main(String[] args) {  // Điểm bắt đầu
        System.out.println("Hello!");
    }
}
\`\`\`

### Kiểu dữ liệu nguyên thủy
| Kiểu | Kích thước | Phạm vi |
|---|---|---|
| byte | 8 bit | -128 đến 127 |
| int | 32 bit | ~±2.1 tỷ |
| long | 64 bit | ~±9.2 × 10¹⁸ |
| double | 64 bit | Số thực độ chính xác cao |
| boolean | 1 bit | true / false |
| char | 16 bit | Ký tự Unicode |

### In ra màn hình
\`\`\`java
System.out.println("In có xuống dòng");
System.out.print("In không xuống dòng");
System.out.printf("Định dạng: %.2f%n", 3.14);
\`\`\`
    `,
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Biến và kiểu dữ liệu
        int tuoi = 20;
        double gpa = 3.85;
        boolean dangHoc = true;
        char capBac = 'A';
        String ten = "Nguyen Van An";

        // In ra với printf (định dạng đẹp)
        System.out.printf("Tên: %s%n", ten);
        System.out.printf("Tuổi: %d%n", tuoi);
        System.out.printf("GPA: %.2f%n", gpa);
        System.out.printf("Đang học: %b%n", dangHoc);

        // Toán tử
        int a = 17, b = 5;
        System.out.println("a + b = " + (a + b));  // 22
        System.out.println("a - b = " + (a - b));  // 12
        System.out.println("a * b = " + (a * b));  // 85
        System.out.println("a / b = " + (a / b));  // 3 (chia nguyên!)
        System.out.println("a % b = " + (a % b));  // 2 (chia dư)
        System.out.println("a / (double)b = " + (a / (double)b)); // 3.4

        // Hằng số
        final double PI = 3.14159;
        System.out.println("Pi = " + PI);
    }
}`,
    exercises: [
      {
        title: "Bài tập 1: Giới thiệu bản thân",
        description: "Khai báo các biến: ten (String), tuoi (int), gpa (double), dangHoc (boolean). In ra theo định dạng đẹp dùng printf.",
        starterCode: `public class Main {
    public static void main(String[] args) {
        String ten = ""; // TODO: tên bạn
        int tuoi = 0;    // TODO: tuổi
        double gpa = 0;  // TODO: GPA (0.0 - 4.0)
        boolean dangHoc = true;

        // TODO: In ra đẹp với printf
        // Tên: ...
        // Tuổi: ...
        // GPA: X.XX
        // Đang học: ...
    }
}`,
        solution: `public class Main {
    public static void main(String[] args) {
        String ten = "Nguyen Van An";
        int tuoi = 20;
        double gpa = 3.85;
        boolean dangHoc = true;

        System.out.printf("Tên: %s%n", ten);
        System.out.printf("Tuổi: %d%n", tuoi);
        System.out.printf("GPA: %.2f%n", gpa);
        System.out.printf("Đang học: %b%n", dangHoc);
    }
}`,
        hint: "printf dùng %s cho String, %d cho int, %.2f cho double 2 chữ số thập phân, %b cho boolean, %n để xuống dòng",
      },
      {
        title: "Bài tập 2: Tính diện tích và chu vi",
        description: "Viết chương trình tính diện tích và chu vi của hình tròn với bán kính r = 7. Dùng Math.PI và printf để in kết quả 2 chữ số thập phân.",
        starterCode: `public class Main {
    public static void main(String[] args) {
        double banKinh = 7.0;

        // TODO: Tính diện tích (PI * r^2) và chu vi (2 * PI * r)
        double dienTich = 0;
        double chuVi = 0;

        System.out.printf("Bán kính: %.1f%n", banKinh);
        System.out.printf("Diện tích: %.2f%n", dienTich);
        System.out.printf("Chu vi: %.2f%n", chuVi);
    }
}`,
        solution: `public class Main {
    public static void main(String[] args) {
        double banKinh = 7.0;
        double dienTich = Math.PI * banKinh * banKinh;
        double chuVi = 2 * Math.PI * banKinh;

        System.out.printf("Bán kính: %.1f%n", banKinh);
        System.out.printf("Diện tích: %.2f%n", dienTich);
        System.out.printf("Chu vi: %.2f%n", chuVi);
    }
}`,
        hint: "Math.PI cho hằng số π. Math.pow(r, 2) hoặc r*r để tính r². printf %.2f in 2 chữ số sau dấu phẩy.",
      },
      {
        title: "Bài tập 3: Đổi đơn vị",
        description: "Đổi 72 kg và 1m75cm sang BMI. Công thức: BMI = cân nặng(kg) / (chiều cao(m))². In kết quả và phân loại: <18.5 Gầy, 18.5-25 Bình thường, 25-30 Thừa cân, >30 Béo phì.",
        starterCode: `public class Main {
    public static void main(String[] args) {
        double canNang = 72.0;  // kg
        double chieuCao = 1.75; // mét

        // TODO: Tính BMI
        double bmi = 0;

        // TODO: Phân loại
        String phanLoai = "";

        System.out.printf("Cân nặng: %.1f kg%n", canNang);
        System.out.printf("Chiều cao: %.2f m%n", chieuCao);
        System.out.printf("BMI: %.2f - %s%n", bmi, phanLoai);
    }
}`,
        solution: `public class Main {
    public static void main(String[] args) {
        double canNang = 72.0;
        double chieuCao = 1.75;
        double bmi = canNang / (chieuCao * chieuCao);

        String phanLoai;
        if (bmi < 18.5) phanLoai = "Gầy";
        else if (bmi < 25) phanLoai = "Bình thường";
        else if (bmi < 30) phanLoai = "Thừa cân";
        else phanLoai = "Béo phì";

        System.out.printf("Cân nặng: %.1f kg%n", canNang);
        System.out.printf("Chiều cao: %.2f m%n", chieuCao);
        System.out.printf("BMI: %.2f - %s%n", bmi, phanLoai);
    }
}`,
        hint: "BMI = canNang / (chieuCao * chieuCao). Dùng if-else if để phân loại theo ngưỡng 18.5, 25, 30.",
      },
      {
        title: "Bài tập 4: Tính lãi kép (Compound Interest)",
        description: "Ứng dụng tài chính thực tế: A = P × (1 + r/n)^(n×t). Tính số tiền sau 5 năm với vốn 100 triệu, lãi suất 7%/năm, ghép lãi hàng năm (n=1) và hàng tháng (n=12). In bảng tăng trưởng từng năm.",
        starterCode: `public class Main {
    public static void main(String[] args) {
        double vonGoc = 100_000_000;
        double laiSuat = 0.07; // 7%/năm
        int namGui = 5;

        // TODO: Tính A = P * (1 + r)^t với ghép lãi hàng năm
        System.out.println("=== BẢNG TĂNG TRƯỞNG (ghép lãi năm) ===");
        System.out.printf("%-6s %15s %15s%n", "Năm", "Số dư", "Lãi tích lũy");
        System.out.println("-".repeat(40));

        double soTien = vonGoc;
        for (int nam = 1; nam <= namGui; nam++) {
            // TODO: tính soTien sau mỗi năm và in ra
        }

        // TODO: So sánh với ghép lãi hàng tháng (n=12)
        double soTienThang = vonGoc;
        // A = P * (1 + r/n)^(n*t)
        double soTienThangFinal = vonGoc * Math.pow(1 + laiSuat / 12, 12 * namGui);
        System.out.printf("%nGhép lãi hàng tháng (5 năm): %,.0f VND%n", soTienThangFinal);
    }
}`,
        solution: `public class Main {
    public static void main(String[] args) {
        double vonGoc = 100_000_000;
        double laiSuat = 0.07;
        int namGui = 5;

        System.out.println("=== BẢNG TĂNG TRƯỞNG (ghép lãi năm) ===");
        System.out.printf("%-6s %15s %15s%n", "Năm", "Số dư", "Lãi tích lũy");
        System.out.println("-".repeat(40));

        double soTien = vonGoc;
        for (int nam = 1; nam <= namGui; nam++) {
            soTien = soTien * (1 + laiSuat);
            System.out.printf("%-6d %,15.0f %,15.0f%n", nam, soTien, soTien - vonGoc);
        }

        double soTienThangFinal = vonGoc * Math.pow(1 + laiSuat / 12, 12 * namGui);
        System.out.printf("%nGhép lãi hàng tháng (5 năm): %,.0f VND%n", soTienThangFinal);
        System.out.printf("Chênh lệch: %,.0f VND%n", soTienThangFinal - soTien);
    }
}`,
        hint: "Ghép lãi năm: soTien *= (1 + r) mỗi năm. Ghép lãi tháng: A = P * Math.pow(1 + r/12, 12*t). %,15.0f để format số có dấu phân cách.",
      },
      {
        title: "Bài tập 5: Đổi cơ số",
        description: "Viết các hàm chuyển đổi cơ số không dùng Integer.toBinaryString/toHexString. Implement: `toBinary(int n)`, `toOctal(int n)`, `toHex(int n)`, `fromBase(String s, int base)`. Ứng dụng trong lập trình hệ thống.",
        starterCode: `public class Main {
    static String toBinary(int n) {
        // TODO: chia liên tiếp cho 2, lấy phần dư ngược
        // Ví dụ: 13 = 1101 (2)
        if (n == 0) return "0";
        StringBuilder sb = new StringBuilder();
        // TODO
        return sb.reverse().toString();
    }

    static String toOctal(int n) {
        // TODO: tương tự nhưng chia cho 8
        return "";
    }

    static String toHex(int n) {
        // TODO: chia cho 16, dùng "0123456789ABCDEF" cho các chữ số
        if (n == 0) return "0";
        String digits = "0123456789ABCDEF";
        StringBuilder sb = new StringBuilder();
        // TODO
        return sb.reverse().toString();
    }

    public static void main(String[] args) {
        int[] tests = {0, 10, 42, 255, 1024};
        System.out.printf("%-6s %-10s %-8s %-8s%n", "Dec", "Binary", "Octal", "Hex");
        System.out.println("-".repeat(35));
        for (int n : tests) {
            System.out.printf("%-6d %-10s %-8s %-8s%n",
                n, toBinary(n), toOctal(n), toHex(n));
        }
    }
}`,
        solution: `public class Main {
    static String toBinary(int n) {
        if (n == 0) return "0";
        StringBuilder sb = new StringBuilder();
        while (n > 0) { sb.append(n % 2); n /= 2; }
        return sb.reverse().toString();
    }

    static String toOctal(int n) {
        if (n == 0) return "0";
        StringBuilder sb = new StringBuilder();
        while (n > 0) { sb.append(n % 8); n /= 8; }
        return sb.reverse().toString();
    }

    static String toHex(int n) {
        if (n == 0) return "0";
        String digits = "0123456789ABCDEF";
        StringBuilder sb = new StringBuilder();
        while (n > 0) { sb.append(digits.charAt(n % 16)); n /= 16; }
        return sb.reverse().toString();
    }

    public static void main(String[] args) {
        int[] tests = {0, 10, 42, 255, 1024};
        System.out.printf("%-6s %-10s %-8s %-8s%n", "Dec", "Binary", "Octal", "Hex");
        System.out.println("-".repeat(35));
        for (int n : tests) {
            System.out.printf("%-6d %-10s %-8s %-8s%n",
                n, toBinary(n), toOctal(n), toHex(n));
        }
    }
}`,
        hint: "Thuật toán chung: while (n > 0) { append(n % base); n /= base; } rồi reverse(). Hex dùng String digits = '0123456789ABCDEF' và charAt(n % 16).",
      },
    ],
  },
  {
    id: "02-dieu-kien-vong-lap",
    title: "Điều kiện và Vòng lặp",
    description: "if-else, switch, for, while, do-while, break, continue, nested loops",
    level: "Cơ bản",
    content: `
## Câu lệnh điều kiện

### if - else if - else
\`\`\`java
int diem = 85;
if (diem >= 90) System.out.println("Xuất sắc");
else if (diem >= 80) System.out.println("Giỏi");
else if (diem >= 65) System.out.println("Khá");
else System.out.println("Trung bình");
\`\`\`

### Ternary operator
\`\`\`java
String ketQua = diem >= 50 ? "Đạt" : "Rớt";
\`\`\`

### switch (truyền thống và expression Java 14+)
\`\`\`java
// Truyền thống - cần break
switch (ngay) {
    case 1: System.out.println("Thứ Hai"); break;
    case 7: System.out.println("Chủ Nhật"); break;
    default: System.out.println("Ngày khác");
}

// Expression (Java 14+) - không cần break
String ten = switch (ngay) {
    case 1 -> "Thứ Hai";
    case 7 -> "Chủ Nhật";
    default -> "Ngày " + ngay;
};
\`\`\`

## Vòng lặp

\`\`\`java
// for — biết trước số lần lặp
for (int i = 0; i < 10; i++) { }

// while — lặp khi điều kiện đúng
while (dieu_kien) { }

// do-while — thực hiện ít nhất 1 lần
do { } while (dieu_kien);

// for-each — duyệt mảng/collection
for (int x : mang) { }

// break — thoát vòng lặp
// continue — bỏ qua lần lặp hiện tại
\`\`\`
    `,
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Tam giác sao
        System.out.println("Tam giác:");
        for (int i = 1; i <= 5; i++) {
            for (int j = 0; j < i; j++) System.out.print("* ");
            System.out.println();
        }

        // FizzBuzz 1-20
        System.out.println("FizzBuzz:");
        for (int i = 1; i <= 20; i++) {
            if      (i % 15 == 0) System.out.print("FizzBuzz ");
            else if (i % 3  == 0) System.out.print("Fizz ");
            else if (i % 5  == 0) System.out.print("Buzz ");
            else                  System.out.print(i + " ");
        }
        System.out.println();

        // Đếm ngược với while
        System.out.print("Đếm ngược: ");
        int n = 10;
        while (n >= 0) { System.out.print(n-- + " "); }
        System.out.println("Phóng!");

        // Tổng Gauss bằng do-while
        int tong = 0, i = 1;
        do { tong += i++; } while (i <= 100);
        System.out.println("Tổng 1..100 = " + tong);
    }
}`,
    exercises: [
      {
        title: "Bài tập 1: Số nguyên tố",
        description: "Viết hàm `laSoNguyenTo(int n)` và in ra tất cả số nguyên tố từ 2 đến 100. Đếm và in tổng số nguyên tố tìm được.",
        starterCode: `public class Main {
    static boolean laSoNguyenTo(int n) {
        // TODO: trả về true nếu n là số nguyên tố
        // Gợi ý: kiểm tra từ 2 đến sqrt(n)
        return false;
    }

    public static void main(String[] args) {
        System.out.print("Số nguyên tố 2-100: ");
        int dem = 0;

        // TODO: in ra số nguyên tố từ 2 đến 100
        // Đếm và in số lượng

        System.out.println();
        System.out.println("Tổng cộng: " + dem + " số nguyên tố");
    }
}`,
        solution: `public class Main {
    static boolean laSoNguyenTo(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }

    public static void main(String[] args) {
        System.out.print("Số nguyên tố 2-100: ");
        int dem = 0;
        for (int i = 2; i <= 100; i++) {
            if (laSoNguyenTo(i)) {
                System.out.print(i + " ");
                dem++;
            }
        }
        System.out.println();
        System.out.println("Tổng cộng: " + dem + " số nguyên tố");
    }
}`,
        hint: "Số nguyên tố: chỉ kiểm tra ước từ 2 đến sqrt(n). Dùng Math.sqrt(n) hoặc i*i <= n.",
      },
      {
        title: "Bài tập 2: In bảng cửu chương",
        description: "In bảng cửu chương từ 2 đến 9, mỗi bảng trên một hàng. Dùng vòng lặp lồng nhau và printf để căn chỉnh đẹp.",
        starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: In bảng cửu chương 2 đến 9
        // Format mỗi dòng: "2 x 1 =  2   2 x 2 =  4  ..."
        // Mỗi bảng nhân một dòng, có 10 phép tính (1 đến 10)

        for (int bang = 2; bang <= 9; bang++) {
            // TODO: in một dòng cho bảng [bang]
            System.out.println();
        }
    }
}`,
        solution: `public class Main {
    public static void main(String[] args) {
        for (int bang = 2; bang <= 9; bang++) {
            for (int i = 1; i <= 10; i++) {
                System.out.printf("%d x %2d = %3d   ", bang, i, bang * i);
            }
            System.out.println();
        }
    }
}`,
        hint: "Vòng lặp lồng: ngoài 2-9, trong 1-10. printf dùng %2d và %3d để căn chỉnh cột.",
      },
      {
        title: "Bài tập 3: Số Fibonacci",
        description: "In ra 20 số đầu tiên của dãy Fibonacci (0, 1, 1, 2, 3, 5, 8...). Kiểm tra xem số thứ 10 (index từ 0) có phải số nguyên tố không.",
        starterCode: `public class Main {
    static boolean laSoNguyenTo(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++)
            if (n % i == 0) return false;
        return true;
    }

    public static void main(String[] args) {
        int[] fib = new int[20];
        fib[0] = 0;
        fib[1] = 1;

        // TODO: điền các phần tử còn lại
        // fib[i] = fib[i-1] + fib[i-2]

        // TODO: In ra 20 số
        System.out.print("Fibonacci: ");

        // TODO: Kiểm tra fib[10] có là số nguyên tố?
        System.out.println("fib[10] = " + fib[10]);
    }
}`,
        solution: `public class Main {
    static boolean laSoNguyenTo(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++)
            if (n % i == 0) return false;
        return true;
    }

    public static void main(String[] args) {
        int[] fib = new int[20];
        fib[0] = 0;
        fib[1] = 1;
        for (int i = 2; i < 20; i++)
            fib[i] = fib[i-1] + fib[i-2];

        System.out.print("Fibonacci: ");
        for (int x : fib) System.out.print(x + " ");
        System.out.println();

        System.out.println("fib[10] = " + fib[10]);
        System.out.println("Là số nguyên tố? " + laSoNguyenTo(fib[10]));
    }
}`,
        hint: "fib[i] = fib[i-1] + fib[i-2] với i từ 2. fib[10] = 55. 55 = 5 × 11, không phải số nguyên tố.",
      },
      {
        title: "Bài tập 4: Tìm kiếm nhị phân (Binary Search)",
        description: "Binary search nhanh hơn linear search O(log n) vs O(n). Implement `timKiemNhiPhan(int[] arr, int target)` và so sánh số bước với tìm kiếm tuần tự trên mảng đã sắp xếp 1000 phần tử.",
        starterCode: `import java.util.Arrays;

public class Main {
    static int timKiemTuanTu(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }

    static int timKiemNhiPhan(int[] arr, int target) {
        int trai = 0, phai = arr.length - 1;
        // TODO: Binary search - chia đôi tìm kiếm mỗi bước
        while (trai <= phai) {
            int giua = (trai + phai) / 2;
            if (arr[giua] == target) return giua;
            // TODO: cập nhật trai hoặc phai
        }
        return -1; // không tìm thấy
    }

    // Đếm số bước so sánh
    static int demBuocNhiPhan(int[] arr, int target) {
        int trai = 0, phai = arr.length - 1, buoc = 0;
        while (trai <= phai) {
            buoc++;
            int giua = (trai + phai) / 2;
            if (arr[giua] == target) return buoc;
            else if (arr[giua] < target) trai = giua + 1;
            else phai = giua - 1;
        }
        return buoc;
    }

    public static void main(String[] args) {
        int[] arr = new int[1000];
        for (int i = 0; i < 1000; i++) arr[i] = i * 2; // 0,2,4,...,1998

        int[] targets = {0, 500, 998, 1998, 777};
        System.out.printf("%-8s %-6s %-10s %-12s%n", "Target", "Vị trí", "Tuần tự", "Nhị phân");
        System.out.println("-".repeat(40));
        for (int t : targets) {
            int viTri = timKiemNhiPhan(arr, t);
            int buocNP = demBuocNhiPhan(arr, t);
            // Bước tuần tự = vị trí + 1 (nếu tìm thấy) hoặc 1000
            int buocTT = viTri >= 0 ? viTri + 1 : 1000;
            System.out.printf("%-8d %-6d %-10d %-12d%n", t, viTri, buocTT, buocNP);
        }
    }
}`,
        solution: `import java.util.Arrays;

public class Main {
    static int timKiemTuanTu(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++)
            if (arr[i] == target) return i;
        return -1;
    }

    static int timKiemNhiPhan(int[] arr, int target) {
        int trai = 0, phai = arr.length - 1;
        while (trai <= phai) {
            int giua = (trai + phai) / 2;
            if (arr[giua] == target) return giua;
            else if (arr[giua] < target) trai = giua + 1;
            else phai = giua - 1;
        }
        return -1;
    }

    static int demBuocNhiPhan(int[] arr, int target) {
        int trai = 0, phai = arr.length - 1, buoc = 0;
        while (trai <= phai) {
            buoc++;
            int giua = (trai + phai) / 2;
            if (arr[giua] == target) return buoc;
            else if (arr[giua] < target) trai = giua + 1;
            else phai = giua - 1;
        }
        return buoc;
    }

    public static void main(String[] args) {
        int[] arr = new int[1000];
        for (int i = 0; i < 1000; i++) arr[i] = i * 2;

        int[] targets = {0, 500, 998, 1998, 777};
        System.out.printf("%-8s %-6s %-10s %-12s%n", "Target", "Vị trí", "Tuần tự", "Nhị phân");
        System.out.println("-".repeat(40));
        for (int t : targets) {
            int viTri = timKiemNhiPhan(arr, t);
            int buocNP = demBuocNhiPhan(arr, t);
            int buocTT = viTri >= 0 ? viTri + 1 : 1000;
            System.out.printf("%-8d %-6d %-10d %-12d%n", t, viTri, buocTT, buocNP);
        }
    }
}`,
        hint: "Binary search: tính giua = (trai + phai) / 2. Nếu arr[giua] < target → trai = giua + 1. Nếu lớn hơn → phai = giua - 1.",
      },
      {
        title: "Bài tập 5: Số hoàn thiện và Armstrong",
        description: "Khám phá số học: Số hoàn thiện (perfect number) = tổng ước số thực của nó (6 = 1+2+3). Số Armstrong = tổng các chữ số mũ số chữ số (153 = 1³+5³+3³). Tìm tất cả trong phạm vi 1-10000.",
        starterCode: `public class Main {
    static boolean laSoHoanThien(int n) {
        // TODO: tính tổng các ước thực (ước < n) và so sánh với n
        // Ví dụ: 6 → ước: 1,2,3 → tổng = 6 ✓
        //         28 → ước: 1,2,4,7,14 → tổng = 28 ✓
        return false;
    }

    static boolean laSoArmstrong(int n) {
        // TODO: đếm số chữ số (k), tính tổng mỗi chữ số mũ k
        // 153: 3 chữ số → 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✓
        // 9474: 4 chữ số → 9⁴ + 4⁴ + 7⁴ + 4⁴ = ... ✓
        String s = String.valueOf(n);
        int k = s.length(); // số chữ số
        int tong = 0;
        // TODO: cộng pow(ch, k) cho mỗi chữ số ch
        return tong == n;
    }

    public static void main(String[] args) {
        System.out.print("Số hoàn thiện (1-10000): ");
        for (int i = 1; i <= 10000; i++)
            if (laSoHoanThien(i)) System.out.print(i + " ");
        System.out.println();

        System.out.print("Số Armstrong (1-9999): ");
        for (int i = 1; i <= 9999; i++)
            if (laSoArmstrong(i)) System.out.print(i + " ");
        System.out.println();
    }
}`,
        solution: `public class Main {
    static boolean laSoHoanThien(int n) {
        if (n < 2) return false;
        int tong = 1;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                tong += i;
                if (i != n / i) tong += n / i;
            }
        }
        return tong == n;
    }

    static boolean laSoArmstrong(int n) {
        String s = String.valueOf(n);
        int k = s.length();
        int tong = 0;
        for (char ch : s.toCharArray())
            tong += (int) Math.pow(ch - '0', k);
        return tong == n;
    }

    public static void main(String[] args) {
        System.out.print("Số hoàn thiện (1-10000): ");
        for (int i = 1; i <= 10000; i++)
            if (laSoHoanThien(i)) System.out.print(i + " ");
        System.out.println();

        System.out.print("Số Armstrong (1-9999): ");
        for (int i = 1; i <= 9999; i++)
            if (laSoArmstrong(i)) System.out.print(i + " ");
        System.out.println();
    }
}`,
        hint: "Số hoàn thiện: tổng ước từ 1 đến sqrt(n), nhớ thêm cả n/i. Armstrong: ch - '0' chuyển char thành digit, Math.pow(digit, k) tính lũy thừa.",
      },
    ],
  },
  {
    id: "03-mang-string",
    title: "Mảng và String",
    description: "Array 1D/2D, Arrays class, String methods, StringBuilder",
    level: "Cơ bản",
    content: `
## Mảng trong Java

### Khai báo và khởi tạo
\`\`\`java
// Khai báo rồi khởi tạo
int[] a = new int[5];       // [0, 0, 0, 0, 0]
String[] b = new String[3]; // [null, null, null]

// Khởi tạo ngay
int[] c = {1, 2, 3, 4, 5};
int[] d = new int[]{10, 20, 30};

// Mảng 2D
int[][] matrix = new int[3][4];
int[][] m = {{1,2},{3,4},{5,6}};
\`\`\`

### java.util.Arrays
\`\`\`java
Arrays.sort(arr);           // Sắp xếp tăng dần
Arrays.fill(arr, 0);        // Điền giá trị
Arrays.copyOf(arr, 5);      // Copy với độ dài mới
Arrays.toString(arr);       // "[1, 2, 3]"
Arrays.binarySearch(arr, x); // Tìm kiếm nhị phân (sau khi sort)
\`\`\`

## String trong Java

String là **immutable** (không thay đổi được) — mọi thao tác đều tạo String mới.

\`\`\`java
String s = "Hello, Java!";
s.length()           // 12
s.charAt(0)          // 'H'
s.substring(7)       // "Java!"
s.substring(0, 5)    // "Hello"
s.indexOf("Java")    // 7
s.contains("Java")   // true
s.startsWith("Hello") // true
s.toUpperCase()      // "HELLO, JAVA!"
s.toLowerCase()      // "hello, java!"
s.trim()             // Bỏ khoảng trắng 2 đầu
s.replace("Java","World") // "Hello, World!"
s.split(", ")        // ["Hello", "Java!"]
String.valueOf(42)   // "42"
String.format("%.2f", 3.14) // "3.14"
\`\`\`

### StringBuilder — Hiệu quả khi nối chuỗi nhiều lần
\`\`\`java
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("Java!");
sb.insert(5, ",");      // Chèn vào vị trí
sb.delete(0, 5);        // Xóa khoảng
sb.reverse();           // Đảo ngược
String result = sb.toString();
\`\`\`
    `,
    codeExample: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // Mảng 1D
        int[] so = {5, 2, 8, 1, 9, 3, 7, 4, 6};
        System.out.println("Gốc: " + Arrays.toString(so));
        Arrays.sort(so);
        System.out.println("Sắp xếp: " + Arrays.toString(so));
        System.out.println("Tìm 7: vị trí " + Arrays.binarySearch(so, 7));

        // Mảng 2D - ma trận chuyển vị
        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};
        System.out.println("Ma trận gốc:");
        for (int[] row : m) System.out.println(Arrays.toString(row));

        // String methods
        String s = "  Hello, Java World!  ";
        System.out.println("Trim: '" + s.trim() + "'");
        System.out.println("Upper: " + s.trim().toUpperCase());
        System.out.println("Words: " + Arrays.toString(s.trim().split("\\\\s+")));

        // StringBuilder - nối chuỗi hiệu quả
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append(i);
            if (i < 5) sb.append(" → ");
        }
        System.out.println("Pipeline: " + sb);
    }
}`,
    exercises: [
      {
        title: "Bài tập 1: Palindrome và đảo chuỗi",
        description: "Viết hàm `daoNguoc(String s)` đảo ngược chuỗi (không dùng StringBuilder.reverse()). Viết `laPalindrome(String s)` kiểm tra palindrome bỏ qua hoa/thường và khoảng trắng.",
        starterCode: `public class Main {
    static String daoNguoc(String s) {
        // TODO: đảo ngược không dùng reverse()
        // Gợi ý: dùng char array và 2 con trỏ
        return "";
    }

    static boolean laPalindrome(String s) {
        // TODO: chuẩn hóa (lower + bỏ không phải alphanumeric)
        // rồi kiểm tra có bằng daoNguoc không
        return false;
    }

    public static void main(String[] args) {
        System.out.println(daoNguoc("Hello"));          // olleH
        System.out.println(daoNguoc("Java"));           // avaJ
        System.out.println(laPalindrome("racecar"));    // true
        System.out.println(laPalindrome("A man a plan a canal Panama")); // true
        System.out.println(laPalindrome("hello"));      // false
    }
}`,
        solution: `public class Main {
    static String daoNguoc(String s) {
        char[] chars = s.toCharArray();
        int left = 0, right = chars.length - 1;
        while (left < right) {
            char tmp = chars[left];
            chars[left++] = chars[right];
            chars[right--] = tmp;
        }
        return new String(chars);
    }

    static boolean laPalindrome(String s) {
        String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        return clean.equals(daoNguoc(clean));
    }

    public static void main(String[] args) {
        System.out.println(daoNguoc("Hello"));
        System.out.println(daoNguoc("Java"));
        System.out.println(laPalindrome("racecar"));
        System.out.println(laPalindrome("A man a plan a canal Panama"));
        System.out.println(laPalindrome("hello"));
    }
}`,
        hint: "Two pointer: hoán đổi chars[left] và chars[right], tăng left và giảm right. replaceAll(\"[^a-z0-9]\", \"\") bỏ ký tự đặc biệt.",
      },
      {
        title: "Bài tập 2: Thống kê mảng",
        description: "Cho mảng số nguyên, tính: tổng, trung bình, max, min, và đếm số âm/dương/bằng 0. Tìm phần tử xuất hiện nhiều nhất.",
        starterCode: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {3, -1, 4, 1, -5, 9, 2, -6, 5, 3, 5, 3, 8, 9, 7, 9};

        // TODO: Tính tổng
        long tong = 0;

        // TODO: Tính trung bình
        double trungBinh = 0;

        // TODO: Max và min
        int max = arr[0], min = arr[0];

        // TODO: Đếm âm/dương/bằng 0
        int soAm = 0, soDuong = 0, soBang0 = 0;

        // TODO: Phần tử xuất hiện nhiều nhất
        int phanTuNhieuNhat = arr[0], soLanMax = 0;

        System.out.println("Mảng: " + Arrays.toString(arr));
        System.out.println("Tổng: " + tong);
        System.out.printf("Trung bình: %.2f%n", trungBinh);
        System.out.println("Max: " + max + ", Min: " + min);
        System.out.println("Âm: " + soAm + ", Dương: " + soDuong + ", =0: " + soBang0);
        System.out.println("Phần tử nhiều nhất: " + phanTuNhieuNhat + " (" + soLanMax + " lần)");
    }
}`,
        solution: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {3, -1, 4, 1, -5, 9, 2, -6, 5, 3, 5, 3, 8, 9, 7, 9};

        long tong = 0;
        int max = arr[0], min = arr[0];
        int soAm = 0, soDuong = 0, soBang0 = 0;

        for (int x : arr) {
            tong += x;
            if (x > max) max = x;
            if (x < min) min = x;
            if (x < 0) soAm++;
            else if (x > 0) soDuong++;
            else soBang0++;
        }
        double trungBinh = (double) tong / arr.length;

        int phanTuNhieuNhat = arr[0], soLanMax = 0;
        for (int x : arr) {
            int count = 0;
            for (int y : arr) if (y == x) count++;
            if (count > soLanMax) { soLanMax = count; phanTuNhieuNhat = x; }
        }

        System.out.println("Mảng: " + Arrays.toString(arr));
        System.out.println("Tổng: " + tong);
        System.out.printf("Trung bình: %.2f%n", trungBinh);
        System.out.println("Max: " + max + ", Min: " + min);
        System.out.println("Âm: " + soAm + ", Dương: " + soDuong + ", =0: " + soBang0);
        System.out.println("Phần tử nhiều nhất: " + phanTuNhieuNhat + " (" + soLanMax + " lần)");
    }
}`,
        hint: "Một vòng for duyệt một lần để tính tổng, max, min, đếm. Phần tử nhiều nhất: vòng lặp lồng để đếm tần suất.",
      },
      {
        title: "Bài tập 3: Xử lý chuỗi văn bản",
        description: "Cho một câu văn, đếm: số từ, số ký tự (không khoảng trắng), từ dài nhất. Đảo ngược thứ tự các từ trong câu.",
        starterCode: `public class Main {
    public static void main(String[] args) {
        String cau = "The quick brown fox jumps over the lazy dog";

        // TODO: Đếm số từ (split theo khoảng trắng)
        int soTu = 0;

        // TODO: Đếm ký tự (không khoảng trắng)
        int soKyTu = 0;

        // TODO: Tìm từ dài nhất
        String tuDaiNhat = "";

        // TODO: Đảo ngược thứ tự từ
        String daoNguoc = "";

        System.out.println("Câu gốc: " + cau);
        System.out.println("Số từ: " + soTu);
        System.out.println("Số ký tự: " + soKyTu);
        System.out.println("Từ dài nhất: " + tuDaiNhat);
        System.out.println("Đảo ngược: " + daoNguoc);
    }
}`,
        solution: `public class Main {
    public static void main(String[] args) {
        String cau = "The quick brown fox jumps over the lazy dog";

        String[] tuArr = cau.split("\\\\s+");
        int soTu = tuArr.length;
        int soKyTu = cau.replace(" ", "").length();

        String tuDaiNhat = "";
        for (String tu : tuArr)
            if (tu.length() > tuDaiNhat.length()) tuDaiNhat = tu;

        StringBuilder sb = new StringBuilder();
        for (int i = tuArr.length - 1; i >= 0; i--) {
            sb.append(tuArr[i]);
            if (i > 0) sb.append(" ");
        }
        String daoNguoc = sb.toString();

        System.out.println("Câu gốc: " + cau);
        System.out.println("Số từ: " + soTu);
        System.out.println("Số ký tự: " + soKyTu);
        System.out.println("Từ dài nhất: " + tuDaiNhat);
        System.out.println("Đảo ngược: " + daoNguoc);
    }
}`,
        hint: "split(\"\\\\s+\") để tách theo khoảng trắng. replace(\" \", \"\") đếm ký tự. Đảo từ: duyệt từ cuối về đầu dùng StringBuilder.",
      },
      {
        title: "Bài tập 4: Mã hóa Caesar Cipher",
        description: "Caesar cipher dịch chuyển mỗi chữ cái đi k vị trí. Ứng dụng trong mật mã học cơ bản. Implement `maHoa(String text, int shift)` và `giaiMa(String text, int shift)`. Test với các tin nhắn bí mật.",
        starterCode: `public class Main {
    static String maHoa(String text, int shift) {
        // TODO: dịch mỗi chữ cái đi 'shift' vị trí, giữ nguyên hoa/thường
        // Ký tự không phải chữ cái → giữ nguyên
        // 'z' + 1 → 'a' (quay vòng)
        StringBuilder sb = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                // TODO: (c - base + shift) % 26 + base
                sb.append(c); // thay bằng ký tự đã mã hóa
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    static String giaiMa(String text, int shift) {
        // TODO: giải mã = mã hóa ngược (shift âm)
        return maHoa(text, (26 - shift % 26) % 26);
    }

    public static void main(String[] args) {
        String[] messages = { "Hello World", "Java Programming", "Attack at Dawn" };
        int[] shifts = { 3, 13, 7 };

        for (int i = 0; i < messages.length; i++) {
            String original = messages[i];
            String encoded = maHoa(original, shifts[i]);
            String decoded = giaiMa(encoded, shifts[i]);
            System.out.println("Gốc:    " + original);
            System.out.println("Mã hóa: " + encoded + " (shift=" + shifts[i] + ")");
            System.out.println("Giải mã:" + decoded);
            System.out.println();
        }
    }
}`,
        solution: `public class Main {
    static String maHoa(String text, int shift) {
        StringBuilder sb = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                sb.append((char) ((c - base + shift) % 26 + base));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    static String giaiMa(String text, int shift) {
        return maHoa(text, (26 - shift % 26) % 26);
    }

    public static void main(String[] args) {
        String[] messages = { "Hello World", "Java Programming", "Attack at Dawn" };
        int[] shifts = { 3, 13, 7 };

        for (int i = 0; i < messages.length; i++) {
            String original = messages[i];
            String encoded = maHoa(original, shifts[i]);
            String decoded = giaiMa(encoded, shifts[i]);
            System.out.println("Gốc:    " + original);
            System.out.println("Mã hóa: " + encoded + " (shift=" + shifts[i] + ")");
            System.out.println("Giải mã:" + decoded);
            System.out.println();
        }
    }
}`,
        hint: "Công thức: (char)((c - base + shift) % 26 + base). base = 'A' cho hoa, 'a' cho thường. Giải mã shift ngược: (26 - shift % 26) % 26.",
      },
      {
        title: "Bài tập 5: Thao tác ma trận",
        description: "Ma trận là cơ sở của đồ họa, AI, xử lý ảnh. Implement: `chuyenVi(int[][] m)` (transpose), `nhanMaTran(int[][] a, int[][] b)`, `inMaTran(int[][] m)`. Test với ma trận 3×3.",
        starterCode: `import java.util.Arrays;

public class Main {
    static int[][] chuyenVi(int[][] m) {
        int rows = m.length, cols = m[0].length;
        int[][] result = new int[cols][rows];
        // TODO: result[j][i] = m[i][j]
        return result;
    }

    static int[][] nhanMaTran(int[][] a, int[][] b) {
        // a: m×n, b: n×p → result: m×p
        int m = a.length, n = a[0].length, p = b[0].length;
        int[][] result = new int[m][p];
        // TODO: result[i][j] = sum(a[i][k] * b[k][j]) for k = 0..n-1
        return result;
    }

    static void inMaTran(int[][] m) {
        for (int[] row : m) {
            for (int val : row) System.out.printf("%4d", val);
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] A = { {1,2,3}, {4,5,6}, {7,8,9} };

        System.out.println("Ma trận A:");
        inMaTran(A);

        System.out.println("Chuyển vị A:");
        inMaTran(chuyenVi(A));

        int[][] B = { {9,8,7}, {6,5,4}, {3,2,1} };
        System.out.println("A × B:");
        inMaTran(nhanMaTran(A, B));

        // Ma trận đơn vị
        int[][] I = { {1,0,0}, {0,1,0}, {0,0,1} };
        System.out.println("A × I (phải bằng A):");
        inMaTran(nhanMaTran(A, I));
    }
}`,
        solution: `public class Main {
    static int[][] chuyenVi(int[][] m) {
        int rows = m.length, cols = m[0].length;
        int[][] result = new int[cols][rows];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                result[j][i] = m[i][j];
        return result;
    }

    static int[][] nhanMaTran(int[][] a, int[][] b) {
        int m = a.length, n = a[0].length, p = b[0].length;
        int[][] result = new int[m][p];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < p; j++)
                for (int k = 0; k < n; k++)
                    result[i][j] += a[i][k] * b[k][j];
        return result;
    }

    static void inMaTran(int[][] m) {
        for (int[] row : m) {
            for (int val : row) System.out.printf("%4d", val);
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] A = { {1,2,3}, {4,5,6}, {7,8,9} };
        System.out.println("Ma trận A:");
        inMaTran(A);

        System.out.println("Chuyển vị A:");
        inMaTran(chuyenVi(A));

        int[][] B = { {9,8,7}, {6,5,4}, {3,2,1} };
        System.out.println("A × B:");
        inMaTran(nhanMaTran(A, B));

        int[][] I = { {1,0,0}, {0,1,0}, {0,0,1} };
        System.out.println("A × I:");
        inMaTran(nhanMaTran(A, I));
    }
}`,
        hint: "Chuyển vị: result[j][i] = m[i][j]. Nhân ma trận: 3 vòng lặp i, j, k — result[i][j] += a[i][k] * b[k][j].",
      },
    ],
  },
  {
    id: "04-oop-co-ban",
    title: "OOP Cơ bản",
    description: "Class, Object, Constructor, Encapsulation, Getter/Setter, toString",
    level: "Cơ bản",
    content: `
## Lập trình hướng đối tượng (OOP)

4 trụ cột: **Encapsulation**, **Inheritance**, **Polymorphism**, **Abstraction**.

### Class và Object
\`\`\`java
public class SinhVien {
    // Thuộc tính (fields)
    private String ten;
    private int tuoi;

    // Constructor
    public SinhVien(String ten, int tuoi) {
        this.ten = ten;
        this.tuoi = tuoi;
    }

    // Getter
    public String getTen() { return ten; }

    // Setter với validation
    public void setTuoi(int tuoi) {
        if (tuoi < 0) throw new IllegalArgumentException("Tuổi không hợp lệ");
        this.tuoi = tuoi;
    }

    @Override
    public String toString() {
        return "SinhVien{ten=" + ten + ", tuoi=" + tuoi + "}";
    }
}

// Tạo object
SinhVien sv = new SinhVien("An", 20);
System.out.println(sv); // gọi toString()
\`\`\`

### Overloading (Nạp chồng)
Cùng tên, khác tham số:
\`\`\`java
public int tinh(int a) { return a * a; }
public double tinh(double a) { return a * a; }
public int tinh(int a, int b) { return a + b; }
\`\`\`

### Static members
\`\`\`java
class Counter {
    private static int count = 0; // Dùng chung cho tất cả objects
    public Counter() { count++; }
    public static int getCount() { return count; }
}
\`\`\`
    `,
    codeExample: `public class Main {

    static class SinhVien {
        private String maSV;
        private String ten;
        private double gpa;
        private static int demSV = 0; // static - đếm tổng số SV

        public SinhVien(String ten, double gpa) {
            this.maSV = "SV" + String.format("%03d", ++demSV);
            this.ten = ten;
            this.gpa = gpa;
        }

        // Constructor overload
        public SinhVien(String ten) {
            this(ten, 0.0); // gọi constructor trên
        }

        public String getMaSV() { return maSV; }
        public String getTen()  { return ten; }
        public double getGpa()  { return gpa; }

        public void setGpa(double gpa) {
            if (gpa < 0 || gpa > 4.0)
                throw new IllegalArgumentException("GPA phải từ 0-4.0, nhận: " + gpa);
            this.gpa = gpa;
        }

        public String xepLoai() {
            if (gpa >= 3.6) return "Xuất sắc";
            if (gpa >= 3.2) return "Giỏi";
            if (gpa >= 2.5) return "Khá";
            if (gpa >= 2.0) return "Trung bình";
            return "Yếu";
        }

        public static int getDemSV() { return demSV; }

        @Override
        public String toString() {
            return String.format("[%s] %-15s GPA: %.2f (%s)", maSV, ten, gpa, xepLoai());
        }
    }

    public static void main(String[] args) {
        SinhVien[] dsv = {
            new SinhVien("Nguyen An", 3.8),
            new SinhVien("Tran Binh", 3.2),
            new SinhVien("Le Hoa"),
        };
        dsv[2].setGpa(2.7);

        for (SinhVien sv : dsv) System.out.println(sv);
        System.out.println("Tổng sinh viên: " + SinhVien.getDemSV());
    }
}`,
    exercises: [
      {
        title: "Bài tập 1: Class Tài khoản ngân hàng",
        description: "Tạo class `TaiKhoan` với: soTK (final), chuTK, soDu (private). Methods: nap(double), rut(double) với validation, getSoDu(), toString(). Tạo 2 tài khoản và chuyển tiền.",
        starterCode: `public class Main {

    static class TaiKhoan {
        private final String soTK;
        private String chuTK;
        private double soDu;

        public TaiKhoan(String soTK, String chuTK, double soDuBanDau) {
            // TODO
        }

        public void nap(double soTien) {
            // TODO: validate > 0, cộng vào soDu, in thông báo
        }

        public void rut(double soTien) {
            // TODO: validate > 0 và <= soDu, trừ khỏi soDu
        }

        public void chuyenTien(TaiKhoan noiNhan, double soTien) {
            // TODO: rút từ this, nạp vào noiNhan
        }

        public double getSoDu() { return soDu; }

        @Override
        public String toString() {
            return ""; // TODO: [soTK] chuTK: soDu VND
        }
    }

    public static void main(String[] args) {
        TaiKhoan tk1 = new TaiKhoan("VCB001", "Nguyen An", 5_000_000);
        TaiKhoan tk2 = new TaiKhoan("VCB002", "Tran Binh", 2_000_000);

        System.out.println(tk1);
        System.out.println(tk2);

        tk1.chuyenTien(tk2, 1_500_000);

        System.out.println("\\nSau chuyển tiền:");
        System.out.println(tk1);
        System.out.println(tk2);
    }
}`,
        solution: `public class Main {
    static class TaiKhoan {
        private final String soTK;
        private String chuTK;
        private double soDu;

        public TaiKhoan(String soTK, String chuTK, double soDuBanDau) {
            this.soTK = soTK;
            this.chuTK = chuTK;
            this.soDu = soDuBanDau;
        }

        public void nap(double soTien) {
            if (soTien <= 0) throw new IllegalArgumentException("Số tiền phải > 0");
            soDu += soTien;
            System.out.printf("Nạp %.0f VND vào [%s]. Số dư: %.0f VND%n", soTien, soTK, soDu);
        }

        public void rut(double soTien) {
            if (soTien <= 0) throw new IllegalArgumentException("Số tiền phải > 0");
            if (soTien > soDu) throw new IllegalArgumentException("Số dư không đủ");
            soDu -= soTien;
            System.out.printf("Rút %.0f VND từ [%s]. Số dư: %.0f VND%n", soTien, soTK, soDu);
        }

        public void chuyenTien(TaiKhoan noiNhan, double soTien) {
            this.rut(soTien);
            noiNhan.nap(soTien);
        }

        public double getSoDu() { return soDu; }

        @Override
        public String toString() {
            return String.format("[%s] %s: %.0f VND", soTK, chuTK, soDu);
        }
    }

    public static void main(String[] args) {
        TaiKhoan tk1 = new TaiKhoan("VCB001", "Nguyen An", 5_000_000);
        TaiKhoan tk2 = new TaiKhoan("VCB002", "Tran Binh", 2_000_000);
        System.out.println(tk1);
        System.out.println(tk2);
        tk1.chuyenTien(tk2, 1_500_000);
        System.out.println("\\nSau chuyển tiền:");
        System.out.println(tk1);
        System.out.println(tk2);
    }
}`,
        hint: "chuyenTien() đơn giản chỉ gọi this.rut() rồi noiNhan.nap(). final cho soTK không thể thay đổi.",
      },
      {
        title: "Bài tập 2: Class Phân số",
        description: "Tạo class `PhanSo` với tử (tu) và mẫu (mau). Implement: cong(), tru(), nhan(), chia(). Tự động rút gọn bằng GCD. Override toString() → '3/4'.",
        starterCode: `public class Main {

    static class PhanSo {
        private int tu;
        private int mau;

        public PhanSo(int tu, int mau) {
            if (mau == 0) throw new IllegalArgumentException("Mẫu không được = 0");
            // TODO: gán và rút gọn
        }

        // TODO: hàm GCD (ước chung lớn nhất) - dùng thuật toán Euclid
        private int gcd(int a, int b) { return 0; }

        private void rutGon() {
            // TODO: chia tu và mau cho gcd
        }

        public PhanSo cong(PhanSo other) {
            // (a/b) + (c/d) = (a*d + b*c) / (b*d)
            return new PhanSo(0, 1); // TODO
        }

        public PhanSo nhan(PhanSo other) {
            return new PhanSo(0, 1); // TODO
        }

        @Override
        public String toString() {
            return mau == 1 ? String.valueOf(tu) : tu + "/" + mau;
        }
    }

    public static void main(String[] args) {
        PhanSo a = new PhanSo(1, 2);
        PhanSo b = new PhanSo(1, 3);
        System.out.println(a + " + " + b + " = " + a.cong(b)); // 5/6
        System.out.println(a + " * " + b + " = " + a.nhan(b)); // 1/6
        System.out.println(new PhanSo(4, 8));  // tự rút gọn → 1/2
    }
}`,
        solution: `public class Main {
    static class PhanSo {
        private int tu, mau;

        public PhanSo(int tu, int mau) {
            if (mau == 0) throw new IllegalArgumentException("Mẫu không được = 0");
            if (mau < 0) { tu = -tu; mau = -mau; }
            this.tu = tu; this.mau = mau;
            rutGon();
        }

        private int gcd(int a, int b) { return b == 0 ? Math.abs(a) : gcd(b, a % b); }

        private void rutGon() {
            int g = gcd(Math.abs(tu), mau);
            tu /= g; mau /= g;
        }

        public PhanSo cong(PhanSo o) { return new PhanSo(tu*o.mau + mau*o.tu, mau*o.mau); }
        public PhanSo tru(PhanSo o)  { return new PhanSo(tu*o.mau - mau*o.tu, mau*o.mau); }
        public PhanSo nhan(PhanSo o) { return new PhanSo(tu*o.tu, mau*o.mau); }
        public PhanSo chia(PhanSo o) { return new PhanSo(tu*o.mau, mau*o.tu); }

        @Override
        public String toString() { return mau == 1 ? String.valueOf(tu) : tu + "/" + mau; }
    }

    public static void main(String[] args) {
        PhanSo a = new PhanSo(1, 2);
        PhanSo b = new PhanSo(1, 3);
        System.out.println(a + " + " + b + " = " + a.cong(b));
        System.out.println(a + " * " + b + " = " + a.nhan(b));
        System.out.println(a + " - " + b + " = " + a.tru(b));
        System.out.println(a + " / " + b + " = " + a.chia(b));
        System.out.println(new PhanSo(4, 8));
    }
}`,
        hint: "GCD bằng Euclid: gcd(a, b) = b == 0 ? a : gcd(b, a%b). Rút gọn bằng cách chia tu và mau cho gcd(|tu|, mau).",
      },
      {
        title: "Bài tập 3: Quản lý danh sách sinh viên CRUD",
        description: "Xây dựng hệ thống quản lý sinh viên với đầy đủ thao tác CRUD. Class `QuanLySinhVien` dùng ArrayList, hỗ trợ: thêm, xóa theo mã, tìm theo tên, lọc theo GPA, sắp xếp và in báo cáo.",
        starterCode: `import java.util.*;

public class Main {

    static class SinhVien {
        String maSV, ten;
        double gpa;
        SinhVien(String maSV, String ten, double gpa) {
            this.maSV = maSV; this.ten = ten; this.gpa = gpa;
        }
        @Override public String toString() {
            return String.format("[%s] %-15s GPA: %.2f", maSV, ten, gpa);
        }
    }

    static class QuanLySinhVien {
        private List<SinhVien> danhSach = new ArrayList<>();

        void them(SinhVien sv) {
            // TODO: kiểm tra maSV không trùng, nếu trùng throw exception
            danhSach.add(sv);
        }

        boolean xoa(String maSV) {
            // TODO: xóa SV có maSV tương ứng, trả về true nếu thành công
            return danhSach.removeIf(sv -> sv.maSV.equals(maSV));
        }

        Optional<SinhVien> timTheoMa(String maSV) {
            // TODO: dùng stream().filter().findFirst()
            return Optional.empty();
        }

        List<SinhVien> timTheoTen(String ten) {
            // TODO: tìm các SV có tên chứa từ khóa (không phân biệt hoa/thường)
            return new ArrayList<>();
        }

        List<SinhVien> locTheoGPA(double minGPA) {
            // TODO: lọc SV có GPA >= minGPA, sắp xếp giảm dần
            return new ArrayList<>();
        }

        void inBaoCao() {
            System.out.println("=== DANH SÁCH SINH VIÊN ===");
            danhSach.stream()
                .sorted(Comparator.comparingDouble((SinhVien sv) -> sv.gpa).reversed())
                .forEach(System.out::println);
            double gpaTB = danhSach.stream().mapToDouble(sv -> sv.gpa).average().orElse(0);
            System.out.printf("Tổng: %d SV | GPA TB: %.2f%n", danhSach.size(), gpaTB);
        }
    }

    public static void main(String[] args) {
        QuanLySinhVien ql = new QuanLySinhVien();
        ql.them(new SinhVien("SV001", "Nguyen An", 3.8));
        ql.them(new SinhVien("SV002", "Tran Binh", 3.2));
        ql.them(new SinhVien("SV003", "Le Hoa", 3.9));
        ql.them(new SinhVien("SV004", "Pham An", 2.8));

        ql.inBaoCao();
        System.out.println("\\nLọc GPA >= 3.5:");
        ql.locTheoGPA(3.5).forEach(System.out::println);

        System.out.println("\\nTìm 'An':");
        ql.timTheoTen("An").forEach(System.out::println);
    }
}`,
        solution: `import java.util.*;
import java.util.stream.*;

public class Main {
    static class SinhVien {
        String maSV, ten; double gpa;
        SinhVien(String maSV, String ten, double gpa) {
            this.maSV = maSV; this.ten = ten; this.gpa = gpa;
        }
        @Override public String toString() {
            return String.format("[%s] %-15s GPA: %.2f", maSV, ten, gpa);
        }
    }

    static class QuanLySinhVien {
        private List<SinhVien> danhSach = new ArrayList<>();

        void them(SinhVien sv) {
            if (danhSach.stream().anyMatch(s -> s.maSV.equals(sv.maSV)))
                throw new IllegalArgumentException("Mã SV đã tồn tại: " + sv.maSV);
            danhSach.add(sv);
        }

        boolean xoa(String maSV) { return danhSach.removeIf(sv -> sv.maSV.equals(maSV)); }

        Optional<SinhVien> timTheoMa(String maSV) {
            return danhSach.stream().filter(sv -> sv.maSV.equals(maSV)).findFirst();
        }

        List<SinhVien> timTheoTen(String ten) {
            return danhSach.stream()
                .filter(sv -> sv.ten.toLowerCase().contains(ten.toLowerCase()))
                .collect(Collectors.toList());
        }

        List<SinhVien> locTheoGPA(double minGPA) {
            return danhSach.stream()
                .filter(sv -> sv.gpa >= minGPA)
                .sorted(Comparator.comparingDouble((SinhVien sv) -> sv.gpa).reversed())
                .collect(Collectors.toList());
        }

        void inBaoCao() {
            System.out.println("=== DANH SÁCH SINH VIÊN ===");
            danhSach.stream()
                .sorted(Comparator.comparingDouble((SinhVien sv) -> sv.gpa).reversed())
                .forEach(System.out::println);
            double gpaTB = danhSach.stream().mapToDouble(sv -> sv.gpa).average().orElse(0);
            System.out.printf("Tổng: %d SV | GPA TB: %.2f%n", danhSach.size(), gpaTB);
        }
    }

    public static void main(String[] args) {
        QuanLySinhVien ql = new QuanLySinhVien();
        ql.them(new SinhVien("SV001", "Nguyen An", 3.8));
        ql.them(new SinhVien("SV002", "Tran Binh", 3.2));
        ql.them(new SinhVien("SV003", "Le Hoa", 3.9));
        ql.them(new SinhVien("SV004", "Pham An", 2.8));
        ql.inBaoCao();
        System.out.println("\\nLọc GPA >= 3.5:");
        ql.locTheoGPA(3.5).forEach(System.out::println);
        System.out.println("\\nTìm 'An':");
        ql.timTheoTen("An").forEach(System.out::println);
    }
}`,
        hint: "removeIf(predicate) xóa phần tử thỏa điều kiện. stream().filter().findFirst() trả về Optional. contains(toLowerCase) để tìm không phân biệt hoa/thường.",
      },
      {
        title: "Bài tập 4: Generic Stack với Lịch sử (Undo)",
        description: "Stack là nền tảng của tính năng Undo/Redo. Implement generic `Stack<T>` với push/pop/peek, sau đó dùng 2 stacks để implement `UndoManager` cho phép undo và redo các thao tác.",
        starterCode: `import java.util.*;

public class Main {

    static class Stack<T> {
        private List<T> items = new ArrayList<>();
        void push(T item) { items.add(item); }
        T pop() {
            if (isEmpty()) throw new EmptyStackException();
            return items.remove(items.size() - 1);
        }
        T peek() {
            if (isEmpty()) throw new EmptyStackException();
            return items.get(items.size() - 1);
        }
        boolean isEmpty() { return items.isEmpty(); }
        int size() { return items.size(); }
    }

    static class UndoManager {
        private Stack<String> undoStack = new Stack<>();
        private Stack<String> redoStack = new Stack<>();

        void thucHien(String action) {
            // TODO: push vào undoStack, xóa redoStack
        }

        String undo() {
            // TODO: lấy từ undoStack, push vào redoStack, trả về action
            return null;
        }

        String redo() {
            // TODO: lấy từ redoStack, push vào undoStack, trả về action
            return null;
        }

        void inTrangThai() {
            System.out.println("Undo stack: " + undoStack.size() + " actions | Redo stack: " + redoStack.size());
        }
    }

    public static void main(String[] args) {
        UndoManager editor = new UndoManager();
        editor.thucHien("Gõ 'Hello'");
        editor.thucHien("Gõ ' World'");
        editor.thucHien("In đậm");
        editor.thucHien("Thay màu đỏ");
        editor.inTrangThai();

        System.out.println("Undo: " + editor.undo());
        System.out.println("Undo: " + editor.undo());
        editor.inTrangThai();

        System.out.println("Redo: " + editor.redo());
        editor.thucHien("Nghiêng"); // thao tác mới xóa redo
        editor.inTrangThai();
    }
}`,
        solution: `import java.util.*;

public class Main {
    static class Stack<T> {
        private List<T> items = new ArrayList<>();
        void push(T item) { items.add(item); }
        T pop() {
            if (isEmpty()) throw new EmptyStackException();
            return items.remove(items.size() - 1);
        }
        T peek() {
            if (isEmpty()) throw new EmptyStackException();
            return items.get(items.size() - 1);
        }
        boolean isEmpty() { return items.isEmpty(); }
        int size() { return items.size(); }
    }

    static class UndoManager {
        private Stack<String> undoStack = new Stack<>();
        private Stack<String> redoStack = new Stack<>();

        void thucHien(String action) {
            undoStack.push(action);
            while (!redoStack.isEmpty()) redoStack.pop(); // xóa redo khi có action mới
        }

        String undo() {
            if (undoStack.isEmpty()) return null;
            String action = undoStack.pop();
            redoStack.push(action);
            return action;
        }

        String redo() {
            if (redoStack.isEmpty()) return null;
            String action = redoStack.pop();
            undoStack.push(action);
            return action;
        }

        void inTrangThai() {
            System.out.println("Undo stack: " + undoStack.size() + " | Redo stack: " + redoStack.size());
        }
    }

    public static void main(String[] args) {
        UndoManager editor = new UndoManager();
        editor.thucHien("Gõ 'Hello'");
        editor.thucHien("Gõ ' World'");
        editor.thucHien("In đậm");
        editor.thucHien("Thay màu đỏ");
        editor.inTrangThai();

        System.out.println("Undo: " + editor.undo());
        System.out.println("Undo: " + editor.undo());
        editor.inTrangThai();

        System.out.println("Redo: " + editor.redo());
        editor.thucHien("Nghiêng");
        editor.inTrangThai();
    }
}`,
        hint: "thucHien() push vào undoStack VÀ xóa toàn bộ redoStack. undo() pop từ undoStack, push vào redoStack. redo() ngược lại.",
      },
      {
        title: "Bài tập 5: Builder Pattern — Xây dựng truy vấn SQL",
        description: "Builder Pattern giúp tạo object phức tạp từng bước. Implement `QueryBuilder` để tạo câu SQL SELECT linh hoạt: table, columns, where, orderBy, limit. Áp dụng để tạo nhiều truy vấn khác nhau.",
        starterCode: `public class Main {

    static class QueryBuilder {
        private String table = "";
        private String columns = "*";
        private String whereClause = "";
        private String orderByClause = "";
        private int limitValue = -1;

        QueryBuilder from(String table) {
            this.table = table;
            return this; // method chaining
        }

        QueryBuilder select(String... cols) {
            this.columns = String.join(", ", cols);
            return this;
        }

        QueryBuilder where(String condition) {
            // TODO: nếu đã có where, nối thêm AND
            this.whereClause = condition;
            return this;
        }

        QueryBuilder and(String condition) {
            if (!whereClause.isEmpty()) whereClause += " AND " + condition;
            else whereClause = condition;
            return this;
        }

        QueryBuilder orderBy(String col, boolean asc) {
            this.orderByClause = col + (asc ? " ASC" : " DESC");
            return this;
        }

        QueryBuilder limit(int n) {
            this.limitValue = n;
            return this;
        }

        String build() {
            // TODO: ghép thành câu SQL
            StringBuilder sb = new StringBuilder("SELECT " + columns + " FROM " + table);
            if (!whereClause.isEmpty()) sb.append(" WHERE ").append(whereClause);
            if (!orderByClause.isEmpty()) sb.append(" ORDER BY ").append(orderByClause);
            if (limitValue > 0) sb.append(" LIMIT ").append(limitValue);
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        String q1 = new QueryBuilder()
            .from("users")
            .select("id", "name", "email")
            .where("active = true")
            .and("age >= 18")
            .orderBy("name", true)
            .limit(10)
            .build();

        String q2 = new QueryBuilder()
            .from("products")
            .where("category = 'electronics'")
            .and("price < 10000000")
            .orderBy("price", false)
            .build();

        System.out.println(q1);
        System.out.println(q2);
    }
}`,
        solution: `public class Main {
    static class QueryBuilder {
        private String table = "";
        private String columns = "*";
        private String whereClause = "";
        private String orderByClause = "";
        private int limitValue = -1;

        QueryBuilder from(String table) { this.table = table; return this; }

        QueryBuilder select(String... cols) {
            this.columns = String.join(", ", cols);
            return this;
        }

        QueryBuilder where(String condition) {
            this.whereClause = condition;
            return this;
        }

        QueryBuilder and(String condition) {
            whereClause = whereClause.isEmpty() ? condition : whereClause + " AND " + condition;
            return this;
        }

        QueryBuilder orderBy(String col, boolean asc) {
            this.orderByClause = col + (asc ? " ASC" : " DESC");
            return this;
        }

        QueryBuilder limit(int n) { this.limitValue = n; return this; }

        String build() {
            StringBuilder sb = new StringBuilder("SELECT " + columns + " FROM " + table);
            if (!whereClause.isEmpty()) sb.append(" WHERE ").append(whereClause);
            if (!orderByClause.isEmpty()) sb.append(" ORDER BY ").append(orderByClause);
            if (limitValue > 0) sb.append(" LIMIT ").append(limitValue);
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        String q1 = new QueryBuilder()
            .from("users")
            .select("id", "name", "email")
            .where("active = true")
            .and("age >= 18")
            .orderBy("name", true)
            .limit(10)
            .build();

        String q2 = new QueryBuilder()
            .from("products")
            .where("category = 'electronics'")
            .and("price < 10000000")
            .orderBy("price", false)
            .build();

        System.out.println(q1);
        System.out.println(q2);
    }
}`,
        hint: "Mỗi method trả về this để hỗ trợ method chaining. where() gán mới, and() nối thêm. build() ghép từng phần với StringBuilder.",
      },
    ],
  },
  {
    id: "05-ke-thua-da-hinh",
    title: "Kế thừa và Đa hình",
    description: "extends, super, @Override, abstract class, interface, polymorphism",
    level: "Trung cấp",
    content: `
## Kế thừa (Inheritance)

\`\`\`java
public class DongVat {
    protected String ten;
    protected int tuoi;

    public DongVat(String ten, int tuoi) {
        this.ten = ten; this.tuoi = tuoi;
    }

    public String phatAm() { return "..."; }

    @Override
    public String toString() { return ten + "(" + tuoi + " tuổi): " + phatAm(); }
}

public class Cho extends DongVat {
    public Cho(String ten, int tuoi) {
        super(ten, tuoi); // bắt buộc gọi constructor cha trước
    }

    @Override
    public String phatAm() { return "Gâu gâu!"; } // Ghi đè
}
\`\`\`

## Abstract Class
\`\`\`java
abstract class HinhHoc {
    abstract double dienTich();    // Không có body - con phải implement
    abstract double chuVi();

    void hienThi() {               // Có body - con dùng luôn
        System.out.printf("DT=%.2f CV=%.2f%n", dienTich(), chuVi());
    }
}
\`\`\`

## Interface
\`\`\`java
interface CoTheTinh {
    double tinhToan();              // abstract method
    default String moTa() {        // default method (Java 8+)
        return "Kết quả: " + tinhToan();
    }
    static String phienBan() { return "1.0"; } // static method
}
\`\`\`

**Khác biệt:**
- Abstract class: có state, constructor, 1 lớp cha duy nhất
- Interface: không có state, implement nhiều interface được
    `,
    codeExample: `public class Main {

    interface CoTheVe {
        void ve();
        default String moTa() { return "Có thể vẽ hình"; }
    }

    abstract static class HinhHoc implements CoTheVe {
        protected String ten;
        HinhHoc(String ten) { this.ten = ten; }

        abstract double dienTich();
        abstract double chuVi();

        @Override
        public void ve() { System.out.println("Đang vẽ: " + ten); }

        public void thongKe() {
            System.out.printf("%-15s DT=%8.2f  CV=%8.2f%n", ten, dienTich(), chuVi());
        }
    }

    static class HinhTron extends HinhHoc {
        private double r;
        HinhTron(double r) { super("Hình tròn r=" + r); this.r = r; }
        @Override public double dienTich() { return Math.PI * r * r; }
        @Override public double chuVi()    { return 2 * Math.PI * r; }
    }

    static class HinhChuNhat extends HinhHoc {
        private double d, r;
        HinhChuNhat(double d, double r) { super("HCN " + d + "x" + r); this.d = d; this.r = r; }
        @Override public double dienTich() { return d * r; }
        @Override public double chuVi()    { return 2 * (d + r); }
    }

    static class HinhVuong extends HinhChuNhat {
        HinhVuong(double canh) { super(canh, canh); }
    }

    public static void main(String[] args) {
        HinhHoc[] cac = {
            new HinhTron(5),
            new HinhChuNhat(4, 6),
            new HinhVuong(4),
        };
        System.out.printf("%-15s %10s %10s%n", "Hình", "DT", "CV");
        System.out.println("-".repeat(38));
        for (HinhHoc h : cac) h.thongKe();

        // instanceof
        for (HinhHoc h : cac) {
            if (h instanceof HinhVuong v) {
                System.out.println("Hình vuông diện tích: " + v.dienTich());
            }
        }
    }
}`,
    exercises: [
      {
        title: "Bài tập 1: Hệ thống nhân viên",
        description: "Abstract class `NhanVien` (ten, maNV, luongCoBan). Abstract method `tinhThuong()`. Subclass: `NhanVienVanPhong` (thuong cố định), `NhanVienKinhDoanh` (% doanh số). In bảng lương.",
        starterCode: `public class Main {

    abstract static class NhanVien {
        protected String maNV;
        protected String ten;
        protected double luongCoBan;

        NhanVien(String maNV, String ten, double luongCoBan) {
            // TODO
        }

        abstract double tinhThuong();

        double tongLuong() { return luongCoBan + tinhThuong(); }

        @Override
        public String toString() {
            // TODO: "maNV | ten | luongCoBan | thuong | tongLuong"
            return "";
        }
    }

    static class NhanVienVanPhong extends NhanVien {
        private double thuongCoDinh;
        NhanVienVanPhong(String maNV, String ten, double luong, double thuong) {
            // TODO
        }
        @Override double tinhThuong() { return 0; /* TODO */ }
    }

    static class NhanVienKinhDoanh extends NhanVien {
        private double doanhSo;
        private double tyLeThuong; // phần trăm

        NhanVienKinhDoanh(String maNV, String ten, double luong, double doanhSo, double tyLe) {
            // TODO
        }
        @Override double tinhThuong() { return 0; /* TODO: doanhSo * tyLeThuong / 100 */ }
    }

    public static void main(String[] args) {
        NhanVien[] ds = {
            new NhanVienVanPhong("VP01", "Nguyen An", 10_000_000, 2_000_000),
            new NhanVienKinhDoanh("KD01", "Tran Binh", 8_000_000, 50_000_000, 3),
            new NhanVienKinhDoanh("KD02", "Le Hoa", 8_000_000, 80_000_000, 3),
        };
        System.out.printf("%-6s %-15s %12s %12s %12s%n", "Mã", "Tên", "Cơ bản", "Thưởng", "Tổng");
        System.out.println("-".repeat(60));
        for (NhanVien nv : ds) System.out.println(nv);
    }
}`,
        solution: `public class Main {
    abstract static class NhanVien {
        protected String maNV, ten;
        protected double luongCoBan;

        NhanVien(String maNV, String ten, double luongCoBan) {
            this.maNV = maNV; this.ten = ten; this.luongCoBan = luongCoBan;
        }
        abstract double tinhThuong();
        double tongLuong() { return luongCoBan + tinhThuong(); }

        @Override
        public String toString() {
            return String.format("%-6s %-15s %,12.0f %,12.0f %,12.0f",
                maNV, ten, luongCoBan, tinhThuong(), tongLuong());
        }
    }

    static class NhanVienVanPhong extends NhanVien {
        private double thuongCoDinh;
        NhanVienVanPhong(String maNV, String ten, double luong, double thuong) {
            super(maNV, ten, luong); this.thuongCoDinh = thuong;
        }
        @Override double tinhThuong() { return thuongCoDinh; }
    }

    static class NhanVienKinhDoanh extends NhanVien {
        private double doanhSo, tyLeThuong;
        NhanVienKinhDoanh(String maNV, String ten, double luong, double doanhSo, double tyLe) {
            super(maNV, ten, luong); this.doanhSo = doanhSo; this.tyLeThuong = tyLe;
        }
        @Override double tinhThuong() { return doanhSo * tyLeThuong / 100; }
    }

    public static void main(String[] args) {
        NhanVien[] ds = {
            new NhanVienVanPhong("VP01", "Nguyen An", 10_000_000, 2_000_000),
            new NhanVienKinhDoanh("KD01", "Tran Binh", 8_000_000, 50_000_000, 3),
            new NhanVienKinhDoanh("KD02", "Le Hoa", 8_000_000, 80_000_000, 3),
        };
        System.out.printf("%-6s %-15s %12s %12s %12s%n", "Mã", "Tên", "Cơ bản", "Thưởng", "Tổng");
        System.out.println("-".repeat(60));
        for (NhanVien nv : ds) System.out.println(nv);
    }
}`,
        hint: "NhanVienKinhDoanh: thuong = doanhSo * tyLeThuong / 100. Format số với %,12.0f để có dấu phân cách nghìn.",
      },
      {
        title: "Bài tập 2: Interface Comparable",
        description: "Tạo class `SinhVien` implement `Comparable<SinhVien>` (so sánh theo GPA giảm dần). Tạo mảng, sort bằng Arrays.sort(), tìm SV có GPA cao nhất/thấp nhất.",
        starterCode: `import java.util.Arrays;

public class Main {

    static class SinhVien implements Comparable<SinhVien> {
        String ten;
        double gpa;

        SinhVien(String ten, double gpa) {
            this.ten = ten; this.gpa = gpa;
        }

        @Override
        public int compareTo(SinhVien other) {
            // TODO: so sánh theo GPA giảm dần
            // (gpa lớn hơn đứng trước)
            return 0;
        }

        @Override
        public String toString() {
            return String.format("%-15s GPA: %.2f", ten, gpa);
        }
    }

    public static void main(String[] args) {
        SinhVien[] ds = {
            new SinhVien("Nguyen An", 3.8),
            new SinhVien("Tran Binh", 3.2),
            new SinhVien("Le Hoa", 3.9),
            new SinhVien("Pham Duc", 2.8),
            new SinhVien("Hoang Em", 3.5),
        };

        Arrays.sort(ds); // dùng compareTo

        System.out.println("Xếp hạng (GPA giảm dần):");
        for (int i = 0; i < ds.length; i++) {
            System.out.println((i+1) + ". " + ds[i]);
        }
        System.out.println("Top 1: " + ds[0].ten);
        System.out.println("Thấp nhất: " + ds[ds.length-1].ten);
    }
}`,
        solution: `import java.util.Arrays;

public class Main {
    static class SinhVien implements Comparable<SinhVien> {
        String ten; double gpa;
        SinhVien(String ten, double gpa) { this.ten = ten; this.gpa = gpa; }

        @Override
        public int compareTo(SinhVien other) {
            return Double.compare(other.gpa, this.gpa); // giảm dần
        }

        @Override
        public String toString() { return String.format("%-15s GPA: %.2f", ten, gpa); }
    }

    public static void main(String[] args) {
        SinhVien[] ds = {
            new SinhVien("Nguyen An", 3.8),
            new SinhVien("Tran Binh", 3.2),
            new SinhVien("Le Hoa", 3.9),
            new SinhVien("Pham Duc", 2.8),
            new SinhVien("Hoang Em", 3.5),
        };
        Arrays.sort(ds);
        System.out.println("Xếp hạng (GPA giảm dần):");
        for (int i = 0; i < ds.length; i++) System.out.println((i+1) + ". " + ds[i]);
        System.out.println("Top 1: " + ds[0].ten);
        System.out.println("Thấp nhất: " + ds[ds.length-1].ten);
    }
}`,
        hint: "compareTo giảm dần: return Double.compare(other.gpa, this.gpa) hoặc return (int)Math.signum(other.gpa - this.gpa).",
      },
      {
        title: "Bài tập 3: Interface và Strategy Pattern",
        description: "Strategy pattern cho phép thay đổi thuật toán lúc runtime. Tạo interface `ChienLuocGia` với các strategy: giá cố định, giảm theo % doanh số, VIP. Class `DonHang` nhận strategy và tính giá.",
        starterCode: `public class Main {

    interface ChienLuocGia {
        double tinhGia(double giagoc, int soLuong);
        String moTa();
    }

    static class GiaCoDinh implements ChienLuocGia {
        @Override public double tinhGia(double giagoc, int soLuong) {
            return giagoc * soLuong; // không giảm
        }
        @Override public String moTa() { return "Giá cố định"; }
    }

    static class GiamTheoSoLuong implements ChienLuocGia {
        private double phanTramGiam; // giảm khi mua >= 5
        GiamTheoSoLuong(double pct) { this.phanTramGiam = pct; }

        @Override public double tinhGia(double giagoc, int soLuong) {
            // TODO: nếu soLuong >= 5 thì giảm phanTramGiam%, ngược lại giá gốc
            return giagoc * soLuong;
        }
        @Override public String moTa() { return "Giảm " + phanTramGiam + "% khi mua >= 5"; }
    }

    static class GiaVIP implements ChienLuocGia {
        @Override public double tinhGia(double giagoc, int soLuong) {
            // TODO: giảm 20% luôn luôn
            return giagoc * soLuong;
        }
        @Override public String moTa() { return "Giá VIP (-20%)"; }
    }

    static class DonHang {
        String sanPham; double giagoc; int soLuong;
        ChienLuocGia chienLuoc;

        DonHang(String sp, double gia, int sl, ChienLuocGia cl) {
            sanPham = sp; giagoc = gia; soLuong = sl; chienLuoc = cl;
        }

        void inHoaDon() {
            double thanhToan = chienLuoc.tinhGia(giagoc, soLuong);
            System.out.printf("%-15s x%d | Chiến lược: %-30s | Thanh toán: %,.0f VND%n",
                sanPham, soLuong, chienLuoc.moTa(), thanhToan);
        }
    }

    public static void main(String[] args) {
        ChienLuocGia[] strategies = {
            new GiaCoDinh(),
            new GiamTheoSoLuong(10),
            new GiaVIP()
        };

        System.out.println("=== BÁO GIÁ SẢN PHẨM ===");
        for (ChienLuocGia cl : strategies) {
            new DonHang("Laptop", 15_000_000, 3, cl).inHoaDon();
        }
        System.out.println();
        for (ChienLuocGia cl : strategies) {
            new DonHang("Mouse", 500_000, 10, cl).inHoaDon();
        }
    }
}`,
        solution: `public class Main {
    interface ChienLuocGia {
        double tinhGia(double giagoc, int soLuong);
        String moTa();
    }

    static class GiaCoDinh implements ChienLuocGia {
        @Override public double tinhGia(double g, int sl) { return g * sl; }
        @Override public String moTa() { return "Giá cố định"; }
    }

    static class GiamTheoSoLuong implements ChienLuocGia {
        private double pct;
        GiamTheoSoLuong(double pct) { this.pct = pct; }
        @Override public double tinhGia(double g, int sl) {
            double tong = g * sl;
            return sl >= 5 ? tong * (1 - pct / 100) : tong;
        }
        @Override public String moTa() { return "Giảm " + pct + "% khi mua >= 5"; }
    }

    static class GiaVIP implements ChienLuocGia {
        @Override public double tinhGia(double g, int sl) { return g * sl * 0.8; }
        @Override public String moTa() { return "Giá VIP (-20%)"; }
    }

    static class DonHang {
        String sanPham; double giagoc; int soLuong; ChienLuocGia chienLuoc;
        DonHang(String sp, double gia, int sl, ChienLuocGia cl) {
            sanPham = sp; giagoc = gia; soLuong = sl; chienLuoc = cl;
        }
        void inHoaDon() {
            double tt = chienLuoc.tinhGia(giagoc, soLuong);
            System.out.printf("%-15s x%d | %-30s | %,.0f VND%n",
                sanPham, soLuong, chienLuoc.moTa(), tt);
        }
    }

    public static void main(String[] args) {
        ChienLuocGia[] strategies = { new GiaCoDinh(), new GiamTheoSoLuong(10), new GiaVIP() };
        System.out.println("=== BÁO GIÁ SẢN PHẨM ===");
        for (ChienLuocGia cl : strategies) new DonHang("Laptop", 15_000_000, 3, cl).inHoaDon();
        System.out.println();
        for (ChienLuocGia cl : strategies) new DonHang("Mouse", 500_000, 10, cl).inHoaDon();
    }
}`,
        hint: "Strategy interface có 1 method tinhGia(). Mỗi class implement logic khác nhau. DonHang nhận interface — không biết implementation cụ thể.",
      },
      {
        title: "Bài tập 4: Observer Pattern — Hệ thống thông báo",
        description: "Observer pattern dùng trong event-driven systems. Implement `QuanSat` interface, `ChuDe` (Subject) class quản lý observers. Áp dụng cho hệ thống theo dõi giá chứng khoán.",
        starterCode: `import java.util.*;

public class Main {

    interface QuanSat {
        void capNhat(String maCK, double giaMoi, double giaGoc);
    }

    static class CoPieu {
        private String maCK;
        private double gia;
        private List<QuanSat> dsQuanSat = new ArrayList<>();

        CoPieu(String maCK, double giaBanDau) {
            this.maCK = maCK; this.gia = giaBanDau;
        }

        void dangKy(QuanSat qs) { dsQuanSat.add(qs); }
        void huyDangKy(QuanSat qs) { dsQuanSat.remove(qs); }

        void capNhatGia(double giaMoi) {
            double giaGoc = this.gia;
            this.gia = giaMoi;
            // TODO: thông báo tất cả observers
        }
        double getGia() { return gia; }
        String getMaCK() { return maCK; }
    }

    // Observer 1: Logger
    static class GhiLog implements QuanSat {
        @Override public void capNhat(String ma, double giaMoi, double giaGoc) {
            double phanTram = (giaMoi - giaGoc) / giaGoc * 100;
            System.out.printf("[LOG] %s: %.0f → %.0f (%+.2f%%)%n", ma, giaGoc, giaMoi, phanTram);
        }
    }

    // Observer 2: Alert khi thay đổi > ngưỡng
    static class CanhBao implements QuanSat {
        private double nguong; // phần trăm
        CanhBao(double nguong) { this.nguong = nguong; }

        @Override public void capNhat(String ma, double giaMoi, double giaGoc) {
            double phanTram = Math.abs((giaMoi - giaGoc) / giaGoc * 100);
            // TODO: chỉ cảnh báo nếu thay đổi >= nguong
        }
    }

    public static void main(String[] args) {
        CoPieu vcb = new CoPieu("VCB", 85_000);
        vcb.dangKy(new GhiLog());
        vcb.dangKy(new CanhBao(3));

        vcb.capNhatGia(86_500);  // +1.76% - không cảnh báo
        vcb.capNhatGia(90_000);  // +4.05% - cảnh báo!
        vcb.capNhatGia(87_000);  // -3.33% - cảnh báo!
    }
}`,
        solution: `import java.util.*;

public class Main {
    interface QuanSat {
        void capNhat(String maCK, double giaMoi, double giaGoc);
    }

    static class CoPieu {
        private String maCK; private double gia;
        private List<QuanSat> dsQuanSat = new ArrayList<>();

        CoPieu(String maCK, double giaBanDau) { this.maCK = maCK; this.gia = giaBanDau; }

        void dangKy(QuanSat qs) { dsQuanSat.add(qs); }
        void huyDangKy(QuanSat qs) { dsQuanSat.remove(qs); }

        void capNhatGia(double giaMoi) {
            double giaGoc = this.gia;
            this.gia = giaMoi;
            for (QuanSat qs : dsQuanSat) qs.capNhat(maCK, giaMoi, giaGoc);
        }
        double getGia() { return gia; }
        String getMaCK() { return maCK; }
    }

    static class GhiLog implements QuanSat {
        @Override public void capNhat(String ma, double giaMoi, double giaGoc) {
            double pct = (giaMoi - giaGoc) / giaGoc * 100;
            System.out.printf("[LOG] %s: %.0f → %.0f (%+.2f%%)%n", ma, giaGoc, giaMoi, pct);
        }
    }

    static class CanhBao implements QuanSat {
        private double nguong;
        CanhBao(double nguong) { this.nguong = nguong; }
        @Override public void capNhat(String ma, double giaMoi, double giaGoc) {
            double pct = Math.abs((giaMoi - giaGoc) / giaGoc * 100);
            if (pct >= nguong)
                System.out.printf("[CẢNH BÁO] %s thay đổi %.2f%% (ngưỡng %.0f%%)!%n", ma, pct, nguong);
        }
    }

    public static void main(String[] args) {
        CoPieu vcb = new CoPieu("VCB", 85_000);
        vcb.dangKy(new GhiLog());
        vcb.dangKy(new CanhBao(3));

        vcb.capNhatGia(86_500);
        vcb.capNhatGia(90_000);
        vcb.capNhatGia(87_000);
    }
}`,
        hint: "capNhatGia() lưu giaGoc, gán gia mới, rồi loop dsQuanSat gọi qs.capNhat(). CanhBao chỉ thông báo khi |thay đổi%| >= nguong.",
      },
      {
        title: "Bài tập 5: Abstract Template Method Pattern",
        description: "Template Method định nghĩa bộ khung thuật toán, để subclass điền chi tiết. Tạo abstract `BaoCaoTemplate` với doCreateReport() cố định, nhưng getData(), processData(), formatOutput() là abstract.",
        starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {

    abstract static class BaoCaoTemplate {
        // Template method - không override
        final String taoBoaCao() {
            List<String> data = layDuLieu();
            List<String> processed = xuLyDuLieu(data);
            return dinh_dang(processed);
        }

        abstract List<String> layDuLieu();
        abstract List<String> xuLyDuLieu(List<String> data);
        abstract String dinh_dang(List<String> data);
    }

    static class BaoCaoDoanhThu extends BaoCaoTemplate {
        @Override List<String> layDuLieu() {
            return Arrays.asList(
                "Laptop:25000000:5", "Phone:8000000:10",
                "Mouse:500000:50",   "Keyboard:350000:30"
            );
        }
        @Override List<String> xuLyDuLieu(List<String> data) {
            // TODO: parse "ten:gia:sl", tính doanh thu, sắp xếp giảm dần
            // Trả về list string "ten: X VND"
            return data;
        }
        @Override String dinh_dang(List<String> data) {
            StringBuilder sb = new StringBuilder("=== BÁO CÁO DOANH THU ===\\n");
            data.forEach(s -> sb.append("  ").append(s).append("\\n"));
            return sb.toString();
        }
    }

    static class BaoCaoTonKho extends BaoCaoTemplate {
        @Override List<String> layDuLieu() {
            return Arrays.asList("Laptop:5", "Phone:2", "Mouse:50", "Keyboard:0", "Monitor:8");
        }
        @Override List<String> xuLyDuLieu(List<String> data) {
            // TODO: parse "ten:soLuong", đánh dấu HẾT HÀNG nếu sl=0, THẤP nếu sl<5
            return data;
        }
        @Override String dinh_dang(List<String> data) {
            StringBuilder sb = new StringBuilder("=== BÁO CÁO TỒN KHO ===\\n");
            data.forEach(s -> sb.append("  ").append(s).append("\\n"));
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        System.out.println(new BaoCaoDoanhThu().taoBoaCao());
        System.out.println(new BaoCaoTonKho().taoBoaCao());
    }
}`,
        solution: `import java.util.*;
import java.util.stream.*;

public class Main {
    abstract static class BaoCaoTemplate {
        final String taoBoaCao() {
            List<String> data = layDuLieu();
            List<String> processed = xuLyDuLieu(data);
            return dinh_dang(processed);
        }
        abstract List<String> layDuLieu();
        abstract List<String> xuLyDuLieu(List<String> data);
        abstract String dinh_dang(List<String> data);
    }

    static class BaoCaoDoanhThu extends BaoCaoTemplate {
        @Override List<String> layDuLieu() {
            return Arrays.asList("Laptop:25000000:5","Phone:8000000:10","Mouse:500000:50","Keyboard:350000:30");
        }
        @Override List<String> xuLyDuLieu(List<String> data) {
            return data.stream().map(s -> {
                String[] p = s.split(":");
                long dt = Long.parseLong(p[1]) * Integer.parseInt(p[2]);
                return p[0] + ": " + String.format("%,d", dt) + " VND";
            })
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
        }
        @Override String dinh_dang(List<String> data) {
            StringBuilder sb = new StringBuilder("=== BÁO CÁO DOANH THU ===\\n");
            data.forEach(s -> sb.append("  ").append(s).append("\\n"));
            return sb.toString();
        }
    }

    static class BaoCaoTonKho extends BaoCaoTemplate {
        @Override List<String> layDuLieu() {
            return Arrays.asList("Laptop:5","Phone:2","Mouse:50","Keyboard:0","Monitor:8");
        }
        @Override List<String> xuLyDuLieu(List<String> data) {
            return data.stream().map(s -> {
                String[] p = s.split(":");
                int sl = Integer.parseInt(p[1]);
                String trang = sl == 0 ? "[HẾT HÀNG]" : sl < 5 ? "[THẤP]" : "";
                return p[0] + " (còn " + sl + ") " + trang;
            }).collect(Collectors.toList());
        }
        @Override String dinh_dang(List<String> data) {
            StringBuilder sb = new StringBuilder("=== BÁO CÁO TỒN KHO ===\\n");
            data.forEach(s -> sb.append("  ").append(s).append("\\n"));
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        System.out.println(new BaoCaoDoanhThu().taoBoaCao());
        System.out.println(new BaoCaoTonKho().taoBoaCao());
    }
}`,
        hint: "Template method là final — không override. Subclass chỉ implement các bước: layDuLieu, xuLyDuLieu, dinh_dang. parse dùng s.split(':').",
      },
    ],
  },
  {
    id: "06-collections",
    title: "Collections Framework",
    description: "ArrayList, HashMap, HashSet, TreeMap, LinkedList, PriorityQueue",
    level: "Trung cấp",
    content: `
## Java Collections Framework

### List — Thứ tự, cho phép trùng
\`\`\`java
List<String> list = new ArrayList<>();
list.add("A"); list.add("B"); list.add("A"); // [A, B, A]
list.get(0);     // "A"
list.size();     // 3
list.remove(0);  // Xóa index 0
list.contains("B"); // true
Collections.sort(list); // Sắp xếp
\`\`\`

### Map — Key-Value, key không trùng
\`\`\`java
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.get("a");              // 1
map.getOrDefault("b", 0); // 0 (key không tồn tại)
map.containsKey("a");      // true
map.remove("a");

// Duyệt
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + "=" + e.getValue());
}
map.forEach((k, v) -> System.out.println(k + "=" + v));
\`\`\`

### Set — Không trùng lặp
\`\`\`java
Set<Integer> set = new HashSet<>();
set.add(1); set.add(1); // Chỉ có 1 phần tử
set.contains(1); // true
\`\`\`

### Sắp xếp
\`\`\`java
// TreeMap tự động sắp xếp key
Map<String, Integer> sorted = new TreeMap<>(map);

// Sort list theo điều kiện
list.sort(Comparator.comparing(s -> s.length()));
list.sort(Comparator.reverseOrder());
\`\`\`
    `,
    codeExample: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // ArrayList - danh sách sinh viên
        List<String> svList = new ArrayList<>(Arrays.asList("An","Binh","Ca","Dung","An","Binh"));
        Collections.sort(svList);
        System.out.println("Đã sort: " + svList);

        // LinkedHashSet - loại trùng, giữ thứ tự
        Set<String> unique = new LinkedHashSet<>(svList);
        System.out.println("Không trùng: " + unique);

        // HashMap - điểm số
        Map<String, Double> diemMap = new HashMap<>();
        diemMap.put("An", 8.5); diemMap.put("Binh", 7.2); diemMap.put("Ca", 9.0);

        // TreeMap - sắp xếp theo key (tên)
        Map<String, Double> sortedByName = new TreeMap<>(diemMap);
        System.out.println("Theo tên: " + sortedByName);

        // Sort theo value (điểm) giảm dần
        diemMap.entrySet().stream()
            .sorted(Map.Entry.<String,Double>comparingByValue().reversed())
            .forEach(e -> System.out.printf("  %s: %.1f%n", e.getKey(), e.getValue()));

        // PriorityQueue - hàng đợi ưu tiên (min-heap)
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        int[] arr = {5, 2, 8, 1, 9, 3};
        for (int x : arr) pq.offer(x);
        System.out.print("Top-3 nhỏ nhất: ");
        for (int i = 0; i < 3; i++) System.out.print(pq.poll() + " ");
        System.out.println();
    }
}`,
    exercises: [
      {
        title: "Bài tập 1: Đếm tần suất từ",
        description: "Cho đoạn văn, đếm tần suất mỗi từ (không phân biệt hoa/thường). In ra top 5 từ xuất hiện nhiều nhất cùng số lần.",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String text = "to be or not to be that is the question to be is to do do be do";

        // TODO: Tách thành mảng từ (split theo khoảng trắng)
        String[] words = {};

        // TODO: Dùng HashMap để đếm tần suất
        Map<String, Integer> freq = new HashMap<>();

        // TODO: Sắp xếp theo tần suất giảm dần và in top 5
        System.out.println("Top 5 từ xuất hiện nhiều nhất:");
    }
}`,
        solution: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        String text = "to be or not to be that is the question to be is to do do be do";
        String[] words = text.toLowerCase().split("\\\\s+");

        Map<String, Integer> freq = new HashMap<>();
        for (String w : words)
            freq.put(w, freq.getOrDefault(w, 0) + 1);

        System.out.println("Top 5 từ xuất hiện nhiều nhất:");
        freq.entrySet().stream()
            .sorted(Map.Entry.<String,Integer>comparingByValue().reversed())
            .limit(5)
            .forEach(e -> System.out.printf("  '%-10s: %d lần%n", e.getKey() + "'", e.getValue()));
    }
}`,
        hint: "freq.put(w, freq.getOrDefault(w, 0) + 1) để đếm. Sort với Map.Entry.comparingByValue().reversed().limit(5).",
      },
      {
        title: "Bài tập 2: Quản lý danh bạ",
        description: "Dùng HashMap<String, List<String>> để lưu danh bạ (tên → danh sách số điện thoại). Implement: thêm, xóa, tìm theo tên, in toàn bộ danh bạ sắp xếp.",
        starterCode: `import java.util.*;

public class Main {

    static Map<String, List<String>> danhBa = new TreeMap<>();

    static void them(String ten, String soDT) {
        // TODO: thêm soDT vào danh sách của ten
        // Tạo list mới nếu ten chưa có trong map
    }

    static void xoa(String ten, String soDT) {
        // TODO: xóa soDT khỏi danh sách của ten
        // Nếu list rỗng, xóa luôn ten khỏi map
    }

    static List<String> tim(String ten) {
        // TODO: trả về list số điện thoại, rỗng nếu không có
        return new ArrayList<>();
    }

    static void inDanhBa() {
        System.out.println("=== DANH BẠ ===");
        // TODO: in ra theo format "Tên: [sdt1, sdt2, ...]"
    }

    public static void main(String[] args) {
        them("An", "0901234567");
        them("An", "0912345678");
        them("Binh", "0923456789");
        them("Hoa", "0934567890");

        inDanhBa();

        xoa("An", "0912345678");
        System.out.println("\\nSau khi xóa:");
        inDanhBa();

        System.out.println("\\nTìm 'Binh': " + tim("Binh"));
        System.out.println("Tìm 'Duc': " + tim("Duc"));
    }
}`,
        solution: `import java.util.*;

public class Main {
    static Map<String, List<String>> danhBa = new TreeMap<>();

    static void them(String ten, String soDT) {
        danhBa.computeIfAbsent(ten, k -> new ArrayList<>()).add(soDT);
    }

    static void xoa(String ten, String soDT) {
        List<String> ds = danhBa.get(ten);
        if (ds != null) {
            ds.remove(soDT);
            if (ds.isEmpty()) danhBa.remove(ten);
        }
    }

    static List<String> tim(String ten) {
        return danhBa.getOrDefault(ten, new ArrayList<>());
    }

    static void inDanhBa() {
        System.out.println("=== DANH BẠ ===");
        danhBa.forEach((ten, ds) -> System.out.println(ten + ": " + ds));
    }

    public static void main(String[] args) {
        them("An", "0901234567");
        them("An", "0912345678");
        them("Binh", "0923456789");
        them("Hoa", "0934567890");
        inDanhBa();
        xoa("An", "0912345678");
        System.out.println("\\nSau khi xóa:");
        inDanhBa();
        System.out.println("\\nTìm 'Binh': " + tim("Binh"));
        System.out.println("Tìm 'Duc': " + tim("Duc"));
    }
}`,
        hint: "computeIfAbsent(key, k -> new ArrayList<>()).add(value) là cách idiomatic để thêm vào multi-map. TreeMap tự sắp xếp theo key.",
      },
      {
        title: "Bài tập 3: Quản lý kho hàng với Collections",
        description: "Hệ thống kho hàng thực tế dùng HashMap lưu tồn kho, TreeMap cho báo cáo sắp xếp, LinkedList cho lịch sử giao dịch. Implement nhập/xuất kho, kiểm kê, và cảnh báo sắp hết hàng.",
        starterCode: `import java.util.*;

public class Main {
    static Map<String, Integer> kho = new HashMap<>();
    static LinkedList<String> lichSu = new LinkedList<>();

    static void nhapKho(String sp, int soLuong) {
        // TODO: cộng thêm soLuong vào kho, ghi vào lichSu
        kho.merge(sp, soLuong, Integer::sum);
        lichSu.addFirst("NHẬP: " + sp + " +" + soLuong + " (còn " + kho.get(sp) + ")");
    }

    static void xuatKho(String sp, int soLuong) throws Exception {
        // TODO: kiểm tra đủ hàng, trừ đi, ghi lịch sử
        // Nếu không đủ hàng: throw new Exception("Không đủ hàng")
        int current = kho.getOrDefault(sp, 0);
        if (current < soLuong) throw new Exception("Không đủ hàng: " + sp + " chỉ còn " + current);
        kho.put(sp, current - soLuong);
        lichSu.addFirst("XUẤT: " + sp + " -" + soLuong + " (còn " + kho.get(sp) + ")");
    }

    static void kiemKe() {
        System.out.println("=== KIỂM KÊ KHO ===");
        // TODO: in theo TreeMap (sắp xếp theo tên), đánh dấu hàng sắp hết (<= 5)
        new TreeMap<>(kho).forEach((sp, sl) -> {
            String canh = sl <= 5 ? " ⚠ SẮP HẾT" : "";
            System.out.printf("  %-15s: %d%s%n", sp, sl, canh);
        });
        System.out.println("Tổng SKU: " + kho.size());
    }

    static void inLichSu(int n) {
        System.out.println("=== " + n + " GIAO DỊCH GẦN NHẤT ===");
        lichSu.stream().limit(n).forEach(s -> System.out.println("  " + s));
    }

    public static void main(String[] args) throws Exception {
        nhapKho("Laptop", 20);
        nhapKho("Mouse", 50);
        nhapKho("Keyboard", 30);
        nhapKho("Monitor", 8);

        xuatKho("Laptop", 17);
        xuatKho("Mouse", 45);
        xuatKho("Monitor", 3);

        kiemKe();
        System.out.println();
        inLichSu(5);

        try {
            xuatKho("Laptop", 10); // không đủ hàng
        } catch (Exception e) {
            System.out.println("Lỗi: " + e.getMessage());
        }
    }
}`,
        solution: `import java.util.*;

public class Main {
    static Map<String, Integer> kho = new HashMap<>();
    static LinkedList<String> lichSu = new LinkedList<>();

    static void nhapKho(String sp, int soLuong) {
        kho.merge(sp, soLuong, Integer::sum);
        lichSu.addFirst("NHẬP: " + sp + " +" + soLuong + " (còn " + kho.get(sp) + ")");
    }

    static void xuatKho(String sp, int soLuong) throws Exception {
        int current = kho.getOrDefault(sp, 0);
        if (current < soLuong) throw new Exception("Không đủ hàng: " + sp + " chỉ còn " + current);
        kho.put(sp, current - soLuong);
        lichSu.addFirst("XUẤT: " + sp + " -" + soLuong + " (còn " + kho.get(sp) + ")");
    }

    static void kiemKe() {
        System.out.println("=== KIỂM KÊ KHO ===");
        new TreeMap<>(kho).forEach((sp, sl) -> {
            String canh = sl <= 5 ? " ⚠ SẮP HẾT" : "";
            System.out.printf("  %-15s: %d%s%n", sp, sl, canh);
        });
        System.out.println("Tổng SKU: " + kho.size());
    }

    static void inLichSu(int n) {
        System.out.println("=== " + n + " GIAO DỊCH GẦN NHẤT ===");
        lichSu.stream().limit(n).forEach(s -> System.out.println("  " + s));
    }

    public static void main(String[] args) throws Exception {
        nhapKho("Laptop", 20); nhapKho("Mouse", 50);
        nhapKho("Keyboard", 30); nhapKho("Monitor", 8);
        xuatKho("Laptop", 17); xuatKho("Mouse", 45); xuatKho("Monitor", 3);
        kiemKe();
        System.out.println();
        inLichSu(5);
        try {
            xuatKho("Laptop", 10);
        } catch (Exception e) {
            System.out.println("Lỗi: " + e.getMessage());
        }
    }
}`,
        hint: "map.merge(key, value, Integer::sum) thêm hoặc cộng. new TreeMap<>(hashMap) tạo sorted map. LinkedList.addFirst() cho lịch sử LIFO.",
      },
      {
        title: "Bài tập 4: Tìm đường đi ngắn nhất — BFS",
        description: "BFS tìm đường ngắn nhất trong đồ thị không trọng số. Dùng Map<String, List<String>> làm adjacency list. Implement `themCanhKhongHuong()` và `timDuongNganNhat(start, end)` trả về danh sách các nút.",
        starterCode: `import java.util.*;

public class Main {
    static Map<String, List<String>> doThi = new HashMap<>();

    static void themCanhKhongHuong(String u, String v) {
        doThi.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        doThi.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }

    static List<String> timDuongNganNhat(String start, String end) {
        if (!doThi.containsKey(start)) return Collections.emptyList();

        // BFS
        Queue<String> queue = new LinkedList<>();
        Map<String, String> parent = new HashMap<>(); // node -> từ đâu đến
        queue.offer(start);
        parent.put(start, null);

        while (!queue.isEmpty()) {
            String node = queue.poll();
            if (node.equals(end)) {
                // TODO: reconstruct path từ parent map
                List<String> path = new LinkedList<>();
                String curr = end;
                while (curr != null) {
                    path.add(0, curr);
                    curr = parent.get(curr);
                }
                return path;
            }
            for (String neighbor : doThi.getOrDefault(node, Collections.emptyList())) {
                if (!parent.containsKey(neighbor)) {
                    parent.put(neighbor, node);
                    queue.offer(neighbor);
                }
            }
        }
        return Collections.emptyList(); // không tìm thấy
    }

    public static void main(String[] args) {
        // Mạng lưới giao thông
        themCanhKhongHuong("HN", "HP");
        themCanhKhongHuong("HN", "TD");
        themCanhKhongHuong("HP", "QB");
        themCanhKhongHuong("TD", "QB");
        themCanhKhongHuong("QB", "DA");
        themCanhKhongHuong("DA", "HCM");
        themCanhKhongHuong("QB", "HCM");

        String[][] queries = {{"HN", "HCM"}, {"HP", "DA"}, {"HN", "DA"}};
        for (String[] q : queries) {
            List<String> path = timDuongNganNhat(q[0], q[1]);
            System.out.println(q[0] + " → " + q[1] + ": " + path + " (" + (path.size()-1) + " bước)");
        }
    }
}`,
        solution: `import java.util.*;

public class Main {
    static Map<String, List<String>> doThi = new HashMap<>();

    static void themCanhKhongHuong(String u, String v) {
        doThi.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        doThi.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }

    static List<String> timDuongNganNhat(String start, String end) {
        if (!doThi.containsKey(start)) return Collections.emptyList();
        Queue<String> queue = new LinkedList<>();
        Map<String, String> parent = new HashMap<>();
        queue.offer(start);
        parent.put(start, null);

        while (!queue.isEmpty()) {
            String node = queue.poll();
            if (node.equals(end)) {
                LinkedList<String> path = new LinkedList<>();
                String curr = end;
                while (curr != null) { path.addFirst(curr); curr = parent.get(curr); }
                return path;
            }
            for (String nb : doThi.getOrDefault(node, Collections.emptyList())) {
                if (!parent.containsKey(nb)) { parent.put(nb, node); queue.offer(nb); }
            }
        }
        return Collections.emptyList();
    }

    public static void main(String[] args) {
        themCanhKhongHuong("HN","HP"); themCanhKhongHuong("HN","TD");
        themCanhKhongHuong("HP","QB"); themCanhKhongHuong("TD","QB");
        themCanhKhongHuong("QB","DA"); themCanhKhongHuong("DA","HCM");
        themCanhKhongHuong("QB","HCM");

        String[][] queries = {{"HN","HCM"},{"HP","DA"},{"HN","DA"}};
        for (String[] q : queries) {
            List<String> path = timDuongNganNhat(q[0], q[1]);
            System.out.println(q[0]+" → "+q[1]+": "+path+" ("+(path.size()-1)+" bước)");
        }
    }
}`,
        hint: "BFS dùng Queue. parent Map lưu từ đâu đến mỗi nút. Khi tìm thấy end, trace ngược qua parent map để tạo path.",
      },
      {
        title: "Bài tập 5: LRU Cache với LinkedHashMap",
        description: "LRU (Least Recently Used) Cache là interview question phổ biến. LinkedHashMap với accessOrder=true hỗ trợ LRU tự nhiên. Implement `LRUCache<K,V>` với get() và put(). Dùng để cache kết quả database query.",
        starterCode: `import java.util.*;

public class Main {

    static class LRUCache<K, V> extends LinkedHashMap<K, V> {
        private final int capacity;

        LRUCache(int capacity) {
            // TODO: gọi super với initialCapacity, loadFactor, accessOrder=true
            super(capacity, 0.75f, true);
            this.capacity = capacity;
        }

        @Override
        protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
            // TODO: trả về true khi size > capacity (tự động xóa cũ nhất)
            return false;
        }

        V getOrFetch(K key, java.util.function.Function<K, V> fetchFn) {
            // TODO: get từ cache, nếu không có thì fetch và put vào cache
            return get(key);
        }
    }

    // Giả lập database query (tốn kém)
    static int queryCount = 0;
    static String fetchFromDB(int userId) {
        queryCount++;
        System.out.println("  [DB query #" + queryCount + "] user " + userId);
        return "User_" + userId + "_data";
    }

    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(3);

        System.out.println("=== LRU CACHE (capacity=3) ===");
        // Truy cập 5 users
        for (int id : new int[]{1, 2, 3, 1, 4, 2, 5, 1}) {
            String data = cache.getOrFetch(id, LRUCache::fetchFromDB);
            System.out.println("  Cache: " + cache.keySet() + " | User " + id + " = " + data);
        }
        System.out.println("Tổng DB queries: " + queryCount + " (thay vì 8)");
    }
}`,
        solution: `import java.util.*;

public class Main {
    static class LRUCache<K, V> extends LinkedHashMap<K, V> {
        private final int capacity;

        LRUCache(int capacity) {
            super(capacity, 0.75f, true);
            this.capacity = capacity;
        }

        @Override
        protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
            return size() > capacity;
        }

        V getOrFetch(K key, java.util.function.Function<K, V> fetchFn) {
            return computeIfAbsent(key, fetchFn);
        }
    }

    static int queryCount = 0;
    static String fetchFromDB(int userId) {
        queryCount++;
        System.out.println("  [DB query #" + queryCount + "] user " + userId);
        return "User_" + userId + "_data";
    }

    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(3);
        System.out.println("=== LRU CACHE (capacity=3) ===");
        for (int id : new int[]{1, 2, 3, 1, 4, 2, 5, 1}) {
            String data = cache.getOrFetch(id, LRUCache::fetchFromDB);
            System.out.println("  Cache: " + cache.keySet() + " | User " + id + " = " + data);
        }
        System.out.println("Tổng DB queries: " + queryCount + " (thay vì 8)");
    }
}`,
        hint: "LinkedHashMap(cap, 0.75f, true) với accessOrder=true. removeEldestEntry trả về size() > capacity. computeIfAbsent(key, fn) tự fetch nếu chưa có.",
      },
    ],
  },
  {
    id: "07-stream-lambda",
    title: "Stream API và Lambda",
    description: "Functional programming: lambda, stream pipeline, collectors, optional",
    level: "Nâng cao",
    content: `
## Lambda Expression

\`\`\`java
// Functional interface - chỉ 1 abstract method
@FunctionalInterface
interface Bien_Doi<T, R> { R ap_dung(T t); }

// Lambda syntax
Bien_Doi<String, Integer> doiDai = s -> s.length();
Runnable chay = () -> System.out.println("Chạy!");
Comparator<String> so_sanh = (a, b) -> a.compareTo(b);

// Method reference
list.forEach(System.out::println);  // instance method
list.stream().map(String::length);  // instance method
list.stream().map(Integer::parseInt); // static method
\`\`\`

## Stream Pipeline

\`\`\`java
// Nguồn → Intermediate operations → Terminal
list.stream()           // Nguồn
    .filter(x -> x > 0) // Lọc - lazy
    .map(x -> x * 2)    // Biến đổi - lazy
    .sorted()           // Sắp xếp - lazy
    .limit(5)           // Giới hạn - lazy
    .collect(Collectors.toList()); // Thu thập - terminal
\`\`\`

### Collectors phổ biến
\`\`\`java
.collect(Collectors.toList())
.collect(Collectors.toSet())
.collect(Collectors.joining(", "))
.collect(Collectors.groupingBy(SinhVien::getKhoa))
.collect(Collectors.counting())
.collect(Collectors.summingInt(SinhVien::getTuoi))
.collect(Collectors.averagingDouble(SinhVien::getGpa))
\`\`\`

## Optional
\`\`\`java
Optional<String> opt = Optional.ofNullable(ten);
opt.isPresent()              // Kiểm tra có giá trị không
opt.get()                    // Lấy giá trị (throw nếu rỗng)
opt.orElse("Mặc định")      // Lấy hoặc mặc định
opt.orElseGet(() -> ...)    // Lấy hoặc tính toán lazy
opt.map(String::toUpperCase) // Biến đổi nếu có
opt.ifPresent(System.out::println) // Thực hiện nếu có
\`\`\`
    `,
    codeExample: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class Main {

    record SinhVien(String ten, String khoa, double gpa, int tuoi) {}

    public static void main(String[] args) {
        List<SinhVien> ds = List.of(
            new SinhVien("An", "CNTT", 3.8, 21),
            new SinhVien("Binh", "Toan", 3.2, 22),
            new SinhVien("Ca", "CNTT", 3.9, 20),
            new SinhVien("Dung", "Ly", 2.8, 23),
            new SinhVien("Em", "CNTT", 3.5, 21),
            new SinhVien("Phong", "Toan", 3.7, 22)
        );

        // Filter + Sort + Map
        System.out.println("SV CNTT GPA≥3.5 (giảm dần):");
        ds.stream()
            .filter(sv -> sv.khoa().equals("CNTT") && sv.gpa() >= 3.5)
            .sorted(Comparator.comparingDouble(SinhVien::gpa).reversed())
            .map(sv -> String.format("  %s: %.1f", sv.ten(), sv.gpa()))
            .forEach(System.out::println);

        // Group by khoa, đếm số SV
        System.out.println("\\nSố SV theo khoa:");
        ds.stream()
            .collect(Collectors.groupingBy(SinhVien::khoa, Collectors.counting()))
            .forEach((k, v) -> System.out.println("  " + k + ": " + v));

        // GPA trung bình theo khoa
        System.out.println("\\nGPA TB theo khoa:");
        ds.stream()
            .collect(Collectors.groupingBy(SinhVien::khoa, Collectors.averagingDouble(SinhVien::gpa)))
            .entrySet().stream()
            .sorted(Map.Entry.<String,Double>comparingByValue().reversed())
            .forEach(e -> System.out.printf("  %s: %.2f%n", e.getKey(), e.getValue()));

        // Optional - top SV
        ds.stream()
            .max(Comparator.comparingDouble(SinhVien::gpa))
            .ifPresent(sv -> System.out.println("\\nTop SV: " + sv.ten() + " (" + sv.gpa() + ")"));
    }
}`,
    exercises: [
      {
        title: "Bài tập 1: Phân tích đơn hàng",
        description: "Dùng Stream API: tính tổng doanh thu, tìm sản phẩm bán chạy nhất, nhóm doanh thu theo danh mục, in top 3 đơn hàng lớn nhất.",
        starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {

    record DonHang(String sp, String danhMuc, int soLuong, double donGia) {
        double doanhThu() { return soLuong * donGia; }
    }

    public static void main(String[] args) {
        List<DonHang> orders = List.of(
            new DonHang("Laptop", "Dien tu", 5, 15_000_000),
            new DonHang("DienThoai", "Dien tu", 10, 8_000_000),
            new DonHang("BanPhim", "Phu kien", 20, 500_000),
            new DonHang("Chuot", "Phu kien", 15, 300_000),
            new DonHang("ManHinh", "Dien tu", 8, 5_000_000),
            new DonHang("TaiNghe", "Phu kien", 25, 800_000)
        );

        // TODO 1: Tổng doanh thu tất cả
        double tongDT = 0;
        System.out.printf("Tổng doanh thu: %,.0f VND%n", tongDT);

        // TODO 2: Sản phẩm bán chạy nhất (số lượng cao nhất)

        // TODO 3: Doanh thu theo danh mục

        // TODO 4: Top 3 đơn hàng theo doanh thu
    }
}`,
        solution: `import java.util.*;
import java.util.stream.*;

public class Main {
    record DonHang(String sp, String danhMuc, int soLuong, double donGia) {
        double doanhThu() { return soLuong * donGia; }
    }

    public static void main(String[] args) {
        List<DonHang> orders = List.of(
            new DonHang("Laptop", "Dien tu", 5, 15_000_000),
            new DonHang("DienThoai", "Dien tu", 10, 8_000_000),
            new DonHang("BanPhim", "Phu kien", 20, 500_000),
            new DonHang("Chuot", "Phu kien", 15, 300_000),
            new DonHang("ManHinh", "Dien tu", 8, 5_000_000),
            new DonHang("TaiNghe", "Phu kien", 25, 800_000)
        );

        double tongDT = orders.stream().mapToDouble(DonHang::doanhThu).sum();
        System.out.printf("Tổng doanh thu: %,.0f VND%n", tongDT);

        orders.stream().max(Comparator.comparingInt(DonHang::soLuong))
            .ifPresent(o -> System.out.println("Bán chạy nhất: " + o.sp() + " (" + o.soLuong() + ")"));

        System.out.println("Doanh thu theo danh mục:");
        orders.stream()
            .collect(Collectors.groupingBy(DonHang::danhMuc, Collectors.summingDouble(DonHang::doanhThu)))
            .forEach((k, v) -> System.out.printf("  %s: %,.0f VND%n", k, v));

        System.out.println("Top 3 đơn hàng:");
        orders.stream()
            .sorted(Comparator.comparingDouble(DonHang::doanhThu).reversed())
            .limit(3)
            .forEach(o -> System.out.printf("  %s: %,.0f VND%n", o.sp(), o.doanhThu()));
    }
}`,
        hint: "mapToDouble().sum() cho tổng. groupingBy + summingDouble cho nhóm. sorted().limit(3) cho top 3.",
      },
      {
        title: "Bài tập 2: Custom Collector và FlatMap",
        description: "Dùng flatMap để xử lý List<List<Integer>>. Dùng Collectors.joining() để nối chuỗi. Tạo Map<String, String> từ stream dùng Collectors.toMap().",
        starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // 1. flatMap - làm phẳng list of lists
        List<List<Integer>> nested = Arrays.asList(
            Arrays.asList(1, 2, 3),
            Arrays.asList(4, 5),
            Arrays.asList(6, 7, 8, 9)
        );
        // TODO: flat list, lọc chẵn, bình phương, sắp xếp giảm dần
        List<Integer> result1 = new ArrayList<>();
        System.out.println("flatMap kết quả: " + result1);

        // 2. joining - nối tên sinh viên
        List<String> names = Arrays.asList("Nguyen An", "Tran Binh", "Le Hoa", "Pham Duc");
        // TODO: format "SV1, SV2, ... và SVN"
        String joined = "";
        System.out.println("Joined: " + joined);

        // 3. toMap - từ cặp key=value strings
        List<String> kvPairs = Arrays.asList("ten=Nguyen An", "tuoi=20", "gpa=3.8", "khoa=CNTT");
        // TODO: chuyển thành Map<String, String>
        Map<String, String> kvMap = new HashMap<>();
        System.out.println("Map: " + kvMap);
    }
}`,
        solution: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<List<Integer>> nested = Arrays.asList(
            Arrays.asList(1, 2, 3), Arrays.asList(4, 5), Arrays.asList(6, 7, 8, 9)
        );
        List<Integer> result1 = nested.stream()
            .flatMap(Collection::stream)
            .filter(x -> x % 2 == 0)
            .map(x -> x * x)
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
        System.out.println("flatMap kết quả: " + result1);

        List<String> names = Arrays.asList("Nguyen An", "Tran Binh", "Le Hoa", "Pham Duc");
        int n = names.size();
        String joined = names.stream().limit(n - 1).collect(Collectors.joining(", "))
            + " và " + names.get(n - 1);
        System.out.println("Joined: " + joined);

        List<String> kvPairs = Arrays.asList("ten=Nguyen An", "tuoi=20", "gpa=3.8", "khoa=CNTT");
        Map<String, String> kvMap = kvPairs.stream()
            .map(s -> s.split("=", 2))
            .collect(Collectors.toMap(a -> a[0], a -> a[1]));
        System.out.println("Map: " + kvMap);
    }
}`,
        hint: "flatMap(Collection::stream) làm phẳng. Collectors.toMap(a -> a[0], a -> a[1]) sau khi split('=', 2).",
      },
      {
        title: "Bài tập 3: Phân tích Log File",
        description: "Xử lý log là tác vụ DevOps thực tế. Parse danh sách log entries, nhóm theo level (INFO/WARN/ERROR), đếm, lọc errors trong 1 giờ qua, tìm message xuất hiện nhiều nhất.",
        starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {

    record LogEntry(String timestamp, String level, String service, String message) {
        static LogEntry parse(String line) {
            // Format: "2024-01-15 10:30:15 [ERROR] auth-service: Login failed for user admin"
            String[] parts = line.split(" ", 4);
            String ts = parts[0] + " " + parts[1];
            String lvl = parts[2].replace("[","").replace("]","");
            String[] rest = parts[3].split(": ", 2);
            return new LogEntry(ts, lvl, rest[0], rest.length > 1 ? rest[1] : "");
        }
    }

    public static void main(String[] args) {
        List<String> rawLogs = Arrays.asList(
            "2024-01-15 10:30:15 [INFO] auth-service: User logged in",
            "2024-01-15 10:31:00 [ERROR] auth-service: Login failed for user admin",
            "2024-01-15 10:31:30 [WARN] db-service: Slow query detected (2500ms)",
            "2024-01-15 10:32:00 [ERROR] payment-service: Payment gateway timeout",
            "2024-01-15 10:32:45 [INFO] api-gateway: Request processed",
            "2024-01-15 10:33:00 [ERROR] auth-service: Login failed for user admin",
            "2024-01-15 10:33:30 [WARN] db-service: Slow query detected (3100ms)",
            "2024-01-15 10:34:00 [ERROR] auth-service: Invalid token",
            "2024-01-15 10:34:30 [INFO] email-service: Email sent successfully"
        );

        List<LogEntry> logs = rawLogs.stream()
            .map(LogEntry::parse)
            .collect(Collectors.toList());

        // TODO 1: Đếm theo level
        System.out.println("=== Thống kê theo Level ===");
        // logs.stream().collect(groupingBy level, counting)...

        // TODO 2: In tất cả ERROR
        System.out.println("\\n=== Danh sách ERROR ===");

        // TODO 3: Nhóm theo service, đếm errors
        System.out.println("\\n=== Errors theo Service ===");

        // TODO 4: Message xuất hiện nhiều nhất
        System.out.println("\\n=== Message phổ biến nhất ===");
    }
}`,
        solution: `import java.util.*;
import java.util.stream.*;

public class Main {
    record LogEntry(String timestamp, String level, String service, String message) {
        static LogEntry parse(String line) {
            String[] parts = line.split(" ", 4);
            String ts = parts[0] + " " + parts[1];
            String lvl = parts[2].replace("[","").replace("]","");
            String[] rest = parts[3].split(": ", 2);
            return new LogEntry(ts, lvl, rest[0], rest.length > 1 ? rest[1] : "");
        }
    }

    public static void main(String[] args) {
        List<String> rawLogs = Arrays.asList(
            "2024-01-15 10:30:15 [INFO] auth-service: User logged in",
            "2024-01-15 10:31:00 [ERROR] auth-service: Login failed for user admin",
            "2024-01-15 10:31:30 [WARN] db-service: Slow query detected (2500ms)",
            "2024-01-15 10:32:00 [ERROR] payment-service: Payment gateway timeout",
            "2024-01-15 10:32:45 [INFO] api-gateway: Request processed",
            "2024-01-15 10:33:00 [ERROR] auth-service: Login failed for user admin",
            "2024-01-15 10:33:30 [WARN] db-service: Slow query detected (3100ms)",
            "2024-01-15 10:34:00 [ERROR] auth-service: Invalid token",
            "2024-01-15 10:34:30 [INFO] email-service: Email sent successfully"
        );

        List<LogEntry> logs = rawLogs.stream().map(LogEntry::parse).collect(Collectors.toList());

        System.out.println("=== Thống kê theo Level ===");
        logs.stream()
            .collect(Collectors.groupingBy(LogEntry::level, Collectors.counting()))
            .entrySet().stream()
            .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
            .forEach(e -> System.out.printf("  %-6s: %d%n", e.getKey(), e.getValue()));

        System.out.println("\\n=== Danh sách ERROR ===");
        logs.stream()
            .filter(l -> l.level().equals("ERROR"))
            .forEach(l -> System.out.printf("  [%s] %s: %s%n", l.timestamp(), l.service(), l.message()));

        System.out.println("\\n=== Errors theo Service ===");
        logs.stream()
            .filter(l -> l.level().equals("ERROR"))
            .collect(Collectors.groupingBy(LogEntry::service, Collectors.counting()))
            .forEach((s, c) -> System.out.println("  " + s + ": " + c + " errors"));

        System.out.println("\\n=== Message phổ biến nhất ===");
        logs.stream()
            .collect(Collectors.groupingBy(LogEntry::message, Collectors.counting()))
            .entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .ifPresent(e -> System.out.println("  \"" + e.getKey() + "\" (" + e.getValue() + " lần)"));
    }
}`,
        hint: "groupingBy(LogEntry::level, counting()) đếm theo level. filter(l -> l.level().equals(\"ERROR\")) lọc errors. max(comparingByValue()) tìm phổ biến nhất.",
      },
      {
        title: "Bài tập 4: Functional Composition với Function<T,R>",
        description: "Java 8 Function interface hỗ trợ andThen() và compose(). Tạo pipeline xử lý dữ liệu người dùng: validate → normalize → enrich → format. Dùng Function.identity(), andThen() chain.",
        starterCode: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class Main {

    record User(String name, String email, String phone, int age) {}

    public static void main(String[] args) {
        // Định nghĩa các transformation functions
        Function<String, String> trim = String::trim;
        Function<String, String> lower = String::toLowerCase;
        Function<String, String> normalize = trim.andThen(lower);

        // TODO: tạo function xử lý tên (trim + capitalize first letter)
        Function<String, String> normalizeName = trim.andThen(s ->
            s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1).toLowerCase()
        );

        // TODO: tạo pipeline validator - trả về Optional<User> nếu hợp lệ
        Function<User, Optional<User>> validate = user -> {
            if (user.name().isBlank() || user.email().isBlank()) return Optional.empty();
            if (!user.email().contains("@")) return Optional.empty();
            if (user.age() < 18 || user.age() > 120) return Optional.empty();
            return Optional.of(user);
        };

        // TODO: normalize user fields
        Function<User, User> normalizeUser = user -> new User(
            normalizeName.apply(user.name()),
            normalize.apply(user.email()),
            user.phone(),
            user.age()
        );

        // Format để in
        Function<User, String> format = user ->
            String.format("%-20s | %-25s | %s | %d tuổi", user.name(), user.email(), user.phone(), user.age());

        List<User> rawUsers = Arrays.asList(
            new User("  nguyen AN ", "NGUYEN@EXAMPLE.COM", "0901234567", 25),
            new User("Tran Binh", "binh@test.com", "0912345678", 30),
            new User("", "no-email", "0923456789", 15),
            new User("Le Hoa  ", "HOA@COMPANY.VN", "0934567890", 22)
        );

        System.out.println("=== KẾT QUẢ XỬ LÝ ===");
        rawUsers.stream()
            .map(normalizeUser)
            .map(validate)
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(format)
            .forEach(System.out::println);
    }
}`,
        solution: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class Main {
    record User(String name, String email, String phone, int age) {}

    public static void main(String[] args) {
        Function<String, String> trim = String::trim;
        Function<String, String> lower = String::toLowerCase;
        Function<String, String> normalize = trim.andThen(lower);

        Function<String, String> normalizeName = trim.andThen(s ->
            s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1).toLowerCase()
        );

        Function<User, Optional<User>> validate = user -> {
            if (user.name().isBlank() || user.email().isBlank()) return Optional.empty();
            if (!user.email().contains("@")) return Optional.empty();
            if (user.age() < 18 || user.age() > 120) return Optional.empty();
            return Optional.of(user);
        };

        Function<User, User> normalizeUser = user -> new User(
            normalizeName.apply(user.name()),
            normalize.apply(user.email()),
            user.phone(),
            user.age()
        );

        Function<User, String> format = user ->
            String.format("%-20s | %-25s | %s | %d tuổi", user.name(), user.email(), user.phone(), user.age());

        List<User> rawUsers = Arrays.asList(
            new User("  nguyen AN ", "NGUYEN@EXAMPLE.COM", "0901234567", 25),
            new User("Tran Binh", "binh@test.com", "0912345678", 30),
            new User("", "no-email", "0923456789", 15),
            new User("Le Hoa  ", "HOA@COMPANY.VN", "0934567890", 22)
        );

        System.out.println("=== KẾT QUẢ XỬ LÝ ===");
        rawUsers.stream()
            .map(normalizeUser)
            .map(validate)
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(format)
            .forEach(System.out::println);
    }
}`,
        hint: "Function.andThen(g) tạo f.andThen(g) = x -> g(f(x)). Dùng map(validate).filter(Optional::isPresent).map(Optional::get) để lọc valid users.",
      },
      {
        title: "Bài tập 5: Collect và Group dữ liệu phức tạp",
        description: "Áp dụng Collectors nâng cao: groupingBy nhiều cấp, summarizingDouble, joining, partitioningBy. Phân tích dữ liệu bán hàng theo vùng, danh mục, và tạo báo cáo tổng hợp.",
        starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    record DonBanHang(String vung, String danhMuc, String sanPham, int soLuong, double donGia) {
        double doanhThu() { return soLuong * donGia; }
    }

    public static void main(String[] args) {
        List<DonBanHang> data = Arrays.asList(
            new DonBanHang("Bắc", "Dien tu", "Laptop", 5, 15_000_000),
            new DonBanHang("Nam", "Dien tu", "Phone", 12, 8_000_000),
            new DonBanHang("Bắc", "Phu kien", "Mouse", 30, 500_000),
            new DonBanHang("Trung", "Dien tu", "Tablet", 8, 6_000_000),
            new DonBanHang("Nam", "Phu kien", "Keyboard", 20, 350_000),
            new DonBanHang("Bắc", "Dien tu", "Monitor", 3, 5_000_000),
            new DonBanHang("Nam", "Dien tu", "Laptop", 7, 15_000_000),
            new DonBanHang("Trung", "Phu kien", "Mouse", 15, 500_000)
        );

        // TODO 1: Doanh thu theo vùng, sắp xếp giảm dần
        System.out.println("=== Doanh thu theo Vùng ===");

        // TODO 2: Nhóm 2 cấp: vùng → danh mục → doanh thu
        System.out.println("\\n=== Vùng → Danh mục ===");

        // TODO 3: Vùng nào có doanh thu > 50 triệu? (partitioningBy)
        System.out.println("\\n=== Vùng trên/dưới 50 triệu ===");

        // TODO 4: Tên tất cả sản phẩm unique, sắp xếp, nối dấu phẩy
        System.out.println("\\n=== Danh sách sản phẩm ===");
    }
}`,
        solution: `import java.util.*;
import java.util.stream.*;

public class Main {
    record DonBanHang(String vung, String danhMuc, String sanPham, int soLuong, double donGia) {
        double doanhThu() { return soLuong * donGia; }
    }

    public static void main(String[] args) {
        List<DonBanHang> data = Arrays.asList(
            new DonBanHang("Bắc", "Dien tu", "Laptop", 5, 15_000_000),
            new DonBanHang("Nam", "Dien tu", "Phone", 12, 8_000_000),
            new DonBanHang("Bắc", "Phu kien", "Mouse", 30, 500_000),
            new DonBanHang("Trung", "Dien tu", "Tablet", 8, 6_000_000),
            new DonBanHang("Nam", "Phu kien", "Keyboard", 20, 350_000),
            new DonBanHang("Bắc", "Dien tu", "Monitor", 3, 5_000_000),
            new DonBanHang("Nam", "Dien tu", "Laptop", 7, 15_000_000),
            new DonBanHang("Trung", "Phu kien", "Mouse", 15, 500_000)
        );

        System.out.println("=== Doanh thu theo Vùng ===");
        data.stream()
            .collect(Collectors.groupingBy(DonBanHang::vung, Collectors.summingDouble(DonBanHang::doanhThu)))
            .entrySet().stream()
            .sorted(Map.Entry.<String,Double>comparingByValue().reversed())
            .forEach(e -> System.out.printf("  %-8s: %,.0f VND%n", e.getKey(), e.getValue()));

        System.out.println("\\n=== Vùng → Danh mục ===");
        data.stream()
            .collect(Collectors.groupingBy(DonBanHang::vung,
                Collectors.groupingBy(DonBanHang::danhMuc, Collectors.summingDouble(DonBanHang::doanhThu))))
            .forEach((vung, cats) -> {
                System.out.println("  " + vung + ":");
                cats.forEach((cat, dt) -> System.out.printf("    %-12s: %,.0f%n", cat, dt));
            });

        System.out.println("\\n=== Vùng trên/dưới 50 triệu ===");
        Map<String, Double> dtVung = data.stream()
            .collect(Collectors.groupingBy(DonBanHang::vung, Collectors.summingDouble(DonBanHang::doanhThu)));
        Map<Boolean, List<String>> phan = dtVung.entrySet().stream()
            .collect(Collectors.partitioningBy(e -> e.getValue() >= 50_000_000,
                Collectors.mapping(Map.Entry::getKey, Collectors.toList())));
        System.out.println("  Trên 50tr: " + phan.get(true));
        System.out.println("  Dưới 50tr: " + phan.get(false));

        System.out.println("\\n=== Danh sách sản phẩm ===");
        String spList = data.stream()
            .map(DonBanHang::sanPham)
            .distinct().sorted()
            .collect(Collectors.joining(", "));
        System.out.println("  " + spList);
    }
}`,
        hint: "groupingBy 2 cấp: groupingBy(vung, groupingBy(danhMuc, summingDouble)). partitioningBy chia Map<Boolean, List>. distinct().sorted().joining() cho danh sách unique.",
      },
    ],
  },
];
