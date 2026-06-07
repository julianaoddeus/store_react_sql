import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { Routers } from "./routers";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routers />
    </BrowserRouter>
  );
}

export default App;
