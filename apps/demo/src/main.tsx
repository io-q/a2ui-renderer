import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { A2UIProvider } from '@a2ui-renderer/react'
import { createFunctionRegistry } from '@a2ui-renderer/stdlib'
import { componentMap } from './components'

const functionRegistry = createFunctionRegistry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <A2UIProvider
      components={componentMap}
      functionRegistry={functionRegistry}
      onAction={(action) => {
        console.log('Action dispatched:', action)
        alert(`Action: ${action.name}\nContext: ${JSON.stringify(action.context, null, 2)}`)
      }}
    >
      <App />
    </A2UIProvider>
  </StrictMode>,
)
