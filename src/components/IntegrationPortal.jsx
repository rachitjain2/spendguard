import { Building, Globe, Bot, Cloud } from 'lucide-react'

const integrations = [
  {
    name: 'Plaid Financial Gateway',
    icon: Building,
    status: 'connected',
    statusLabel: 'Connected',
    statusColor: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    name: 'Google Workspace Admin Directory',
    icon: Globe,
    status: 'connected',
    statusLabel: 'Connected',
    statusColor: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    name: 'OpenAI Developer Sandbox',
    icon: Bot,
    status: 'attention',
    statusLabel: 'Re-authenticate',
    statusColor: 'bg-amber-500/20 text-amber-400',
  },
  {
    name: 'AWS Cost Explorer API',
    icon: Cloud,
    status: 'disconnected',
    statusLabel: 'Not Linked',
    statusColor: 'bg-slate-700 text-slate-400',
  },
]

const statusDots = {
  connected: 'bg-emerald-500',
  attention: 'bg-amber-500',
  disconnected: 'bg-slate-600',
}

export default function IntegrationPortal() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold text-sm">Connected Integrations</h2>
        <button className="text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium">
          + Add Integration
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {integrations.map((integration) => {
          const Icon = integration.icon
          return (
            <div
              key={integration.name}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Icon className="w-5 h-5 text-slate-300" />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${integration.statusColor}`}>
                  {integration.statusLabel}
                </span>
              </div>
              <p className="text-white text-sm font-medium">{integration.name}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`w-1.5 h-1.5 rounded-full ${statusDots[integration.status]}`} />
                <span className="text-slate-500 text-xs capitalize">{integration.status}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
