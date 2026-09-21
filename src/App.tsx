import './styles/App.css'
import { useEffect, useState, type ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged, type User } from 'firebase/auth'
import About from './routing/About'
import Milestone from './components/Milestone'
import Project from './components/Project'
import Gallery from './components/Gallery'
import Article from './components/Article'
import Tutorial from './components/Tutorial'
import Post from './components/Post'
import Login from './routing/Login'
import Signup from './routing/Signup'
import { auth } from './utils/firebase'

// The PublicOnly component restricts access to its children for authenticated users
function PublicOnly({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    setLoading(false)
  }), [])

  if (loading) return null
  if (user) return <Navigate to="/" replace />

  return children
}

// The Home component renders the main sections of the homepage
function Home() {
  return (
    <>
      <About />
      <Milestone />
      <Project />
      <Gallery />
      <Article />
      <Tutorial />
    </>
  )
}
// The App component sets up the routing for the application
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/signup" element={<PublicOnly><Signup /></PublicOnly>} />
    </Routes>
  )
}

export default App
