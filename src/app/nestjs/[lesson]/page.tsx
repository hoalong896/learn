import { notFound } from "next/navigation";
import Link from "next/link";
import { nestjsLessons } from "@/data/nestjs-lessons";
import LessonContent from "@/components/LessonContent";
import ExercisePanel from "@/components/ExercisePanel";
import LessonSidebar from "@/components/LessonSidebar";
import CodeEditor from "@/components/CodeEditor";
import VideoPlayer from "@/components/VideoPlayer";
import ChatWidget from "@/components/ChatWidget";
import CompleteButton from "@/components/CompleteButton";

interface Props {
  params: Promise<{ lesson: string }>;
}

export async function generateStaticParams() {
  return nestjsLessons.map(l => ({ lesson: l.id }));
}

export default async function NestjsLessonPage({ params }: Props) {
  const { lesson: lessonId } = await params;
  const lessonIndex = nestjsLessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) notFound();

  const lesson = nestjsLessons[lessonIndex];
  const prev = nestjsLessons[lessonIndex - 1];
  const next = nestjsLessons[lessonIndex + 1];

  const levelColor =
    lesson.level === "Cơ bản"
      ? "text-green-400 bg-green-900/40 border-green-700/50"
      : lesson.level === "Trung cấp"
      ? "text-yellow-400 bg-yellow-900/40 border-yellow-700/50"
      : "text-red-400 bg-red-900/40 border-red-700/50";

  return (
    <div className="flex min-h-screen bg-gray-950">
      <LessonSidebar
        lessons={nestjsLessons}
        coursePath="nestjs"
        courseTitle="NestJS"
        courseColor="pink"
        courseIcon="🐈"
      />

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColor}`}>
                {lesson.level}
              </span>
              <span className="text-gray-500 text-sm">
                Bài {lessonIndex + 1} / {nestjsLessons.length}
              </span>
              {lesson.videos && lesson.videos.length > 0 && (
                <span className="text-xs text-pink-400 bg-pink-900/30 border border-pink-700/50 px-2 py-0.5 rounded-full">
                  🎬 {lesson.videos.length} video
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{lesson.title}</h1>
            <p className="text-gray-400">{lesson.description}</p>
          </div>

          {/* Videos */}
          {lesson.videos && lesson.videos.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-pink-400">🎬</span> Video bài giảng (Vietsub)
              </h2>
              <VideoPlayer videos={lesson.videos} courseColor="pink" />
            </div>
          )}

          {/* Theory */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
            <LessonContent content={lesson.content} />
          </div>

          {/* Code Example */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-pink-400">⟨/⟩</span> Ví dụ minh họa — chạy thử ngay!
            </h2>
            <CodeEditor initialCode={lesson.codeExample} language="typescript" height="320px" />
          </div>

          {/* Exercises */}
          {lesson.exercises.map((ex, i) => (
            <ExercisePanel key={i} exercise={ex} exerciseNumber={i + 1} language="typescript" />
          ))}

          {/* Complete */}
          <div className="flex justify-end mt-8">
            <CompleteButton course="nestjs" lessonId={lesson.id} courseColor="pink" />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-800">
            {prev ? (
              <Link href={`/nestjs/${prev.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <div>
                  <div className="text-xs text-gray-500">Bài trước</div>
                  <div>{prev.title}</div>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/nestjs/${next.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group text-right">
                <div>
                  <div className="text-xs text-gray-500">Bài tiếp theo</div>
                  <div>{next.title}</div>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ) : (
              <Link href="/nestjs" className="text-sm text-pink-400 hover:text-pink-300">
                Hoàn thành khóa học 🎉
              </Link>
            )}
          </div>
        </div>
      </main>

      <ChatWidget
        context={{ lessonTitle: lesson.title, courseTitle: "NestJS", lessonId: lesson.id }}
        courseColor="pink"
      />
    </div>
  );
}
