// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  
import { AdminLogin } from './pages/Admin/Adminlogin';
import { AdminLayout } from './pages/Admin/Adminlayout';
import { AdminDashboard } from './pages/Admin/admindashbord';
import { AdminWaitlist } from './pages/Admin/Adminwaitlist';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';


function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <div className="min-h-screen bg-background">
              <Navbar />
              <Hero />
              <Features />
              <FAQ />
              <Waitlist />
              <Footer />
            </div>
          } />


          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="waitlist" element={<AdminWaitlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;