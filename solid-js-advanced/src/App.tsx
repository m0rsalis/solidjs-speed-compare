import { Component, createEffect, createSignal, For, onMount } from 'solid-js';
import axios from "axios";

export class HoundDto {
  id: number | undefined;
  name: string | undefined;
  breed: string | undefined;
  description!: string;
}

const fetchData = async(count: number) =>
  axios.get<HoundDto[]>('http://localhost:5195/data?count=' + count);

const App: Component = () => {
  const [data, setData] = createSignal<HoundDto[]>();
  const [selectedId, setSelectedId] = createSignal<string>();
  const [nameFilter, setNameFilter] = createSignal<string>("");
  const [recordCount, setRecordCount] = createSignal<number>(100);

  onMount(async () => {
    setData((await fetchData(recordCount())).data);
  });

  function RenderDataRow(tableRow: HoundDto) {
    return (
        <tr id={ tableRow.id?.toString() } 
            class={selectedId() === tableRow.id?.toString() ? "highlightedRow" : ""}
            style={
                tableRow.name === undefined || 
                tableRow.name.indexOf(nameFilter()) >= 0 ? "" : "display:none"} 
            onMouseEnter={() => setSelectedId(tableRow?.id?.toString())}>
            <td>{tableRow.name}</td>
            <td>{tableRow.breed}</td>
            <td>{tableRow.description}</td>
        </tr>
    );
  }   

  const updateRecordCount = () => {
    const input = document.getElementById("number-count") as HTMLInputElement;

    if (input && input.value) {
      setRecordCount(parseInt(input.value));
    }
  }

  const updateNameFilter = () => {
    const input = document.getElementById("name-filter") as HTMLInputElement;

    if (input) {
      setNameFilter(input.value);
    }
  }

  createEffect(async () => setData((await fetchData(recordCount())).data));

  return (
    <div>
        <div>
            <input id="number-count" type="number" value={recordCount()}/>
            <button onClick={updateRecordCount}>Fetch records</button>
        </div>
        <table>
            <thead>
            <tr>
                <th>Hound Name</th>
                <th>Hound Breed</th>
                <th>Description</th>
            </tr>
            <tr>
                <th><input id="name-filter" style="width:80%;" value={nameFilter()} onKeyUp={updateNameFilter}/></th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <For each={data()} fallback={<p>Loading...</p>}>
                    {(data) => RenderDataRow(data)}
                </For>
            </tbody>
        </table>
    </div>
  );
};

export default App;
