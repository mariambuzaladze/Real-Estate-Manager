import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ListingPage from "./pages/ListingPage/ListingPage";
import AddListing from "./pages/AddListing/AddListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/addListing" element={<AddListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
