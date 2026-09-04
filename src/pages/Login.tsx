import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { validateEmail, validatePassword } from '../validation/forms'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('')
  const emailError = validateEmail(email)
  const passwordError = validatePassword(password)

  function submit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (emailError || passwordError) return
    setStatus('Welcome back! Taking you to the shop…')
    window.setTimeout(() => navigate('/catalog'), 700)
  }

  return <AuthShell title="Welcome back" subtitle="Sign in to manage your orders and checkout faster.">
    <form noValidate onSubmit={submit} className="mt-7 space-y-4">
      <label className="block text-sm font-semibold">Email address<input autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-card border border-border px-3 text-sm font-normal" aria-invalid={submitted && !!emailError} />{submitted && emailError && <span className="mt-1 block text-xs font-normal text-danger">{emailError}</span>}</label>
      <label className="block text-sm font-semibold">Password<input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-card border border-border px-3 text-sm font-normal" aria-invalid={submitted && !!passwordError} />{submitted && passwordError && <span className="mt-1 block text-xs font-normal text-danger">{passwordError}</span>}</label>
      <button type="button" onClick={() => setStatus('If an account matches your email, password reset instructions will be sent shortly.')} className="text-sm font-semibold text-primary hover:underline">Forgot password?</button>
      {status && <p role="status" className="rounded-card border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-success">{status}</p>}
      <button className="h-11 w-full rounded-card bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover">Sign in</button>
    </form>
    <p className="mt-6 text-center text-sm text-muted">New here? <Link to="/signup" className="font-semibold text-primary hover:underline">Create an account</Link></p>
  </AuthShell>
}
