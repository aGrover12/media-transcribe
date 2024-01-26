import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitonsService } from "./interfaces/IMediaActionsService";
import { app, ipcMain, BrowserWindow, dialog } from "electron";
import { MediaAcitonsService } from "./services/MediaActionsService";
import { MediaRepository } from "./repositories/MediaRepository";
import { RetrieveAllMediaResult } from "./models/RetrieveAllMediaResult";
import { Media } from "./models/Media";

let mediaRepository: IMediaRepository = new MediaRepository();
let mediaActionsService: IMediaAcitonsService = new MediaAcitonsService(mediaRepository);
let mediaListResult: RetrieveAllMediaResult;

app.whenReady().then(() => {
  mediaActionsService.retrieveAll()
  .then(result => {
    mediaListResult = result
    if (BrowserWindow.getAllWindows().length === 0) {
      let mainWindow = createMainWindow();
      ipcMain.on('sendMedia', (_, media) => {
        createTranscribeWindow(mainWindow, media)
      });
    }
  });
});

app.on('window-all-closed', () => {
  app.quit()
});

let mainWindow: BrowserWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    height: 405,
    width: 1200,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
  }
  });
  
  mainWindow.loadFile("../ui/index.html");

  mainWindow.webContents.openDevTools();
  
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('mediaList', mediaListResult.mediaList);
  });

return mainWindow;
}

let transcribeWindow: BrowserWindow;
function createTranscribeWindow(mainWindow: BrowserWindow, media: Media) {
  transcribeWindow =  new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    height: 255,
    width: 400,
    autoHideMenuBar: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
  }
  });

  transcribeWindow.loadFile('../ui/transcribeModal.html'); 
  transcribeWindow.once("show",() => {
    transcribeWindow.webContents.send("mediaToTranscribe", media);
  });

  transcribeWindow.once("ready-to-show", () => {
    transcribeWindow.show();
  });
}

ipcMain.handle("showDialog", () => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
        {name: 'Video', extensions: ['mp4','mpeg','webm']},
        {name: 'Audio', extensions: ['mp3','m4a','wav','mpga']}
    ]
  })
  .then(result => {
    var unescapedSlashes  = result.filePaths[0].replace(/\/\//g, "/");
    var splitFilePath = unescapedSlashes.split('\\');

    var fileName = splitFilePath[splitFilePath.length-1];
    var directory = unescapedSlashes.split(fileName)[0];


    let media: Media = new Media({
        title: fileName,
        directory: directory
      });

    mediaActionsService.insertMedia(media)
    .then(result => {
        if(result.successful)
        {
          mediaActionsService.retrieveAll()
          .then(result => {
            mainWindow.webContents.send('mediaList', result.mediaList);
          });
        }
    })
  });
})


ipcMain.on('close', () => {
  transcribeWindow.destroy();
});