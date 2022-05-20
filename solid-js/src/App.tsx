import { Component, createSignal, For, onMount } from 'solid-js';
import axios from "axios";

class TableRow {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  createdDate: Date | undefined;
}

const fetchData = async() =>
  axios.get<TableRow[]>('http://localhost:5195/data');

const App: Component = () => {
  const [data, setData] = createSignal<TableRow[]>();
  const [selectedId, setSelectedId] = createSignal<string>();

  onMount(async () => {
    setData((await fetchData()).data);
  });

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
          <For each={data()} fallback={<p>Loading...</p>}>
            {(tableRow) => (
              <tr id={tableRow.id?.toString()} 
                class={selectedId() == tableRow.id?.toString() ? "highlightedRow" : ""} 
                onMouseEnter={() => setSelectedId(tableRow?.id?.toString())}>
                <td>{tableRow.id}</td>
                <td>{tableRow.name}</td>
                <td>{tableRow.description}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
  );
};

export default App;
