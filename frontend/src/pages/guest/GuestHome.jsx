import {Link} from "react-router-dom"

export default function GuestHome() {
    // useEffect(() => {
    //   document.title = "Home | Portfolio"
    // }, []);
  
    return(
      <main id="main">
        {/* <HomeScreen /> */}
        <h1>Guest View Landing page</h1>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </main>
    )
}