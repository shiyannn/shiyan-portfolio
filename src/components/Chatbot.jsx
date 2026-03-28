import { useState, useRef, useEffect } from "react"
import Groq from "groq-sdk"

const YOUR_INFO = `
You are a helpful assistant on Shiane Carl Roblas's portfolio website.
Here is info about Shiane:
- Name: Shiane Carl Roblas
- Location: Abella, Naga City, Camarines Sur
- Currently: 3rd year BSIT student at Nueva Caceres Foundation Inc. (NCF)
- OJT: University of Nueva Caceres (UNC)
- Skills: HTML, CSS, JavaScript, React.js, Flutter
- Projects: OccupAI (AI career guidance app), Simple Marketplace, Savely (budget & savings app)
- Email: scroblas@gbox.ncf.edu.ph
- Goal: Wants to become successful and find inner peace

Only answer questions about Shiane. Keep answers short and friendly. Use casual friendly tone.
`

const FAQ = [
  { label: "Who are you?", question: "Who is Shiane?" },
  { label: "What are your skills?", question: "What are Shiane's skills?" },
  { label: "Your projects?", question: "What projects has Shiane built?" },
  { label: "How to contact?", question: "How can I contact Shiane?" },
]

export default function Chatbot({ darkMode }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! 👋 I'm Shiane's virtual assistant. Ask me anything about him!" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const sendMessage = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg) return

    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setLoading(true)

    try {
      const client = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
      })

      const chatMessages = [
        { role: "system", content: YOUR_INFO },
        ...messages.slice(1).map(m => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
        { role: "user", content: userMsg },
      ]

      const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: chatMessages,
        max_tokens: 300,
      })

      const reply = response.choices[0]?.message?.content || "Sorry, I couldn't get a response."
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch (err) {
      console.error("ERROR:", err)
      setMessages(prev => [...prev, { role: "assistant", content: err.message || "Oops! Something went wrong. Try again!" }])
    }

    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 w-10 h-10 rounded-full border shadow-md flex items-center justify-center transition-all z-50 ${darkMode ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "bg-white border-gray-200 text-zinc-600 hover:bg-gray-50"}`}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-24 right-6 w-80 rounded-2xl border shadow-2xl flex flex-col overflow-hidden z-50 ${darkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-200"}`}
          style={{ height: "420px" }}
        >
          {/* Header */}
          <div className={`px-4 py-3 flex items-center gap-2 border-b ${darkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-200"}`}>
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-gray-100 border-gray-200"}`}>🤖</div>
            <div>
              <p className={`text-sm font-semibold ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}>Shiane's Assistant</p>
              <p className={`text-xs ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>Ask me anything!</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  msg.role === "user"
                    ? darkMode ? "bg-zinc-700 text-zinc-100 rounded-br-none" : "bg-zinc-800 text-white rounded-br-none"
                    : darkMode ? "bg-zinc-800 text-zinc-200 rounded-bl-none" : "bg-gray-100 text-zinc-700 rounded-bl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`px-3 py-2 rounded-xl text-xs ${darkMode ? "bg-zinc-800 text-zinc-400" : "bg-gray-100 text-zinc-400"}`}>
                  Typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* FAQ Quick Replies */}
          <div className={`px-3 py-2 flex gap-1.5 flex-wrap border-t ${darkMode ? "border-zinc-700" : "border-gray-100"}`}>
            {FAQ.map((faq, i) => (
              <button
                key={i}
                onClick={() => sendMessage(faq.question)}
                className={`text-xs px-2 py-1 rounded-full border transition-colors ${darkMode ? "border-zinc-600 text-zinc-400 hover:bg-zinc-800" : "border-gray-200 text-zinc-500 hover:bg-gray-100"}`}
              >
                {faq.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={`flex gap-2 p-3 border-t ${darkMode ? "border-zinc-700" : "border-gray-100"}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className={`flex-1 text-xs px-3 py-2 rounded-lg border outline-none ${darkMode ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500" : "bg-gray-50 border-gray-200 text-zinc-700 placeholder-gray-400"}`}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${darkMode ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-100" : "bg-zinc-800 hover:bg-zinc-700 text-white"}`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}