import { createGraphqlRequestClient } from "@UI/../api"
import { useQuery } from "react-query"

type args= {}
export const adminGetSettingsQueryKey = ()=> ["admin-get-site-settings"]

export const adminGetSettingsQueryFetcher = ()=> {
    const client = createGraphqlRequestClient()
    client.setQuery(``)

    const res = await client.send()

    return res.data.
}


export const useAdminGetSiteSettings = () => useQuery(adminGetSettingsQueryKey(),()=> adminGetSettingsQueryFetcher())
