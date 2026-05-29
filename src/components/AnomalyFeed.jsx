import { useState } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, Zap, X } from 'lucide-react'

const severityConfig = {
  critical: {
    icon: AlertCircle,
    dot: 'bg-danger',
    badge: 'bg-danger/10 text-danger border-danger/20',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    dot: 'bg-warning',
    badge: 'bg-warning/10 text-warning border-warning/20',
    label: 'Warning',
  },
  optimized: {
    icon: CheckCircle,
    dot: 'bg-success',
    badge: 'bg-success/10 text-success border-success/20',
    label: 'Optimized',
  },
}

function SkeletonCard() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-xl shadow-black/5 dark:shadow-black/40 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2">
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded mb-4" />
      <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
    </div>
  )
}

export default function AnomalyFeed({ alerts, onDismissAlert, isLoading }) {
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
        <h2 className="text-h4 text-slate-500 dark:text-slate-400">Live Anomaly Detection</h2>
        <span className="text-caption bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700/50">
          {alerts.length} active
        </span>
      </div>

      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : alerts.length === 0 ? (
        <div className="bg-white/80 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 rounded-xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <p className="text-h3 text-slate-700 dark:text-slate-300">No active threats</p>
          <p className="text-caption mt-1">All billing anomalies resolved</p>
        </div>
      ) : (
        alerts.map((alert) => {
          const sev = severityConfig[alert.severity]
          const Icon = sev.icon
          const isDismissing = dismissing === alert.id

          return (
            <div
              key={alert.id}
              className={`bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/80 hover:translate-y-[-2px] shadow-xl shadow-black/5 dark:shadow-black/40 ${
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
                    <h3 className="text-h3 leading-snug">{alert.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-body leading-relaxed mb-4">{alert.details}</p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-caption uppercase tracking-wider">Cost Impact</span>
                  <p className="text-h2">
                    ${alert.cost.toLocaleString()}<span className="text-caption font-medium">{alert.costUnit}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white text-xs font-medium shadow-lg shadow-primary/20 active:scale-[0.98] transition-all rounded-lg"
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
