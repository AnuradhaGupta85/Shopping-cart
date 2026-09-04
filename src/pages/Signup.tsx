import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { validateEmail, validatePassword, validateRequired } from '../validation/forms'

export function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('')
  const errors = { name: validateRequired(name, 'Full name'), email: validateEmail(email), password: validatePassword(password), confirmPassword: !confirmPassword ? 'Please confirm your password.' : password !== confirmPassword ? 'Passwords do not match.' : '' }

  function submit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.values(errors).some(Boolean)) return
    setStatus('Your account has been created. Taking you to the shop…')
    window.setTimeout(() => navigate('/catalog'), 800)
  }

  function field(label: string, value: string, onChange: (value: string) => void, error: string, type = 'text', autoComplete?: string) {
    return <label className="block text-sm font-semibold">{label}<input type={type} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-card border border-border px-3 text-sm font-normal" aria-invalid={submitted && !!error} />{submitted && error && <span className="mt-1 block text-xs font-normal text-danger">{error}</span>}</label>
  }

  return <AuthShell title="Create your account" subtitle="Save your details for a faster, more personal checkout.">
    <form noValidate onSubmit={submit} className="mt-7 space-y-4">
      {field('Full name', name, setName, errors.name, 'text', 'name')}
      {field('Email address', email, setEmail, errors.email, 'email', 'email')}
      {field('Password', password, setPassword, errors.password, 'password', 'new-password')}
      {field('Confirm password', confirmPassword, setConfirmPassword, errors.confirmPassword, 'password', 'new-password')}
      {status && <p role="status" className="rounded-card border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-success">{status}</p>}
      <button className="h-11 w-full rounded-card bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover">Create account</button>
    </form>
    <p className="mt-6 text-center text-sm text-muted">Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
  </AuthShell>
}
