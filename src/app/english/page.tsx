import { englishLessons } from "@/data/english-lessons";
import CoursePage from "@/components/CoursePage";

export default function EnglishCoursePage() {
  return (
    <CoursePage
      color="sky"
      icon="🇬🇧"
      title="Tiếng Anh giao tiếp"
      subtitle="Từ vựng, ngữ pháp, hội thoại — từ A1 đến B2"
      course="english"
      lessons={englishLessons}
    />
  );
}
