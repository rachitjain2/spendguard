import { useState, useMemo } from 'react'
import Sidebar from './components/Sidebar'
import MetricsHeader from './components/MetricsHeader'
import BillingChart from './components/BillingChart'
import AnomalyFeed from './components/AnomalyFeed'
import IntegrationPortal from './components/IntegrationPortal'

const initialAlerts = [
  {
    id: 1,
    title: 'Rogue OpenAI API Key Loop Detected',
    description: 'Org ID: prod-hx9. Latency overhead: 400 req/min.',
    cost: 180,
    costUnit: '/ hr',
    type: 'critical',
    icon: 'bot',
    action: 'Isolate Threat',
  },
  {
    id: 2,
    title: 'Zombie Seats Detected on Abstract CRM',
    description: '4 seats assigned to ex-employees (@company.com).',
    cost: 320,
    costUnit: '/ mo',
    type: 'warning',
    icon: 'user-x',
    action: 'Isolate Threat',
  },
  {
    id: 3,
    title: 'Unused Tier Upgrade Threshold',
    description: 'AWS S3 storage at 5% usage on premium data tier.',
    cost: 450,
    costUnit: '/ mo',
    type: 'optimized',
    icon: 'server',
    action: 'Claim Savings',
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [alerts, setAlerts] = useState(initialAlerts)
  const [autoKillEnabled, setAutoKillEnabled] = useState(false)
  const [capitalReclaimed, setCapitalReclaimed] = useState(0)
  const [isScanning, setIsScanning] = useState(true)

  const identifiedLeaks = alerts.length
  const recoverableArr = useMemo(() => {
    return alerts.reduce((sum, a) => sum + a.cost * 12, 0)
  }, [alerts])

  const handleResolveAlert = (alert) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
    setCapitalReclaimed((prev) => prev + alert.cost * 12)
  }

  const handleToggleScan = () => setIsScanning((prev) => !prev)
  const handleToggleAutoKill = () => setAutoKillEnabled((prev) => !prev)

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 p-6 overflow-y-auto">
        <MetricsHeader
          identifiedLeaks={identifiedLeaks}
          recoverableArr={recoverableArr}
          isScanning={isScanning}
          onToggleScan={handleToggleScan}
          capitalReclaimed={capitalReclaimed}
        />

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="col-span-2">
            <BillingChart
              autoKillEnabled={autoKillEnabled}
              onToggleAutoKill={handleToggleAutoKill}
            />
          </div>
          <div className="col-span-1">
            <AnomalyFeed alerts={alerts} onResolveAlert={handleResolveAlert} />
          </div>
        </div>

        <div className="mt-4">
          <IntegrationPortal />
        </div>
      </main>
    </div>
  )
}

export default App
