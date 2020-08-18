import React, {useState, useEffect} from 'react'
import {Navbar} from '../navbar/Navbar'
import {Product} from '../product/Product'

export const ShopDemo = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        
    }, [])

    console.log(products)
    return(
        <div className="container">
            <Navbar/>
            <div style={{marginTop: '250px'}} className="containerProducts">
                {products.length && products.map((product: any) => {
                    return (
                        <Product imageId1={product.image_id} imageId2={product.image_id_2} imageId3={product.image_id_3} id={''} tokenProps={''} verifToken={false} priceId={product.price_stripe_id} pricePromo={product.promo_price} price={product.price} title={product.title} description={product.description} base1={product.base1} base2={product.base2} base3={product.base3} />
                    )
                })}
            </div>
        </div>
    )
}