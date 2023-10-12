export const Flowers = ({ flower, priceMultiplier }) => {
 return(
    <ul>
      <li><em>Species: </em>{flower?.flower.species}</li>
      <li><em>Color: </em>{flower?.flower?.color}</li>
      <li><em>Price: </em>${((flower?.price) * priceMultiplier).toFixed(2)}</li>
    </ul>
 )
}