import { useState, useMemo } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { ChevronDown, Zap } from 'lucide-react'

const DAYS = 30

function generateOpenAI() {
  return Array.from({ length: DAYS }, (_, i) => {
    const day = i + 1
    let value
    if (day < 20) value = 200 + Math.random() * 150
    else if (day < 26) value = 400 + Math.random() * 200
    else if (day < 28) value = 1200 + Math.random() * 400
    else if (day < 29) value = 3500 + Math.random() * 500
    else value = 7800 + Math.random() * 1200
    return { day: `Day ${day}`, value: Math.round(value) }
  })
}

function generateAWS() {
  return Array.from({ length: DAYS }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.round(850 + Math.random() * 120),
  }))
}

function generateStripe() {
  return Array.from({ length: DAYS }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.round(420 + Math.random() * 380 + (i % 7 === 0 ? 200 : 0)),
  }))
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 shadow-2xl shadow-black/5 dark:shadow-black/60">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  )
}

export default function BillingChart({ autoKill, onToggleAutoKill }) {
  const [profileIndex, setProfileIndex] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [budgetCap, setBudgetCap] = useState(4000)

  const openaiData = useMemo(() => generateOpenAI(), [])
  const awsData = useMemo(() => generateAWS(), [])
  const stripeData = useMemo(() => generateStripe(), [])

  const PROFILES = useMemo(() => [
    { id: 'openai', name: 'OpenAI Infrastructure', data: openaiData, color: '#3b82f6' },
    { id: 'aws', name: 'AWS Elastic Compute', data: awsData, color: '#f59e0b' },
    { id: 'stripe', name: 'Stripe Transactional Fees', data: stripeData, color: '#10b981' },
  ], [openaiData, awsData, stripeData])

  const profile = PROFILES[profileIndex]

  const handleBudgetChange = (e) => {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val) && val > 0) {
      setBudgetCap(val)
    }
  }

  return (
    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-xl shadow-black/5 dark:shadow-black/40">
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600/60 transition-colors"
          >
            {profile.name}
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          </button>
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute top-full left-0 mt-1 w-56 z-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/60">
                {PROFILES.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => { setProfileIndex(i); setDropdownOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      i === profileIndex
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Auto-Kill Budget Cap</span>
            <button
              onClick={onToggleAutoKill}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                autoKill ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  autoKill ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <Zap className={`w-4 h-4 transition-colors duration-300 ${autoKill ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
          </label>
          {autoKill && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">$</span>
              <input
                type="number"
                value={budgetCap}
                onChange={handleBudgetChange}
                min="1"
                className="w-20 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-sm text-slate-700 dark:text-slate-200 px-2 py-1 focus:outline-none focus:border-blue-500/40"
              />
            </div>
          )}
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={profile.data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${profile.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={profile.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={profile.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickMargin={8}
              interval={4}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickMargin={8}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={profile.color}
              strokeWidth={2}
              fill={`url(#gradient-${profile.id})`}
              animationDuration={800}
            />
            {autoKill && (
              <ReferenceLine
                y={budgetCap}
                stroke="#ef4444"
                strokeDasharray="6 4"
                strokeWidth={2}
                label={{
                  value: `Budget Cap: $${budgetCap.toLocaleString()}`,
                  fill: '#ef4444',
                  fontSize: 11,
                  position: 'right',
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {autoKill && (
        <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse-dot" />
          <span className="text-xs font-medium text-rose-400">
            Auto-Kill engaged — spend capped at ${budgetCap.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}
