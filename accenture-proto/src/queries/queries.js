import { gql } from "apollo-boost";

const getRequestsQuery = gql`
  {
    requests {
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

const addRequestMutation = gql`
  mutation($requester: String!, $asset: String!, $type: String!, $subject: String!, dateRequested: String!, priority: String!, status: String!, assigned: String!) {
    addRequest(requester: $requester, asset: $asset, type: $type, subject: $subject, dateRequested: $dateRequested, priority: $priority, status: $status, assigned: $assigned) {
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

export { getRequestsQuery, addRequestMutation };
