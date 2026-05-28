import { useState } from 'react'
import { AlertTriangle, Bot, UserX, Server, ExternalLink, ShieldOff } from 'lucide-react'

const iconMap = {
  bot: Bot,
  'user-x': UserX,
  server: Server,
}

const alertConfigs = [
  {
    id: 1,
    title: 'Rogue OpenAI API Key Loop Detected',
    description: 'Org ID: prod-hx9. Latency overhead: 400 req/min.',
    cost: 180,
    costUnit: '/ hr',
    type: 'critical',
    icon: Bot,
    action: 'Isolate Threat',
  },
  {
    id: 2,
    title: 'Zombie Seats Detected on Abstract CRM',
    description: '4 seats assigned to ex-employees (@company.com).',
    cost: 320,
    costUnit: '/ mo',
    type: 'warning',
    icon: UserX,
    action: 'Isolate Threat',
  },
  {
    id: 3,
    title: 'Unused Tier Upgrade Threshold',
    description: 'AWS S3 storage at 5% usage on premium data tier.',
    cost: 450,
    costUnit: '/ mo',
    type: 'optimized',
    icon: Server,
    action: 'Claim Savings',
  },
]

const severityStyles = {
  critical: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    badge: 'bg-red-500/20 text-red-400',
    badgeLabel: 'Critical',
    iconColor: 'text-red-400',
    btn: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30',
  },
  warning: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    badge: 'bg-amber-500/20 text-amber-400',
    badgeLabel: 'Warning',
    iconColor: 'text-amber-400',
    btn: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  optimized: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-400',
    badgeLabel: 'Optimized',
    iconColor: 'text-emerald-400',
    btn: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
}

export default function AnomalyFeed({ alerts, onResolveAlert }) {
  const [exitingIds, setExitingIds] = useState(new Set())

  const handleAction = (alert) => {
    setExitingIds((prev) => new Set([...prev, alert.id]))
    setTimeout(() => {
      onResolveAlert(alert)
      setExitingIds((prev) => {
        const next = new Set(prev)
        next.delete(alert.id)
        return next
      })
    }, 400)
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <ShieldOff className="w-5 h-5 text-amber-400" />
          <h2 className="text-white font-semibold text-sm">Live Anomaly Feed</h2>
        </div>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-md">
          {alerts.length} active
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const styles = severityStyles[alert.type]
          const isExiting = exitingIds.has(alert.id)
          const Icon = iconMap[alert.icon] || AlertTriangle

          return (
            <div
              key={alert.id}
              className={`border rounded-xl p-4 transition-all duration-400 ${styles.border} ${styles.bg} ${
                isExiting ? 'animate-slide-out' : 'animate-slide-in'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-slate-800/80 ${styles.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm font-semibold truncate">{alert.title}</h3>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${styles.badge}`}>
                      {styles.badgeLabel}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mb-1">{alert.description}</p>
                  <p className="text-slate-300 text-sm font-mono">
                    <span className="text-emerald-400 font-bold">${alert.cost.toLocaleString()}</span>
                    <span className="text-slate-500 text-xs ml-0.5">{alert.costUnit}</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleAction(alert)}
                  disabled={isExiting}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200 disabled:opacity-50 ${styles.btn}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {alert.action}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <ShieldOff className="w-10 h-10 text-emerald-500/50 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">All threats resolved</p>
          <p className="text-slate-600 text-xs mt-1">No active anomalies detected</p>
        </div>
      )}
    </div>
  )
}
