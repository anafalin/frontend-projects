export const sortWarehouseData = (data, method) => {
  const dataCopy = [...data]

  switch (method) {
    case 'name':
      return dataCopy.sort((a, b) => a.name.localeCompare(b.name))
    case 'shelf':
      return dataCopy.slice().sort((a, b) => a.shelf - b.shelf)
    case 'weight':
      return dataCopy.slice().sort((a, b) => a.weight - b.weight)
    case 'date':
      return dataCopy.slice().sort((a, b) => a.date.localeCompare(b.date))
    case 'actions':
    default:
      return dataCopy
  }
}
