import { javaLessons } from "@/data/java-lessons";
import CoursePage from "@/components/CoursePage";

export default function JavaCoursePage() {
  return (
    <CoursePage
      color="orange"
      icon="☕"
      title="Khóa học Java"
      subtitle="Write Once, Run Anywhere — từ cơ bản đến nâng cao"
      course="java"
      lessons={javaLessons}
    />
  );
}
