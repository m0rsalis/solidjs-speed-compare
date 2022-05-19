import { Component, createSignal, For, onMount } from 'solid-js';
import axios from "axios";

const fetchData = async() =>
  axios.get<TableData>('http://localhost:5195/data');

  const App: Component = () => {
    const [data, setData] = createSignal<TableData>();
    const [selectedId, setSelectedId] = createSignal(0);

    function handleMouseHover(event: any) {
      console.log(event);
      setSelectedId(event.target.id)
    }

    onMount(async () => {
      setData((await fetchData()).data);
    });
    return (
      <div class="flex justify-center items-center flex-col p-10">
        <h2 class=" font-medium text-4xl my-5">Very usefull data</h2>
        <table style={{ width: '1000px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          <For each={data()?.results} fallback={<p>Loading...</p>}>
            {(tableRow) => (
              <tr id={tableRow.id?.toString()} style={selectedId() == tableRow.id ? "background:grey;" : "background:white;"} onMouseEnter={handleMouseHover}>
                <td>{tableRow.id}</td>
                <td>{tableRow.name}</td>
                <td>{tableRow.description}</td>
              </tr>
            )}
          </For>
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