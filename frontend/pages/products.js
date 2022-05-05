import Link from 'next/link'
import React from 'react'

const Products = (props) => {
  return (
    <div className='container mx-auto px-4'>
      <section class="text-gray-600 body-font">
  <div class="container px-5 md:py-24 mx-auto">
    <div class="flex flex-wrap w-full md:mb-20">
      <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Product List - MyShop</h1>
        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
      </div> 
    </div>
    <div class="flex flex-wrap -m-4">
      {props.products.data.map((item)=>{
        return (
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-6 rounded-lg">
          <img class="h-96 rounded m-auto mb-8" src={item.attributes.image.data && item.attributes.image.data.attributes.name} alt="content"/>
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{item.attributes.category}</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">{item.attributes.title}</h2>
          <div className="hidden bg-red-800 bg-purple-800 bg-green-800"></div>
          <button class={"border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none " + `bg-${item.attributes.color}-800`}></button>
          <p class="leading-relaxed text-base"> {item.attributes.description}</p>
          <Link href={`/product/${item.attributes.slug}`}><button class="my-2 text-white bg-indigo-500 border-0 py-1 md:py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">Buy Now</button></Link>
        </div>
      </div>
      )
    })}
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  let headers = {Authorization: "Bearer b26f3c26cd37a4ebc40f9eeebf127c49d47a61d4f516f1eabb24d5f614d1df7e8f0c4aa252b2aec3f1534e1c1cbb01a522a2ed05115501e1a9eed0598264b0d7d8f877cd7cc513482f750350c911e3eb4a034b74c4756112491d4380ceee5c6e375b7d1442aaf1b2464a66f45d600a653192a58a517569132f2a896a1a932959"}
  let a = await fetch("http://localhost:1337/api/products?populate=*", {headers:headers})
  let products = await a.json() 
  return {
    props: {products: products},
  }
}

export default Products