import { useEffect, useState, useRef } from 'react'
import { Shield, LayoutDashboard, Link, ScrollText, Settings, Sun, Moon } from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }) {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('spendguard-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [pillStyle, setPillStyle] = useState({})
  const navRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('spendguard-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector(`[data-tab-id="${activeTab}"]`)
      if (activeButton) {
        setPillStyle({
          transform: `translateY(${activeButton.offsetTop}px)`,
          height: `${activeButton.offsetHeight}px`,
        })
      }
    }
  }, [activeTab])

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-white dark:border-slate-900 animate-pulse-dot" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">SpendGuard</h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-success/80">AI · Secured</p>
          </div>
        </div>
      </div>

      <nav ref={navRef} className="flex-1 p-3 space-y-1 relative">
        <div 
          className="absolute left-3 right-3 bg-gradient-to-r from-primary to-accent rounded-lg shadow-md shadow-primary/20 transition-all duration-300 ease-in-out"
          style={pillStyle}
        />
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => { onTabChange(tab.id); if (onClose) onClose() }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                active
                  ? 'text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Logo" className="w-7 h-7" />
            <span className="text-xs font-semibold">SpendGuard</span>
          </div>
          <button
            onClick={() => setDarkMode(p => !p)}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden md:flex w-64 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/80 flex-col shrink-0">
        {sidebarContent}
      </aside>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/80 flex flex-col shadow-2xl shadow-black/40 animate-in slide-in-from-left-2">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}
