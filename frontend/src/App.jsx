import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Genres from './components/Genres'
import './css/sass/main.scss'
import Users from './components/Users'
import Genre from './components/Genre'
import { UserProvider } from './components/UserContext'
import { useLocation } from 'react-router-dom'

//Kilde: https://stackoverflow.com/questions/35583334/react-router-get-full-current-path-name
const AppContent = () => {
  let location = useLocation()

return (
  <>
  {/*Dersom man er på Users-siden skal ikke Header synes*/}
  {location.pathname !== '/users' && <Header />}
  <Routes>
      <Route path='/users' element={<Users />} />
      <Route path='/' element={<Home />} />
      <Route path='/genres' element={<Genres />} />
      <Route path='/genres/:genre' element={<Genre />} />
  </Routes>
  </>
)
}


function App() {
  
  return (
    <>
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
    </>
  )
}

export default App