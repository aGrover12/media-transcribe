import { Media } from "../models/Media";
import { ipcRenderer } from "electron";

console.log("triggered")

ipcRenderer.on('media', (_, media) => {
    const table = document.querySelector('table');

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

    table!.innerHTML = mediaRows 
});