const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("path"), fs = require("fs");
const { spawn } = require("child_process");
const folder = () => path.join(app.getPath("userData"), "library");
const banners = () => path.join(folder(), "banners");
const db = () => path.join(folder(), "games.json");
function ensure(){fs.mkdirSync(banners(),{recursive:true});if(!fs.existsSync(db()))fs.writeFileSync(db(),"[]","utf8");}
function games(){ensure();try{return JSON.parse(fs.readFileSync(db(),"utf8"));}catch{return [];}}
function save(items){ensure();fs.writeFileSync(db(),JSON.stringify(items,null,2),"utf8");}
function createWindow(){const win=new BrowserWindow({width:1200,height:800,minWidth:850,minHeight:600,backgroundColor:"#10131b",autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,"preload.js"),contextIsolation:true,nodeIntegration:false,sandbox:true}});win.loadFile("index.html");}
app.whenReady().then(()=>{ensure();createWindow();});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit();});
ipcMain.handle("list",()=>games());
ipcMain.handle("pick-exe",async()=>{const r=await dialog.showOpenDialog({properties:["openFile"],filters:[{name:"Windows applications",extensions:["exe"]}]});return r.canceled?null:r.filePaths[0];});
ipcMain.handle("pick-banner",async()=>{const r=await dialog.showOpenDialog({properties:["openFile"],filters:[{name:"Images",extensions:["png","jpg","jpeg","webp","gif"]}]});if(r.canceled)return null;const src=r.filePaths[0],dest=path.join(banners(),`banner-${Date.now()}${path.extname(src)}`);fs.copyFileSync(src,dest);return dest;});
ipcMain.handle("add",(_e,item)=>{if(!item||!item.name?.trim()||!item.exe?.toLowerCase().endsWith(".exe"))throw new Error("Enter a name and choose an EXE file.");const list=games();list.push({id:`${Date.now()}-${Math.random()}`,name:item.name.trim(),exe:item.exe,banner:item.banner||""});save(list);return list;});
ipcMain.handle("remove",(_e,id)=>{const list=games().filter(g=>g.id!==id);save(list);return list;});
ipcMain.handle("launch",(_e,id)=>{const game=games().find(g=>g.id===id);if(!game)throw new Error("Game not found.");if(!fs.existsSync(game.exe))throw new Error("EXE file not found. It may have been moved.");const child=spawn(game.exe,[],{detached:true,stdio:"ignore",cwd:path.dirname(game.exe)});child.unref();return true;});
ipcMain.handle("open-folder",()=>{ensure();return shell.openPath(folder());});
