// cart.js - placeholder for cart utilities
export function getCart(){
  try{return JSON.parse(localStorage.getItem('cart'))||[]}catch(e){return []}
}
export function saveCart(c){localStorage.setItem('cart',JSON.stringify(c))}
