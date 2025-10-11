
type Item = { title: string; annualPremium: number; sumAssured: number }
function currency(n:number){ return n.toLocaleString('en-MY', { style:'currency', currency:'MYR', maximumFractionDigits:0 }) }
export default function PolicyModal({open, onClose, items}:{open:boolean, onClose:()=>void, items:Item[]}){
  if(!open) return null
  const annual = items.reduce((a,i)=>a+i.annualPremium,0)
  const monthly = annual/12
  const coverage = items.reduce((a,i)=>a+i.sumAssured,0)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative card w-full max-w-2xl p-6">
        <h3 className="text-2xl font-bold mb-4">Your Policy Summary</h3>
        <div className="max-h-[50vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="text-white/70"><tr><th className="text-left py-2">Coverage</th><th className="text-right">Annual Premium</th><th className="text-right">Sum Assured</th></tr></thead>
            <tbody>
            {items.map((it,i)=>(
              <tr key={i} className="border-t border-neutral-800">
                <td className="py-2">{it.title}</td>
                <td className="text-right">{currency(it.annualPremium)}</td>
                <td className="text-right">{it.sumAssured?currency(it.sumAssured):'-'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-xs text-white/70">Annual Premium</div><div className="text-xl font-bold">{currency(annual)}</div></div>
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-xs text-white/70">Monthly Premium</div><div className="text-xl font-bold">{currency(monthly)}</div></div>
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-xs text-white/70">Total Coverage</div><div className="text-xl font-bold">{currency(coverage)}</div></div>
        </div>
        <div className="mt-6 flex justify-end"><button onClick={onClose} className="btn-outline">Close</button></div>
      </div>
    </div>
  )
}
