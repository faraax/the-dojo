import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Create from './pages/Create/Create'
import Project from './pages/Project/Project'
import Signup from './pages/Signup/Signup'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import OnlineUsers from './Components/OnlineUsers/OnlineUsers';

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {
        authIsReady && (
          <>
            {
              user && <Sidebar />
            }
            <div className="container">
              <Navbar />
              <Routes>
                <Route path='/' element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
                <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
                <Route path='/signup' element={!user ? <Signup /> : <Navigate to={'/'} />} />
                <Route path='/create' element={user ? <Create /> : <Navigate to={'/login'} />} />
                <Route path='/Project/:id' element={user ? <Project /> : <Navigate to={'/login'} />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
            {
              user && <OnlineUsers />
            }
          </>
        )
      }
    </div>
  );
}

export default App