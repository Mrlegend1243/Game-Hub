const {contextBridge,ipcRenderer}=require("electron");
contextBridge.exposeInMainWorld("hub",{
 list:()=>ipcRenderer.invoke("list"),pickExe:()=>ipcRenderer.invoke("pick-exe"),
 pickBanner:()=>ipcRenderer.invoke("pick-banner"),add:item=>ipcRenderer.invoke("add",item),
 remove:id=>ipcRenderer.invoke("remove",id),launch:id=>ipcRenderer.invoke("launch",id),
 openFolder:()=>ipcRenderer.invoke("open-folder")
});