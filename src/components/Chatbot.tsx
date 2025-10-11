
import { useRef, useState, useEffect } from 'react'
import { Send } from 'lucide-react'

type Msg = { role: 'bot'|'user', text: string }
function extractBudget(text:string): number | null {
  const m = text.replace(/,/g,'').match(/(?:rm\s*)?(\d{3,})/i)
  return m?parseFloat(m[1]):null
}

export default function Chatbot(){
  const [messages, setMessages] = useState<Msg[]>([
    { role:'bot', text: `Hello! I'm <b>Sunny</b>, your Sun Life assistant. I can suggest plans and help fit your selections to a <i>budget</i>. Try asking things like: "critical illness", "medical card", "takaful", "savings", or "investment". You can also say "my budget is RM 20000".` }
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages])

  function suggest(q:string){
    q = q.toLowerCase()
    if(q.includes('critical')) return 'Critical Illness pays a lump sum upon diagnosis. It pairs well with a medical card.'
    if(q.includes('medical') || q.includes('card')) return 'A Medical Card covers hospitalization and outpatient costs.'
    if(q.includes('takaful')) return 'Family Takaful is a Shariah-compliant protection plan.'
    if(q.includes('savings')) return 'Savings plans help you build guaranteed returns with flexible premiums.'
    if(q.includes('investment')) return 'Investment-linked plans offer market exposure with professional management.'
    return 'Tell me your priorities or type a budget (e.g., RM 20000) and I will optimize your coverage.'
  }

  function send(){
    const text = input.trim()
    if(!text) return
    setMessages(m => [...m, { role:'user', text }])
    const lower = text.toLowerCase()
    let replyText = suggest(text)

    const b = extractBudget(lower)
    if(b && b>0){
      window.dispatchEvent(new CustomEvent('sunny:budget', { detail: { budget: b } }))
      replyText = `Great! I’ll fit your selection to a yearly budget of <b>RM ${b.toLocaleString()}</b>. You can tweak items and I’ll keep you within budget.`
    }

    setMessages(m => [...m, { role:'bot', text: replyText }])
    setInput('')
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-3">
        <img src="https://i.pravatar.cc/40?img=5" className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-semibold">Sunny</div>
          <div className="text-xs text-white/60">Your personalized insurance guide.</div>
        </div>
      </div>
      <div className="h-80 overflow-y-auto space-y-3 pr-1">
        {messages.map((m,i)=>(
          <div key={i} className={`max-w-[85%] ${m.role==='bot'?'':'ml-auto'}`}>
            <div className={`px-3 py-2 rounded-xl ${m.role==='bot'?'bg-neutral-800':'bg-yellow-500 text-black'} text-sm`} dangerouslySetInnerHTML={{__html:m.text}} />
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input className="input flex-1" placeholder="Type your message..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send() }} />
        <button className="btn-primary" onClick={send}><Send className="w-4 h-4" /></button>
      </div>
    </div>
  )
}
