import AppProvider from "./provider/AppProvider";
import AppHeader from "./features/AppHeader/AppHeader";
import { app } from "./firebaseConfig";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AppProvider>
      <AppHeader />
      <ToastContainer autoClose={3000} position="top-right"></ToastContainer>
    </AppProvider>
  );
}

export default App;
