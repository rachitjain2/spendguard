import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { ChevronDown, Zap, Cloud, CreditCard } from 'lucide-react'

const profileData = {
  openai: Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    cost: i < 28
      ? Math.round(200 + Math.random() * 200)
      : Math.round(200 + Math.pow(2, i - 25) * 60 + Math.random() * 500),
  })),
  aws: Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    cost: Math.round(1200 + Math.random() * 300),
  })),
  stripe: Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    cost: Math.round(500 + Math.random() * 400 + Math.sin(i * 0.5) * 100),
  })),
}

const profiles = [
  { id: 'openai', label: 'OpenAI Infrastructure', icon: Zap },
  { id: 'aws', label: 'AWS Elastic Compute', icon: Cloud },
  { id: 'stripe', label: 'Stripe Transactional Fees', icon: CreditCard },
]

const budgetCap = 3000

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        <p className="text-white font-bold text-lg">${payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function BillingChart({ autoKillEnabled, onToggleAutoKill }) {
  const [selectedProfile, setSelectedProfile] = useState('openai')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const currentProfile = profiles.find((p) => p.id === selectedProfile)
  const ProfileIcon = currentProfile?.icon
  const data = profileData[selectedProfile]

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 hover:text-white transition-colors border border-slate-700/50"
          >
            {ProfileIcon && <ProfileIcon className="w-4 h-4 text-emerald-400" />}
            {currentProfile?.label}
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute top-full mt-1 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                {profiles.map((p) => {
                  const Icon = p.icon
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedProfile(p.id); setDropdownOpen(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        selectedProfile === p.id
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-400" />
                      {p.label}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-xs text-slate-400 font-medium">Auto-Kill Budget Cap</span>
          <button
            onClick={onToggleAutoKill}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              autoKillEnabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                autoKillEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCostSpike" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="day"
              stroke="#475569"
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              interval={4}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cost"
              stroke={autoKillEnabled && data.some((d) => d.cost > budgetCap) ? '#ef4444' : '#10b981'}
              fill={autoKillEnabled && data.some((d) => d.cost > budgetCap) ? 'url(#colorCostSpike)' : 'url(#colorCost)'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#10b981', stroke: '#0f172a', strokeWidth: 2 }}
            />
            {autoKillEnabled && (
              <ReferenceLine
                y={budgetCap}
                stroke="#f59e0b"
                strokeDasharray="6 4"
                strokeWidth={2}
                label={{
                  value: `Budget Cap $${budgetCap.toLocaleString()}`,
                  fill: '#f59e0b',
                  fontSize: 11,
                  position: 'right',
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
