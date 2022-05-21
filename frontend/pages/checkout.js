import React, { useEffect, useState } from 'react'
import Script from 'next/script'

const Checkout = ({ cart }) => {
  const [subtotal, setSubtotal] = useState(0)
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" })

  useEffect(() => {
    let myTotal = 0
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      myTotal = myTotal + cart[index][1]
    }
    setSubtotal(myTotal)

  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async () => { 
    let orderId = "OID" + Math.floor(1000000* Math.random())
    let url = `${process.env.NEXT_PUBLIC_STRAPI_URL} + "/api/orders/pretransaction`
    const rawResponse = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify({ orderid: orderId, amount: subtotal, ...form, cart: cart })
    });
    const content = await rawResponse.json();
 

    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": orderId, /* update order id */
        "token": content.body.txnToken, /* update token value */
        "tokenType":"TXN_TOKEN",
        "amount": subtotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };

    if (window.Paytm && window.Paytm.CheckoutJS) { 
        // initialze configuration using init method 
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
          console.log("error => ", error);
        }); 
    }


  } 

return (
  <div>
    <Script id={"paytm"} type="application/javascript" crossorigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`} > </Script>


    <section className="text-black body-font relative">
      <div className="container px-5 py-24 mx-auto min-h-screen">
        <div className="flex flex-col w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">Checkout</h1>
          <h2 className='text-2xl font-medium'>Cart</h2>
          <div className="cart">{cart.length ? `Your cart details are as follows:` : `Your cart is empty!`}</div>
          <ul className='list-decimal px-8'>

            {cart.map((item) => {
              return <li key={item.id}>
                Product {item[0]} with a price of ₹{item[1]}
              </li>
            })}
          </ul>
          <div className="font-bold">
            Subtotal: {subtotal}
          </div>

        </div>
        <div className=" ">
          <div className="flex flex-wrap -m-2">
            <div className="p-2  w-1/2 ">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input onChange={handleChange} value={form.name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-1/2  ">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input onChange={handleChange} value={form.email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-1/2  ">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Phone</label>
                <input onChange={handleChange} value={form.phone} type="phone" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                <textarea onChange={handleChange} value={form.address} id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button onClick={submit} className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Pay Now</button>
            </div>

          </div>



        </div>
      </div>
    </section>
  </div>
)
}

export default Checkout