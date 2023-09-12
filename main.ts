import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitonsService } from "./interfaces/IMediaActionsService";
import { app, BrowserWindow } from "electron";
import { MediaAcitonsService } from "./services/MediaActionsService";
import { MediaRepository } from "./repositories/MediaRepository";
import { RetrieveAllMediaResult } from "./models/RetrieveAllMediaResult";

let mediaRepository: IMediaRepository = new MediaRepository();
let mediaActionsService: IMediaAcitonsService = new MediaAcitonsService(mediaRepository);
let media: RetrieveAllMediaResult;
function createWindow() {
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
  
  app.whenReady().then(() => {
    mediaActionsService.retrieveAll()
    .then(result => {
      media = result
      createWindow();
    });

  
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', function () {
    app.quit()
  })
  