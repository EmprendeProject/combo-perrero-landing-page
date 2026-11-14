import { useState, useEffect } from 'react'
import Home from './Home.jsx'
import Caracas from './Caracas.jsx'

function normalizePath(pathname) {
  const clean = pathname.toLowerCase().replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname))
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  if (currentPath === '/caracas') {
    return <Caracas />
  }

  return <Home />
}
