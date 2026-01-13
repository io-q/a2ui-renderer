import { useDataValue } from '@a2ui-renderer/react'
import { currency, relativeTime } from '@a2ui-renderer/stdlib'
import { componentMap } from './components'
import './App.css'

const { Text, TextField, Button, Card, Column, Row } = componentMap

function App() {
  // Demo: Direct use of hooks and stdlib
  const [name] = useDataValue<string>('/user/name')
  const [email] = useDataValue<string>('/user/email')

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 A2UI Renderer Demo</h1>
        <p>Showcasing <code>@a2ui-renderer/stdlib</code> and <code>@a2ui-renderer/react</code></p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>📝 Two-Way Data Binding</h2>
          <Card id="form-card">
            <Column id="form-column">
              <TextField
                id="name-input"
                component="TextField"
                label="Your Name"
                value="/user/name"
                placeholder="Enter your name..."
              />
              <TextField
                id="email-input"
                component="TextField"
                label="Email Address"
                value="/user/email"
                placeholder="you@example.com"
                variant="email"
              />
              <Row id="button-row">
                <Button
                  id="submit-btn"
                  component="Button"
                  label="Submit Form"
                  variant="primary"
                  action={{
                    name: "submit_form",
                    context: {
                      name: { path: "/user/name" },
                      email: { path: "/user/email" }
                    }
                  }}
                />
                <Button
                  id="reset-btn"
                  component="Button"
                  label="Reset"
                  variant="secondary"
                  action={{ name: "reset_form" }}
                />
              </Row>
            </Column>
          </Card>
        </section>

        <section className="demo-section">
          <h2>📊 Live Data Preview</h2>
          <Card id="preview-card">
            <Column id="preview-column">
              <Text id="name-preview" component="Text" text={`Name: ${name || '(empty)'}`} />
              <Text id="email-preview" component="Text" text={`Email: ${email || '(empty)'}`} />
            </Column>
          </Card>
        </section>

        <section className="demo-section">
          <h2>🧮 StdLib Formatters</h2>
          <Card id="formatters-card">
            <Column id="formatters-column">
              <div className="formatter-demo">
                <strong>currency(1234.56, 'USD'):</strong>
                <code>{currency(1234.56, 'USD')}</code>
              </div>
              <div className="formatter-demo">
                <strong>currency(1234.56, 'EUR'):</strong>
                <code>{currency(1234.56, 'EUR')}</code>
              </div>
              <div className="formatter-demo">
                <strong>relativeTime(new Date()):</strong>
                <code>{relativeTime(new Date())}</code>
              </div>
              <div className="formatter-demo">
                <strong>relativeTime(yesterday):</strong>
                <code>{relativeTime(Date.now() - 24 * 60 * 60 * 1000)}</code>
              </div>
            </Column>
          </Card>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with A2UI Renderer • Phase 1 Demo</p>
      </footer>
    </div>
  )
}

export default App
