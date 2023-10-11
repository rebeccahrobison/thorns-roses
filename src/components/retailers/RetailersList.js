import { useEffect, useState } from "react"
import "./Retailers.css"
import { getDistributorRetailers } from "../../services/retailerService"
import { Retailer } from "./Retailer"

export const RetailersList = () => {
  const [distributorRetailers, setDistributorRetailers] = useState([])

  useEffect(() => {
    getDistributorRetailers().then(data => {
      setDistributorRetailers(data)
    })
  }, [])

  return (
    <div className="retailers-container">
      <h2>Retailers</h2>
      <div className="retailers">
        {distributorRetailers.map((retailer) => {
          return(
            <Retailer retailer={retailer} key={retailer.id} />
          )
        })}
      </div>
    </div>
  )
}