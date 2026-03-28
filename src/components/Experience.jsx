import { data } from "../data"
import { SectionLabel } from "./About"

export function TimelineItem({ year, title, subtitle, darkMode, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
        <div className={`w-px flex-1 mt-1 ${darkMode ? "bg-zinc-700" : "bg-gray-200"}`} />
      </div>
      <div className="pb-4">
        <p className={`text-xs mb-0.5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>{year}</p>
        <p className={`text-sm font-semibold ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}>{title}</p>
        <p className={`text-xs ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{subtitle}</p>
        {children}
      </div>
    </div>
  )
}

export default function Experience({ darkMode }) {
  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      <SectionLabel emoji="💼" label="Experience" darkMode={darkMode} />
      {data.experience.map((exp, i) => (
        <TimelineItem key={i} year={exp.year} title={exp.role} subtitle={exp.company} darkMode={darkMode}>
          <p className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>{exp.description}</p>
        </TimelineItem>
      ))}
    </div>
  )
}