import { useState } from "react"
import Header from "./components/Header"
import About from "./components/About"
import Experience from "./components/Experience"
import TechStack from "./components/TechStack"
import Education from "./components/Education"
import Projects from "./components/Projects"
import Certificates from "./components/Certificates"
import Chatbot from "./components/Chatbot"


export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-zinc-950" : "bg-gray-100"}`}>
        <div className="max-w-6xl mx-auto py-6 px-6">

          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex flex-col gap-4 md:w-[60%]">
              <About darkMode={darkMode} />
              <TechStack darkMode={darkMode} />
            </div>
            <div className="flex flex-col gap-4 md:w-[40%]">
              <Experience darkMode={darkMode} />
              <Education darkMode={darkMode} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Projects darkMode={darkMode} />
            <Certificates darkMode={darkMode} />
          </div>

          <Chatbot darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}
