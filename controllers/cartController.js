const Product = require("../models/Products");
const Cart = require("../models/Cart");

module.exports = {
  // add item to cart
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;

    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ cartItem, quantity });
        }
        await cart.save();
        res.status(200).json("Product added to cart");
      } else {
        const newCart = new Cart({
          userId,
          products: [
            {
              cartItem,
              quantity: quantity,
            },
          ],
        });

        await newCart.save();
        res.status(200).json("Product added to cart");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // fetch cart items
  getCart: async (req, res) => {
    const userId = req.params.id;
    try {
      const cart = await Cart.find({ userId }).populate(
        "products.cartItem",
        "_id title supplier imgUrl price"
      );
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //   decrement cart item
  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;

    try {
    } catch (error) {}
  },

  //   delete cart items
  deleteCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;

    try {
    } catch (error) {}
  },
};
