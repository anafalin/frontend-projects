export const getWarehouseData = () =>
  JSON.parse(localStorage.getItem('warehouseData') || '[]')

export const saveWarehouseData = (data) =>
  localStorage.setItem('warehouseData', JSON.stringify(data))
