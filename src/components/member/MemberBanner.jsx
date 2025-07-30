import { useParams } from "react-router-dom";

import "./MemberBanner.css";
import Globals from "../../global/globals";

export default function MemberBanner() {
  const { type } = useParams();

  const role = type?.toLowerCase();
  const username = Globals.member.user.username;

  let greeting = "";
  switch (role) {
    case "donor":
      greeting = `${username}'s Donor Dashboard`;
      break;
    case "company":
      greeting = "Company Dashboard";
      break;
    case "university":
      greeting = "University Dashboard";
      break;
    case "profile":
      greeting = `${username}' Profile`;
      break;
    case "donate":
      greeting = `Donate Page`;
      break;
    default:
      greeting = `Welcome ${username}`;
      break;
  }

  return (
    <div className="banner-container">
      <p>{greeting}</p>
    </div>
  );
}
