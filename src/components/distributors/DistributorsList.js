import { useEffect, useState } from "react"
import { getDistributors } from "../../services/distributorService"
import { Distributor } from "./Distributor"
import "./Distributors.css"

export const DistributorsList = () => {
  const [distributors, setDistributors] = useState([])

  useEffect(() => {
    getDistributors().then(data => {
      setDistributors(data)
    })
  }, [])

  return (
    <div className="distributors-container">
      <h2>Distributors</h2>
      <div className="distributors">
        {distributors.map((distributor) => {
          return(
            <Distributor distributor={distributor} key={distributor.id} />
          )
        })}
      </div>
    </div>
  )
}