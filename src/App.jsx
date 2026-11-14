import { useState, useEffect } from 'react'
import Home from './Home.jsx'
import YummyLanding from './YummyLanding.jsx'

// Rutas antiguas que redirigen a la nueva (para no romper enlaces ya compartidos)
const REDIRECTS = {
  '/caracas': '/yummycaracas',
}

const YUMMY_ROUTES = {
  '/yummycaracas': 'caracas',
  '/yummymaracay': 'maracay',
}

function normalizePath(pathname) {
  const clean = pathname.toLowerCase().replace(/\/+$/, '')
  const path = clean === '' ? '/' : clean
  return REDIRECTS[path] ?? path
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname))

  // Si la URL era una ruta antigua, la reemplaza en la barra sin recargar
  useEffect(() => {
    if (window.location.pathname.toLowerCase().replace(/\/+$/, '') !== currentPath) {
      window.history.replaceState(null, '', currentPath + window.location.search + window.location.hash)
    }
  }, [currentPath])

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname))
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const city = YUMMY_ROUTES[currentPath]
  if (city) {
    return <YummyLanding key={city} city={city} />
  }

  return <Home />
}
