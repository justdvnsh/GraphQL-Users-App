const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

// graphiql is a developement tool .
app.use('/graphql', expressGraphQL({
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Litening to port 4000')
})
