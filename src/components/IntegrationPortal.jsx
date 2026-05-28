import { useState } from 'react'
import { Building2, Globe, Bot, Cloud, CheckCircle, AlertTriangle, Link2, Link, Plus, X } from 'lucide-react'

const integrations = [
  {
    id: 'plaid',
    name: 'Plaid Financial Gateway',
    icon: Building2,
    status: 'connected',
    description: 'Banking & transaction data sync',
  },
  {
    id: 'google',
    name: 'Google Workspace Admin',
    icon: Globe,
    status: 'connected',
    description: 'Directory & seat management',
  },
  {
    id: 'openai',
    name: 'OpenAI Developer Sandbox',
    icon: Bot,
    status: 'attention',
    description: 'API usage & cost tracking',
  },
  {
    id: 'aws',
    name: 'AWS Cost Explorer API',
    icon: Cloud,
    status: 'disconnected',
    description: 'Infrastructure spend analytics',
  },
]

const statusStyles = {
  connected: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: CheckCircle,
    dot: 'bg-emerald-400',
    label: 'Connected',
  },
  attention: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    icon: AlertTriangle,
    dot: 'bg-amber-400',
    label: 'Re-authenticate',
  },
  disconnected: {
    badge: 'bg-slate-700/40 text-slate-400 border-slate-700/50',
    icon: Link2,
    dot: 'bg-slate-500',
    label: 'Not Linked',
  },
}

export default function IntegrationPortal({ fullPage }) {
  const [showModal, setShowModal] = useState(false)

  const content = (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Connected Integrations</h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600/60 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((integration) => {
          const ss = statusStyles[integration.status]
          const Icon = integration.icon

          return (
            <div
              key={integration.id}
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/80 hover:translate-y-[-2px] shadow-xl shadow-black/5 dark:shadow-black/40"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${
                  integration.status === 'connected'
                    ? 'bg-emerald-500/10 border border-emerald-500/20'
                    : integration.status === 'attention'
                    ? 'bg-amber-500/10 border border-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50'
                } flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${
                    integration.status === 'connected'
                      ? 'text-emerald-400'
                      : integration.status === 'attention'
                      ? 'text-amber-400'
                      : 'text-slate-500 dark:text-slate-500'
                  }`} />
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${ss.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />
                  {ss.label}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-100 mb-1">{integration.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-500">{integration.description}</p>
              <button
                className={`mt-4 w-full py-2 rounded-lg text-xs font-medium transition-all ${
                  integration.status === 'disconnected'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98]'
                    : integration.status === 'attention'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 active:scale-[0.98]'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700/60 active:scale-[0.98]'
                }`}
              >
                {integration.status === 'disconnected' ? 'Connect' : integration.status === 'attention' ? 'Re-authenticate' : 'Configure'}
              </button>
            </div>
          )
        })}
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-30 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-2xl shadow-black/40 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Add Integration</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-md text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">Select a new service to connect to SpendGuard.</p>
              <div className="space-y-2">
                {['Slack', 'Datadog', 'GitHub', 'Jira'].map((name) => (
                  <button
                    key={name}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )

  if (fullPage) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Link className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Connected Integrations</h1>
            <p className="text-xs text-slate-500 dark:text-slate-500">Manage your service connections</p>
          </div>
        </div>
        {content}
      </div>
    )
  }

  return <div className="mt-8">{content}</div>
}
