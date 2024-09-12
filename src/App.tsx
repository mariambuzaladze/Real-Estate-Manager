import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import AddListing from "./pages/AddListing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/addListing" element={<AddListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
