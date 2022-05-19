import { FC, useEffect, useState } from "react";
import axios from "axios";

export class TableRow {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  createdDate: Date | undefined;
}

const fetchData = async () =>
  axios.get<TableRow[]>('http://localhost:5195/data');

const App: FC = () => {
  const [data, setData] = useState<TableRow[]>();
  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    fetchData().then((res) => setData(res.data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((tableRow) => (
          <tr id={tableRow.id?.toString()} 
            className={selectedId === tableRow.id?.toString() ? "highlightedRow" : ""} 
            onMouseEnter={() => setSelectedId(tableRow.id?.toString())}>
            <td>{tableRow.id}</td>
            <td>{tableRow.name}</td>
            <td>{tableRow.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
