import { Media } from "../models/Media";
import { ipcRenderer } from "electron";

const tableHeader = document.getElementById('tableHeader')
const tableBody = document.getElementById('tableBody');

ipcRenderer.on('mediaList', (_, media) => {
    tableBody!.innerHTML = "";
    const mediaRows = media.reduce((html: string, file: Media) => {
        html += 
        `<tr>
            <td class="index">${file.id}</td>
            <td>${file.title}</td>
            <td>${file.directory}</td>
            <td>
                <button type="button" class="btn btn-light btn-sm transcribe">T</button>
                <button type="button" class="btn btn-light btn-sm">D</button>
            </td>
        </tr>`

        return html;
    }, '');

    tableBody!.innerHTML += mediaRows 
    AddListenersToRows();
});


const header = tableHeader?.getElementsByTagName('th')[0];
let uploadBtn = header?.getElementsByClassName('upload')[0];
console.log('triggered');
 uploadBtn?.addEventListener('click', () => {
    ipcRenderer.invoke("showDialog");
 });


function AddListenersToRows() {
    const rows = tableBody?.getElementsByTagName('tr');
    let rowArr = Array.prototype.slice.call(rows);

    Array.from(rowArr).forEach((row, _) => {
        let transcribeBtn = row.getElementsByClassName('transcribe')[0];
        const cells = row.getElementsByTagName('td');
        transcribeBtn.addEventListener('click', () => {
           
            let media: Media = new Media({
                id : parseInt(cells[0].innerHTML),
                title: cells[1].innerHTML,
                directory: cells[2].innerHTML,
            })

            ipcRenderer.send('sendMedia', media);
          });
    });
}