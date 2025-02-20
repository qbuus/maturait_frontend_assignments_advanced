import { type Product, type customerInformation } from '@/types/product'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { useLocalStorage } from '@vueuse/core'

const $toast = useToast()
let instance

const wishlistRef = useLocalStorage<Product[]>('wishlist', [], {})
const cartRef = useLocalStorage<Product[]>('cart', [])
const customerInfo = useLocalStorage<customerInformation>('customer', [])

export const useStore = defineStore('store', {
  getters: {
    totalPrice: (state) => {
      return state.cartItems.reduce((total, product) => {
        return total + product.price * (product.quantity || 1)
      }, 0)
    }
  },
  state: () => ({
    customerInformation:
      customerInfo.value !== null
        ? (customerInfo.value as customerInformation)
        : ({} as customerInformation),
    readyToCheckout: false,
    showCart: false,
    cartItems: cartRef.value.length > 0 ? cartRef.value : ([] as Product[]),
    totalQuantities: 0,
    qty: 1,
    showMiniCart: false,
    wishlist: wishlistRef.value.length > 0 ? wishlistRef.value : ([] as Product[])
  }),

  actions: {
    onAdd(product: Product, quantity: number) {
      const ProductInCart = this.cartItems.find((item) => item.id === product.id)

      if (ProductInCart) {
        instance = $toast.info('Product already in cart', { duration: 3000 })
      } else {
        product = { ...product, quantity: quantity }
        // this.totalPrice += product.price * quantity
        this.totalQuantities += quantity
        this.cartItems = [...this.cartItems, product]
        instance = $toast.success(`${this.qty} of ${product.title} added to the cart`, {
          duration: 3000
        })
      }
      cartRef.value = [...this.cartItems]
      this.qty = 1
    },

    onRemove(product: Product) {
      const ProductInCart = this.cartItems.find((item) => item.id === product.id)

      if (ProductInCart) {
        // this.totalPrice -= ProductInCart.price * ProductInCart.quantity!
        this.totalQuantities -= ProductInCart.quantity!
        const updatedCart = this.cartItems.filter((item) => item.id !== product.id)
        this.cartItems = updatedCart
        instance = $toast.success(`${product.title} removed from the cart`, { duration: 3000 })
      }

      cartRef.value = [...this.cartItems]
    },

    toggleCartItemQuantity(id: number, value: string) {
      const ProductInCart = this.cartItems.find((item) => item.id === id)

      if (ProductInCart) {
        if (value === 'inc') {
          if (ProductInCart.quantity! < 10) {
            ProductInCart.quantity! += 1
            this.totalQuantities += 1
          } else {
            instance = $toast.error('You can not add more that 10 of the same item', {
              duration: 3000
            })
          }
        } else if (value === 'dec') {
          if (ProductInCart.quantity! > 1) {
            ProductInCart.quantity! -= 1
            this.totalQuantities -= 1
          }
        }
      }
    },

    incQty() {
      this.qty = this.qty + 1 > 10 ? 10 : this.qty + 1
    },
    decQty() {
      this.qty = this.qty - 1 < 1 ? 1 : this.qty - 1
    },

    addToWishlist(product: Product) {
      const checkProductInWishlist = this.wishlist.find((item) => item.id === product.id)

      if (!checkProductInWishlist) {
        this.wishlist = [...this.wishlist, product]
        instance = $toast.success(`${product.title} Added to wishlist`, { duration: 3000 })
      } else {
        const updatedWishlist = this.wishlist.filter((item) => item.id !== product.id)
        this.wishlist = updatedWishlist
        instance = $toast.error(`${product.title} removed from wishlist`, { duration: 3000 })
      }

      wishlistRef.value = [...this.wishlist]
    },

    removeFromWishlist(product: Product) {
      const existingWishlist = wishlistRef.value

      if (existingWishlist.length > 0) {
        existingWishlist.filter((item) => item.id !== product.id)
        wishlistRef.value = [...existingWishlist]
      }

      this.wishlist = this.wishlist.filter((item) => item.id !== product.id)
    },

    changeToCheckout() {
      this.readyToCheckout = true
    },

    resetChangeToCheckout() {
      this.readyToCheckout = false
    },

    AddCustomerInformation(information: customerInformation) {
      this.customerInformation = information
      customerInfo.value = { ...this.customerInformation }
    },

    ResetAfterPurchase() {
      cartRef.value = []
      this.cartItems = []
    }
  }
})
