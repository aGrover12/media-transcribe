import { Media } from "../models/Media";
import { ipcRenderer } from "electron";

console.log("TESTING")

console.log(ipcRenderer)

ipcRenderer.on('mediaList', (event, media) => {
    console.log("TESTING 2 " + event)

    const table = document.getElementById('mediaTable');

    console.log("INNER: " + media)

    const mediaRows = media.reduce((html: string, file: Media) => {
        html += 
        `<tr>
            <th>${file.id}</th>
            <th>${file.title}</th>
            <th>${file.directory}</th>
            <th>actions</th>
        </tr>`

        return html;
    }, '');

    table!.innerHTML += mediaRows 
});