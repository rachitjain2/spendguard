import { ScrollText } from 'lucide-react'

const logs = [
  { date: '2026-05-28', vendor: 'OpenAI', event: 'API key rotated for prod-hx9', amount: '$0.00', status: 'Resolved' },
  { date: '2026-05-27', vendor: 'AWS', event: 'Billing spike +340% on EC2 compute', amount: '$12,450', status: 'Flagged' },
  { date: '2026-05-26', vendor: 'Stripe', event: 'Fee waiver applied for Q2 volume', amount: '$890', status: 'Resolved' },
  { date: '2026-05-25', vendor: 'OpenAI', event: 'New billing threshold crossed', amount: '$8,200', status: 'Pending' },
  { date: '2026-05-24', vendor: 'AWS', event: 'S3 storage tier downgrade completed', amount: '$320', status: 'Resolved' },
  { date: '2026-05-23', vendor: 'Stripe', event: 'Duplicate charge detected and refunded', amount: '$1,200', status: 'Flagged' },
  { date: '2026-05-22', vendor: 'OpenAI', event: 'Usage limit increased to $10k/mo', amount: '$0.00', status: 'Resolved' },
  { date: '2026-05-21', vendor: 'AWS', event: 'Unused reserved instance terminated', amount: '$2,100', status: 'Pending' },
]

const statusStyles = {
  Resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Flagged: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export default function AuditLogs() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-xl shadow-black/5 dark:shadow-black/40">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <ScrollText className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Audit Logs</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80">
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 pr-4">Date</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 pr-4">Vendor</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 pr-4">Event</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 pr-4">Amount</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b border-slate-200/60 dark:border-slate-800/40 last:border-0">
                <td className="py-3 pr-4 text-xs text-slate-500 dark:text-slate-400">{log.date}</td>
                <td className="py-3 pr-4 text-xs font-medium text-slate-700 dark:text-slate-200">{log.vendor}</td>
                <td className="py-3 pr-4 text-xs text-slate-500 dark:text-slate-400">{log.event}</td>
                <td className="py-3 pr-4 text-xs text-slate-500 dark:text-slate-400">{log.amount}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusStyles[log.status]}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
