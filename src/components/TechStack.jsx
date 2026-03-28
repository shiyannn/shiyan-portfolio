import { SectionLabel } from "./About"

const skills = {
  Frontend: [
    { name: "HTML", icon: "devicon-html5-plain colored" },
    { name: "CSS", icon: "devicon-css3-plain colored" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "React.js", icon: "devicon-react-original colored" },
  ],
  "Mobile Development": [
    { name: "Flutter", icon: "devicon-flutter-plain colored" },
  ],
  "Framework": [
     { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
  ]
}

function SkillBadge({ name, icon, darkMode }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border mr-2 mb-2 ${darkMode ? "bg-zinc-800 text-zinc-300 border-zinc-700" : "bg-gray-100 text-zinc-600 border-gray-200"}`}>
      <i className={`${icon} text-base`}></i>
      {name}
    </span>
  )
}

export default function TechStack({ darkMode }) {
  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      <SectionLabel emoji="🛠" label="Tech Stack" darkMode={darkMode} />
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-3 last:mb-0">
          <p className={`text-xs uppercase tracking-widest mb-2 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>{category}</p>
          <div className="flex flex-wrap">
            {items.map((s) => <SkillBadge key={s.name} name={s.name} icon={s.icon} darkMode={darkMode} />)}
          </div>
        </div>
      ))}
    </div>
  )
}