import { nextjsLessons } from "@/data/nextjs-lessons";
import CoursePage from "@/components/CoursePage";

export default function NextjsCoursePage() {
  const totalPlaygrounds = nextjsLessons.reduce((s, l) => s + (l.playgrounds?.length ?? 0), 0);
  return (
    <CoursePage
      color="purple"
      icon="▲"
      title="Khóa học Next.js"
      subtitle="React Fullstack Framework — App Router, SSR, API Routes"
      course="nextjs"
      lessons={nextjsLessons}
      extraStats={totalPlaygrounds > 0 ? [{ icon: "⬡", value: totalPlaygrounds, label: "Sandbox" }] : undefined}
    />
  );
}
