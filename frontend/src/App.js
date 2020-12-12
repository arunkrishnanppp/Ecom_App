import Header from './Components/Header'
import Footer from './Components/Footer'
import {Container} from 'react-bootstrap'
import Homescreen from './Screens/Homescreen'
import {BrowserRouter as Router,Route} from 'react-router-dom' 
import Productscreen from './Screens/Productscreen'
import Loginscreen from './Screens/Loginscreen'
import CartScreen from './Screens/CartScreen'
import { Profilescreen } from './Screens/profileScreen'
import Registerscreen from './Screens/registerScreen'
import ShippingScreen from './Screens/shippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceorderScrenn from './Screens/placeorderScrenn'
import OrderDetailScreen from './Screens/OrderDetailScreen'
import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/userEditScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import CreateProductScreen from './Screens/createProductScreen'
import OrderListScreen from './Screens/OrderListScreen'

const App=() =>{
  return (
    <Router>
    <>
    <Header></Header>
    <main className='py-3'>
    <Container>
    <Route path='/orders/:id' component={OrderDetailScreen}></Route>
    <Route path='/search/:keyword' component={Homescreen} exact></Route>
    <Route path='/page/:pageNumber' component={Homescreen} exact></Route>
    <Route path='/search/:keyword/page/:pageNumber' component={Homescreen} exact></Route>
      <Route path='/' component={Homescreen} exact></Route>
      <Route path='/product/:id' component={Productscreen} exact></Route>
      <Route path='/login' component={Loginscreen} exact></Route>
      <Route path='/cart/:id?' component={CartScreen}></Route>
      <Route path='/profile' component={Profilescreen}></Route>
      <Route path='/register' component={Registerscreen}></Route>
      <Route path='/shipping' component={ShippingScreen}></Route>
      <Route path='/payment' component={PaymentScreen}></Route>
      <Route path='/admin/userlist' component={UserListScreen}></Route>
      <Route path='/admin/productlist' component={ProductListScreen} exact></Route>
      <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact></Route>
<Route path='/placeorder' component={PlaceorderScrenn}></Route>
<Route path='/admin/user/:id/edit' component={UserEditScreen}></Route>
<Route path='/admin/product/create' component={CreateProductScreen}></Route>
<Route path='/admin/product/:id/edit' component={ProductEditScreen}></Route>
<Route path='/admin/orderlist' component={OrderListScreen}></Route>

    </Container>
    
    </main>
    <Footer/>
    </>
         </Router>
  );
}

export default App;
