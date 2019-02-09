let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}
export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function createHeaderRows(stocks = [], rows = []) {
  if (stocks && stocks[0]) {
    const rows = Object.keys(stocks[0]).map(key => (
      // console.log('KEY:', key)
      {
        id: key,
        label: `${key[0].toUpperCase()}${key.slice(1)}`,
        numeric: (key === 'name' || key === 'symbol') ? false : true,
        disablePadding: (key === 'name' || key === 'symbol') ? true : false
      }
    ));
  }
}