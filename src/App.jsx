import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthContextComp from "./contexts/AuthContextComp";
import { router } from "./routes/Routes";

function App() {
  return (
    <>
      <AuthContextComp>
        <RouterProvider router={router} />
        <Toaster />
      </AuthContextComp>
    </>
  );
}

export default App;
