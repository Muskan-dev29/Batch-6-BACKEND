const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { isValidObjectId } = require("../utils/isValidObjectId");

const enrichCartResponse = (cartDoc) => {
  const items = cartDoc.items
    .filter((item) => item.product)
    .map((item) => {
      const effectivePrice = item.product.price * (1 - (item.product.discount || 0) / 100);
      return {
        product: item.product,
        quantity: item.quantity,
        lineTotal: Number((effectivePrice * item.quantity).toFixed(2))
      };
    });

  const totalPrice = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));

  return {
    items,
    totalPrice,
    totalItems: items.length
  };
};

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: cart.items.length ? "Cart fetched successfully" : "Cart is empty",
      data: enrichCartResponse(cart)
    });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: enrichCartResponse(cart)
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity, action } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((entry) => entry.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity -= 1;
    } else if (typeof quantity === "number") {
      item.quantity = quantity;
    }

    if (item.quantity <= 0) {
      cart.items = cart.items.filter((entry) => entry.product.toString() !== productId);
    }

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: enrichCartResponse(cart)
    });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((entry) => entry.product.toString() !== productId);

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: enrichCartResponse(cart)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem
};
