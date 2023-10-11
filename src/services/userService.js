export const getCustomerByEmail = (email) => {
  return fetch(`http://localhost:8088/customers?email=${email}`).then(
    res => res.json()
  )
}

export const createCustomer = (customer) => {
  return fetch(`http://localhost:8088/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then(res => res.json())
}