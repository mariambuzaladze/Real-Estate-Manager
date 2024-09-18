import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import AddListing from "./pages/AddListing";

interface IDataContext {
  data: IRealEstate[] | null;
  setData: Dispatch<SetStateAction<IRealEstate[]>>;
  setShowAgent: Dispatch<SetStateAction<boolean>>;
}

export const MyContext = createContext<IDataContext>({
  data: null,
  setData: () => {},
  setShowAgent: () => {},
});

function App() {
  const [data, setData] = useState<IRealEstate[]>([]);

  async function getData() {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer 9cfd8995-371f-4210-8952-8ca1881b89be",
        },
      }
    );

    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const [showAgent, setShowAgent] = useState(false);

  return (
    <MyContext.Provider
      value={{
        data,
        setData,
        setShowAgent,
      }}
    >
      <BrowserRouter>
        <Header showAgent={showAgent} />
        <Routes>
          <Route path="/" element={<Home showAgent={showAgent} />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="/addListing" element={<AddListing />} />
        </Routes>
      </BrowserRouter>{" "}
    </MyContext.Provider>
  );
}

export default App;
