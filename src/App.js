import "./App.css"
import Pages from "./components/pages/Pages"
import LoginProvider from './components/context/context'
import { ReactNotifications } from 'react-notifications-component'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'

function App() {
  return (

    <LoginProvider>
      <ReactNotifications />
        <Pages />
    </LoginProvider>


  )
}

export default App
