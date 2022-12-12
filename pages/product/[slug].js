import React from 'react'

import { client, UrlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useState } from 'react';
import { useStateContext } from '../../context/stateContext';
import Image from 'next/image'




const ProductDetailes = ({product, products}) => {
    const [index, setIndex] = useState(0);
    const { image, name, detail, price } = product;
    const { decQty, incQty, qty, onAdd, setShowCart} = useStateContext();

    const hundleBuyNow = () => {
      onAdd(product, qty);

      setShowCart(true);
    }
  return (
    <div>
        <div className="product-detail-container">
        <div>
        <div className="image-container">
            <Image
                src={UrlFor(image && image[index])} 
                    className='product-detail-image'
                alt=""    
                />
            </div>
            <div className="small-images-container">
            {image?.map((item, i) => (
              <Image 
                key={i}
                src={UrlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                alt=""
              />
            ))}
          </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                    </div>
                    <p>(20)</p>
                </div> 
                <h4>Details: </h4>
                <p>{detail}</p>
                <p className="price">${price}</p>
                <div className="quantity">
                <h3>Quantity:</h3>
                    <p className="quantity-desc">
                    <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                    <span className="num">{qty}</span>
                    <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                    </p>
                </div>
                <div className="buttons">
                    <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
                    <button type="button" className="buy-now" onClick={hundleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params : {
            slug: product.slug.current
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params: 
{ slug }}) => {
    const query = `*[_type == "product" && 
slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
  
    return {
      props: {products, product}
    }
  }

export default ProductDetailes