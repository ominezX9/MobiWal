import { Provider } from "react-redux";
import { store } from "store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

export default function App() {


  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={routes}/>
      </div>
    </Provider>
  )
}
