import React from 'react';

function ProductDetails({ title, price, discountPrice, imageSrc }) {
  return (
    <div className="flex flex-col gap-4 items-start">
      <img className="w-100" src={imageSrc} alt="" />
      <h4>{title}</h4>
      {(discountPrice !== undefined) ?
        <del>
          Price: ${price.toFixed(2)}
        </del> :
        <div>
          Price: ${price.toFixed(2)}
        </div>
      }

      {(discountPrice !== undefined) &&
        <div>
          Discount price: ${discountPrice.toFixed(2)}
        </div> 
      }

      <button className="btn">Add to Cart</button>
    </div>
  );
}

function App() {
  let data=[{
    title: "Cotton Socks",
    price: 6.45,
    discountPrice: 5,
    imageSrc: "https://www.supersimple.dev/images/cotton-socks.png"
  },{
    title: "Tennis Balls",
    price: 2,
    imageSrc: "https://www.supersimple.dev/images/tennis-balls.png"
  },{
    title: "Plain T-Shirt",
    price: 7.99,
    imageSrc: "https://www.supersimple.dev/images/plain-t-shirt.png"
  }];

  return (
    <div className="flex gap-5 w-fit mx-auto">
      {data.map((el)=>{
        return <ProductDetails title={el.title} price={el.price} discountPrice={el.discountPrice} imageSrc={el.imageSrc} key={crypto.randomUUID()} />;
      })}
    </div>
  );
}

export default App;