import './App.css'
// import { PopupButton } from "react-calendly";
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import ClientManagement from "./pages/admin/ClientManagement"
import NewUser from "./pages/admin/NewUser"
import EditClient from "./pages/admin/EditClient"
// import ProviderManagement from "./pages/admin/ProviderManagement"
import GuestHome from "./pages/guest/GuestHome"
import Login from "./pages/guest/Login"
import Register from "./pages/guest/Register"
import LoggedInHome from "./pages/client/LoggedInHome"
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
              {/* <Route path="/admin/management-providers" element={<ProviderManagement />} /> */}
              
              <Route path="/" element={<GuestHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/home" element={<LoggedInHome />} />

              <Route path="/dashboard" element={<ProviderDashboard />} />
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
