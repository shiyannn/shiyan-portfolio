import { useState } from "react"
import profilePic from "../assets/shiyan pic.jpg"
import profileSleep from "../assets/sleepshiyan.png"
export default function Header({ darkMode, setDarkMode }) {
  const [avatar, setAvatar] = useState(null)

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatar(url)
  }

  return (
    <div className={`rounded-2xl p-5 mb-4 border flex flex-col sm:flex-row items-start sm:items-center gap-5 ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      
      {/* Clickable Avatar */}
      {/* Clickable Avatar */}
      <label className="cursor-pointer group relative w-28 h-28 block">
        <div className={`w-28 h-28 rounded-2xl border overflow-hidden shrink-0 flex items-center justify-center transition-all duration-1000 ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-gray-100 border-gray-200"}`}>
          <img 
            src={avatar || (darkMode ? profileSleep : profilePic)} 
            alt="profile" 
            className="w-full h-full object-cover transition-all duration-700 ease-in-out" 
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs font-medium">Upload</span>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
      </label>

      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>Shiane Carl Roblas</h1>
          <span className="text-emerald-500 text-sm">✔</span>
        </div>
        <p className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>📍 Abella, Naga City, Camarines Sur</p>
        <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>Student | Aspiring Developer</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          <a href="mailto:scroblas@gbox.ncf.edu.ph" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${darkMode ? "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700" : "bg-gray-100 border border-gray-200 text-zinc-600 hover:bg-gray-200"}`}>
            ✉ Send Email
          </a>
          <a href="/resume.pdf" download className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors">
            ⬇ Download Resume
          </a>
        </div>
      </div>

        <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs">{darkMode ? "🌙" : "🌤️"}</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full transition-colors ${darkMode ? "bg-emerald-500" : "bg-zinc-300"}`}>
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>
    </div>
  )
}
