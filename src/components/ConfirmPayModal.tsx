
import React from 'react'
type Item = { title: string; annualPremium: number; sumAssured: number }
function currency(n:number){ return n.toLocaleString('en-MY', { style:'currency', currency:'MYR', maximumFractionDigits:0 }) }
export default function ConfirmPayModal({ open, onClose, items, amount }:{ open:boolean, onClose:()=>void, items:Item[], amount:number }){
  if(!open) return null
  const annual = items.reduce((a,i)=>a+i.annualPremium,0)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative card w-full max-w-xl p-6">
        <h3 className="text-2xl font-bold">Ready to proceed?</h3>
        <p className="text-white/70 text-sm mt-1">You are about to proceed to secure checkout for the selected policy items below.</p>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((it,i)=>(<li key={i} className="flex justify-between border-b border-neutral-800 pb-1"><span>{it.title}</span><span className="text-white/80">{currency(it.annualPremium)}</span></li>))}
        </ul>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-xs text-white/60">Annual Premium</div><div className="text-lg font-bold">{currency(annual)}</div></div>
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"><div className="text-xs text-white/60">Amount Payable Now (example)</div><div className="text-lg font-bold">{currency(amount || annual)}</div></div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-outline" onClick={onClose}>Not yet</button>
          <a href="/payment" className="btn-primary">Proceed to Payment</a>
        </div>
      </div>
    </div>
  )
}
