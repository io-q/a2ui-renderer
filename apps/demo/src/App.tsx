import { Simulator } from './components/Simulator'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 A2UI Renderer Demo</h1>
      </header>
      <main className="app-main">
        <Simulator />
      </main>
    </div>
  )
}

export default App
