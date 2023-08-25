
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import SignupPage from './Pages/Signup/UserSignupPage'
import AdminSignupPage from './Pages/Signup/AdminSignupPage'
import LoginPage from './Pages/LoginPage'
import AccountVerificationPage from './Pages/AccountVerificationPage'
import SuccessPage from './Pages/SuccessPage'

function App() {


  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/adminSignup" element={<AdminSignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<AccountVerificationPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/verifyPassword" element={<SuccessPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
