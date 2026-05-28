import { Shield, LayoutDashboard, Link, ScrollText, Settings } from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
  { id: 'integrations', label: 'Connected Integrations', icon: Link },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">SpendGuard</h1>
            <span className="text-slate-400 text-xs tracking-wider uppercase">AI</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-xs font-medium tracking-wide">Secured</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20 border border-slate-700/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : ''}`} />
              {tab.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-800/30">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            SG
          </div>
          <div className="text-sm leading-tight">
            <p className="text-white font-medium">Free Tier</p>
            <p className="text-slate-500 text-xs mt-0.5">Upgrade to Pro</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
