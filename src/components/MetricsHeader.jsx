import { DollarSign, AlertTriangle, TrendingUp, ShieldCheck, TrendingDown } from 'lucide-react'

export default function MetricsHeader({ identifiedLeaks, recoverableArr, isScanning, onToggleScan, capitalReclaimed }) {
  const stats = [
    {
      label: 'Total Monthly Spend',
      value: '$14,240',
      icon: DollarSign,
      trend: { label: '+12.4%', up: true },
      color: 'text-slate-100',
    },
    {
      label: 'Identified Billing Leaks',
      value: identifiedLeaks,
      icon: AlertTriangle,
      trend: { label: `${identifiedLeaks} active`, up: identifiedLeaks > 0 },
      color: identifiedLeaks > 0 ? 'text-amber-400' : 'text-emerald-400',
    },
    {
      label: 'Recoverable ARR',
      value: `$${recoverableArr.toLocaleString()}`,
      icon: TrendingUp,
      trend: { label: '/ year', up: true },
      color: 'text-emerald-400',
    },
    {
      label: 'Guardrail Protection',
      value: isScanning ? 'Active Scanning' : 'Bypassed',
      icon: ShieldCheck,
      toggle: true,
      color: isScanning ? 'text-emerald-400' : 'text-red-400',
      badge: isScanning ? 'Live' : 'High Risk',
      badgeColor: isScanning ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400',
    },
  ]

  return (
    <div className="space-y-4">
      {capitalReclaimed > 0 && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3 flex items-center gap-3 animate-flash">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-emerald-300 font-medium text-sm">
            Total Capital Reclaimed: <span className="text-emerald-200 font-bold">${capitalReclaimed.toLocaleString()}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                <div className={`p-2 rounded-lg bg-slate-800/80 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className={`text-2xl font-bold tracking-tight ${stat.color}`}>
                {stat.value}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {stat.trend && (
                  <span className={`text-xs font-medium flex items-center gap-1 ${stat.trend.up ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.trend.up ? '↑' : '↓'} {stat.trend.label}
                  </span>
                )}
                {stat.badge && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                )}
                {stat.toggle && (
                  <button
                    onClick={onToggleScan}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
                      isScanning ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-300 ${
                        isScanning ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
