const express = require('express')
const { v4: uuidv4 } = require('uuid');

const app = express()
app.use(express.json());

const customers = []


app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  
  // validando se CPF ja existe na "base de dados"
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  )

  if (customerAlreadyExists) {
    return res.status(400).json({ error: "Customer already exists!" });
  }
  else {
    customers.push({
      cpf,
      name,
      id: uuidv4(),
      statement: []
    })
  }



  return res.status(201).send(customers);
})

app.listen(3333);