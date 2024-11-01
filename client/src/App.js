import AddTask from "./addTask/AddTask";
import "./App.css";
import Tasks from "./getList/Tasks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Tasks />,
    },
    {
      path: "/add",
      element: <AddTask />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
