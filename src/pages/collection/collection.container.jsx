import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

// saying that we want to make a query req using a query in our server
const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    // variables key is the way that we pass in vars that are dynamic queries are expecting
    variables={{ title: match.params.collectionId }}
  >
    {/* we are getting data.getCollectionsByTitle */}
    {({ loading, data }) => {
      if (loading) return <Spinner />;
      const { getCollectionsByTitle } = data;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);

export default CollectionPageContainer;
