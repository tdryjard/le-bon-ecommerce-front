import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
    const [administrable, setAdministrable] = useState(false)
    const [boutique, setBoutique] = useState(false)
    const [custom, setCustom] = useState(false)
    const [gestion, setGestion] = useState(false)
    const [secure, setSecure] = useState(false)
    const [referencement, setReferencement] = useState(false)
    const [domaine, setDomaine] = useState(false)
    const [hebergement, sethebergement] = useState(false)
    const [viewTemplate, setViewTemplate] = useState(0)
    const [viewAdmin, setViewAdmin] = useState(false)
    const [viewShop, setViewShop] = useState(false)

    const activeSection = (option: string) => {
        if (option !== 'administrable') {
            setAdministrable(false)
        } else setAdministrable(true)

        if (option !== 'boutique') {
            setBoutique(false)
        } else setBoutique(true)

        if (option !== 'custom') {
            setCustom(false)
        } else setCustom(true)

        if (option !== 'gestion') {
            setGestion(false)
        } else setGestion(true)

        if (option !== 'secure') {
            setSecure(false)
        } else setSecure(true)

        if (option !== 'referencement') {
            setReferencement(false)
        } else setReferencement(true)

        if (option !== 'domaine') {
            setDomaine(false)
        } else setDomaine(true)

        if (option !== 'hebergement') {
            sethebergement(false)
        } else sethebergement(true)
    }

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);

    }, [administrable, boutique, custom, gestion, referencement, domaine])

    return (
        <div className="container">
            <head>
                <title>Le bon e-commerce : le meilleur prix du marché</title>
                <meta name="description" content="Nous créons pour vous des e-commerces complets clés en main. Du développement au déploiement, nous prenons tout en charge dans la création de votre boutique en ligne au meilleur prix du marché" />
                <meta name="og:title" property="og:title" content="Votre e-commerce au meilleur prix" />
                <meta name="og:description" property="og:description" content="Nous créons pour vous des e-commerces complets clés en main. Du développement au déploiement, nous prenons tout en charge dans la création de votre boutique en ligne au meilleur prix du marché" />
                <meta name="robots" content="index, follow" />
            </head>
            <div className="containerHeadLanding">
                {viewTemplate === 1 &&
                    <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                        <button className="buttonClosePurchase">Fermer</button>
                        <img className="templatePurchaseView" src={require('../purchase/images/template1.png')} alt="template 1" />
                        <img onClick={(e) => { return (setViewTemplate(2), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                        <p style={{ color: 'white' }} className="title">Template 1</p>
                    </div>}
                {viewTemplate === 2 &&
                    <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                        <img onClick={(e) => { return (setViewTemplate(1), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                        <button className="buttonClosePurchase">Fermer</button>
                        <img style={{ height: '70%', width: 'auto' }} className="templatePurchaseView" src={require('../purchase/images/template-mobile1.png')} alt="template 1" />
                        <img onClick={(e) => { return (setViewTemplate(3), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                        <p style={{ color: 'white' }} className="title">Template 1</p>
                    </div>}
                {viewTemplate === 3 &&
                    <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                        <img onClick={(e) => { return (setViewTemplate(2), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                        <button className="buttonClosePurchase">Fermer</button>
                        <img className="templatePurchaseView" src={require('../purchase/images/template2.png')} alt="template 1" />
                        <img onClick={(e) => { return (setViewTemplate(4), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                        <p style={{ color: 'white' }} className="title">Template 2</p>
                    </div>}
                {viewTemplate === 4 &&
                    <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                        <img onClick={(e) => { return (setViewTemplate(3), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                        <button className="buttonClosePurchase">Fermer</button>
                        <img style={{ height: '70%', width: 'auto' }} className="templatePurchaseView" src={require('../purchase/images/template-mobile2.png')} alt="template 1" />
                        <img onClick={(e) => { return (setViewTemplate(5), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                        <p style={{ color: 'white' }} className="title">Template 2</p>
                    </div>}
                {viewTemplate === 5 &&
                    <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                        <img onClick={(e) => { return (setViewTemplate(4), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                        <button className="buttonClosePurchase">Fermer</button>
                        <img className="templatePurchaseView" src={require('../purchase/images/template3.png')} alt="template 1" />
                        <img onClick={(e) => { return (setViewTemplate(6), e.stopPropagation()) }} className="arrowNext" src={require('../images/next.png')} alt="suivant" />
                        <p style={{ color: 'white' }} className="title">Template 3</p>
                    </div>}
                {viewTemplate === 6 &&
                    <div onClick={() => { setViewTemplate(0) }} className="containerViewTemplate">
                        <img onClick={(e) => { return (setViewTemplate(5), e.stopPropagation()) }} className="arrowPreview" src={require('../images/preview.png')} alt="précédent" />
                        <button className="buttonClosePurchase">Fermer</button>
                        <img style={{ height: '70%', width: 'auto' }} className="templatePurchaseView" src={require('../purchase/images/template-mobile3.png')} alt="template 1" />
                        <p className="title">Template 3</p>
                    </div>}
                {viewAdmin &&
                    <div onClick={() => { setViewAdmin(false) }} className="containerViewTemplate">
                        <button className="buttonClosePurchase">Fermer</button>
                        <img className="demoAdminView" src={require('../images/demo-admin.gif')} alt="démo partie admin" />
                    </div>}
                {viewShop &&
                    <div onClick={() => { setViewShop(false) }} className="containerViewTemplate">
                        <button className="buttonClosePurchase">Fermer</button>
                        <img className="demoAdminView" src={require('../images/demo-shop.gif')} alt="démo partie admin" />
                    </div>}
                <div className="containerLogoLanding">
                    <img className="logoLanding" src={require('../images/logo.png')} alt="logo le bon ecommerce" />
                    <h2 style={{ color: '#2e407a', marginRight: '15%' }} className="titleLogo">LE BON <span style={{ color: '#cb4a4a' }}>E-COMMERCE</span></h2>
                </div>
                <div className="containerTextHeadLanding">
                    <h3 className="text" style={{ fontSize: '18px' }}>« Le prix d'un e-commerce peut varier de 5000€ à plus de 500 000€ selon les "experts" »<br /><br /></h3>
                    <h2 className="text" style={{ fontSize: '20px', fontWeight: 'normal' }}>Nous ne sommes pas d'accord avec eux.<br />
                    Tout le monde devrait pouvoir lancer son business sans devoir faire un prêt à la banque...<br /><br /></h2>
                    <h3 style={{ marginBottom: '60px', fontSize: '20px', fontWeight: 'normal' }} className="text">C'est pourquoi nous avons développé les meilleurs outils
                    <span style={{ fontWeight: "bold" }}> pour vous</span> créer une boutique en ligne <span style={{ fontWeight: "bold" }}> à votre image </span>
                    sans avoir à vider son compte épargne.</h3>
                    {window.innerWidth > 1250 ?
                        <Link to="/commander" className="buttonBuy">PROFITER DE L'OFFRE DE PRÉ-LANCEMENT</Link>
                        :
                        <Link to="/commander" className="buttonBuy">VOIR OFFRE DE PRÉ-LANCEMENT</Link>}
                </div>
            </div>
            <div className="containerBottomLanding">
                {window.innerWidth > 1250 ?
                    <h4 className="title" style={{ fontSize: '60px', fontWeight: 'bold', color: 'white', marginTop: '30px' }} >Les services inclus</h4>
                    :
                    <h4 className="title" style={{ fontSize: '40px', fontWeight: 'bold', color: 'white', marginTop: '30px', width: '80%', textAlign: 'center' }} >Les services inclus</h4>}
                <div className="containerButtonLanding">
                    <button onClick={() => { activeSection('administrable') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={administrable ? "buttonActive" : "button"}>Partie administrable</button>
                    <button onClick={() => { activeSection('boutique') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={boutique ? "buttonActive" : "button"}>Partie boutique</button>
                    <button onClick={() => { activeSection('custom') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={custom ? "buttonActive" : "button"}>Personnalisation</button>
                    <button onClick={() => { activeSection('gestion') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={gestion ? "buttonActive" : "button"}>gestion commandes et paiements</button>
                    <button onClick={() => { activeSection('secure') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={secure ? "buttonActive" : "button"}>Sécurité</button>
                    <button onClick={() => { activeSection('referencement') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={referencement ? "buttonActive" : "button"}>Référencement Google</button>
                    <button onClick={() => { activeSection('domaine') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={domaine ? "buttonActive" : "button"}>Nom de domaine</button>
                    <button onClick={() => { activeSection('hebergement') }} style={{ marginRight: '15px', marginLeft: '15px', marginTop: '10px', marginBottom: '10px' }} className={hebergement ? "buttonActive" : "button"}>hébergement</button>
                </div>

                {administrable &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >La partie administrable de votre site e-commerce</h3>
                        <p className="text">La boutique en ligne que nous créons pour vous, vous donnes accès à une partie administrable de vos articles par le biais d'une connexion à votre compte administrateur avec des identifiants qui vous sont fournis à la livraison de votre site.<br /><br /></p>
                        <p className="title">Dans cette partie administrable vous pourrez: <br /><br /></p>
                        <ul className="text">
                            <li>Créer un nouvel article avec les options :</li>
                            <ul>
                                <li>Nom de l'article</li>
                                <li>Description de l'article</li>
                                <li>Insérer entre 1 à 3 photos de l'article</li>
                                <li>Son prix</li>
                                <li style={{ marginBottom: '15px' }} >Activer le mode "promo" en indiquant l'ancien prix</li>
                            </ul>
                            <li>Consulter tous les articles que vous proposez dans votre espace boutique</li>
                            <li>Modifier un article déjà créé</li>
                            <li>Supprimer un article</li>
                        </ul>
                        <button onClick={() => { setViewAdmin(true) }} style={{ marginTop: '35px' }} className="button">Voir démo</button>
                    </div>}

                {boutique &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >La partie boutique de votre site e-commerce</h3>
                        <p className="text">L'élément central de votre boutique en ligne est la partie "boutique" de votre site<br /><br /></p>
                        <p className="text">Cette partie est accessible à tous les visiteurs de votre site et ils pourront y retrouver tous les articles que vous aurez référencé dans votre partie administrateur<br /><br />
                    Tous vos articles seront affichés sur cette partie avec leur image principale, leur prix et leur nom<br /><br />
                    Si un visiteur de votre site clique sur l'article, il aura alors accès à tous les détails de l'article que vous aurez référencé<br /><br />
                    Il pourra alors cliquer sur le bouton "commander" et payer l'article</p>
                        <p onClick={() => {return(setBoutique(false), setGestion(true))}} className="linkLanding">gestion commandes et paiements</p>
                        <button onClick={() => {setViewShop(true)}} style={{ marginTop: '35px' }} className="button">Voir démo</button>
                    </div>}

                {custom &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >Aidez nous à vous créer une page d'accueil à votre image</h3>
                        <p className="text">Au moment de commander votre boutique en ligne, plusieurs éléments vous seront demandés afin que nous puissions créer la page d'accueil de votre site<br /><br /></p>
                        <p className="text">Voici les différents éléments personnalisé sur mesure<br /><br /></p>
                        <ul className="text">
                            <li>Le titre de votre site et marque</li>
                            <li>Le slogan de votre marque ou de votre activité</li>
                            <li>Le logo de votre marque</li>
                            <li>Une grande illustration afin d'embellir votre page d'accueil à votre gout</li>
                            <li>Une description de votre marque et de votre activité</li>
                            <li>Vous aurez un choix à faire entre plusieurs dispositions des éléments dans votre page d'accueil afin de pousser la personnalisation encore plus loin</li>
                        </ul>
                        <button onClick={() => { setViewTemplate(1) }} style={{ marginTop: '35px' }} className="button">Voir les différents modèles</button>
                    </div>}

                {gestion &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >La gestion de vos commandes et paiements reçus via votre e-commerce</h3>
                        <p className="text">Lors de la commande de votre e-commerce, des "clés" Stripe vous seront demandés afin que vous puissiez accepter des paiements grâce à la plateforme. Avec plusieurs millions d'utilisateurs tel que Amazon, uber, Slack... Stripe a largement fait ses preuves et est aujourd'hui la meilleure méthode afin d'accepter les paiements en toute sécurité.<br /><br /></p>
                        <a href="https://stripe.com/en-fr" target="_blank" rel="noopener" className="linkLanding">en savoir plus sur Stripe<br /><br /></a>
                        <p className="text">Il vous faudra donc vous créer un compte sur Stripe et nous fournir deux clés d'une trentaine de caractères afin que nous puissions relier votre acceptation de paiement sur votre site à votre compte (un tuto est proposé au moment de renseigner ces informations)<br /><br /></p>
                        <p className="text">Dès qu'une commande sera passée sur votre e-commerce, vous recevrez une notification Stripe, ainsi qu'un récapitulatif des montants reçus et des informations client (comme le nom et l'adresse à laquelle livrer)<br /><br /></p>
                    </div>}

                {secure &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >La sécurité de votre site et votre base de données</h3>
                        <p className="text">Les technologies utilisées afin de développer votre site sont : React, NodeJs et Mysql<br /><br /></p>
                        <p className="text">Nous développons votre site avec les dernières normes en matière de sécurité sur le web.<br />
                        De cette façon, nous pouvons garantir une sécurité et une maintenabilité maximale.<br /><br /></p>
                        <p className="text">Le choix de coder votre site de cette manière demande un temps de développement plus long mais c'est un choix indispensable pour faire face aux différents problèmes de maintenabilité d'un site créé avec un CMS type wordpress, prestashop...<br /><br /></p>
                    </div>}

                {referencement &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >Le référencement Google de votre site</h3>
                        <p className="text">Nous prenons en charge les différentes démarches afin d'indexer et de référencer au mieux votre site sur le moteur de recherche google<br /><br /></p>
                        <p className="text">Nous appliquons les dernières méthodes en vogue afin que votre site soit apprécié du robot d'indexation Google et soit bien référencé.<br /><br /></p>
                        <p className="text">Tous les contenus de votre page d'accueil ainsi que chaque article que vous créez sont pris en charge automatiquement par Google<br /><br /></p>
                    </div>}

                {domaine &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >Le nom de domaine de votre site</h3>
                        <p className="text">Votre nom de domaine représente l'url source de votre site (exemple : notre nom de domaine est "le-bon-ecommerce.fr")<br /><br /></p>
                        <p className="text">Au moment de commander votre site, il vous sera demandé de renseigner un nom de domaine libre afin que nous puissions le lier à votre site.<br /><br /></p>
                        <a href="https://www.ovh.com/fr/domaines/" target="_blank" rel="noopener" className="linkLanding">trouver un nom de domaine disponible<br /><br /></a>
                        <p className="title">Nous achetons votre nom de domaine pour vous ! Le prix de celui-ci est inclus dans le prix de création de votre e-commerce<br /><br /></p>
                    </div>}

                {hebergement &&
                    <div className="containerInfoLanding">
                        <h3 className="title" style={{ fontSize: '25px', marginBottom: '20px' }} >Hébergement de votre site et base de données</h3>
                        <p className="text">Nous hébergeons pour vous votre site et votre serveur de données<br /><br /></p>
                        <p className="text">Votre site est hébergé sur la plateforme netlify.com et votre serveur sur heroku.com<br /><br /></p>
                        <p className="title">Nous prenons aussi en charge les différents frais liés à cet hébergement !<br /><br /></p>
                    </div>}

            </div>
        </div>
    )
}