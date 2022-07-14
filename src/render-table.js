const tableRowTemplate = document.querySelector('#table-row').content.querySelector('.table__row');
const tableRowContainer = document.querySelector('.table');
const listOfRowsFragment = document.createDocumentFragment();


const addRowData = (
  {procedureId, procedureNumber, procedurePageLink}) => {
  
  const rowData = tableRowTemplate.cloneNode(true);

  rowData.querySelector('.table__row-item_number').textContent = procedureId;
  rowData.querySelector('.table__row-item_oos').textContent = procedureNumber;
  rowData.querySelector('.table__row-item_link').textContent = procedurePageLink;
  // rowData.querySelector('.table__row-item_email').textContent = email;
  // rowData.querySelector('.table__row-item_documents').textContent = documents;

  listOfRowsFragment.appendChild(rowData);
}


const clearRowsContainer = () => {
  const renderedRows = tableRowContainer.querySelectorAll('.table__row-rendered-list');
  renderedRows.forEach(row => row.remove());
}

export const renderTable = (data) => {

  console.log(data)

  data
  .slice()
  .forEach(
    ({procedureId, procedureNumber, procedurePageLink}) => {

    addRowData(
      {procedureId, procedureNumber, procedurePageLink})
  })

  clearRowsContainer();
  tableRowContainer.appendChild(listOfRowsFragment);
}


