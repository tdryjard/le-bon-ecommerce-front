import * as React from 'react'
import { CheckoutForm } from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PropsBuy } from '../../types'


export const Buy = ({ domain, priceId, title, slogan, describe, template, publicKey, privateKey, color1, color2, logo, illustration }: PropsBuy) => {

    const stripePromise = loadStripe("pk_live_u4e03SLJFJMC8k4Bv7g1T3Py00rrpMeJLo");

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm domain={domain} priceId={priceId} title={title} slogan={slogan} describe={describe} template={template} publicKey={publicKey} privateKey={privateKey} color1={color1} color2={color2} logo={logo} illustration={illustration} />
        </Elements>
    );
};