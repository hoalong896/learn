import { kidsLessons } from "@/data/kids-lessons";
import CoursePage from "@/components/CoursePage";

export default function KidsCoursePage() {
  return (
    <CoursePage
      color="yellow"
      icon="🧒"
      title="Lập trình cho trẻ em"
      subtitle="JavaScript cơ bản — vui, dễ hiểu, không chán"
      course="kids"
      lessons={kidsLessons}
    />
  );
}
