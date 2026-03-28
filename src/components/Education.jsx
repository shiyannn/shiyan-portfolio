import { data } from "../data"
import { SectionLabel } from "./About"
import { TimelineItem } from "./Experience"

export default function Education({ darkMode }) {
  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      <SectionLabel emoji="🎓" label="Education" darkMode={darkMode} />
      {data.education.map((edu, i) => (
        <TimelineItem key={i} year={edu.year} title={edu.degree}  subtitle={edu.school} darkMode={darkMode}>
          <ul className="mt-2 space-y-1">
            {edu.highlights.map((item, j) => (
              <li key={j} className={`text-xs flex items-center gap-1.5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${darkMode ? "bg-zinc-500" : "bg-gray-300"}`} />
                {item}
              </li>
            ))}
          </ul>
        </TimelineItem>
      ))}
    </div>
  )
}