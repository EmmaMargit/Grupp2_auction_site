
import { useEffect, useState } from "react";
import Footer from "./components/boilerplats/Footer";
import "./stylesheet/Footer.module.css";
import "./stylesheet/App.css";
//import Details from "./components/boilerplats/Details";
import Header from './components/boilerplats/Header'
import FirstPage from './components/boilerplats/FirstPage'

function App() {
  return (
    <>
      <Header />
      <FirstPage />
      {/* <Details /> */}
      <Footer />

    </>
  )
}

export default App
