import { Provider } from "react-redux";
import { store } from "store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import './App.css';
import { Toaster } from "sonner";

export default function App() {


  return (
    <Provider store={store}>
      <div>
        <Toaster position="top-right"/>
          <RouterProvider router={routes}/>
      </div>
    </Provider>
  )
}
