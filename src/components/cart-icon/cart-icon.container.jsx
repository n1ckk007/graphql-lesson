import { gql } from "apollo-boost";
import React from "react";
import { graphql } from "react-apollo";
import { flowRight } from "lodash";

import CartIcon from "./cart-icon.component";

// calling the mutation that we have defined in our typeDefs which is the func that
// changes cartHidden property
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// log props to see what we're getting back
const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
  <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

// const CartIconContainer = () => (
//   <Query query={GET_ITEM_COUNT}>
//     {({ data: { itemCount } }) => (
//       <Mutation mutation={TOGGLE_CART_HIDDEN}>
//         {(toggleCartHidden) => (
//           <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
//         )}
//       </Mutation>
//     )}
//   </Query>
// );

// flowright takes mutations and queries and it binds them to some component we can pass as the outcome of that func cos its a HOC
export default flowRight(
  // will have access to data obj inside of the props that the container gets & that data will have the itemCount property
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: "toggleCartHidden" })
)(CartIconContainer);
