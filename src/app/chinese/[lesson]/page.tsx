import { notFound } from "next/navigation";
import Link from "next/link";
import { chineseLessons } from "@/data/chinese-lessons";
import LessonContent from "@/components/LessonContent";
import LessonSidebar from "@/components/LessonSidebar";
import LangExercisePanel from "@/components/LangExercisePanel";
import ChatWidget from "@/components/ChatWidget";
import CompleteButton from "@/components/CompleteButton";

interface Props {
  params: Promise<{ lesson: string }>;
}

export async function generateStaticParams() {
  return chineseLessons.map(l => ({ lesson: l.id }));
}

export default async function ChineseLessonPage({ params }: Props) {
  const { lesson: lessonId } = await params;
  const lessonIndex = chineseLessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) notFound();

  const lesson = chineseLessons[lessonIndex];
  const prev = chineseLessons[lessonIndex - 1];
  const next = chineseLessons[lessonIndex + 1];

  const levelColor =
    lesson.level === "Cơ bản"
      ? "text-green-400 bg-green-900/40 border-green-700/50"
      : lesson.level === "Trung cấp"
      ? "text-yellow-400 bg-yellow-900/40 border-yellow-700/50"
      : "text-red-400 bg-red-900/40 border-red-700/50";

  return (
    <div className="flex min-h-screen bg-gray-950">
      <LessonSidebar
        lessons={chineseLessons}
        coursePath="chinese"
        courseTitle="Tiếng Trung cơ bản"
        courseColor="red"
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
                Bài {lessonIndex + 1} / {chineseLessons.length}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{lesson.title}</h1>
            <p className="text-gray-400">{lesson.description}</p>
          </div>

          {/* Theory */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
            <LessonContent content={lesson.content} />
          </div>

          {/* Vocabulary */}
          {lesson.vocabulary && lesson.vocabulary.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-400">📖</span> Từ vựng bài học
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {lesson.vocabulary.map((v, i) => (
                  <div key={i} className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 hover:border-red-700/50 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-base font-bold text-white">{v.word}</span>
                      <span className="text-xs text-red-400 font-mono shrink-0">{v.phonetic}</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-1.5">{v.meaning}</div>
                    <div className="text-xs text-gray-500 italic border-t border-gray-800 pt-1.5">
                      <span className="text-gray-600">VD: </span>{v.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grammar */}
          {lesson.grammar && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-400">📐</span> Ngữ pháp
              </h2>
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <LessonContent content={lesson.grammar} />
              </div>
            </div>
          )}

          {/* Dialogue */}
          {lesson.dialogue && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-400">💬</span> Hội thoại mẫu
              </h2>
              <div className="bg-red-950/20 border border-red-800/40 rounded-xl p-5">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{lesson.dialogue}</pre>
              </div>
            </div>
          )}

          {/* Exercises */}
          {lesson.exercises.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <span className="text-red-400">✏️</span> Bài tập luyện tập
              </h2>
              <p className="text-sm text-gray-500 mb-4">Làm từng câu và kiểm tra ngay kết quả!</p>
              {lesson.exercises.map((ex, i) => (
                <LangExercisePanel key={i} exercise={ex} exerciseNumber={i + 1} accentColor="red" />
              ))}
            </div>
          )}

          {/* Complete */}
          <div className="flex justify-end mt-8">
            <CompleteButton course="chinese" lessonId={lesson.id} courseColor="red" />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-800">
            {prev ? (
              <Link href={`/chinese/${prev.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <div>
                  <div className="text-xs text-gray-500">Bài trước</div>
                  <div>{prev.title}</div>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/chinese/${next.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group text-right">
                <div>
                  <div className="text-xs text-gray-500">Bài tiếp theo</div>
                  <div>{next.title}</div>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ) : (
              <Link href="/chinese" className="text-sm text-red-400 hover:text-red-300">
                Hoàn thành khóa học 🎉
              </Link>
            )}
          </div>
        </div>
      </main>

      <ChatWidget
        context={{ lessonTitle: lesson.title, courseTitle: "Tiếng Trung cơ bản", lessonId: lesson.id }}
        courseColor="red"
      />
    </div>
  );
}
