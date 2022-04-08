import "./App.css";
import Nav from "./Comp/Nav";
import Footer from "./Comp/Footer";
import Listing from "./Comp/Listing";
import Buying from "./Comp/Buying";
import Cancel from "./Comp/Cancel";

function App() {
  return (
    <div className="App">
      <Nav />
      <Listing />
      <Buying />
      <Cancel />
      <Footer />
    </div>
  );
}

export default App;
