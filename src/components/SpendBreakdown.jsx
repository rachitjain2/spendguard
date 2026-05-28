import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'OpenAI Infrastructure', value: 4200, color: '#3b82f6' },
  { name: 'AWS Compute', value: 3100, color: '#f59e0b' },
  { name: 'Stripe Fees', value: 2800, color: '#10b981' },
  { name: 'SaaS Seats', value: 2400, color: '#8b5cf6' },
  { name: 'Other', value: 1740, color: '#64748b' },
]

const total = data.reduce((sum, d) => sum + d.value, 0)

export default function SpendBreakdown() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-xl shadow-black/5 dark:shadow-black/40">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">Spend Breakdown</h2>
      <div className="flex flex-col items-center">
        <div className="relative h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">${total.toLocaleString()}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Spend</p>
          </div>
        </div>
        <div className="w-full mt-6 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">${item.value.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 w-10 text-right">{Math.round(item.value / total * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
