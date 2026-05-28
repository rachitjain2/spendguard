import { useState } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, Zap, X } from 'lucide-react'

const severityConfig = {
  critical: {
    icon: AlertCircle,
    dot: 'bg-rose-500',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    label: 'Warning',
  },
  optimized: {
    icon: CheckCircle,
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    label: 'Optimized',
  },
}

export default function AnomalyFeed({ alerts, onDismissAlert }) {
  const [dismissing, setDismissing] = useState(null)

  const handleDismiss = (id) => {
    setDismissing(id)
    setTimeout(() => {
      onDismissAlert(id)
      setDismissing(null)
    }, 400)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Live Anomaly Detection</h2>
        <span className="text-[10px] font-medium text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/50">
          {alerts.length} active
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-sm font-medium text-slate-300">No active threats</p>
          <p className="text-xs text-slate-500 mt-1">All billing anomalies resolved</p>
        </div>
      ) : (
        alerts.map((alert) => {
          const sev = severityConfig[alert.severity]
          const Icon = sev.icon
          const isDismissing = dismissing === alert.id

          return (
            <div
              key={alert.id}
              className={`bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:border-slate-700/80 hover:translate-y-[-2px] shadow-xl shadow-black/40 ${
                isDismissing ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-lg ${sev.badge} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${sev.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                        {sev.label}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100 leading-snug">{alert.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{alert.details}</p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Cost Impact</span>
                  <p className="text-lg font-extrabold tracking-tight text-white">
                    ${alert.cost.toLocaleString()}<span className="text-xs font-medium text-slate-400">{alert.costUnit}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all rounded-lg"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {alert.action}
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
