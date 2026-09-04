import React, { ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<{ children: ReactNode }, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
          <div className="rounded-full bg-red-50 p-4 text-danger"><AlertTriangle size={32} /></div>
          <h1 className="mt-5 text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-muted">We could not complete that cart action. Your saved cart is still available.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => this.setState({ hasError: false })} className="inline-flex items-center gap-2 rounded-card bg-primary px-4 py-2.5 text-sm font-semibold text-white"><RotateCcw size={16} />Try again</button>
            <Link to="/catalog" className="rounded-card border border-border px-4 py-2.5 text-sm font-semibold">Return to catalog</Link>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
