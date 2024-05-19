import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Genres from './components/Genres'
import './css/sass/main.scss'
import Users from './components/Users'
import Genre from './components/Genre'
import { UserProvider } from './components/UserContext'

function App() {
  
  return (
    <>
    <UserProvider>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/genres' element={<Genres />} />
        <Route path='/genres/:genre' element={<Genre />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
    </UserProvider>
    </>
  )
}

export default App