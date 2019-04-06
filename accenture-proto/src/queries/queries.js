import { gql } from "apollo-boost";

//Single Author Query
const getUserQuery = gql`
  query($id: ID) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      contactNumber
      accountType

      requests {
        id
        asset
        type
        subject
        dateRequested
        priority
        status
        assigned
        dateResolved
        dateClosed
        mainThread

        threads {
          id
          threadContent
          threadCreatedDate
        }
      }
    }
  }
`;

//Single Request Query
const getRequestQuery = gql`
  query($id: ID) {
    request(id: $id) {
      id
      asset
      type
      subject
      dateRequested
      priority
      status
      assigned
      dateResolved
      dateClosed
      mainThread

      user {
        id
        firstName
        lastName
        email
        contactNumber
        accountType
      }

      threads {
        id
        threadContent
        threadCreatedDate
      }
    }
  }
`;

//Single Thread Query
const getThreadQuery = gql`
  query($id: ID) {
    thread(id: $id) {
      id
      threadContent
      threadCreatedDate

      request {
        id
        asset
        type
        subject
        dateRequested
        priority
        status
        assigned
        dateResolved
        dateClosed
        mainThread

        user {
          id
          firstName
          lastName
          email
          contactNumber
          accountType
        }
      }
    }
  }
`;

//All Users Query
const getUsersQuery = gql`
  {
    users {
      id
      firstName
      lastName
      email
      contactNumber
      accountType
    }
  }
`;

//All Request Query
const getRequestsQuery = gql`
  {
    requests {
      id
      asset
      type
      subject
      dateRequested
      priority
      status
      assigned
      dateResolved
      dateClosed
      mainThread
      user {
        id
        firstName
        lastName
        email
        contactNumber
        accountType
      }
      threads {
        id
        threadContent
        threadCreatedDate
      }
    }
  }
`;

//All Threads Query
const getThreadsQuery = gql`
  {
    threads {
      id
      threadContent
      threadCreatedDate
    }
  }
`;

const addRequestMutation = gql`
  mutation(
    $asset: String!
    $type: String!
    $subject: String!
    $dateRequested: String!
    $priority: String!
    $status: String!
    $assigned: String!
    $dateResolved: String!
    $dateClosed: String!
    $mainThread: String!
    $requesterId: ID!
  ) {
    addRequest(
      asset: $asset
      type: $type
      subject: $subject
      dateRequested: $dateRequested
      priority: $priority
      status: $status
      assigned: $assigned
      dateResolved: $dateResolved
      dateClosed: $dateClosed
      mainThread: $mainThread
      requesterId: $requesterId
    ) {
      id
      asset
      type
      subject
      dateRequested
      priority
      status
      assigned
    }
  }
`;

const addThreadMutation = gql`
  mutation(
    $threadContent: String!
    $threadCreatedDate: String!
    $requestId: ID!
  ) {
    addThread(
      threadContent: $threadContent
      threadCreatedDate: $threadCreatedDate
      requestId: $requestId
    ) {
      id
      threadContent
      threadCreatedDate
    }
  }
`;

const deleteRequestMutation = gql`
  mutation deleteRequestMutation($id: ID!) {
    deleteRequest(id: $id) {
      id
    }
  }
`;

const deleteThreadsMutation = gql`
  mutation deleteThreadsMutation($requestId: ID!) {
    deleteThreads(id: $requestId) {
      id
    }
  }
`;

export {
  getThreadQuery,
  getThreadsQuery,
  addThreadMutation,
  getRequestQuery,
  getRequestsQuery,
  addRequestMutation,
  deleteRequestMutation,
  getUserQuery,
  getUsersQuery, //not used yet
  deleteThreadsMutation
};
