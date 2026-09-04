import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'

export default function App() {
  return <div className="min-h-screen md:flex"><Sidebar /><div className="min-w-0 flex-1"><TopBar /><Outlet /></div></div>
}
