
import { Routes, Route } from "react-router-dom";
import Footer from "./components/boilerplats/Footer";
import "./stylesheet/Footer.module.css";
import "./stylesheet/App.css";
import Details from "./components/boilerplats/Details";
import Header from "./components/boilerplats/Header";
import FirstPage from "./components/boilerplats/FirstPage";
import CreateAuctionForm from "./components/boilerplats/Skapa-annons";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/auction/:id" element={<Details />} />
        <Route path="/create-auction" element={<CreateAuctionForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;