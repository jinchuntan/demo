
import Chatbot from '../components/Chatbot'
import PolicyModal from '../components/PolicyModal'
import ConfirmPayModal from '../components/ConfirmPayModal'
import { Calendar, Mail, Phone } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Coverage = {
  key: string
  title: string
  desc: string
  annualPremium: number
  sumAssured: number
}

const COVERAGES: Coverage[] = [
  { key:'sunbear', title:'SunBear – Child Insurance', desc:'Covering mom and child from pregnancy to early childhood.', annualPremium: 1560, sumAssured: 200000 },
  { key:'life', title:'Life Insurance', desc:'Financial security for your loved ones.', annualPremium: 1200, sumAssured: 300000 },
  { key:'takaful', title:'Family Takaful', desc:'Shariah-compliant mutual protection.', annualPremium: 1080, sumAssured: 250000 },
  { key:'protection', title:'Protection', desc:'Coverage against risks and uncertainties.', annualPremium: 900, sumAssured: 100000 },
  { key:'savings', title:'Savings', desc:'Build wealth and achieve goals.', annualPremium: 1800, sumAssured: 0 },
  { key:'investment', title:'Investment Plans', desc:'Grow your assets over time.', annualPremium: 2400, sumAssured: 0 },
  { key:'medical', title:'Health & Medical Card', desc:'Access to quality medical care.', annualPremium: 1440, sumAssured: 1500000 },
  { key:'critical', title:'Critical Illness Insurance', desc:'Lump sum payment on diagnosis.', annualPremium: 960, sumAssured: 100000 },
  { key:'education', title:'Education Plan', desc:'Secure your children’s education.', annualPremium: 1320, sumAssured: 0 },
  { key:'retirement', title:'Retirement Plan', desc:'Build a robust retirement fund.', annualPremium: 2160, sumAssured: 0 },
]

function currency(n:number){ return n.toLocaleString('en-MY', { style:'currency', currency:'MYR', maximumFractionDigits:0 }) }

