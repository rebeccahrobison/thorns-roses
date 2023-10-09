import { useEffect, useState } from "react"
import { getNurseries } from "../../services/nurseryService"
import { Nursery } from "./Nursery"

export const NurseriesList = () => {
  const [nurseries, setNurseries] = useState([])

  useEffect(() => {
    getNurseries().then(data => {
      const fetchedNurseries = data
      setNurseries(fetchedNurseries)
    })
  }, [])

  return (
    <div className="nurseries-container">
      <h2>Nurseries List</h2>
      <div className="nurseries">
        {nurseries?.map((nursery) => {
          return (
            <Nursery nursery={nursery} key={nursery.id} />
          )
        })}
      </div>
    </div>
  )
}