import { useEffect, useState } from "react"
import { getDistributorRetailersByDistributorId, getNurseryDistributorsByDistributorId } from "../../services/distributorService"
import { getNurseryFlowersById } from "../../services/nurseryService"

export const Distributor = ({ distributor }) => {
  const [nurseryDistributors, setNurseryDistributors] = useState([])
  const [distributorFlowers, setDistributorFlowers] = useState([])
  const [retailers, setRetailers] = useState([])

  useEffect(() => {
    // console.log(distributor.id)
    getNurseryDistributorsByDistributorId(distributor.id).then(data => {
      const distNurseries = data
      setNurseryDistributors(distNurseries)
    })
  }, [distributor])

  // Get nurseries that distributor uses
  // Get list of flowers from those nurseries
  useEffect(() => {
    const fetchFlowers = async () => {
      const flowersArr = []

      for (const obj of nurseryDistributors) {
        const arr = await getNurseryFlowersById(obj.nurseryId)
        flowersArr.push(...arr)
      }
      setDistributorFlowers(flowersArr)
    };
    fetchFlowers()
    }, [nurseryDistributors])

    useEffect(() => {
      getDistributorRetailersByDistributorId(distributor.id).then(data => {
        const distRetailers = data.filter(obj => obj.distributorId === distributor.id)
        setRetailers(distRetailers)
      })
    }, [distributor])

  return (
    <div className="distributor-container">
      <div className="distributor-info">
        <div className="distributor-name"><h3>{distributor.businessName}</h3></div>
      </div>
      <div className="distributor-info">
        <div className="distributor-flowers">
          <h4>Flowers distributed:</h4>
          {distributorFlowers.map((flower) => {
            return (
              <div className="flower" key={flower?.id}>
                <ul>
                  <li><em>Species: </em>{flower?.flower?.species}</li>
                  <li><em>Color: </em>{flower?.flower?.color}</li>
                  <li><em>Price: </em>${((flower?.price)*(distributor.priceMarkup*.1)).toFixed(2)}</li>
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      <div className="distributor-info">
          <div className="distributor-retailers">
            <h4>Retailers:</h4>
            {retailers.map(retailer => {
              return (
                <div className="retailer" key={retailer.id}>
                  <ul>
                    <li>{retailer.retailer.businessName}</li>
                  </ul>
                </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}




/* <div className="test">
{nurseryDistributors.map(nd => {
  return (<p>{nd.id}</p>)
})}
</div> */

  // const nDSetter = () => {
  //   // let flowersArr = []
  //   nurseryDistributors.map(obj => 
  //     getNurseryFlowersById(obj.nurseryId).then(data => {
  //      // data.map(d => flowersArr.push(d))
  //      // console.log(data)
  //     //  flowersArr.push(data)
  //     setDistributorFlowers(data)
  //    })
  //  )
  //  setDistributorFlowers(flowersArr)
  // }

        // nurseryDistributors.map(obj => 
      //    getNurseryFlowersById(obj.nurseryId).then(data => {
      //     // console.log(typeof(data))
      //     data.map(d => flowersArr.push(d))
      //    }
      //   )
      // 