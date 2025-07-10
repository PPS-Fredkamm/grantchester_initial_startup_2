import { useParams } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthProvider';

import './MemberBanner.css'
import Globals from "../../global/globals";

export default function MemberBanner() {
  const authCtx = useAuthContext();
  const { type } = useParams();

  const role = type?.toLowerCase();

  let greeting = '';
  switch (role) {
    case 'donor':
      greeting = 'Donor Dashboard';
      break;
    case 'company':
      greeting = 'Compony Dashboard';
      break;
    case 'university':
      greeting = 'University Dashboard';
      break;
    case 'profile':
      greeting = 'Profile';
      break;
    default:
      greeting = 'Welcome Member';
      break;
  }

  // Placeholder for future dynamic user info
  const username = Globals.userInfo.username;

  return (
    <div className="banner-container">
      <p>
        {username}'s {greeting}
      </p>
    </div>
  );
}
