import React, { useEffect, useState } from 'react'
import { Address } from 'wagmi'
import { CheckoutWithCard, PaperSDKProvider } from '@paperxyz/react-client-sdk'

type PapperCheckoutProps = {
  walletAddress: Address
}

function PapperCheckout({ walletAddress }: PapperCheckoutProps) {
  const [sdkClientSecret, setSdkClientSecret] = useState('')
  const [checkoutWithCard, setCheckoutWithCard] = useState(false)

  const createSdkClientSecret = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAPPER_API_KEY}`,
      },
      body: JSON.stringify({
        contractId: 'f5b49e5b-2027-44c8-892c-911a17dffbea',
        walletAddress,
        title: 'Test Example 1',
        quantity: 1,
        expiresInMinutes: 15,
        metadata: {},
        mintMethod: {
          name: 'claimTo',
          args: { _to: '$WALLET', _quantity: '$QUANTITY', _tokenId: 0 },
          payment: { currency: 'MATIC', value: '0.001 * $QUANTITY' },
        },
        feeBearer: 'BUYER',
        sendEmailOnTransferSucceeded: true,
        capturePaymentLater: false,
      }),
    }

    try {
      const resp = await fetch(
        'https://withpaper.com/api/2022-08-12/checkout-sdk-intent',
        options
      )
      const { sdkClientSecret } = await resp.json()
      setSdkClientSecret(sdkClientSecret)
    } catch (e) {
      console.log('Error while while creating SDK Client Secret', e)
    }
  }

  useEffect(() => {
    sdkClientSecret && !checkoutWithCard && setCheckoutWithCard(true)
  }, [sdkClientSecret])

  if (checkoutWithCard) {
    return (
      <PaperSDKProvider appName="My Web3 App" chainName="Polygon">
        <CheckoutWithCard
          sdkClientSecret={sdkClientSecret}
          onPaymentSuccess={(result) => {
            console.log('Payment successful.')
          }}
          onError={(error) => {
            console.error('Payment error:', error)
          }}
          options={{
            colorBackground: '#121212',
            colorPrimary: '#19A8D6',
            colorText: '#f0f0f0',
            borderRadius: 24,
          }}
        />
      </PaperSDKProvider>
    )
  }

  return (
    <button
      onClick={createSdkClientSecret}
      style={{ width: 30, background: 'green', color: 'white' }}
    >
      +
    </button>
  )
}

export default PapperCheckout
