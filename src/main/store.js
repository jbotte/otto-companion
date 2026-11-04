'use strict';
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

class Store {
  constructor(name, defaults = {}) {
    this.file = path.join(app.getPath('userData'), name + '.json');
    this.data = { ...defaults };
    try {
      Object.assign(this.data, JSON.parse(fs.readFileSync(this.file, 'utf8')));
    } catch { /* first run */ }
  }
  get(key, fallback) {
    return this.data[key] === undefined ? fallback : this.data[key];
  }
  set(key, value) {
    this.data[key] = value;
    try {
      fs.mkdirSync(path.dirname(this.file), { recursive: true });
      fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2));
    } catch (e) {
      console.error('store write failed', e);
    }
  }
}

module.exports = { Store };
