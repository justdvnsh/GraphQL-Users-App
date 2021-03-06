const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt},
    company: { 
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(resp => resp.data)
      }
     }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // args given to the query.basically saying , for a given id , graphql will return a user.
      resolve(parentValue, args) {
        // The fuction where we actually go into the database and fetch
        // some real data.
        return axios.get(`http://localhost:3000/users/${args.id}`)
                .then(resp => resp.data) // args.id would be provided during the query call.
                // resp.data is used because , axios nests the data into the data property of response.
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
