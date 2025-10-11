
import { useState } from 'react'
export default function Payment(){
  const [method, setMethod] = useState<'card'|'fp'|'ew'>('card')
  const [success, setSuccess] = useState(false)
  const [ref, setRef] = useState('')

  function doPay(){
    const id = 'SL' + Math.floor(100000 + Math.random()*900000).toString()
    setRef(id)
    setSuccess(true)
  }

  if(success){
    return (
      <main className="section">
        <div className="max-w-xl mx-auto card p-8 text-center">
          <div className="text-3xl font-bold text-yellow-400">Payment Successful</div>
          <p className="text-white/70 mt-2">Thank you. Your payment has been received and your application is being processed.</p>
          <div className="mt-4 bg-neutral-800 rounded-xl p-4 border border-neutral-700">
            <div className="text-xs text-white/60">Reference</div>
            <div className="text-lg font-bold">{ref}</div>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <a href="/" className="btn-outline">Back to Home</a>
            <a href="/advisor" className="btn-primary">View Policy</a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="section">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="card p-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-white/70 text-sm">Secure payment (sample). Choose a method and enter details.</p>
          <div className="mt-4">
            <label className="label">Payment Method</label>
            <div className="flex gap-3 flex-wrap">
              <button className={\`btn \${method==='card'?'bg-yellow-400 text-black':'btn-outline'}\`} onClick={()=>setMethod('card')}>Card</button>
              <button className={\`btn \${method==='fp'?'bg-yellow-400 text-black':'btn-outline'}\`} onClick={()=>setMethod('fp')}>FPX / Online Banking</button>
              <button className={\`btn \${method==='ew'?'bg-yellow-400 text-black':'btn-outline'}\`} onClick={()=>setMethod('ew')}>E-wallet</button>
            </div>
          </div>
          {method==='card' && (<div className="grid md:grid-cols-2 gap-4 mt-4">
            <div><label className="label">Cardholder Name</label><input className="input" placeholder="As on card" /></div>
            <div><label className="label">Card Number</label><input className="input" placeholder="4242 4242 4242 4242" /></div>
            <div><label className="label">Expiry</label><input className="input" placeholder="MM/YY" /></div>
            <div><label className="label">CVC</label><input className="input" placeholder="***" /></div>
          </div>)}
          {method!=='card' && (<div className="mt-4 text-white/80 text-sm">You’ll be redirected to the selected provider to complete payment securely.</div>)}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-white/80 text-sm">Amount payable (example): <span className="font-bold">RM 1,200</span></div>
            <button className="btn-primary" onClick={doPay}>Pay Now</button>
          </div>
        </div>
        <div className="text-center text-white/50 text-xs">Connect Stripe, Billplz, or FPX for production.</div>
      </div>
    </main>
  )
}
