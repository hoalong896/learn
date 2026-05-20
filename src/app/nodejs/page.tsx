import { nodejsLessons } from "@/data/nodejs-lessons";
import CoursePage from "@/components/CoursePage";

export default function NodejsCoursePage() {
  const totalPlaygrounds = nodejsLessons.reduce((s, l) => s + (l.playgrounds?.length ?? 0), 0);
  return (
    <CoursePage
      color="green"
      icon="🟢"
      title="Khóa học Node.js"
      subtitle="JavaScript phía server — từ cơ bản đến REST API thực tế"
      course="nodejs"
      lessons={nodejsLessons}
      extraStats={totalPlaygrounds > 0 ? [{ icon: "⬡", value: totalPlaygrounds, label: "Sandbox" }] : undefined}
    />
  );
}
