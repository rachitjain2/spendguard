import { useState } from 'react'
import { Mail, Bell, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true })
  const [budgetLimits, setBudgetLimits] = useState({ openai: 5000, aws: 4000, stripe: 3000 })

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-xl shadow-black/5 dark:shadow-black/40">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { key: 'email', label: 'Email Alerts', desc: 'Receive billing alerts via email', icon: Mail },
            { key: 'push', label: 'Push Notifications', desc: 'Real-time push notifications', icon: Bell },
            { key: 'weekly', label: 'Weekly Digest', desc: 'Weekly spend summary report', icon: Shield },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{item.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                    notifications[item.key] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-xl shadow-black/5 dark:shadow-black/40">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Budget Limits</h3>
        <div className="space-y-3">
          {[
            { key: 'openai', label: 'OpenAI Monthly Cap', desc: 'Maximum monthly spend for OpenAI API' },
            { key: 'aws', label: 'AWS Monthly Cap', desc: 'Maximum monthly spend for AWS services' },
            { key: 'stripe', label: 'Stripe Monthly Cap', desc: 'Maximum monthly spend for Stripe fees' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">$</span>
                <input
                  type="number"
                  value={budgetLimits[item.key]}
                  onChange={(e) => setBudgetLimits(p => ({ ...p, [item.key]: Math.max(0, Number(e.target.value)) }))}
                  className="w-24 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-sm text-slate-700 dark:text-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500/40"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-xl shadow-black/5 dark:shadow-black/40">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Team Members</h3>
        <div className="space-y-3">
          {[
            { name: 'Alex Chen', email: 'alex@spendguard.io', role: 'Admin' },
            { name: 'Sarah Kim', email: 'sarah@spendguard.io', role: 'Viewer' },
          ].map((member) => (
            <div key={member.email} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{member.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{member.email}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                member.role === 'Admin'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-700/40 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700/50'
              }`}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
