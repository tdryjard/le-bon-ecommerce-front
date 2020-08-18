import React, { useEffect, useState } from 'react'
import { PropsShop } from '../../../../types'
import './Product.scss'

export const Product = ({ imageId1, imageId2, imageId3, id, title, base1, base2, base3, description, price, pricePromo, priceId, tokenProps, verifToken }: PropsShop) => {
    const [zoom, setZoom] = useState<boolean>(false)
    const [path, setPath] = useState<any>(window.location.href)
    const [command, setCommand] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const [deleteProduct, setDeleteProduct] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [imgBase1, setImgBase1] = useState(base1)
    const [imgBase2, setImgBase2] = useState(base2)
    const [imgBase3, setImgBase3] = useState(base3)

    const [imgSelect, setImgSelect] = useState(1)

    return (
        <>
            {!zoom && !deleted && !editProduct && !deleteProduct ?
                <div onClick={(() => { setZoom(true) })} className="cardProduct">
                    {tokenProps && verifToken &&
                        <img src={require('../images/edit.png')} alt="edit logo" className="logoCard" onClick={() => { setEditProduct(true) }} />}
                    {tokenProps && verifToken &&
                        <img style={{ left: '100px' }} src={require('../images/delete.png')} alt="delete logo" className="logoCard" onClick={(e) => { return (setDeleteProduct(true), e.stopPropagation()) }} />}
                    <div className="leftCardProduct">
                        <div className="containerImgProduct">
                            <img className="imgProduct" alt="new picture product" src={base1} />
                        </div>
                    </div>
                    <div className="rightCardProduct">
                        <div className="containerPriceProduct">
                            <p style={{ marginBottom: '20px' }} className="title">{title}</p>
                            <div className="containerPrice">
                                {pricePromo &&
                                    <div className="containerPromoPrice">
                                        <p style={{ fontSize: '20px' }} className="text">{pricePromo}€</p>
                                        <div className="tiretPromo" />
                                    </div>}
                                <p className="textPrice">{price}€</p>
                            </div>
                        </div>
                    </div>
                </div>
                : zoom && !deleted &&
                <div className="containerProductZoom">
                    {!command && !deleteProduct && !editProduct ?
                        <div className="contentProductZoom">
                            <div className="leftCardProductZoom">
                                <div className="containerLittleImgProduct">
                                    {base2 &&
                                        <img onClick={() => { imgSelect === 1 ? setImgSelect(2) : imgSelect === 2 ? setImgSelect(3) : setImgSelect(1) }} className="imgProductZoom2" alt="new picture product" src={imgSelect === 1 ? base2 : imgSelect === 2 ? base3 : base1} />}
                                    {base3 &&
                                        <img onClick={() => { imgSelect === 1 ? setImgSelect(3) : imgSelect === 2 ? setImgSelect(1) : setImgSelect(2) }} className="imgProductZoom3" alt="new picture product" src={imgSelect === 1 ? base3 : imgSelect === 2 ? base1 : base2} />}
                                </div>
                                <img className="imgProductZoom1" alt="new picture product" src={imgSelect === 1 ? base1 : imgSelect === 2 ? base2 : base3} />
                            </div>
                            <div className="rightCardProductZoom">
                                <p className="title">{title}</p>
                                {pricePromo &&
                                    <div className="containerPromoPrice">
                                        <p style={{ fontSize: '20px' }} className="text">{pricePromo}€</p>
                                        <div className="tiretPromo" />
                                    </div>}
                                <p style={{ fontSize: '22px' }} className="textPrice">{price}€</p>
                                <p style={{ marginTop: '60px' }} className="text">{description}</p>
                                <button style={{ marginTop: '60px' }} onClick={() => { setCommand(true) }} className="button">Commander</button>
                            </div>
                        </div>
                        :
                        <div className="contentProductZoom">
                            <p>Inaccessible en démo</p>
                        </div>}
                </div>}
        </>
    )
}