import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitonsService } from "./interfaces/IMediaActionsService";
import { app, BrowserWindow, ipcMain } from "electron";
import { MediaAcitonsService } from "./services/MediaActionsService";
import { MediaRepository } from "./repositories/MediaRepository";
import { RetrieveAllMediaResult } from "./models/RetrieveAllMediaResult";
import { Media } from "./models/Media";

let mediaRepository: IMediaRepository = new MediaRepository();
let mediaActionsService: IMediaAcitonsService = new MediaAcitonsService(mediaRepository);
let mediaList: RetrieveAllMediaResult;

app.whenReady().then(() => {
  mediaActionsService.retrieveAll()
  .then(result => {
    mediaList = result
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

function createMainWindow(): BrowserWindow {
  let mainWindow: BrowserWindow = new BrowserWindow({
    height: 400,
    width: 800,
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
    mainWindow.webContents.send('mediaList', mediaList.mediaList);
});

return mainWindow;
}

function createTranscribeWindow(mainWindow: BrowserWindow, media: Media) {
  let transcribeWindow: BrowserWindow =  new BrowserWindow({
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
    transcribeWindow.webContents.openDevTools();
  });

  transcribeWindow.once("ready-to-show", () => {
    transcribeWindow.show();
  });

  ipcMain.on('close', () => {
    transcribeWindow.destroy();
  });
}