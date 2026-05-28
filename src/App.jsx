import { useState, useEffect } from 'react'
import { Shield, Menu } from 'lucide-react'
import Sidebar from './components/Sidebar'
import MetricsHeader from './components/MetricsHeader'
import BillingChart from './components/BillingChart'
import AnomalyFeed from './components/AnomalyFeed'
import IntegrationPortal from './components/IntegrationPortal'
import SpendBreakdown from './components/SpendBreakdown'
import AuditLogs from './components/AuditLogs'
import SettingsPage from './components/Settings'

const initialAlerts = [
  {
    id: 1,
    severity: 'critical',
    title: 'Rogue OpenAI API Key Loop Detected',
    details: 'Org ID: prod-hx9. Latency overhead: 400req/min.',
    cost: 180,
    costUnit: '/ hr',
    action: 'Isolate Threat',
  },
  {
    id: 2,
    severity: 'warning',
    title: 'Zombie Seats Detected on Abstract CRM',
    details: '4 seats assigned to ex-employees (@company.com).',
    cost: 320,
    costUnit: '/ mo',
    action: 'Claim Savings',
  },
  {
    id: 3,
    severity: 'optimized',
    title: 'Unused Tier Upgrade Threshold',
    details: 'AWS S3 storage sitting at 5% usage capacity on a premium data tier.',
    cost: 450,
    costUnit: '/ mo',
    action: 'Claim Savings',
  },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [alerts, setAlerts] = useState(initialAlerts)
  const [totalRecovered, setTotalRecovered] = useState(0)
  const [autoKill, setAutoKill] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingAlerts(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleDismissAlert = (id) => {
    const alert = alerts.find((a) => a.id === id)
    if (alert) {
      const annualCost = alert.severity === 'critical' ? alert.cost * 24 * 365 : alert.cost * 12
      setTotalRecovered((prev) => prev + annualCost)
    }
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'integrations':
        return <IntegrationPortal fullPage />
      case 'audit':
        return <AuditLogs />
      case 'settings':
        return <SettingsPage />
      default:
        return (
          <>
            <MetricsHeader
              alerts={alerts}
              alertsCount={alerts.length}
              totalRecovered={totalRecovered}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <BillingChart autoKill={autoKill} onToggleAutoKill={() => setAutoKill((p) => !p)} />
              </div>
              <div className="lg:col-span-1">
                <AnomalyFeed alerts={alerts} onDismissAlert={handleDismissAlert} isLoading={isLoadingAlerts} />
              </div>
            </div>

            <div className="mt-6">
              <SpendBreakdown />
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <nav className="flex md:hidden items-center justify-between h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-4 -mx-4 -mt-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">SpendGuard</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>

        {renderContent()}
      </main>
    </div>
  )
}
