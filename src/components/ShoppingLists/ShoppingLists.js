import React from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";
import { fetchShoppingLists } from "./queries.graphql";
import { deleteShoppingList } from "./mutations.graphql";

const ShoppingLists = () => {
  const { error, data, loading } = useQuery(fetchShoppingLists, {
    context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
  });

  const options = {
    refetchQueries: [
      {
        query: fetchShoppingLists,
        context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
      },
    ],
  };

  const [delShoppingList] = useMutation(deleteShoppingList, options);

  const handleDelete = async () => {
    const { error } = await delShoppingList({
      variables: {
        version: 1,
        id: "e1a95153-f905-4a20-9cdd-89a18c0f5fbb",
      },
      context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
    });
    if (error) console.log(error.message);
  };

  if (loading) return "Loading ...";
  if (error) return `--Error ${error.message}`;
  console.log(data);

  return (
    <div>
      ShoppingLists
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
ShoppingLists.displayName = "ShoppingLists";

export default ShoppingLists;
