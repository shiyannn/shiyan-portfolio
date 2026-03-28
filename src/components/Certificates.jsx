import { useState } from "react"
import { SectionLabel } from "./About"

const initialCerts = [
  { title: "Dean's Lister 1st Sem", image: null },
  { title: "Dean's Lister 2nd Sem", image: null },
  { title: "Certificate 3", image: null },
]

function CertSlot({ cert, onUpload, darkMode }) {
  return (
    <label className={`relative cursor-pointer group rounded-xl border border-dashed transition-colors overflow-hidden min-h-[140px] flex flex-col items-center justify-center ${darkMode ? "bg-zinc-800 border-zinc-600 hover:border-emerald-500" : "bg-gray-50 border-gray-300 hover:border-emerald-500"}`}>
      <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
      {cert.image ? (
        <>
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-xl absolute inset-0" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-xs text-white font-medium">Click to replace</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <span className="text-2xl mb-2 group-hover:scale-110 transition-transform select-none">📜</span>
          <p className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{cert.title}</p>
          <p className={`text-xs mt-1 ${darkMode ? "text-zinc-600" : "text-gray-400"}`}>Click to upload</p>
        </div>
      )}
    </label>
  )
}

export default function Certificates({ darkMode }) {
  const [certs, setCerts] = useState(initialCerts)

  const handleUpload = (index, e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setCerts((prev) => prev.map((c, i) => (i === index ? { ...c, image: url } : c)))
  }

  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      <SectionLabel emoji="🏅" label="Certificate Gallery" darkMode={darkMode} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {certs.map((cert, i) => (
          <CertSlot key={i} cert={cert} onUpload={(e) => handleUpload(i, e)} darkMode={darkMode} />
        ))}
      </div>
      
    </div>
  )
}