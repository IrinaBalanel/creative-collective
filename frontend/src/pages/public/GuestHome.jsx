import {Link} from "react-router-dom"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import FindByCat from "../../components/FindByCat/FindByCat"
import HomeScreen from "../../components/HomeScreen/HomeScreen"
import BecomeProvider from "../../components/BecomeProvider/BecomeProvider"
import ContactForm from "../../components/ContactForm/ContactForm"

export default function GuestHome() {
  return(
    <>
      <Header/>
      <main id="main">
        <HomeScreen/>
        <FindByCat/>
        <BecomeProvider/>
        <ContactForm/>
      </main>
      <Footer/>
    </>
    
  )
}