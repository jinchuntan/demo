
import React from 'react'
import { Link } from 'react-router-dom'
import { Diamond, Shield, Scale } from 'lucide-react'

function Card({title, desc, price}:{title:string, desc:string, price:string}){
  return (
    <div className="card p-6">
      <div className="text-xl font-semibold mb-2">{title}</div>
      <div className="text-white/70 text-sm min-h-[72px]">{desc}</div>
      <div className="mt-4 text-white/90 font-bold">From {price} / month</div>
      <Link to="/advisor" className="btn-outline mt-4">Learn More</Link>
    </div>
  )
}

export default function Landing(){
  return (
    <main>
      <section className="section">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Secure Your Future with <span className="text-yellow-400">Sun Life</span>
            </h1>
            <p className="text-lg text-white/80 mt-4 max-w-xl">
              Discover tailored insurance plans designed to protect what matters most.
              From life coverage to medical cards and investments, we've got you covered.
            </p>
            <a href="#plans" className="btn-primary mt-6 inline-flex items-center gap-2">Explore Plans</a>
          </div>
          <div className="rounded-2xl overflow-hidden bg-neutral-900 p-2">
            <img src="/assets/hero.png" alt="Family" className="rounded-xl w-full h-[260px] md:h-[360px] object-cover bg-neutral-900"/>
          </div>
        </div>
      </section>

      <section className="section bg-neutral-900/40 border-y border-neutral-800">
        <h2 className="text-center text-4xl font-bold mb-10">Why Choose Sun Life?</h2>
        <div className="container-max grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <Diamond className="w-9 h-9 text-yellow-400 mx-auto" />
            <div className="mt-3 font-semibold">Tailored Solutions</div>
            <p className="text-sm text-white/70">Customized plans to fit your unique life stages and aspirations.</p>
          </div>
          <div className="card p-6 text-center">
            <Shield className="w-9 h-9 text-yellow-400 mx-auto" />
            <div className="mt-3 font-semibold">Guaranteed Security</div>
            <p className="text-sm text-white/70">Trusted coverage and reliable support when you need it most.</p>
          </div>
          <div className="card p-6 text-center">
            <Scale className="w-9 h-9 text-yellow-400 mx-auto" />
            <div className="mt-3 font-semibold">Transparent Policies</div>
            <p className="text-sm text-white/70">Clear terms and straightforward process for informed decisions.</p>
          </div>
        </div>
      </section>

      <section id="plans" className="section">
        <h2 className="text-center text-4xl font-bold mb-10">Our Comprehensive Protection Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Life Insurance" desc="Comprehensive life coverage for peace of mind." price="RM 100" />
          <Card title="Group Takaful" desc="Shariah-compliant protection for your family." price="RM 90" />
          <Card title="Protection Plans" desc="Critical illness, accident, and income replacement." price="RM 75" />
          <Card title="Savings Plans" desc="Smart savings to achieve your financial goals." price="RM 150" />
          <Card title="Investment Plans" desc="Tailored strategies managed by experts." price="RM 200" />
          <Card title="Health & Medical Card" desc="Quality medical care access without burden." price="RM 120" />
          <Card title="Critical Illness Cover" desc="Financial support during challenging times." price="RM 80" />
          <Card title="Education Plans" desc="Secure your children's academic future." price="RM 110" />
          <Card title="Retirement Plans" desc="Build a robust retirement fund." price="RM 180" />
        </div>
      </section>

      <section className="section">
        <Consent />
      </section>
    </main>
  )
}

function Consent(){
  const [c1, setC1] = React.useState(true)
  const [c2, setC2] = React.useState(true)
  const disabled = !(c1 && c2)
  return (
    <div className="card p-6 max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-4">Your Privacy Matters</h3>
      <label className="flex items-start gap-3 text-sm text-white/80">
        <input type="checkbox" className="checkbox mt-1" checked={c1} onChange={e=>setC1(e.target.checked)} />
        <span>I agree to the terms of the Personal Data Protection Act (PDPA) and consent to the processing of my personal data for the purpose of this application.</span>
      </label>
      <label className="flex items-start gap-3 text-sm text-white/80 mt-3">
        <input type="checkbox" className="checkbox mt-1" checked={c2} onChange={e=>setC2(e.target.checked)} />
        <span>I consent to the collection, use, and disclosure of my data for communication regarding Sun Life's products and services.</span>
      </label>
      <div className="text-center">
        <Link to="/advisor" className={`btn-primary mt-6 inline-flex ${disabled?'pointer-events-none opacity-60':''}`}>Proceed with Application</Link>
      </div>
    </div>
  )
}
