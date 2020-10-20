import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignUpAndSignIn from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "./firebase/firbase.util";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  //We have converted it into class component, becuase we want to save the state of the user object, whoever logs in,
  // so that we can use the same user object.

  unsubscribeFromAuth = null;

  componentDidMount() {
    //The below function comes with the auth library, which takes a function where the parameter
    //is what the user state is, and this is open subscription between the app and firebase, thus we don't
    //manually have to fetch the user state every time, it will automatically fetch it, whenever the user do
    //something or some changes happens, and it is open as long as our app component is there on dom, but we don't
    // want any memory leaks when it's not, thus we will use unsubscribe.
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  // This is how we handle our application, being aware of all auth changes on firebase.

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/signin" component={SignUpAndSignIn} />
      </div>
    );
  }
}

export default App;
