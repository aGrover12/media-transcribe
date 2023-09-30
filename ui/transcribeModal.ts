import { ipcRenderer } from "electron";
import { Media } from "../models/Media";

const fileTypes: string[] = ['mp3' , 'mp4' , 'mpeg' , 'mpga' , 'm4a' , 'wav' , 'webm']
const languages: string[] = ['Afrikaans',' Arabic',' Armenian',' Azerbaijani',' Belarusian',' Bosnian',' Bulgarian',' Catalan',' Chinese',' Croatian',' Czech',' Danish',' Dutch',' English',' Estonian',' Finnish',' French',' Galician',' German',' Greek',' Hebrew',' Hindi',' Hungarian',' Icelandic',' Indonesian',' Italian',' Japanese',' Kannada',' Kazakh',' Korean',' Latvian',' Lithuanian',' Macedonian',' Malay',' Marathi',' Maori',' Nepali',' Norwegian',' Persian',' Polish',' Portuguese',' Romanian',' Russian',' Serbian',' Slovak',' Slovenian',' Spanish',' Swahili',' Swedish',' Tagalog',' Tamil',' Thai',' Turkish',' Ukrainian',' Urdu',' Vietnamese',' Welsh'];
const models: string[] = ['tiny.en','tiny','base.en','base','small.en','small','medium.en','medium','large-v1','large-v2','large'];
let mediaToTranscribe: Media;

ipcRenderer.on('mediaToTranscribe', (_, media: Media) => {
    mediaToTranscribe = media;
    const fileName = document.getElementById('fileName');
    fileName!.innerHTML = 
    `
        <input class="form-control top p-1" id="fileName" type="text" placeholder="${media.title}" readonly>
    `
    addOptionsToSelection('fileTypes', fileTypes);
    addOptionsToSelection('languages', languages);
    addOptionsToSelection('models', models);

    let cancelButton = document.getElementById('cancelButton');
    cancelButton?.addEventListener('click', () => {
        ipcRenderer.send('close');
    });
});

function addOptionsToSelection(elementId: string, options: string[]) {
    const fileTypeSelections = document.getElementById(elementId);
    let fileTypeOptions = options.reduce((html: string, type: string) => {
        html += 
        `
            <option>${type}</option>
        `
        return html;
    }, '');

    fileTypeSelections!.innerHTML += fileTypeOptions;
}