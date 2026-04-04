import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
