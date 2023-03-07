import { createGraphqlRequestClient } from "@UI/../api";
import React from "react";
import { useQuery } from "react-query";





type args = {}
export const useAdminGetAccountProducts = (args:) => useQuery(["admin-get-account-product",{args}],async ()=> {
    const client = createGraphqlRequestClient()

    client.setQuery(``)

    const res = await client.setVariables<>().send<>()

})