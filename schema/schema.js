const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    type: UserType,
    args: { id: { type: GraphQLString } }, // args given to the query.basically saying , for a given id , graphql will return a user.
    resolve(parentValue, args) {
      // The fuction where we actually go into the database and fetch
      // some real data.
    }
  }
})
