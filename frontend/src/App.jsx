import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Genre from './components/Genre'
import './css/sass/main.scss'
import Users from './components/Users'

function App() {
  
  return (
    <>
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/genre' element={<Genre />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
    </>
  )
}

export default App