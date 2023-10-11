export const getDistributorRetailers = () => {
  return fetch(`http://localhost:8088/distributorRetailers?_expand=retailer&_expand=distributor`).then(
    res => res.json()
  )
}