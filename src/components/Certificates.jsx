import { useState } from "react"
import { SectionLabel } from "./About"

import cert1 from "../assets/certs/DL.jpg"
import cert2 from "../assets/certs/DL.jpg"
// import cert3 from "../assets/certs/cert3.jpg"

const certificates = [
  { title: "Certificate 1", image: cert1 },
  { title: "Certificate 2", image: cert2 },
  // { title: "Certificate 3", image: cert3 },
]

export default function Certificates({ darkMode }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"}`}>
      <SectionLabel emoji="🏅" label="Certificate Gallery" darkMode={darkMode} />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {certificates.map((cert, i) => (
          <div
            key={i}
            onClick={() => setSelected(cert)}
            className={`rounded-xl border overflow-hidden cursor-pointer hover:scale-105 transition-transform ${darkMode ? "border-zinc-700" : "border-gray-200"}`}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-32 object-cover"
            />
            <p className={`text-xs text-center py-2 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
              {cert.title}
            </p>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white text-sm font-medium hover:text-zinc-300"
            >
              ✕ Close
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full rounded-xl object-contain max-h-[80vh]"
            />
            <p className="text-center text-white text-sm mt-3">{selected.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}