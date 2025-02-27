import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backEndURL = import.meta.env.VITE_BACKEND_URL;
  const [Search, SetSearch] = useState("");
  const [ShowSearch, SetShowSearch] = useState(false);
  const [CartItems, SetCartItems] = useState({});
  const [Product, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Fetch product data from database
  const getProductData = async () => {
    try {
      const response = await axios.get(
        `${backEndURL}/api/product/list-product`
      );

      if (response.data.success) {
        setProduct(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Add item to cart function
  const AddtoCart = (itemId) => {
    if (!itemId) return;

    let cartData = structuredClone(CartItems);
    const product = Product.find((p) => p._id === itemId);

    if (!product) return;
    if (cartData[itemId]) {
      cartData[itemId].quantity += 1;
      // toast.success("Product Added Sucessfully!");
    } else {
      cartData[itemId] = {
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      };
      // console.log("Added");

      // toast.success("Product Added Sucessfully!");
    }

    SetCartItems(cartData);
    toast.success("Item added successfully!");
  };

  // Get total count of items in the carta
  const GetcartCount = () => {
    return Object.values(CartItems).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  };

  // Calculate the total amount of the cart
  const getcartAmount = () => {
    return Object.entries(CartItems).reduce((total, [itemId, item]) => {
      const product = Product.find((p) => p._id === itemId);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    let cartData = structuredClone(CartItems);

    if (quantity <= 0) {
      delete cartData[itemId]; // Remove item from cart
    } else {
      cartData[itemId].quantity = quantity; // Update quantity
    }

    SetCartItems(cartData);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(CartItems);
    delete cartData[itemId]; // Remove item
    SetCartItems(cartData);
    toast.info("Item removed from cart!");
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products: Product, // Use fetched products
    currency,
    delivery_fee,
    Search,
    SetSearch,
    ShowSearch,
    SetShowSearch,
    CartItems,
    AddtoCart,
    GetcartCount,
    updateQuantity,
    removeFromCart,
    getcartAmount,
    navigate,
    backEndURL,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
