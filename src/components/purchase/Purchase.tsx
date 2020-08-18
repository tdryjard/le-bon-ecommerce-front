import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import { Buy } from '../buy/Buy'
import { ChromePicker } from 'react-color'
import './Purchase.scss'

export const Purchase = () => {
    const [step, setStep] = useState(1)
    const [domaine, setDomaine] = useState<any>()
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
    const [resDomain, setResDomain] = useState<string[]>()
    const [domainSelect, setDomainSelect] = useState('')
    const [load, setLoad] = useState(false)

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
        if (!domainSelect) setAlert('Veuillez rechercher et selectionner un nom de domaine')
        else {
            setAlert('')
            setStep(3)
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

    const verifStep8 = () => {
        if (!(color1 && color2)) setAlert('Veuillez entrer les deux couleurs principales de votre site')
        else if ((color1.split('')[0] !== '#' || color2.split('')[0] !== '#')) setAlert('Veuillez entrer des couleurs en format "HEX" (hexadécimal) commençants par #')
        else {
            setAlert('')
            setStep(10)
        }
    }

    const getDomain = async () => {
        let result = false
        let resDomains: string[] = []
        let domainSplit = domaine.split('').reverse()
        console.log(domainSplit)
        if (((domainSplit[2] + domainSplit[1] + domainSplit[0]) === '.fr') || ((domainSplit[3] + domainSplit[2] + domainSplit[1] + domainSplit[0]) === '.com') || ((domainSplit[2] + domainSplit[1] + domainSplit[0]) === '.co')) {
            const res = await fetch(`https://domainr.p.rapidapi.com/v2/status?mashape-key=bd15222dc1msh6f060b718d699e1p182e0cjsn56661f9d15be&domain=${domaine}`)
            const resJson = await res.json()
            setDomaine('')
            setLoad(false)
            console.log(resJson)
            if (resJson.status[0].summary === "inactive") {
                resDomains.push(domaine)
                setResDomain(resDomains)
                result = true
                setAlert('')
            }

        } else if (domainSplit.includes('.')) {
            setAlert(`N'ajoutez pas d'extension à votre domaine (les extension disponibles sont .fr, .com, .co)`)
            setDomaine('')
            setLoad(false)
            result = true
        }
        else {
            const res = await fetch(`https://domainr.p.rapidapi.com/v2/status?mashape-key=bd15222dc1msh6f060b718d699e1p182e0cjsn56661f9d15be&domain=${domaine}.fr`)
            const resJson = await res.json()
            if (resJson && resJson.status[0] && resJson.status[0].summary === "inactive") {
                resDomains.push(`${domaine}.fr`)
                result = true
            }


            const res2 = await fetch(`https://domainr.p.rapidapi.com/v2/status?mashape-key=bd15222dc1msh6f060b718d699e1p182e0cjsn56661f9d15be&domain=${domaine}.com`)
            const resJson2 = await res2.json()
            if (resJson2 && resJson2.status[0] && resJson2.status[0].summary === "inactive") {
                resDomains.push(`${domaine}.com`)
                result = true
            }


            const res3 = await fetch(`https://domainr.p.rapidapi.com/v2/status?mashape-key=bd15222dc1msh6f060b718d699e1p182e0cjsn56661f9d15be&domain=${domaine}.co`)
            const resJson3 = await res3.json()
            if (resJson3 && resJson3.status[0] && resJson3.status[0].summary === "inactive") {
                resDomains.push(`${domaine}.co`)
                result = true
            }
            if (result) {
                setAlert('')
                setResDomain(resDomains)
            }
            setLoad(false)
            setDomaine('')
            console.log(resJson)
        }
        if (!result) setAlert('Domaine indisponible, essayez en un autre')
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
                    <h1 className="titlePurchase">Rechercher et selectionner un nom de domaine pour son site</h1>
                    <input maxLength={200} onChange={(e) => { setDomaine(e.target.value) }} placeholder="nom de domaine" className="input" />
                    {alert && <p className="text" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {load && <img src={require('./images/load.gif')} style={{ height: '80px', width: '80px', marginTop: '20px', marginBottom: '20px' }} />}
                    {domaine && !load &&
                        <button style={{ marginTop: '20px', marginBottom: '20px' }} onClick={() => { return (setLoad(true), getDomain()) }} className="button">Rechercher disponibilité</button>}
                    {resDomain && resDomain!.length &&
                        <p style={{ marginTop: '20px', marginBottom: '20px' }} className="title">Domaines disponibles :</p>}
                    {window.innerWidth > 1250 && resDomain && resDomain!.length > 0 &&
                        <div className="row">
                            {resDomain && resDomain!.length > 0 && resDomain!.map(domain => {
                                return (
                                    <button style={{ marginRight: '15px', marginLeft: '15px' }} className={domain === domainSelect ? "buttonActive" : "button"} onClick={() => { setDomainSelect(domain) }}>{domain}</button>
                                )
                            })}
                        </div>}
                    {window.innerWidth < 1250 && resDomain && resDomain!.length > 0 && resDomain!.map(domain => {
                        return (
                            <button style={{ marginTop: '10px', marginBottom: '10px' }} className={domain === domainSelect ? "buttonActive" : "button"} onClick={() => { setDomainSelect(domain) }}>{domain}</button>
                        )
                    })}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep1} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep1} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>}
            {
                step === 3 &&
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
                </div>
            }
            {
                step === 4 &&
                <div className="contentPurchase">
                    {viewTemplate === 1 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <button className="buttonClosePurchase">Fermer</button>
                            <img className="templatePurchaseView" src={require('./images/template1.png')} alt="template 1" />
                            <img onClick={(e) => { return (setViewTemplate(2), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                            <p style={{ color: 'white' }} className="title">Template 1</p>
                        </div>}
                    {viewTemplate === 2 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <img onClick={(e) => { return (setViewTemplate(1), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                            <button className="buttonClosePurchase">Fermer</button>
                            <img style={{ height: '70%', width: 'auto' }} className="templatePurchaseView" src={require('./images/template-mobile1.png')} alt="template 1" />
                            <p style={{ color: 'white' }} className="title">Template 1</p>
                        </div>}
                    {viewTemplate === 3 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <button className="buttonClosePurchase">Fermer</button>
                            <img className="templatePurchaseView" src={require('./images/template2.png')} alt="template 1" />
                            <img onClick={(e) => { return (setViewTemplate(4), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                            <p style={{ color: 'white' }} className="title">Template 2</p>
                        </div>}
                    {viewTemplate === 4 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <img onClick={(e) => { return (setViewTemplate(3), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                            <button className="buttonClosePurchase">Fermer</button>
                            <img style={{ height: '70%', width: 'auto' }} className="templatePurchaseView" src={require('./images/template-mobile2.png')} alt="template 1" />
                            <p style={{ color: 'white' }} className="title">Template 2</p>
                        </div>}
                    {viewTemplate === 5 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <button className="buttonClosePurchase">Fermer</button>
                            <img className="templatePurchaseView" src={require('./images/template3.png')} alt="template 1" />
                            <img onClick={(e) => { return (setViewTemplate(6), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                            <p style={{ color: 'white' }} className="title">Template 3</p>
                        </div>}
                    {viewTemplate === 6 &&
                        <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                            <img onClick={(e) => { return (setViewTemplate(5), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                            <button className="buttonClosePurchase">Fermer</button>
                            <img style={{ height: '70%', width: 'auto' }} className="templatePurchaseView" src={require('./images/template-mobile3.png')} alt="template 1" />
                            <p className="title">Template 3</p>
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
                        <div onClick={() => { setViewTemplate(3) }} className="containerTemplate">
                            <div onClick={(e) => { return (setTemplate(2), e.stopPropagation()) }} className="containerCheckBox">
                                {template === 2 && <img className="iconValid" src={require('./images/valid.png')} alt="valid icon" />}
                            </div>
                            <img className="templatePurchase" src={require('./images/template2.png')} alt="template 1" />
                        </div>
                        <div onClick={() => { setViewTemplate(5) }} className="containerTemplate">
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
                </div>
            }
            {
                step === 5 &&
                <div className="contentPurchase">
                    <h1 className="titlePurchase">Entrez les informations de votre future page d'accueil</h1>
                    <div className="containerStepImg">
                        <img className="stepPurchase" alt="step2" src={require('./images/step5.png')} />
                    </div>
                    <div className="column">
                        <input maxLength={250} style={{ marginTop: '50px', marginBottom: '50px' }} onChange={(e) => { setTitle(e.target.value) }} placeholder="nom de votre marque" className="input" />
                        <input maxLength={250} style={{ marginBottom: '50px' }} onChange={(e) => { setSlogan(e.target.value) }} placeholder="votre slogan" className="input" />
                    </div>
                    {alert && <p className="text" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{alert}</p>}
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep4} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep4} style={{ marginTop: '50px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>
            }
            {
                step === 6 &&
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
                </div>
            }
            {
                step === 7 &&
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
                </div>
            }
            {
                step === 8 &&
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
                </div>
            }
            {
                step === 9 &&
                <div className="contentPurchase">
                    <h1 style={{ marginBottom: '30px' }} className="titlePurchase">Entrez les deux couleurs principales de votre site</h1>
                    <ChromePicker />
                    <input maxLength={250} style={{ marginBottom: '20px', marginTop: '50px' }} onChange={(e) => { setColor1(e.target.value) }} placeholder="#FFFFFF couleur principale" className="input" />
                    <input maxLength={250} onChange={(e) => { setColor2(e.target.value) }} placeholder="#FFFFFF couleur secondaire" className="input" />
                    {window.innerWidth > 1250 ?
                        <button onClick={verifStep8} style={{ position: 'absolute', bottom: '100px', width: '150px' }} className="button">Suivant</button>
                        :
                        <button onClick={verifStep8} style={{ marginTop: '150px', marginBottom: '50px' }} className="button">Suivant</button>}
                </div>
            }
            { step === 10 && <Buy domain={domainSelect} priceId={'price_1HGvKQKleZ50Ivn6n79hKB9p'} title={title} slogan={slogan} describe={describe} template={template} publicKey={publicKey} privateKey={privateKey} color1={color1} color2={color2} logo={logo} illustration={illustration} />}
        </div >
    )
}