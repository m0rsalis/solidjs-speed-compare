import { Component, createEffect, createSignal, For, onMount } from 'solid-js';
import axios from "axios";

export class HoundDto {
  id: number | undefined;
  name: string | undefined;
  description!: string;
  createdDate: Date | undefined;
}

const fetchData = async(count: number) =>
  axios.get<HoundDto[]>('http://localhost:5195/data?count=' + count);

const App: Component = () => {
  const [data, setData] = createSignal<HoundDto[]>();
  const [selectedId, setSelectedId] = createSignal<string>();
  const [descriptionFilter, setFilter] = createSignal<string>("");
  const [recordCount, setRecordCount] = createSignal<number>(100);

  onMount(async () => {
    setData((await fetchData(recordCount())).data);
  });

  function RenderDataRow(tableRow: HoundDto) {
    return (
        <tr id={ tableRow.id?.toString() } 
            class={selectedId() === tableRow.id?.toString() ? "highlightedRow" : ""}
            style={
                tableRow.description === undefined || 
                tableRow.description.indexOf(descriptionFilter()) >= 0 ? "" : "display:none"} 
            onMouseEnter={() => setSelectedId(tableRow?.id?.toString())}>
            <td>{tableRow.id}</td>
            <td>{tableRow.name}</td>
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

  const updateDescriptionFilter = () => {
    const input = document.getElementById("description-filter") as HTMLInputElement;

    if (input && input.value) {
      setFilter(input.value);
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
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th><input id="description-filter" style="width:80%;" value={descriptionFilter()} onKeyUp={updateDescriptionFilter}/></th>
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
