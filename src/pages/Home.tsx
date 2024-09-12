import { useContext } from "react";
import { MyContext } from "../App";
import Item from "../components/Item";

export default function Home() {
  const { data } = useContext(MyContext);

  if (!data) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div className="grid grid-cols-4 gap-5 py-20 px-40">
      {data.map((e) => (
        <Item key={e.zip_code} e={e} />
      ))}
    </div>
  );
}
