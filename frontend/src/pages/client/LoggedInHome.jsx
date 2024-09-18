// import {Link} from "react-router-dom"
import Logout from "../../components/Logout"
import axios from "axios";
export default function LoggedInHome() {

  axios.defaults.withCredentials = true; //for token auth
  
  return(
    <main id="main">
      <h1>Logged In Client View Landing page</h1>
      <Logout />
    </main>
  )
}