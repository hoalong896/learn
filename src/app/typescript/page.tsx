import { typescriptLessons } from "@/data/typescript-lessons";
import CoursePage from "@/components/CoursePage";

export default function TypeScriptCoursePage() {
  return (
    <CoursePage
      color="blue"
      icon="🔷"
      title="Khóa học TypeScript"
      subtitle="JavaScript có kiểu dữ liệu — từ cơ bản đến nâng cao"
      course="typescript"
      lessons={typescriptLessons}
    />
  );
}
