import { DollarSign, Bug, TrendingUp, ShieldAlert } from 'lucide-react'

const kpiCards = [
  {
    id: 'spend',
    label: 'Total Monthly Spend',
    icon: DollarSign,
    value: '$14,240',
    trend: { value: '+12.4%', direction: 'up' },
    color: 'blue',
  },
  {
    id: 'leaks',
    label: 'Identified Billing Leaks',
    icon: Bug,
    value: null,
    trend: null,
    color: 'rose',
    dynamic: true,
  },
  {
    id: 'recoverable',
    label: 'Recoverable ARR',
    icon: TrendingUp,
    value: null,
    trend: null,
    color: 'emerald',
    dynamic: true,
  },
  {
    id: 'guardrail',
    label: 'Guardrail Protection',
    icon: ShieldAlert,
    value: null,
    trend: null,
    color: 'amber',
    dynamic: true,
  },
]

const colorStyles = {
  blue: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  rose: { icon: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  amber: { icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
}

export default function MetricsHeader({ alerts, alertsCount, totalRecovered }) {
  const totalLeakCost = alerts.reduce((sum, a) => sum + a.cost, 0)
  const recoverableArr = totalLeakCost * 12
  const guardrailState = alerts.length > 0 ? 'Active Scanning' : 'Bypassed / High Risk'
  const guardrailStateColor = alerts.length > 0 ? 'emerald' : 'rose'

  const dynamicValues = {
    leaks: { value: String(alertsCount), sub: 'active incidents' },
    recoverable: { value: `$${recoverableArr.toLocaleString()}`, sub: '/yr projected' },
    guardrail: {
      value: guardrailState,
      badge: guardrailStateColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      pulseDot: guardrailStateColor === 'emerald',
    },
  }

  return (
    <>
      {totalRecovered > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-400">
                Total Capital Reclaimed
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-white">
                ${totalRecovered.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiCards.map((card) => {
          const cs = colorStyles[card.color]
          const Icon = card.icon

          if (card.dynamic) {
            const dyn = dynamicValues[card.id]
            if (card.id === 'guardrail') {
              return (
                <div
                  key={card.id}
                  className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:border-slate-700/80 hover:translate-y-[-2px] shadow-xl shadow-black/40"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${cs.bg} border ${cs.border} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${cs.icon}`} />
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${dyn.badge}`}>
                      {dyn.pulseDot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />}
                      {!dyn.pulseDot && <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                      {dyn.value}
                    </div>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{card.label}</p>
                  <p className="text-lg font-extrabold tracking-tight text-white">{dyn.value}</p>
                </div>
              )
            }

            return (
              <div
                key={card.id}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:border-slate-700/80 hover:translate-y-[-2px] shadow-xl shadow-black/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${cs.bg} border ${cs.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${cs.icon}`} />
                  </div>
                  {dyn.sub && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{dyn.sub}</span>
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{card.label}</p>
                <p className="text-lg font-extrabold tracking-tight text-white">{dyn.value}</p>
              </div>
            )
          }

          return (
            <div
              key={card.id}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:border-slate-700/80 hover:translate-y-[-2px] shadow-xl shadow-black/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${cs.bg} border ${cs.border} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${cs.icon}`} />
                </div>
                {card.trend && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    card.trend.direction === 'up'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${card.trend.direction === 'up' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                    {card.trend.value}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{card.label}</p>
              <p className="text-2xl font-extrabold tracking-tight text-white">{card.value}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
