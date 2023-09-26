import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitonsService } from "./interfaces/IMediaActionsService";
import { app, BrowserWindow, ipcMain } from "electron";
import { MediaAcitonsService } from "./services/MediaActionsService";
import { MediaRepository } from "./repositories/MediaRepository";
import { RetrieveAllMediaResult } from "./models/RetrieveAllMediaResult";

let mediaRepository: IMediaRepository = new MediaRepository();
let mediaActionsService: IMediaAcitonsService = new MediaAcitonsService(mediaRepository);
let media: RetrieveAllMediaResult;
function createMainWindow() {
    const mainWindow = new BrowserWindow({
      height: 400,
      width: 800,
      autoHideMenuBar: true,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: false
    }
    });

    mainWindow.loadFile("../ui/index.html");

    mainWindow.webContents.openDevTools();
   
    mainWindow.webContents.on('did-finish-load', function () {
      mainWindow.webContents.send('mediaList', media.mediaList);
  });
  }

  function createTranscribeWindow() {
    const transcribeWindow = new BrowserWindow({
      height: 225,
      width: 400,
      autoHideMenuBar: true,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: false
    }
    });

    transcribeWindow.loadFile('../ui/transcribeModal.html');

    transcribeWindow.webContents.openDevTools();
  }
  
  app.whenReady().then(() => {
    mediaActionsService.retrieveAll()
    .then(result => {
      media = result
      createMainWindow();
    });

  
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
  });

  app.on('window-all-closed', () => {
    app.quit()
  });

  ipcMain.on('sendMedia', (_ , media) => {
      createTranscribeWindow()
  });