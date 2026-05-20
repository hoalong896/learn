import { dockerLessons } from "@/data/docker-lessons";
import CoursePage from "@/components/CoursePage";

export default function DockerCoursePage() {
  return (
    <CoursePage
      color="teal"
      icon="🐳"
      title="Khóa học Docker"
      subtitle="Container hóa ứng dụng — từ cơ bản đến production"
      course="docker"
      lessons={dockerLessons}
    />
  );
}
