import { gql } from "apollo-boost";
import React from "react";
import { Query } from "react-apollo";
import Header from "./header.component";

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const HeaderContainer = () => (
  // looking for getcarthidden on local cache
  <Query query={GET_CART_HIDDEN}>
    {
      // in the func we'll get back our data and off that data cartHidden
      ({ data: { cartHidden } }) => <Header hidden={cartHidden} />
    }
  </Query>
);

export default HeaderContainer;
