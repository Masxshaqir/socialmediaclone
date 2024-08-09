import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBeer } from 'react-icons/fa';

const App = () => {
  return (
    <div>
      <Button variant='success'>Bootstrap</Button>
      <FaBeer />
    </div>
  );
};

export default App;