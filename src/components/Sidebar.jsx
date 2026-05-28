import { useEffect, useState } from 'react'
import { Shield, LayoutDashboard, Link, ScrollText, Settings, Sun, Moon } from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
  { id: 'integrations', label: 'Connected Integrations', icon: Link },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }) {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('spendguard-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('spendguard-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse-dot" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">SpendGuard</h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-400/80">AI · Secured</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => { onTabChange(tab.id); if (onClose) onClose() }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
            SG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">SpendGuard AI</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Production · v1.0</p>
          </div>
          <button
            onClick={() => setDarkMode(p => !p)}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
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
