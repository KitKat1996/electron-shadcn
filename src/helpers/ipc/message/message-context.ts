import { ipcMain } from 'electron';
import { pythonService } from '../python/python-service';

export function exposeMessageContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");
  pythonService.start();
  contextBridge.exposeInMainWorld(
    'electron',
    {
      ipcRenderer: {
        send: (channel: string, data: any) => {
          ipcRenderer.send(channel, data);
        },
        on: (channel: string, func: Function) => {
          ipcRenderer.on("'receive-message'", (_event : any, ...args : any) => console.log("recived"));
        },
        removeListener: (channel: string, func: Function) => {
          ipcRenderer.removeListener(channel, (_event : any, ...args : any) => func(...args));
        }
      }
    });
    require('electron').app.on('window-all-closed', () => {
      pythonService.stop();
    });
}