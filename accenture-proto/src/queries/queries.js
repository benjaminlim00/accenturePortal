import { gql } from "apollo-boost";

const getRequestsQuery = gql`
  {
    requests {
      id
      requester
      asset
      type
      subject
      dateRequested
      priority
      status
      assigned
      dateResolved
      dateClosed
    }
  }
`;

const addRequestMutation = gql`
  mutation(
    $requester: String!
    $asset: String!
    $type: String!
    $subject: String!
    $dateRequested: String!
    $priority: String!
    $status: String!
    $assigned: String!
    $dateResolved: String!
    $dateClosed: String!
  ) {
    addRequest(
      requester: $requester
      asset: $asset
      type: $type
      subject: $subject
      dateRequested: $dateRequested
      priority: $priority
      status: $status
      assigned: $assigned
      dateResolved: $dateResolved
      dateClosed: $dateClosed
    ) {
      requester
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

const deleteRequestMutation = gql`
  mutation deleteRequestMutation($id: ID!) {
    deleteRequest(id: $id) {
      id
    }
  }
`;

export { getRequestsQuery, addRequestMutation, deleteRequestMutation };
