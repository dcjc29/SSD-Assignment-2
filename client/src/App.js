import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Books from './components/book/Books';
import Footer from './components/Footer/Footer';
//import BookView from './components/BookView/BookView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {

  return (
    <div>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar />
          <Switch>
          <Route exact path="/">
            <Books /*books={books} onAddToCart={handleAddToCart} handleUpdateCartQty*/  />
          </Route>
          {/* <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
           <Route path="/book-view/:id" exact>
            <BookView />
          </Route>   */}
        </Switch>
        </div>
      </Router>
      <Footer />
    </div>

  );
}

export default App;
