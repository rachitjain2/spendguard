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
  blue: { icon: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  rose: { icon: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' },
  emerald: { icon: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
  amber: { icon: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
}

function KpiCard({ icon: Icon, label, colorKey, badge, children }) {
  const cs = colorStyles[colorKey]
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/80 hover:translate-y-[-2px] shadow-xl shadow-black/5 dark:shadow-black/40">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${cs.bg} border ${cs.border} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${cs.icon}`} />
        </div>
        {badge}
      </div>
      <p className="text-h4 text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      {children}
    </div>
  )
}

export default function MetricsHeader({ alerts, alertsCount, totalRecovered }) {
  const totalLeakCost = alerts.reduce((sum, a) => sum + a.cost, 0)
  const recoverableArr = totalLeakCost * 12
  const guardrailState = alerts.length > 0 ? 'Active Scanning' : 'Bypassed / High Risk'
  const guardrailStateColor = alerts.length > 0 ? 'success' : 'danger'

  const dynamicValues = {
    leaks: { value: String(alertsCount), sub: 'active incidents' },
    recoverable: { value: `$${recoverableArr.toLocaleString()}`, sub: '/yr projected' },
    guardrail: {
      value: guardrailState,
      badge: guardrailStateColor === 'success' ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20',
      pulseDot: guardrailStateColor === 'success',
    },
  }

  return (
    <>
      {totalRecovered > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 backdrop-blur-sm animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-h3 text-success">
                Total Capital Reclaimed
              </p>
              <h1 className="text-h1 text-white">
                ${totalRecovered.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiCards.map((card) => {
          const Icon = card.icon

          if (card.dynamic) {
            const dyn = dynamicValues[card.id]
            if (card.id === 'guardrail') {
              return (
                <KpiCard
                  key={card.id}
                  icon={Icon}
                  label={card.label}
                  colorKey={card.color}
                  badge={
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${dyn.badge}`}>
                      {dyn.pulseDot && <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />}
                      {!dyn.pulseDot && <span className="w-1.5 h-1.5 rounded-full bg-danger" />}
                      {dyn.value}
                    </div>
                  }
                >
                  <h2 className="text-h2">
                    {alerts.length > 0 ? '4 rules active' : '0 rules active'}
                  </h2>
                </KpiCard>
              )
            }

            return (
              <KpiCard
                key={card.id}
                icon={Icon}
                label={card.label}
                colorKey={card.color}
                badge={dyn.sub && (
                  <span className="text-caption uppercase tracking-wider">{dyn.sub}</span>
                )}
              >
                <h2 className="text-h2">{dyn.value}</h2>
              </KpiCard>
            )
          }

          return (
            <KpiCard
              key={card.id}
              icon={Icon}
              label={card.label}
              colorKey={card.color}
              badge={card.trend && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  card.trend.direction === 'up'
                    ? 'bg-danger/10 text-danger border border-danger/20'
                    : 'bg-success/10 text-success border border-success/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${card.trend.direction === 'up' ? 'bg-danger' : 'bg-success'}`} />
                  {card.trend.value}
                </span>
              )}
            >
              <h1 className="text-h1">{card.value}</h1>
            </KpiCard>
          )
        })}
      </div>
    </>
  )
}
