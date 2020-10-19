import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

// the request itself
const GET_COLLECTIONS = gql`
  {
    collections {
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

// functional component that will return us back our query component
const CollectionsOverviewContainer = () => (
  // pass our query into the query using the query key
  <Query query={GET_COLLECTIONS}>
    {/* gives us back a func, on that func an obj that holds diff properties  
      destructure off loading, error and data*/}
    {({ loading, error, data }) => {
      console.log({ loading });
      console.log({ error });
      console.log({ data });
      //   if its loading return the spinner (removed HOC)
      if (loading) return <Spinner />;
      //   if not loading
      return <CollectionsOverview collections={data.collections} />;
    }}
  </Query>
);

export default CollectionsOverviewContainer;
