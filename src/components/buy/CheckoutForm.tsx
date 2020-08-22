import * as React from 'react'
import url from '../../api/url'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { PropsBuy } from '../../types'

export const CheckoutForm = ({ conditions, domain, priceId, title, slogan, describe, template, publicKey, privateKey, color1, color2, logo, illustration }: PropsBuy) => {


    const [email, setEmail] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [error, setError] = React.useState<string>()
    const [load, setLoad] = React.useState(false)
    const [address, setAddress] = React.useState('')
    const [codePostal, setCodePostal] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [city, setCity] = React.useState('')
    const [errorData, setErrorData] = React.useState(false)
    const [validPurchase, setValidPurchase] = React.useState(false)

    const stripe = useStripe();
    const elements = useElements();

    const CARD_OPTIONS: object = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: 'rgb(36, 36, 36)',
                color: 'rgb(36, 36, 36)',
                fontWeight: 600,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': { color: 'rgb(36, 36, 36)' },
                '::placeholder': { color: 'rgb(36, 36, 36)' },
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
            },
        },
    };

    const headRequest: any = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    }

    function validateEemail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validateCodePostal(code: string) {
        const re = /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/;
        return re.test(code)
    }


    const subscription = async () => {
        if (!email || !validateEemail(email)) setError('Veuillez entrer une email correct')
        else if (!name) setError(`Veuillez entrer votre nom et prénom`)
        else if (!address) setError(`Veuillez entrer votre adresse postale`)
        else if (!codePostal || !validateCodePostal(codePostal)) setError('Veuillez un code postal correct')
        else if (!country) setError(`Veuillez entrer votre pays`)
        else {
            setLoad(true)
            const resLogo = await fetch(`${url}/image/create`, {
                method: 'POST',
                credentials: 'include',
                headers: headRequest,
                body: JSON.stringify({
                    base: logo
                })
            })
            if (!resLogo) setErrorData(true)
            const resLogoJson = await resLogo.json()
            const logoId = resLogoJson.id
            if (logoId) {
                const resIllustration = await fetch(`${url}/image/create`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: headRequest,
                    body: JSON.stringify({
                        base: illustration
                    })
                })
                if (!resIllustration) setErrorData(true)
                const resIllustrationJson = await resIllustration.json()
                const illustrationId = resIllustrationJson.id
                if (illustrationId) {
                    const Email: string = email;
                    const Name: string = name;
                    const resCustomer = await fetch(`${url}/create-customer`, {
                        method: 'post',
                        credentials: 'include',
                        headers: headRequest,
                        body: JSON.stringify({
                            email: Email,
                            name: Name,
                            address: address,
                            city: city,
                            codePostal: codePostal,
                            country: country
                        })
                    })
                    if (!resCustomer) setErrorData(true)
                    if (resCustomer) {
                        const response = await fetch(`${url}/secret`)
                        if (response) {
                            const responseJson = await response.json()
                            const clientSecret = await responseJson.client_secret;
                            paymenthod(clientSecret, name, logoId, illustrationId)
                        } else setErrorData(true)
                    } else setErrorData(true)
                } else setErrorData(true)
            } else setErrorData(true)
        }

    }

    const paymenthod = async (clientSecret: any, name: string, logoId: string, illustrationId: string) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        let cardConfig: any = elements!.getElement(CardElement)
        const result = await stripe!.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardConfig,
                billing_details: {
                    name: name,
                },
            }
        });

        if (result.error) {
            setError('Un problème avec votre paiement est survenu, veuillez réessayer')
            setLoad(false)
        } else {
            if (!(result && result.paymentIntent && result.paymentIntent.status === 'succeeded')) {
                setError('Un problème avec votre paiement est survenu, veuillez réessayer')
                setLoad(false)
            }
            // The payment has been processed!
            else if (result && result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                const resPurchase = await fetch(`${url}/purchase/create`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: headRequest,
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        title: title,
                        slogan: slogan,
                        description: describe,
                        logo_id: logoId,
                        illustration_id: illustrationId,
                        template: template,
                        public_stripe: publicKey,
                        private_stripe: privateKey,
                        color1: color1,
                        color2: color2,
                        domain: domain,
                        conditions: conditions
                    })
                })
                if (resPurchase) setValidPurchase(true)
            }
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            setError('')
            setLoad(false)
        }, 7000)
    }, [error])


    const getemail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) setEmail(e.target.value)
    }

    const getName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }


    return (
        <>
            {!errorData && !validPurchase ?
                <div className="containerAllBuy">
                    <img className="imgProductBuy" src={require('../purchase/images/offre.png')} alt="offre ecommerce" />
                    <div className="containerBuy" >
                        {error && <p className="errorPay">{error}</p>}
                        {!load ?
                            <>
                                <input className="inputPricingCard" onChange={getemail} placeholder="Votre email" />
                                <input className="inputPricingCard" onChange={getName} placeholder="Nom et prénom" />
                                <input className="inputPricingCard" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAddress(e.target.value) }} placeholder="Adresse" />
                                <input className="inputPricingCard" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCity(e.target.value) }} placeholder="Ville" />
                                <input className="inputPricingCard" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCodePostal(e.target.value) }} placeholder="Code postale" />
                                <input className="inputPricingCard" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCountry(e.target.value) }} placeholder="Pays" />
                            </>
                            : <img alt="loading icon" style={{ width: "50%" }} src={require('./image/load.gif')} />}

                        <div className="inputPricingCard">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                        {!load &&
                            <button style={{ marginTop: '35px', maxWidth: '80%', marginBottom: '30px' }} onClick={() => { subscription() }} className="button">Commander mon e-commerce pour 300€</button>}
                    </div>
                </div>
                : errorData ?
                    <div className="contentPurchase">
                        <h1 className="titlePurchase">Oups, une erreur est survenue</h1>
                        <h3 style={{ marginLeft: '40px', marginTop: '0' }} className="textPurchase">Désolé pour la gêne occasionnée<br /><br /></h3>
                        {window.innerWidth > 1250 ?
                            <button onClick={() => { window.location.reload() }} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Re commander</button>
                            :
                            <button onClick={() => { window.location.reload() }} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Re commander</button>}
                    </div>
                    : validPurchase &&
                    <div style={{alignItems: 'center', justifyContent: 'center'}} className="contentPurchase">
                        <h1 className="titlePurchase">Félicitation ! Vous avez commandé votre e-commerce !</h1>
                        <h3 style={{ marginLeft: '40px', marginTop: '0' }} className="textPurchase">Vous recevrez très prochainement les détails de votre commande par email et nous vous préviendrons dès que le développement de votre site sera fini</h3>
                    </div>}
        </>
    )
}