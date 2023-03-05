


import { MyReturnsSection, ProductReturnsList, useAdminGetUserWishlist } from '@UI'
import React from 'react'

export const AccountReturns:React.FC<{
    accountId:string
}> = () => {
    const { } =useAdminGetUserWishlist
  return (
    <ProductReturnsList items={} />
  )
}