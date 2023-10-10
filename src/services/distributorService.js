export const getDistributors = () => {
  return fetch(`http://localhost:8088/distributors`).then(res => res.json())
}

export const getNurseryDistributorsByDistributorId = (distributorId) => {
  return fetch(`http://localhost:8088/nurseryDistributors?distributorId=${distributorId}`).then(
    (res) => res.json()
  )
}

export const getDistributorRetailersByDistributorId = (distributorId) => {
  return fetch(`http://localhost:8088/distributorRetailers?distributorId=${distributorId}&_expand=retailer`).then(
    res => res.json()
  )
}