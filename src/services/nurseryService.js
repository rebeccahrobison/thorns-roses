export const getNurseries = () => {
  return fetch(`http://localhost:8088/nurseries`).then(res => res.json())
}

export const getNurseryFlowersById = (nurseryId) => {
  return fetch(`http://localhost:8088/nurseryFlowers?nurseryId=${nurseryId}&_expand=flower`).then(
    res => res.json()
  )
}

export const getNurseryDistributors = (nurseryId) => {
  return fetch(`http://localhost:8088/nurseryDistributors?nurseryId=${nurseryId}&_expand=distributor`).then(
    res => res.json()
  )
}

