import React from "react";
import { Route } from "react-router-dom";

// the container is still imported but it is keeping the name as CollectionsOverview so we don't have to change our code
import { default as CollectionsOverview } from "../../components/collections-overview/collections-overview.container";
import { default as CollectionPage } from "../collection/collection.container";

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
