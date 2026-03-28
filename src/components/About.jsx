import { data } from "../data"

export function SectionLabel({ emoji, label, darkMode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm">{emoji}</span>
      <h2 className={`text-xs font-semibold uppercase tracking-widest ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{label}</h2>
    </div>
  )
}

export default function About({ darkMode }) {
  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      <SectionLabel emoji="👤" label="About" darkMode={darkMode} />
      <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>{data.about}</p>
    </div>
  )
}