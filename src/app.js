import { getData } from './api.js';
import { showAlert } from './utils.js';
import { renderTable } from './render-table.js';

getData((data) => renderTable(data), () => showAlert());