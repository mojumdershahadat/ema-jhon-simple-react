import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/shop/Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OrderReview from './components/OrderReview/OrderReview';
import NotFound from './components/NotFound/NotFound';
import Inventory from './components/Inventory/Inventory';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';

function App() {
  return (
    <div className="App">
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route exact path="/shop">
            <Shop></Shop>
          </Route>
          <Route exact path="/review">
            <OrderReview></OrderReview>
          </Route>
          <Route exact path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route exact path="/placeOrder">
            <PlaceOrder></PlaceOrder>
          </Route>
          <Route exact path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
