import { nestjsLessons } from "@/data/nestjs-lessons";
import CoursePage from "@/components/CoursePage";

export default function NestjsCoursePage() {
  const totalVideos = nestjsLessons.reduce((s, l) => s + (l.videos?.length ?? 0), 0);
  return (
    <CoursePage
      color="pink"
      icon="🐈"
      title="Khóa học NestJS"
      subtitle="Node.js Enterprise Framework — REST API, Auth, Database, Deployment"
      course="nestjs"
      lessons={nestjsLessons}
      extraStats={totalVideos > 0 ? [{ icon: "▶", value: totalVideos, label: "Video (vietsub)" }] : undefined}
    />
  );
}
