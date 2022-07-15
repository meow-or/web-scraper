import { getData } from './api.js';
import { showAlert } from './utils.js';
import { renderTable } from './render-table.js';

getData(
  (data) => {
    renderTable(data);

    data.forEach(element => {
      const {procedureId, procedureNumber, procedurePageLink} = element;
      const db = require('./sql-connection');
      db.insertData({procedureId, procedureNumber, procedurePageLink});
      
    });
    
  },
  () => showAlert()
  );