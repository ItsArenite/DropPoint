const { app, BrowserWindow, nativeImage } = require("electron");
const { autoUpdater } = require("electron-updater");
const { Instance } = require("./Window");
const { setShortcut } = require("./Shortcut");
const { droppointDefaultIcon } = require("./Icons");
const { setTray } = require("./Tray");

let splashScreen;
app
  .on("ready", () => {
    // Splash screen which also helps to run in background and keep app alive
    splashScreen = new BrowserWindow({
      width: 400,
      height: 200,
      frame: false,
      titleBarStyle: "hidden",
      fullscreenable: false,
      transparent: true,
      icon: nativeImage.createFromPath(droppointDefaultIcon),
      show: false,
    });
    // splashScreen.loadFile(path.join(__dirname, "../static/media/splash.jpeg"));
    // splashScreen.removeMenu();
    // setTimeout(() => {
    //   splashScreen.hide();
    // }, 3000);

    if (BrowserWindow.getAllWindows.length === 0) {
      const instance = new Instance();
      const instanceID = instance.createNewWindow();
      if (instanceID !== null) {
        setTray();
        setShortcut();
      }
    }
  })
  // .on("activate", () => {
  //   autoUpdater.checkForUpdatesAndNotify();
  //   if (BrowserWindow.getAllWindows.length === 0) {
  //     createMainWindow();
  //   }
  // })
  .on("before-quit", () => {
    splashScreen.close();
  })
  .on("will-quit", () => {
    globalShortcut.unregisterAll();
  });
module.exports = {
  whenReady: app.whenReady,
};
