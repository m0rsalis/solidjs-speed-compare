import axios from "axios";
import { FC, useEffect, useState } from "react";

const fetchData = async () =>
  axios.get<TableData>('http://localhost:5195/data');

const App: FC = () => {
  const [data, setData] = useState<TableData>();
  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    fetchData().then((res) => setData(res.data));
  }, []);

  return (
    <div className="flex justify-center items-center flex-col p-10">
        <h2 className=" font-medium text-4xl my-5">Very usefull data</h2>
        <table style={{ width: '1000px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          {data?.results?.map((tableRow, index) => (
          <tr id={tableRow.id?.toString()} style={selectedId === tableRow.id?.toString() ? {background:"grey"} : {background:"white"}} onMouseEnter={() => setSelectedId(tableRow.id?.toString())}>
            <td>{tableRow.id}</td>
            <td>{tableRow.name}</td>
            <td>{tableRow.description}</td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;

export class TableData {
  results: TableRow[] | undefined;
}

export class TableRow {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  createdDate: Date | undefined;
}
