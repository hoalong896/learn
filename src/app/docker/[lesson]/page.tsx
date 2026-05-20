import { notFound } from "next/navigation";
import Link from "next/link";
import { dockerLessons } from "@/data/docker-lessons";
import LessonContent from "@/components/LessonContent";
import ExercisePanel from "@/components/ExercisePanel";
import LessonSidebar from "@/components/LessonSidebar";
import CodeEditor from "@/components/CodeEditor";
import ChatWidget from "@/components/ChatWidget";
import CompleteButton from "@/components/CompleteButton";

interface Props {
  params: Promise<{ lesson: string }>;
}

export async function generateStaticParams() {
  return dockerLessons.map(l => ({ lesson: l.id }));
}

export default async function DockerLessonPage({ params }: Props) {
  const { lesson: lessonId } = await params;
  const lessonIndex = dockerLessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) notFound();

  const lesson = dockerLessons[lessonIndex];
  const prev = dockerLessons[lessonIndex - 1];
  const next = dockerLessons[lessonIndex + 1];

  const levelColor =
    lesson.level === "Cơ bản"
      ? "text-green-400 bg-green-900/40 border-green-700/50"
      : lesson.level === "Trung cấp"
      ? "text-yellow-400 bg-yellow-900/40 border-yellow-700/50"
      : "text-red-400 bg-red-900/40 border-red-700/50";

  return (
    <div className="flex min-h-screen bg-gray-950">
      <LessonSidebar
        lessons={dockerLessons}
        coursePath="docker"
        courseTitle="Docker"
        courseColor="teal"
      />

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColor}`}>
                {lesson.level}
              </span>
              <span className="text-gray-500 text-sm">
                Bài {lessonIndex + 1} / {dockerLessons.length}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{lesson.title}</h1>
            <p className="text-gray-400">{lesson.description}</p>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
            <LessonContent content={lesson.content} />
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-teal-400">⟨/⟩</span> Ví dụ minh họa — chạy thử ngay!
            </h2>
            <CodeEditor initialCode={lesson.codeExample} language="typescript" height="340px" />
          </div>

          {lesson.exercises.map((ex, i) => (
            <ExercisePanel key={i} exercise={ex} exerciseNumber={i + 1} language="typescript" />
          ))}

          <div className="flex justify-end mt-8">
            <CompleteButton course="docker" lessonId={lesson.id} courseColor="teal" />
          </div>

          <div className="flex justify-between mt-6 pt-6 border-t border-gray-800">
            {prev ? (
              <Link href={`/docker/${prev.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <div>
                  <div className="text-xs text-gray-500">Bài trước</div>
                  <div>{prev.title}</div>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/docker/${next.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group text-right">
                <div>
                  <div className="text-xs text-gray-500">Bài tiếp theo</div>
                  <div>{next.title}</div>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ) : (
              <Link href="/docker" className="text-sm text-teal-400 hover:text-teal-300">
                Hoàn thành khóa học 🎉
              </Link>
            )}
          </div>
        </div>
      </main>

      <ChatWidget
        context={{ lessonTitle: lesson.title, courseTitle: "Docker", lessonId: lesson.id }}
        courseColor="teal"
      />
    </div>
  );
}
