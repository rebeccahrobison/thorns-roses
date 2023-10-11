import { useEffect, useState } from "react"
import "./Retailers.css"
import { getNurseryDistributorsByDistributorId } from "../../services/distributorService"
import { getNurseryFlowersById } from "../../services/nurseryService"
import { postToShoppingCart } from "../../services/shoppingCartService"

export const Retailer = ({ retailer }) => {
  const [nurseryDistributors, setNurseryDistributors] = useState([])
  const [retailerFlowers, setRetailerFlowers] = useState([])

  useEffect(() => {
    getNurseryDistributorsByDistributorId(retailer.distributorId).then(data => {
      const distNurseries = data
      setNurseryDistributors(distNurseries)
    })
  }, [retailer])

  // Get distributor of each retailer
  // Get nurseries of each distributor
  // Get flowers of each nursery
  useEffect(() => {
    const fetchFlowers = async () => {
      const flowersArr = []

      for (const obj of nurseryDistributors) {
        const arr = await getNurseryFlowersById(obj.nurseryId)
        flowersArr.push(...arr)
      }
      setRetailerFlowers(flowersArr)
    }
    fetchFlowers()
  }, [nurseryDistributors])


  const handleAddToCart = (flowerId) => {

    const localUser = localStorage.getItem("thorns_user")
    const userId = JSON.parse(localUser).id

    const cartObject = {
      customerId: userId,
      retailerId: retailer.id,
      flowerId: flowerId,
      // price: price
    }

    postToShoppingCart(cartObject)
  }

  return (
    <div className="retailer-container">
      <div className="retailer-info">
        <div className="retailer-name"><h3>{retailer.retailer.businessName}</h3></div>
        <div className="retailer-address">{retailer.retailer.address}</div>
      </div>
      <div className="retailer-info">
        <div className="retailer-flowers">
          <h4>Flowers available:</h4>
          <div className="flower-container">
            {retailerFlowers.map((flower) => {
              return (
                <div className="flower" key={flower.id}>
                    <ul>
                      <li><em>Species: </em>{flower.flower.species}</li>
                      <li><em>Color: </em>{flower.flower.color}</li>
                      <li><em>Price: </em>${((flower.price)*(retailer.distributor.priceMarkup*.1)*(retailer.retailer.priceMarkup*.1)).toFixed(2)}</li>
                    </ul>
                  
                  <button className="cart-btn" onClick={
                    (e) => {
                      e.preventDefault()
                      // const price = ((flower.price)*(retailer.distributor.priceMarkup*.1)*(retailer.retailer.priceMarkup*.1)).toFixed(2)
                      handleAddToCart(flower.flowerId)
                    }}
                    >Add To Cart
                  </button>
                </div>
              )
          })}
          </div>
        </div>
      </div>
      <div className="retailer-info">
        <div className="retailer-distributors">
          <h4>Distributor Client:</h4>
          {retailer.distributor.businessName}
        </div>
      </div>
      <div className="retailer-info">
        <div className="retailer-nurseries">
          <h4>Distributor's Nurseries:</h4>
          {nurseryDistributors.map(nursery => {
            return (
              <div className="nursery" key={nursery.id}>{nursery.nursery.businessName}</div>
            )
          })}
        </div>
      </div>
    </div>
  )
}