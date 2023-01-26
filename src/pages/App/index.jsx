import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { Login } from '../Login';
import { ViewTask } from '../ViewTask';
import { CreateUser } from '../CreateUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/task" element={<ViewTask />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
