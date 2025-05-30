import { useUser } from '../../Data/UserContext';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // sets isAuthenticated to true
    navigate('/'); // navigate to protected page
  };

  return (
    <div>
      <h2>Login Page</h2>
      <Button onClick={handleLogin}>Mock Login</Button>
    </div>
  );
}
