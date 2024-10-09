import './App.css'

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
import ProviderDetails from "./pages/public/ProviderDetails"


// Client pages
// import LoggedInHome from "./pages/client/LoggedInHome"

// Provider pages
import ProviderDashboard from "./pages/provider/ProviderDashboard"
import ProviderPageCustom from "./pages/provider/ProviderPageCustom"
import ProviderSettings from "./pages/provider/ProviderSettings"
import ProviderAppointments from "./pages/provider/ProviderAppointments"

// Other imports
import { UserProvider } from './context/UserContext';
import Protected from "./context/Protected";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  

  return (
    <>
      
      <BrowserRouter>
        <UserProvider>
          <Routes>
            {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Protected adminRoute={true}><AdminDashboard /></Protected>} />
              <Route path="/admin/management-clients" element={<Protected adminRoute={true}><ClientManagement /></Protected>} />
              <Route path="/admin/management-clients/new-user" element={<Protected adminRoute={true}><NewUser /></Protected>} />
              <Route path="/admin/management-clients/update-client/:id" element={<Protected adminRoute={true}><EditClient /></Protected>} />
              <Route path="/admin/management-clients/block-user/:id" element={<Protected adminRoute={true}><ConfirmBlockUser /></Protected>} />
              <Route path="/admin/management-clients/delete-user/:id" element={<Protected adminRoute={true}><ConfirmDeleteUser /></Protected>} />
              
              {/* <Route path="/admin/management-providers" element={<Protected adminRoute={true}><ProviderManagement /></Protected>} /> */}
              <Route path="/admin/management-providers" element={<ProviderManagement/>}/>
              <Route path="/admin/management-providers/new-user" element={<Protected adminRoute={true}><NewUser /></Protected>} />
              <Route path="/admin/management-providers/update-provider/:id" element={<Protected adminRoute={true}><EditProvider /></Protected>} />
              <Route path="/admin/management-providers/block-user/:id" element={<Protected adminRoute={true}><ConfirmBlockUser /></Protected>} />
              <Route path="/admin/management-providers/delete-user/:id" element={<Protected adminRoute={true}><ConfirmDeleteUser /></Protected>} />
              

              <Route path="/" element={<GuestHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/professionals" element={<Professionals title="All Professionals" />} />
              <Route path="/professionals/:category" element={<Professionals />} />
              <Route path="/professionals/:category/:id" element={<ProviderDetails />} />
              

              {/* Client Routes */}
              {/* <Route path="/home" element={<LoggedInHome />} /> */}

              {/* Provider Routes */}
              <Route path="/dashboard" element={<Protected providerRoute={true}><ProviderDashboard/></Protected> }/>
              <Route path="/profile-customization/:user_id" element={<Protected providerRoute={true}><ProviderPageCustom /></Protected>} />
              <Route path="/settings" element={<Protected providerRoute={true}><ProviderSettings/> </Protected>}/>
              <Route path="/appointments" element={<Protected providerRoute={true}><ProviderAppointments/> </Protected>}/>

              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
