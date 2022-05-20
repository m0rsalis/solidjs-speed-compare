import { FC, useEffect, useState } from "react";
import axios from "axios";

class Hound {
  id: number | undefined;
  name: string | undefined;
  breed: string | undefined;
  description!: string;
}

const fetchData = async() =>
  axios.get<Hound[]>('http://localhost:5195/data');

const App: FC = () => {
  const [data, setData] = useState<Hound[]>();
  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    fetchData().then((res) => setData(res.data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Breed</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((tableRow) => (
          <tr id={tableRow.id?.toString()} 
            className={selectedId === tableRow.id?.toString() ? "highlightedRow" : ""} 
            onMouseEnter={() => setSelectedId(tableRow.id?.toString())}>
            <td>{tableRow.name}</td>
            <td>{tableRow.breed}</td>
            <td>{tableRow.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
