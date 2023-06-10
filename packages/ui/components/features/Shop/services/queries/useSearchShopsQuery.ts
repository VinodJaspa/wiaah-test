import { createGraphqlRequestClient } from "@UI/../api"
import { useQuery } from "react-query"









type args = {}
export const searchShopsQueryKey = (args:args)=> ["search-shops",{args}]

export const searchShopsQueryFetcher = ()=> {
    const client = createGraphqlRequestClient()
    const res = await client.setQuery().setVariables<>().send()
}

export const useSearchShopsQuery = (args:args)=> {
    return useQuery(searchShopsQueryKey(args),()=> )
}