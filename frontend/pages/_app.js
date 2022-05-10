import '../styles/globals.css'
import NavBar from '../components/NavBar'
import { useEffect, useState} from 'react'



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("I am useeffect from app.js")
  }, [])

  const [cart, setCart] = useState([])
  const [reloadKey, setReloadKey] = useState(1)
  const addToCart = (item, qty, price) => {
    console.log("Add to cart")
    let newCart = cart
    for (let index = 0; index < qty; index++) { 
      newCart.push([item, price])
    }
    console.log("Add to cart", newCart)
    setCart(newCart)
    setReloadKey(Math.random())
  }

  const removeFromCart = (item, qty) => {
    let newCart = cart
    let index = newCart.indexOf(item)
    newCart.splice(index)
    setCart(newCart)
  }

  const clearCart = (item) => {
    setCart([])
  }

  return <><NavBar key={reloadKey} cart={cart} /><Component cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} clearCart={clearCart} {...pageProps} /></>
}

export default MyApp
