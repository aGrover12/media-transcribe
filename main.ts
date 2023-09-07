import { container } from "./inversify.config";
import { Locator } from "./locators";
import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitonsService } from "./interfaces/IMediaActionsService";
import { app, BrowserWindow } from "electron";
import { MediaAcitonsService } from "./services/MediaActionsService";
import { MediaRepository } from "./repositories/MediaRepository";
import { RetrieveAllMediaResult } from "./models/RetrieveAllMediaResult";

// Resolved dependencies
container.get<IMediaAcitonsService>(Locator.IMediaAcitons);
container.get<IMediaRepository>(Locator.IMediaRepository);

 let mediaRepository: IMediaRepository = new MediaRepository();
 let mediaActionsService: IMediaAcitonsService = new MediaAcitonsService(mediaRepository);

let media: RetrieveAllMediaResult;

function createWindow() {
    const mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
    });

    console.log("CREATE WINDOW: " + media.mediaList);
  

    mainWindow.loadFile("../ui/index.html");
  
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('media', media.mediaList)
  }
  
  app.whenReady().then(() => {
    mediaActionsService.retrieveAll()
    .then(result => {
      media = result
      console.log("TEST: " +  media)
      createWindow();
    });

  
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', function () {
    app.quit()
  })
  