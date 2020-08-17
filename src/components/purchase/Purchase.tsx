import React, { useState, useEffect } from 'react'
import { Buy } from '../buy/Buy'
import './Purchase.scss'

export const Purchase = () => {
    const [step, setStep] = useState(1)
    const [domaine, setDomaine] = useState('')
    const [alert, setAlert] = useState('')
    const [publicKey, setPublicKey] = useState('')
    const [privateKey, setPrivateKey] = useState('')
    const [template, setTemplate] = useState(0)
    const [viewTemplate, setViewTemplate] = useState(0)
    const [title, setTitle] = useState('')
    const [slogan, setSlogan] = useState('')
    const [describe, setDescribe] = useState('')
    const [logo, setLogo] = useState('')
    const [illustration, setIllustration] = useState('')
    const [color1, setColor1] = useState('')
    const [color2, setColor2] = useState('')

    const getFile = (e: React.ChangeEvent<HTMLInputElement>, typeImg: string) => {
        if (e.target.files) {
            const file: any = e.target.files[0];
            if (file) {
                if (file.size > 760000) {
                    setAlert(`l'image ne doit pas dépasser 750ko`)
                }
                else {
                    e.preventDefault();
                    const reader: any = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        if (typeImg === 'logo') setLogo(reader.result)
                        else if (typeImg === 'illustration') setIllustration(reader.result)
                    };
                }
            }
        }
    }

    const verifStep1 = () => {
        if (!domaine) setAlert('Veuillez entrer un nom de domaine disponible')
        else {
            let domaineSplit = domaine.split('')
            if (domaineSplit && domaineSplit.length) {
                let end = (domaineSplit[domaineSplit.length - 3] + domaineSplit[domaineSplit.length - 2] + domaineSplit[domaineSplit.length - 1])
                if (!(end === '.fr' || end === 'com')) setAlert('le nom de domaine doit se finir en .fr ou .com')
                else {
                    setAlert('')
                    setStep(3)
                }
            } else setAlert('le nom de domaine doit se finir en .fr ou .com')
        }
    }

    const verifStep2 = () => {
        if (!publicKey) setAlert('Veuillez entrer votre clé publique Stripe')
        else if (!privateKey) setAlert('Veuillez entrer votre clé privée Stripe')
        else {
            setAlert('')
            setStep(4)
        }
    }

    const verifStep3 = () => {
        if (template === 0) setAlert('Veuillez selectionner un modèle')
        else {
            setAlert('')
            setStep(5)
        }
    }

    const verifStep4 = () => {
        if (!title) setAlert('Veuillez entrer le nom de votre marque ou site')
        else if (!slogan) setAlert('Veuillez entrer votre slogan (définir votre marque en 1 phrase)')
        else if (!(color1 && color2)) setAlert('Veuillez entrer les deux couleurs principales de votre site')
        else if ((color1.split('')[0] !== '#' || color2.split('')[0] !== '#')) setAlert('Veuillez entrer des couleurs en format "HEX" (hexadécimal) commençants par #')
        else {
            setAlert('')
            setStep(6)
        }
    }

    const verifStep5 = () => {
        if (!describe) setAlert('Veuillez entrer un texte qui accrocheur qui décrit votre philosophie, votre marque ou votre activité')
        else {
            setAlert('')
            setStep(7)
        }
    }

    const verifStep6 = () => {
        if (!logo) setAlert('Veuillez ajouter le logo de votre site')
        else {
            setAlert('')
            setStep(8)
        }
    }

    const verifStep7 = () => {
        if (!illustration) setAlert(`Veuillez ajouter l'illustration de votre page d'accueil`)
        else {
            setAlert('')
            setStep(9)
        }
    }

    return (
        <div className="containerPurchase">
            <head>
                <title>Le bon e-commerce : commander son e-commerce</title>
                <meta name="description" content="Nous créons pour vous des e-commerces complets clés en main. Du développement au déploiement, nous prenons tout en charge dans la création de votre boutique en ligne au meilleur prix du marché" />
                <meta name="og:title" property="og:title" content="Votre e-commerce au meilleur prix" />
                <meta name="og:description" property="og:description" content="Nous créons pour vous des e-commerces complets clés en main. Du développement au déploiement, nous prenons tout en charge dans la création de votre boutique en ligne au meilleur prix du marché" />
                <meta name="robots" content="index, follow" />
            </head>
            {step === 1 &&
                <div className="contentPurchase">
                    <h1 className="titlePurchase">Offre de pré-lancement</h1>
                    <div className="step1Purchase">
                        <img src={require('./images/offre.png')} className="imgOffre" alt="offre le bon ecommerce" />
                        <h3 style={{ marginLeft: '40px', marginTop: '0' }} className="textPurchase">Cette offre ne sera disponible que temporairement à l'occasion du lancement de la plateforme Le bon Ecommerce<br /><br />
                        Le temps de développement de votre site est d'en moyenne 10 jours après envoie de toutes les informations nécessaires<br /><br />
                        Une fois votre site développé, déployé et indexé sur Google, vous recevrez par mail vos identifiants pour votre compte administrateur ainsi qu'un petit guide d'utilisation</h3>
                    </div>
                    {window.innerWidth > 1250 ?
                        <button onClick={() => { setStep(2) }} style={{ position: 'absolute', bottom: '100px' }} className="button">Renseigner les informations nécessaires à la création de mon e-commerce</button>
                        :
                        <button onClick={() => { setStep(2) }} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Renseigner les informations nécessaires à la création de mon e-commerce</button>}
                </div>}
            {step === 2 &&
                <div className="contentPurchase">
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step1.png')} />
                    </div>
                    <h1 className="titlePurchase">Nom de domaine libre en .fr ou .com pour votre site</h1>
                    <input maxLength={200} onChange={(e) => { setDomaine(e.target.value) }} placeholder="nom de domaine" className="input" />
                    {alert && <p className="text" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    <a style={{ fontWeight: 'bold', color: 'red', marginTop: '30px' }} href="https://www.ovh.com/fr/domaines/" target="_blank" rel="noopener" className="linkLanding">Vérifier la disponibilité du nom de domaine<br /><br /></a>
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep1} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep1} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {step === 3 &&
                <div className="contentPurchase">
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step2.png')} />
                    </div>
                    <h1 className="titlePurchase">Entrez vos clés Stripe pour accepter les paiements</h1>
                    <div className="row" style={{ marginTop: '50px' }}>
                        <div style={{ marginRight: '50px' }}>
                            <a style={{ marginTop: '20px' }} href="https://stripe.com/en-fr" target="_blank" rel="noopener" className="linkLanding">1) Se créer un compte sur Stripe.com<br /><br /></a>
                            <a style={{ marginTop: '0px' }} href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener" className="linkLanding">2) Consulter ses clés Stripe<br /><br /></a>
                        </div>
                        <div className="column">
                            <input maxLength={200} style={{ marginBottom: '15px' }} onChange={(e) => { setPublicKey(e.target.value) }} placeholder="Clé publique Stripe" className="input" />
                            <input maxLength={200} onChange={(e) => { setPrivateKey(e.target.value) }} placeholder="Clé privée Stripe" className="input" />
                        </div>
                    </div>
                    {alert && <p className="text" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep2} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep2} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {step === 4 &&
                <div className="contentPurchase">
                    {viewTemplate === 1 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <button className="buttonClosePurchase">Fermer</button>
                            <img className="templatePurchaseView" src={require('./images/template1.png')} alt="template 1" />
                        </div>}
                    {viewTemplate === 2 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <button className="buttonClosePurchase">Fermer</button>
                            <img className="templatePurchaseView" src={require('./images/template2.png')} alt="template 1" />
                        </div>}
                    {viewTemplate === 3 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <button className="buttonClosePurchase">Fermer</button>
                            <img className="templatePurchaseView" src={require('./images/template3.png')} alt="template 1" />
                        </div>}
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step3.png')} />
                    </div>
                    <h1 className="titlePurchase">Choisissez la mise en page de votre page d'accueil</h1>
                    <div className="row">
                        <div onClick={() => { setViewTemplate(1) }} className="containerTemplate">
                            <div onClick={(e) => { return (setTemplate(1), e.stopPropagation()) }} className="containerCheckBox">
                                {template === 1 && <img className="iconValid" src={require('./images/valid.png')} alt="valid icon" />}
                            </div>
                            <img className="templatePurchase" src={require('./images/template1.png')} alt="template 1" />
                        </div>
                        <div onClick={() => { setViewTemplate(2) }} className="containerTemplate">
                            <div onClick={(e) => { return (setTemplate(2), e.stopPropagation()) }} className="containerCheckBox">
                                {template === 2 && <img className="iconValid" src={require('./images/valid.png')} alt="valid icon" />}
                            </div>
                            <img className="templatePurchase" src={require('./images/template2.png')} alt="template 1" />
                        </div>
                        <div onClick={() => { setViewTemplate(3) }} className="containerTemplate">
                            <div onClick={(e) => { return (setTemplate(3), e.stopPropagation()) }} className="containerCheckBox">
                                {template === 3 && <img className="iconValid" src={require('./images/valid.png')} alt="valid icon" />}
                            </div>
                            <img className="templatePurchase" src={require('./images/template3.png')} alt="template 1" />
                        </div>
                    </div>
                    {alert && <p className="text" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep3} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep3} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {step === 5 &&
                <div className="contentPurchase">
                    <h1 className="titlePurchase">Entrez les informations de votre future page d'accueil</h1>
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step5.png')} />
                    </div>
                    <div className="row">
                        <div className="column">
                            <input maxLength={250} style={{ marginTop: '50px', marginBottom: '50px' }} onChange={(e) => { setTitle(e.target.value) }} placeholder="nom de votre marque" className="input" />
                            <input maxLength={250} style={{ marginBottom: '50px' }} onChange={(e) => { setSlogan(e.target.value) }} placeholder="votre slogan" className="input" />
                        </div>
                        <div style={{ marginLeft: '50px', alignItems: 'flex-start' }} className="column">
                            <a style={{ marginBottom: '10px', textAlign: 'start' }} href="https://mdigi.tools/color-shades" target="_blank" rel="noopener" className="linkLanding">Générer les couleurs de son site en hexadecimal<br /><br /></a>
                            <input maxLength={250} style={{ marginBottom: '20px' }} onChange={(e) => { setColor1(e.target.value) }} placeholder="#FFFFFF couleur principale" className="input" />
                            <input maxLength={250} onChange={(e) => { setColor2(e.target.value) }} placeholder="#FFFFFF couleur secondaire" className="input" />
                        </div>
                    </div>
                    {alert && <p className="text" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep4} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep4} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {step === 6 &&
                <div className="contentPurchase">
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step5.png')} />
                    </div>
                    <h1 className="titlePurchase">Entrez les informations de votre future page d'accueil</h1>
                    <textarea maxLength={1100} onChange={(e) => { setDescribe(e.target.value) }} placeholder="Long texte qui décrit votre marque et votre activité" className="textAreaPurchase" />
                    {alert && <p className="text" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep5} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep5} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {step === 7 &&
                <div className="contentPurchase">
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step5.png')} />
                    </div>
                    <h1 className="titlePurchase">Entrez les informations de votre future page d'accueil</h1>
                    <div className="upload-btn-wrapper">
                        <button className="btn">Votre logo</button>
                        <input className="inputGetFile" accept=".jpeg,.jpg,.png"
                            type="file"
                            name="file"
                            onChange={(e) => { getFile(e, 'logo') }} />
                    </div>
                    {logo &&
                        <img src={logo} className="logoPurchase" alt="logo" />}
                    {alert && <p className="textAlert" style={{ marginTop: '100px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep6} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep6} style={{ marginTop: '150px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {step === 8 &&
                <div className="contentPurchase">
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step5.png')} />
                    </div>
                    <h1 className="titlePurchase">Entrez les informations de votre future page d'accueil</h1>
                    <div className="upload-btn-wrapper">
                        <button className="btn">Illustration de votre page d'accueil</button>
                        <input className="inputGetFile" accept=".jpeg,.jpg,.png"
                            type="file"
                            name="file"
                            onChange={(e) => { getFile(e, 'illustration') }} />
                    </div>
                    {illustration &&
                        <img src={illustration} className="illustrationPurchase" alt="logo" />}
                    {alert && <p className="textAlert" style={{ marginTop: '100px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep7} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep7} style={{ marginTop: '200px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {step === 9 && <Buy priceId={'price_1HGvKQKleZ50Ivn6n79hKB9p'} title={title} slogan={slogan} describe={describe} template={template} publicKey={publicKey} privateKey={privateKey} color1={color1} color2={color2} logo={logo} illustration={illustration} />}
        </div>
    )
}