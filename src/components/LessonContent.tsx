"use client";

import type { ReactElement } from "react";

interface LessonContentProps {
  content: string;
}

const LANG_LABELS: Record<string, string> = {
  typescript: "TypeScript",
  ts: "TypeScript",
  javascript: "JavaScript",
  js: "JavaScript",
  java: "Java",
  bash: "Terminal",
  shell: "Terminal",
  json: "JSON",
  html: "HTML",
  css: "CSS",
};

export default function LessonContent({ content }: LessonContentProps) {
  const lines = content.split("\n");
  const elements: ReactElement[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim().toLowerCase();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      const label = LANG_LABELS[lang] ?? lang;
      elements.push(
        <div key={key++} className="my-5 rounded-xl overflow-hidden border border-gray-700/60 shadow-xl">
          <div className="px-4 py-2.5 bg-gray-800/90 flex items-center justify-between border-b border-gray-700/60">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              {label && (
                <span className="text-xs font-mono text-gray-400 font-medium">{label}</span>
              )}
            </div>
          </div>
          <pre className="bg-[#0d1117] px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto whitespace-pre leading-relaxed">
            {codeLines.join("\n")}
          </pre>
        </div>
      );
    }
    // H2
    else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-white mt-8 mb-4 pb-2 border-b border-gray-700/80 flex items-center gap-2">
          {line.slice(3)}
        </h2>
      );
    }
    // H3
    else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-base font-semibold text-blue-300 mt-6 mb-2 flex items-center gap-1.5">
          <span className="w-1 h-4 rounded-full bg-blue-500 inline-block" />
          {line.slice(4)}
        </h3>
      );
    }
    // Table
    else if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split("|").filter(Boolean).map(h => h.trim());
      const rows = tableLines.slice(2).map(row =>
        row.split("|").filter(Boolean).map(c => c.trim())
      );
      elements.push(
        <div key={key++} className="my-5 overflow-x-auto rounded-xl border border-gray-700/80 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-800">
              <tr>
                {headers.map((h, idx) => (
                  <th key={idx} className="px-4 py-2.5 text-left text-gray-300 font-semibold text-xs uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className={`border-t border-gray-800 ${rIdx % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"} hover:bg-gray-800/50 transition-colors`}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 text-gray-300" dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }
    // List item
    else if (line.match(/^[-*]\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 space-y-2 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-gray-300 flex gap-2.5">
              <span className="text-blue-400 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }
    // Paragraph
    else if (line.trim().length > 0) {
      elements.push(
        <p key={key++} className="text-gray-300 leading-relaxed my-2.5"
           dangerouslySetInnerHTML={{ __html: renderInline(line) }}
        />
      );
    }
    // Empty line
    else {
      elements.push(<div key={key++} className="my-1" />);
    }

    i++;
  }

  return <div className="space-y-0">{elements}</div>;
}

function renderInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-yellow-300 px-1.5 py-0.5 rounded-md text-[0.85em] font-mono border border-gray-700/60">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-200 italic">$1</em>');
}
