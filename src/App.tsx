import { Provider } from "react-redux";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";


export default function App() {
  return (
    <Provider store={store}>
      <div>
      </div>
    </Provider>
  )
}
