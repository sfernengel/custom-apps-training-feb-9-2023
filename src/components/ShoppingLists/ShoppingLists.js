import React from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";
import { fetchShoppingLists } from "./queries.graphql";
import { deleteShoppingList, createShoppingList } from "./mutations.graphql";
import { useState } from "react";

import DataTableManager from "@commercetools-uikit/data-table-manager";
import DataTable from "@commercetools-uikit/data-table";

//data
//results[i].id

const cols = [
  {
    key: "id",
    label: "ID",
    renderItem: (row) => (row.id ? row.id : ""),
  },
  {
    key: "name",
    label: "Name",
    renderItem: (row) =>
      row.nameAllLocales ? row.nameAllLocales[0].value : "",
  },
];

const ShoppingLists = () => {
  const [shoppingListName, setShoppingListName] = useState("");
  const [shoppingListLocale, setShoppingListLocale] = useState("");

  // fetch shoppinglists
  const { error, data, loading } = useQuery(fetchShoppingLists, {
    context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
  });

  // delete a shopping list
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
        id: "77610ac9-e2b4-49d8-819d-47107a2a47ab",
      },
      context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
    });
    if (error) console.log(error.message);
  };

  // create a shopping list
  // locale:en name:"abcd"

  const [addShoppingList] = useMutation(createShoppingList, options);

  // const handleAdd = async () => {
  //   const { error } = await addShoppingList({
  //     variables: {
  //       name: "My Shopping List 123",
  //       locale: "en",
  //     },
  //     context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
  //   });

  //   if (error) console.log(error.message);
  // };

  const handleAdd = async () => {
    const { error } = await addShoppingList({
      variables: {
        name: "My Shopping List 123",
        locale: "en",
      },
      context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
    });

    if (error) console.log(error.message);
  };

  const handleAddShoppingList = async (event) => {
    event.preventDefault();
    const { error } = await addShoppingList({
      variables: {
        name: shoppingListName,
        locale: shoppingListLocale,
      },
      context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
    });

    if (error) console.log(error.message);
  };

  // Add Table

  const rows = [
    { id: "parasite", title: "Parasite", country: "South Korea" },
    { id: "portrait", title: "Portrait of a Lady on Fire", country: "France" },
    { id: "wat", title: "Woman at War", country: "Iceland" },
  ];
  const columns = [
    { key: "title", label: "Title" },
    { key: "country", label: "Country" },
  ];

  if (loading) return "Loading ...";
  if (error) return `--Error ${error.message}`;
  console.log(data);

  return (
    <div>
      ShoppingLists
      <form>
        <label>Locale: </label>
        <input
          type="text"
          value={shoppingListLocale}
          onChange={(event) => setShoppingListLocale(event.target.value)}
        />
        <label>Name: </label>
        <input
          type="text"
          value={shoppingListName}
          onChange={(event) => setShoppingListName(event.target.value)}
        />
        <button onClick={handleAddShoppingList}> add Shopping List</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleAdd}>Add</button>
      <DataTableManager columns={cols}>
        <DataTable rows={data?.shoppingLists?.results} />
      </DataTableManager>
      ;
    </div>
  );
};
ShoppingLists.displayName = "ShoppingLists";

export default ShoppingLists;
