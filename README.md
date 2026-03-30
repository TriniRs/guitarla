# GuitarLA - Store & Shopping Cart
Proyecto desarrollado para demostrar el dominio de React Hooks, manipulación de Estado Global y diseño responsivo con Tailwind CSS.

## 🧠 Conceptos de JavaScript & React Destacados
Para este proyecto, me enfoqué en escribir código limpio, declarativo y optimizado, aplicando los siguientes conocimientos:

1. Gestión de Estado y Persistencia
- useState con Lazy Initialization: Implementé una función de inicio para el carrito que consulta el LocalStorage solo en la carga inicial, optimizando el rendimiento.

- useEffect para Sincronización: Utilicé este Hook para automatizar el guardado del carrito en el navegador cada vez que el usuario realiza un cambio.

2. Optimización de Rendimiento (Performance)
- useMemo para Cálculos Derivados:
a. Total del Carrito: Calculado mediante .reduce(), memorizando el resultado para evitar procesamientos innecesarios en cada render.
b. Estado del Carrito (isEmpty): Determinado de forma eficiente para condicionar la interfaz de usuario.

3. Manipulación Avanzada de Arreglos (Inmutabilidad)
En lugar de modificar el estado original, utilicé técnicas modernas de JS:

- filter: Para eliminar productos de forma precisa mediante su ID.
- map: Para actualizar cantidades creando copias nuevas de los objetos (Spread Operator {...item}).
- findIndex: Para lógica de negocio compleja (verificar duplicados antes de agregar al carrito).

4. Estilizado Profesional con Tailwind CSS
Manejo de estados visuales dinámicos basados en la lógica de React.

