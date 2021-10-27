// Object destructuring

const product = {
    label: "Red notebook",
    price: 3,
    stock: 201,
    salesPrice: null,
    rating: 4.2
}

let {label, price, salesPrice} = product

console.log(salesPrice);
console.log(label);
console.log(Boolean(salesPrice));
salesPrice = ""
console.log(Boolean(salesPrice));
