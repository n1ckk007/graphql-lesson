// obj that we can pass to our client that lets it know what vals to resolve
// depending on what mutations/queries get called from the local client side
import { gql } from "apollo-boost";
import { addItemToCart } from "./cart.utils";

// type definitions should be capitalized
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;
// read from our cache the initial value and flip it everytime it gets called
// @client lets apollo know that anything calling this query is looking for this query on the local cache
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const resolvers = {
  // mutation definitions
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      // we get back the data obj, readquery gets an obj where the query is the actual query we're passing in
      // cartHidden will be the property on the data obj that has the boolean val we want so can just destructure it
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });
      //   update cache with the reverse val once we've gotten the val
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });
      return !cartHidden;
    },
    // {item} is the _args, plucking it off of args obj
    addItemToCart: (_root, { item }, { cache }) => {
      // get the cartItems off of the cache state
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      // our func where we add item to cart passing in our existing items aswell as new item we're trying to add
      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        // now the data updates cartItems to our newCartItems
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },
  },
};
