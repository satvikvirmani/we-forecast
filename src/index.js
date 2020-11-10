const { contentTracing, Tray, app, BrowserWindow } = require('electron');
const electron = require('electron')
const path = require('path');
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const globalShortcut = electron.globalShortcut
const { type } = require("os");
const icopath = path.join(__dirname, 'app.ico');
const ipc = electron.ipcMain;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let win;
let tray = null

function createWindow() {
  win = new BrowserWindow(
    {
      width: 600,
      height: 600,
      minHeight: 600,
      minWidth: 350,
      title: "Weather App",
      icon: 'book.png',
      webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile(path.join(__dirname,'index.html'));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow();
  const template = [{
    label: 'Edit',
    submenu: [{
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'forceReload'
        }
    ]
},
{
    label: 'Help',
    submenu: [{
        label: 'About',
        click: function(){
            electron.shell.openExternal('https://electron.atom.io')
        },
        accelerator: 'CmdOrCtrl + Shift + H'
    }]
}
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const cxtMenu = new Menu()
cxtMenu.append(new MenuItem({
  role: 'cut'
}))
cxtMenu.append(new MenuItem({
  role: 'copy'
}))
cxtMenu.append(new MenuItem({
  role: 'paste'
}))
cxtMenu.append(new MenuItem({
  label: 'Help',
  click: function(){
    electron.shell.openExternal('https://electron.atom.io')
  }
}))

win.webContents.on('context-menu', function(e, params) {
cxtMenu.popup(win, params.x, params.y)
})

globalShortcut.register('Alt + S', function(){
win.show()
})

tray = new Tray(icopath)
tray.setToolTip('Weather App')
const cxttray = new Menu();
cxttray.append(new MenuItem({
  label: 'Show',
  click: function(){
    win.show()
  }
}))
tray.setContextMenu(cxttray)
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.once('ready', () => {
  win.show();
})
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
