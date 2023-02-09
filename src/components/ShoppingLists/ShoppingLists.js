import React from "react";
import { useQuery } from "@apollo/client/react";
import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";
import { fetchShoppingLists } from "./queries.graphql";

const ShoppingLists = () => {
  const { error, data, loading } = useQuery(fetchShoppingLists, {
    context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
  });

  if (loading) return "Loading";
  if (error) return `--Error ${error.message}`;
  console.log(data);

  return <div>ShoppingLists</div>;
};
ShoppingLists.displayName = "ShoppingLists";

export default ShoppingLists;
