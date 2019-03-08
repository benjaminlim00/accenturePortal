const graphql = require("graphql");
const _ = require("lodash");
const Request = require("../models/requests");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const RequestType = new GraphQLObjectType({
  name: "Request",
  fields: () => ({
    id: { type: GraphQLID },
    requester: { type: GraphQLString },
    asset: { type: GraphQLString },
    type: { type: GraphQLString },
    subject: { type: GraphQLString },
    dateRequested: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
    assigned: { type: GraphQLString },
    dateResolved: { type: GraphQLString },
    dateClosed: { type: GraphQLString }
    // author: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     //return _.find(authors, { id: parent.authorId });
    //     return Author.findById(parent.authorId);
    //   }
    // }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    request: {
      type: RequestType,
      args: { requester: { type: GraphQLString } },
      resolve(parent, args) {
        return Request.findById(args.requester);
      }
    },
    //to get all Books
    requests: {
      type: new GraphQLList(RequestType),
      resolve(parent, args) {
        //return books;
        return Request.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addRequest: {
      type: RequestType,
      args: {
        requester: { type: new GraphQLNonNull(GraphQLString) },
        asset: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        dateRequested: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        assigned: { type: new GraphQLNonNull(GraphQLString) },
        dateResolved: { type: new GraphQLNonNull(GraphQLString) },
        dateClosed: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let request = new Request({
          requester: args.requester,
          asset: args.asset,
          type: args.type,
          subject: args.subject,
          dateRequested: args.dateRequested,
          priority: args.priority,
          status: args.status,
          assigned: args.assigned,
          dateResolved: args.dateResolved,
          dateClosed: args.dateClosed
        });
        return request.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
