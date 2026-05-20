import { chineseLessons } from "@/data/chinese-lessons";
import CoursePage from "@/components/CoursePage";

export default function ChineseCoursePage() {
  return (
    <CoursePage
      color="red"
      icon="🇨🇳"
      title="Tiếng Trung cơ bản"
      subtitle="Pinyin, từ vựng, ngữ pháp HSK — từ cơ bản đến trung cấp"
      course="chinese"
      lessons={chineseLessons}
    />
  );
}