export default function Advisor(){
  const [name] = useState('Alice Wonderland')
  const [selected, setSelected] = useState<string[]>(['medical','life'])
  const [openPolicy, setOpenPolicy] = useState(false)
  const [openPay, setOpenPay] = useState(false)
  const [budget, setBudget] = useState<number | ''>('')

  // New personal/financial fields
  const [monthlyCommit, setMonthlyCommit] = useState<number | ''>('')
  const [annualSalary, setAnnualSalary] = useState<number | ''>('')
  const [age, setAge] = useState<number | ''>('')
  const [occupation, setOccupation] = useState('')
  const [company, setCompany] = useState('')
  const [sector, setSector] = useState('')

  function toggle(key:string){
    setSelected(s => s.includes(key) ? s.filter(k=>k!==key) : [...s, key])
  }

  const { annualPremium, monthlyPremium, totalCoverage } = useMemo(()=>{
    const chosen = COVERAGES.filter(c => selected.includes(c.key))
    const annual = chosen.reduce((acc,c)=> acc + c.annualPremium, 0)
    const coverage = chosen.reduce((acc,c)=> acc + c.sumAssured, 0)
    return { annualPremium: annual, monthlyPremium: annual/12, totalCoverage: coverage }
  }, [selected])

  // Projection considers salary & commitments, plus savings-like selections
  const projected10yr = useMemo(()=>{
    const savingsLike = ['savings','investment','education','retirement']
    const baseAnnualContrib = COVERAGES
      .filter(c => selected.includes(c.key) && (savingsLike.includes(c.key) || c.sumAssured===0))
      .reduce((acc,c)=> acc + c.annualPremium, 0)

    const commit = typeof monthlyCommit==='number' ? monthlyCommit : 0
    const salary = typeof annualSalary==='number' ? annualSalary : 0
    const availableAnnual = Math.max(0, salary - commit*12)
    const recommendedBudget = availableAnnual > 0 ? availableAnnual * 0.20 : 0

    const annualContrib = (recommendedBudget === 0)
      ? baseAnnualContrib
      : Math.min((baseAnnualContrib>0?baseAnnualContrib:recommendedBudget), recommendedBudget)

    const hasSavings = selected.some(k => ['savings','education','retirement'].includes(k))
    const hasInvest = selected.includes('investment')
    let rate = 0.035
    if (hasInvest && hasSavings) rate = 0.055
    else if (hasInvest) rate = 0.065
    else if (hasSavings) rate = 0.04

    const n = 10
    const fv = rate > 0 ? annualContrib * (((1+rate)**n - 1) / rate) : annualContrib * n
    return fv
  }, [selected, monthlyCommit, annualSalary])

  // Budget optimize from Sunny
  useEffect(()=>{
    function onBudget(e: any){
      const b: number | undefined = e.detail?.budget
      if(!b || b<=0) return
      setBudget(b)
      const priority = ['medical','life','sunbear','critical','protection','education','takaful','retirement','savings','investment']
      let items = [...selected].sort((a,bk)=> priority.indexOf(a) - priority.indexOf(bk))
      const totalAnnual = (list:string[]) => list.map(k => COVERAGES.find(c=>c.key===k)!).reduce((a,c)=>a+c.annualPremium,0)
      while(totalAnnual(items) > b && items.length){
        items = items.slice(0, -1)
      }
      setSelected(items)
    }
    window.addEventListener('sunny:budget', onBudget as any)
    return () => window.removeEventListener('sunny:budget', onBudget as any)
  }, [selected])

  return (
    <main className="section">
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
        <div className="space-y-6">
          {/* Personal + Financial details */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold">Your Personal Details</h2>
            <p className="text-white/70 text-sm mb-4">Please provide your information to help us tailor the best options for you.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="label">Full Name</label><input className="input" defaultValue={name} /></div>
              <div><label className="label">Email Address</label><div className="flex items-center gap-2"><Mail className="w-4 h-4 text-white/70" /><input className="input" defaultValue="alice.wonderland@example.com" /></div></div>
              <div><label className="label">Phone Number</label><div className="flex items-center gap-2"><Phone className="w-4 h-4 text-white/70" /><input className="input" defaultValue="+60 12-345 6789" /></div></div>
              <div><label className="label">Date of Birth</label><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-white/70" /><input className="input" defaultValue="June 15, 1990" /></div></div>

              <div><label className="label">Age</label><input className="input" placeholder="e.g. 35" value={age} onChange={e=>setAge(e.target.value?parseFloat(e.target.value):'')} /></div>
              <div><label className="label">Occupation</label><input className="input" placeholder="e.g. Software Engineer" value={occupation} onChange={e=>setOccupation(e.target.value)} /></div>
              <div><label className="label">Company</label><input className="input" placeholder="e.g. Sun Life Malaysia" value={company} onChange={e=>setCompany(e.target.value)} /></div>
              <div><label className="label">Sector</label><input className="input" placeholder="e.g. Financial Services" value={sector} onChange={e=>setSector(e.target.value)} /></div>
              <div><label className="label">Monthly Financial Commitment (RM)</label><input className="input" placeholder="e.g. 1500" value={monthlyCommit} onChange={e=>setMonthlyCommit(e.target.value?parseFloat(e.target.value):'')} /></div>
              <div><label className="label">Annual Salary (RM)</label><input className="input" placeholder="e.g. 75000" value={annualSalary} onChange={e=>setAnnualSalary(e.target.value?parseFloat(e.target.value):'')} /></div>
            </div>
          </div>

          {/* Select Coverage */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold">Select Your Coverage</h2>
            <p className="text-white/70 text-sm mb-4">Choose the products that best fit your needs. Pricing and dashboard update automatically.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {COVERAGES.map((c)=>(
                <button key={c.key} onClick={()=>toggle(c.key)} className={`card p-4 text-left hover:shadow-lg ${selected.includes(c.key)?'ring-2 ring-yellow-400':''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{c.title}</div>
                      <div className="text-sm text-white/70">{c.desc}</div>
                      <div className="mt-2 text-xs text-white/60">Suggested premium: <span className="text-white">{currency(c.annualPremium)}/yr</span></div>
                      {c.sumAssured>0 && <div className="text-xs text-white/60">Coverage: <span className="text-white">{currency(c.sumAssured)}</span></div>}
                    </div>
                    <input readOnly type="checkbox" className="checkbox" checked={selected.includes(c.key)} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold">Your Pricing Summary</h2>
            <div className="mt-2 flex items-center gap-3">
              <label className="label">Annual Budget (MYR)</label>
              <input className="input w-40" value={budget} onChange={e=>setBudget(e.target.value?parseFloat(e.target.value):'')} placeholder="e.g. 20000" />
              <button onClick={()=>window.dispatchEvent(new CustomEvent('sunny:budget',{detail:{budget: typeof budget==='number'?budget:0}}))} className="btn-primary">Let Sunny optimize</button>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-sm text-white/70">Estimated Annual Premium</div><div className="text-2xl font-bold mt-1">{currency(annualPremium)}</div></div>
              <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-sm text-white/70">Estimated Monthly Premium</div><div className="text-2xl font-bold mt-1">{currency(monthlyPremium)}</div></div>
              <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-sm text-white/70">Total Coverage / Year</div><div className="text-2xl font-bold mt-1">{currency(totalCoverage)}</div></div>
            </div>
          </div>

          {/* Projection & Actions */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold">Projected Cash in 10 Years</h2>
            <p className="text-white/70 text-sm">Based on your selected savings/investment products, your salary & commitments, and typical market rates.</p>
            <div className="mt-3 text-3xl font-extrabold text-yellow-400">{currency(projected10yr)}</div>
            <div className="text-xs text-white/60 mt-1">Assumes annual contributions adjusted by up to 20% of disposable annual income.</div>
            <div className="mt-4 flex gap-3">
              <button onClick={()=>setOpenPolicy(true)} className="btn-outline">Show Policy</button>
              <button onClick={()=>setOpenPay(true)} className="btn-primary">Proceed with Payment</button>
            </div>
          </div>
        </div>

        {/* Chatbot */}
        <div className="space-y-6">
          <Chatbot />
        </div>
      </div>

      <PolicyModal open={openPolicy} onClose={()=>setOpenPolicy(false)} items={COVERAGES.filter(c=>selected.includes(c.key))} />
      <ConfirmPayModal open={openPay} onClose={()=>setOpenPay(false)} items={COVERAGES.filter(c=>selected.includes(c.key))} amount={0} />
    </main>
  )
}
