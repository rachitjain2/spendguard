import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MetricsHeader from './components/MetricsHeader'
import BillingChart from './components/BillingChart'
import AnomalyFeed from './components/AnomalyFeed'
import IntegrationPortal from './components/IntegrationPortal'

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

  const handleDismissAlert = (id) => {
    const alert = alerts.find((a) => a.id === id)
    if (alert) {
      const annualCost = alert.severity === 'critical' ? alert.cost * 24 * 365 : alert.cost * 12
      setTotalRecovered((prev) => prev + annualCost)
    }
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 p-8 overflow-y-auto">
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
            <AnomalyFeed alerts={alerts} onDismissAlert={handleDismissAlert} />
          </div>
        </div>

        <IntegrationPortal />
      </main>
    </div>
  )
}
