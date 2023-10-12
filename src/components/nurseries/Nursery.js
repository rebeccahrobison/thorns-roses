import { useEffect, useState } from "react"
import { getNurseryDistributors, getNurseryFlowersById } from "../../services/nurseryService"
import "./Nurseries.css"
import { Flowers } from "../flowers/Flowers"

export const Nursery = ({ nursery }) => {
  const [nurseryFlowers, setNuseryFlowers] = useState([])
  const [distributors, setDistributors] = useState([])

  useEffect(() => {
    getNurseryFlowersById(nursery.id).then(data => {
      setNuseryFlowers(data)
    })
  }, [nursery])

  useEffect(() => {
    getNurseryDistributors(nursery.id).then(data => {
      setDistributors(data)
    })
  }, [nursery])

  
  return (
    <div className="nursery-container">
      <div className="nursery-info">
        <div className="nursery-name"><h3>{nursery.businessName}</h3></div>
      </div>
      <div className="nursery-info">
        <div className="nursery-flowers">
          <h4>Flowers Grown:</h4>
          {nurseryFlowers.map(flower => {
            return (
              <div key={flower.id}>
                <Flowers flower={flower} priceMultiplier={1} />
              </div>
            )
          })}
        </div>
        <div className="nursery-distributors">
          <h4>Distributors</h4>
          {distributors.map(distributor => {
            return (
              <ul className="distributor" key={distributor.id}>
                <li>{distributor.distributor.businessName}</li>
              </ul>
            )
          })}
        </div>
      </div>
    </div>
  )
}