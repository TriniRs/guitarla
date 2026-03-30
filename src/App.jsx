import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localSortageCart = localStorage.getItem("cart");
    return localSortageCart ? JSON.parse(localSortageCart) : [];
  };
  const [data] = useState(db);
  //como es solo lectura no necesito el setData, por eso solo desestructuro el primer valor del array que me devuelve useState
  const [cart, setCart] = useState(initialCart);
  //Pasamos 'initialCart' como REFERENCIA (sin paréntesis).
  // Esto activa el "Lazy Initialization": React solo ejecuta esta función
  // UNA VEZ al cargar la página, ignorándola en los siguientes re-renders.

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 0;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); //cada vez que cambie el carrito, se actualiza el localStorage con la nueva información del carrito.

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id); 
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return; // Si ya tiene la cantidad máxima, no hacemos nada
      // CASO A: YA EXISTE
      // console.log('Ya existe... incrementando cantidad')

      // Creamos una copia nueva para no mutar
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++; // Aumentamos la propiedad quantity
      setCart(updatedCart);
    } else {
      // CASO B: NO EXISTE (Es nuevo)
      // console.log('Agregando nuevo...')
      item.quantity = 1; // Le creamos la propiedad cantidad
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map(
            (
              guitar, //retorno implicito porque solo use ()
            ) => (
              <Guitar
                key={guitar.id} //si no lo ponemos tira error en consola
                guitar={guitar}
                addToCart={addToCart}
              />
            ),
          )}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
