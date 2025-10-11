
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './index.css'
import Landing from './pages/Landing'
import Advisor from './pages/Advisor'
import Payment from './pages/Payment'
import { Sun, LogIn, UserPlus } from 'lucide-react'

function Nav(){
  const loc = useLocation()
  const link = (to:string, label:string) => (
    <Link to={to} className={`px-3 py-2 rounded-md text-sm ${loc.pathname===to?'text-white':'text-white/80 hover:text-white'}`}>{label}</Link>
  )
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
      <div className="container-max h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-white">
          <Sun className="w-5 h-5 text-yellow-400" /> <span>Sun Life Malaysia</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {link('/','Home')}
          <a className="px-3 py-2 text-white/80 hover:text-white" href="#plans">Plans</a>
          <a className="px-3 py-2 text-white/80 hover:text-white" href="#about">About Us</a>
          <a className="px-3 py-2 text-white/80 hover:text-white" href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="btn-outline text-sm"><LogIn className="w-4 h-4" /> Login</button>
          <button className="btn-primary text-sm"><UserPlus className="w-4 h-4" /> Sign Up</button>
        </div>
      </div>
    </header>
  )
}

function App(){
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<BrowserRouter><App/></BrowserRouter>)
