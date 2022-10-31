 import './App.scss';
 import "bootstrap/dist/js/bootstrap"
import AuthContextProvider from './context/AuthContext';
 import Routes from "./pages/Routes"
 import {ToastContainer} from 'react-toastify';

function App() {
  console.log(process.env.REACT_APP_FIREBASE_apikey)
  return (<>
    <AuthContextProvider>
    <Routes/>
  </AuthContextProvider>
  <ToastContainer/>
  </>
  );
}

export default App;
