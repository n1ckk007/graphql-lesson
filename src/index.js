import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./App";

import { createHttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { typeDefs, resolvers } from "../src/graphql/resolvers";

// establish the connection to our backend
const httpLink = createHttpLink({
  // link we were playing against in the graphql playground
  uri: "https://crwn-clothing.com",
});

// create our cache which is the local storage
const cache = new InMemoryCache();

// make the client
const client = new ApolloClient({
  // link going to our new httplink so it knows what to request to
  link: httpLink,
  // cache goes to cache
  cache,
  typeDefs,
  resolvers,
});

client.writeData({
  // the val of data will be the obj that has all the keys that we're trying to store
  data: {
    // cartdropdown hidden value
    cartHidden: true,
    // as it was in the cart reducer
    cartItems: [],
    // count of the total items in cart
    itemCount: 0,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
