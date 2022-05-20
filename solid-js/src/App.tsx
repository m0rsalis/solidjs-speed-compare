import { Component, createSignal, For, onMount } from 'solid-js';
import axios from "axios";

class Hound {
  id: number | undefined;
  name: string | undefined;
  breed: string | undefined;
  description!: string;
}

const fetchData = async() =>
  axios.get<Hound[]>('http://localhost:5195/data');

const App: Component = () => {
  const [data, setData] = createSignal<Hound[]>();
  const [selectedId, setSelectedId] = createSignal<string>();

  onMount(async () => {
    setData((await fetchData()).data);
  });

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
        <For each={data()} fallback={<p>Loading...</p>}>
          {(tableRow) => (
            <tr id={tableRow.id?.toString()} 
              class={selectedId() == tableRow.id?.toString() ? "highlightedRow" : ""} 
              onMouseEnter={() => setSelectedId(tableRow?.id?.toString())}>
              <td>{tableRow.name}</td>
              <td>{tableRow.breed}</td>
              <td>{tableRow.description}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default App;
