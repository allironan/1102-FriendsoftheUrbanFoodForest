import React from 'react'
import { Elements } from 'stripe'
import { loadStripe } from 'stripe'

const PUBLIC_KEY = "pk_test_51JxdYlDXjNLHEd6TkmxykUQJgaD4aDLnWHJMwBPE1taFoKGRXQ31jBMKNuXwhaB9JHtB49grLDZI77FrFKb7iojU00835SodMc"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}