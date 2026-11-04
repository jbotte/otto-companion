'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('companion', {
  state: () => ipcRenderer.invoke('ui:state'),
  layout: (rect) => ipcRenderer.send('ui:layout', rect),

  tabOpen: (opts) => ipcRenderer.invoke('ui:tab-open', opts),
  tabClose: (id) => ipcRenderer.invoke('ui:tab-close', { id }),
  tabActivate: (id) => ipcRenderer.invoke('ui:tab-activate', { id }),
  navigate: (url) => ipcRenderer.invoke('ui:navigate', { url }),
  nav: (dir) => ipcRenderer.invoke('ui:nav', { dir }),
  reload: () => ipcRenderer.invoke('ui:reload'),

  profileCreate: (name) => ipcRenderer.invoke('ui:profile-create', { name }),
  folderAdd: () => ipcRenderer.invoke('ui:folder-add'),
  folderRemove: (id) => ipcRenderer.invoke('ui:folder-remove', { id }),
  folderReadonly: (id, readOnly) => ipcRenderer.invoke('ui:folder-readonly', { id, readOnly }),

  setBind: (bind) => ipcRenderer.invoke('ui:set-bind', { bind }),
  newToken: () => ipcRenderer.invoke('ui:new-token'),

  onEvent: (cb) => ipcRenderer.on('companion:event', (_e, data) => cb(data))
});
