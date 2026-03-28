import { data } from "../data"
import { SectionLabel } from "./About"

function ProjectCard({ project, darkMode }) {
  return (
    <div className={`rounded-xl p-4 border transition-colors ${darkMode ? "bg-zinc-800 border-zinc-700 hover:border-zinc-500" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}>
      
      {/* Type Badge */}
      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mb-2 ${
        project.type === "mobile"
          ? darkMode ? "bg-blue-900/40 text-blue-300" : "bg-blue-50 text-blue-500"
          : darkMode ? "bg-emerald-900/40 text-emerald-300" : "bg-emerald-50 text-emerald-600"
      }`}>
        {project.type === "mobile" ? "📱 Mobile" : "🌐 Web"}
      </span>

      <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-white" : "text-zinc-800"}`}>{project.name}</h3>
      <p className={`text-xs mb-3 leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{project.description}</p>

      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors font-medium">
          {project.link.replace("https://", "")}
        </a>
      ) : (
        <span className={`text-xs ${darkMode ? "text-zinc-600" : "text-gray-400"}`}>
          {project.type === "mobile" ? "📱 Mobile App" : "🌐 Website"}
        </span>
      )}
    </div>
  )
}

export default function Projects({ darkMode }) {
  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      <SectionLabel emoji="📁" label="Recent Projects" darkMode={darkMode} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {data.projects.map((proj, i) => (
          <ProjectCard key={i} project={proj} darkMode={darkMode} />
        ))}
      </div>
    </div>
  )
}