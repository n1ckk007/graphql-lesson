import { gql } from "apollo-boost";
import React from "react";
import { Mutation, Query } from "react-apollo";
import CartDropdown from "./cart-dropdown.component";

// calling the mutation that we have defined in our typeDefs which is the func that
// changes cartHidden property
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const CartDropdownContainer = () => (
  // 1 this mutation is a func that gives us toggleCartHidden
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {(toggleCartHidden) => (
      // 2 which inturn returns our query
      <Query query={GET_CART_ITEMS}>
        {/* 3 which gives us our data which all is wrapped around our cartdrop */}
        {({ data: { cartItems } }) => (
          <CartDropdown
            cartItems={cartItems}
            toggleCartHidden={toggleCartHidden}
          />
        )}
      </Query>
    )}
  </Mutation>
);

export default CartDropdownContainer;
