import { useParams } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthProvider';

import './MemberBanner.css'

export default function MemberBanner() {
  const authCtx = useAuthContext();
  const { type } = useParams();

  const role = type?.toLowerCase();

  let greeting = '';
  switch (role) {
    case 'donor':
      greeting = 'Welcome Donor';
      break;
    case 'company':
      greeting = 'Welcome Company Representative';
      break;
    case 'university':
      greeting = 'Welcome University Admin';
      break;
    default:
      greeting = 'Welcome Member';
      break;
  }

  // Placeholder for future dynamic user info
  const username = authCtx.ctx.identityName;

  return (
    <div className="banner-container">
      <p>
        {greeting}, {username}
      </p>
    </div>
  );
}
