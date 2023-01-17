import "../style.css";

const Cart = ({ items, total }) => {
  
  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  console.log(total)
  console.log(typeof(total))

  let orderTotal = ''
  if (total > 0) orderTotal = usd.format(total)

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={index}>
            {item.title} {item.quantity}
          </div>
        );
      })}
      <div>{orderTotal}</div>
    </div>
  );
};

export default Cart;
