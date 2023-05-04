import React from 'react'
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui'

type CrossmintPayProps = {
  totalPrice: string
  tokenId: string
  contractAddress: string
  tokenType: string
}

function CrossmintPay({
  totalPrice,
  tokenId,
  contractAddress,
  tokenType,
}: CrossmintPayProps) {
  console.log({
    totalPrice,
    tokenId,
    contractAddress,
    tokenType,
  })
  return (
    <CrossmintPayButton
      clientId={process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID!}
      environment="staging"
      mintConfig={{
        type: tokenType,
        totalPrice,
        tokenId,
        contractAddress,
      }}
    />
  )
}

export default CrossmintPay
