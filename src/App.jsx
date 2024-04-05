
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Footer from "./components/boilerplats/Footer";
import "./stylesheet/Footer.module.css";
import "./stylesheet/App.css";


function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getFromApi = () => {
      fetch("https://auctioneer.azurewebsites.net/auction/2wvu")
        .then((res) => res.json())
        .then((data) => setData(data));
    };
    getFromApi();
  }, []);

  return (
    <>

      <Header />
      <FirstPage />
      <Footer />

    </>
  );
}

export default App;
