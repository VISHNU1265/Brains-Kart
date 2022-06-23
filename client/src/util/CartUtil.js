export default class CartUtil{
  
  static tax = 5;

  static getTotal(cartItems){
      let total=0;
      for(let i=0;i<cartItems.length;i++){
        total = total + cartItems[i].price * cartItems[i].qty;
      }
      return total;
  }

  static getTax(cartItems){
    return this.getTotal(cartItems)*(this.tax/100);
  }

  static getGrandTotal(cartItems){
    return this.getTotal(cartItems)+this.getTax(cartItems);
  }

}