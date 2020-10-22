import { gql } from "apollo-boost";
import React from "react";
import { Mutation } from "react-apollo";
import { addItemToCart } from "../../redux/cart/cart.utils";
import CollectionItem from "./collection-item.component";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

// passes item in as prop in collection preview
// shorthand way so we don't have to pass the variables prop, then grab the item
const CollectionItemContainer = (props) => (
  <Mutation mutation={ADD_ITEM_TO_CART}>
    {(addItemToCart) => (
      <CollectionItem
        {...props}
        addItem={(item) => addItemToCart({ variables: { item } })}
      />
    )}
  </Mutation>
);

export default CollectionItemContainer;
