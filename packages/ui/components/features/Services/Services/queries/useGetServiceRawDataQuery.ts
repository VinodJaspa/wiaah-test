import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";







type args = {}
const getServiceRawDataQueryKey = (args:args)=> ["service-raw-data",{args}]



const getServiceRawDataQueryFetcher = (args:args)=> {
    const client = createGraphqlRequestClient()

    const res = client.setQuery(``).setVariables().send()

} 

export const useGetServiceRawDataQuery = (args:args)=> useQuery(getServiceRawDataQueryKey(),()=>)