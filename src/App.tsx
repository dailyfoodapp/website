import Home from "./pages/home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return <Home />;
};

export default App;
