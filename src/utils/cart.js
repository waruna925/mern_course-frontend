export function getCart(){
    let cart=localStorage.getItem("cart")
    cart=JSON.parse(cart)
    if(cart==null){
        cart=[]
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    return cart;
}

export function removeFromCart(productId){
    let cart=getCart()
    let newCart=cart.filter((item)=>{
        return item.product.productId!=productId
    })
    localStorage.setItem("cart",JSON.stringify(newCart))
}

export function addToCart(product,qty){
    let cart=getCart()

    let index=cart.findIndex((item)=>{
        return item.product.productId==product.productId
    })
    if(index==-1){
        cart.push({product,qty})
    }else{
        cart[index].qty+=qty
        if(cart[index].qty<=0){
            removeFromCart(product.productId)
        }

    }
    localStorage.setItem("cart",JSON.stringify(cart))
}

