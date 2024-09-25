import './App.css'
// import { PopupButton } from "react-calendly";
// Admin pages
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import ClientManagement from "./pages/admin/ClientManagement"
import NewUser from "./pages/admin/NewUser"
import EditClient from "./pages/admin/EditClient"
import EditProvider from "./pages/admin/EditProvider"
import ConfirmBlockUser from "./pages/admin/ConfirmBlockUser"
import ConfirmDeleteUser from "./pages/admin/ConfirmDeleteUser"
import ProviderManagement from "./pages/admin/ProviderManagement"

// Public pages
import NotFoundPage from "./pages/public/NotFoundPage"
import GuestHome from "./pages/public/GuestHome"
import Login from "./pages/public/Login"
import Register from "./pages/public/Register"
import Professionals from "./pages/public/Professionals"
// import ProfessionalsByCat from "./pages/public/ProfessionalsByCat"

// Client pages
import LoggedInHome from "./pages/client/LoggedInHome"

// Provider pages
import ProviderDashboard from "./pages/provider/ProviderDashboard"


import { BrowserRouter, Routes, Route } from "react-router-dom"

// import { AdminUser } from './context/AdminContext'

function App() {

  return (
    <>
      {/* <div>
        <PopupButton url="https://calendly.com/irina-cowork/30min" rootElement={document.getElementById("root")}
        text="Click here to schedule!"/>
      </div> */}
      
      <BrowserRouter>
        {/* <AdminUser> */}
          <Routes>
            {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              <Route path="/admin/management-clients" element={<ClientManagement />} />
              <Route path="/admin/management-clients/new-user" element={<NewUser />} />
              <Route path="/admin/management-clients/update-client/:id" element={<EditClient />} />
              <Route path="/admin/management-clients/block-user/:id" element={<ConfirmBlockUser />} />
              <Route path="/admin/management-clients/delete-user/:id" element={<ConfirmDeleteUser />} />
              
              <Route path="/admin/management-providers" element={<ProviderManagement />} />
              <Route path="/admin/management-providers/new-user" element={<NewUser />} />
              <Route path="/admin/management-providers/update-provider/:id" element={<EditProvider />} />
              <Route path="/admin/management-providers/block-user/:id" element={<ConfirmBlockUser />} />
              <Route path="/admin/management-providers/delete-user/:id" element={<ConfirmDeleteUser />} />
              

              <Route path="/" element={<GuestHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Fetches all professionals */}
              <Route path="/professionals" element={<Professionals title="All Professionals" />} />
              {/* Fetches professionals by category */}
              <Route path="/professionals/:category" element={<Professionals />} />
              
              <Route path="/home" element={<LoggedInHome />} />






              <Route path="/dashboard" element={<ProviderDashboard />} />

              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        {/* </AdminUser> */}
        {/* <GuestUser>
          <Routes>
            <Route path="/" element={<GuestHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </GuestUser>
        <ClientUser>
          <Routes>
            <Route path="/home" element={<LoggedInHome />} />
          </Routes>
        </ClientUser>
        <ProviderUser>
          <Routes>
            <Route path="/dashboard" element={<ProviderDashboard />} />
          </Routes>
        </ProviderUser> */}
      </BrowserRouter>
        

    </>
  )
}

export default App
