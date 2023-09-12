import { Media } from "../models/Media";
import { ipcRenderer } from "electron";

ipcRenderer.on('mediaList', (_, media) => {
    const tableBody = document.getElementById('tableBody');

    const mediaRows = media.reduce((html: string, file: Media) => {
        html += 
        `<tr>
            <td class="index">${file.id}</td>
            <td>${file.title}</td>
            <td>${file.directory}</td>
            <td>
                <button type="button" class="btn btn-light btn-sm">T</button>
                <button type="button" class="btn btn-light btn-sm">D</button>
            </td>
        </tr>`

        return html;
    }, '');

    tableBody!.innerHTML += mediaRows 
});