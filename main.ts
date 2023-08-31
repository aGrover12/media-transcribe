import { container } from "./inversify.config";
import { Locator } from "./locators";
import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitonsService } from "./interfaces/IMediaActionsService";
import { app, BrowserWindow } from "electron";
import * as path from "path";

// Resolved dependencies
container.get<IMediaAcitonsService>(Locator.IMediaAcitons);
container.get<IMediaRepository>(Locator.IMediaRepository);

function createWindow() {
    const mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
    });
  
    mainWindow.loadFile("../ui/index.html");
  
    mainWindow.webContents.openDevTools();
  }
  
  app.whenReady().then(() => {
    createWindow();
  
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  