import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./MemberBanner.css";

export default function MemberBanner() {
  const { type } = useParams();

  const role = type?.toLowerCase();
  const profile = useSelector((state) => state.auth.profile);
  const firstName = profile?.firstName || "User";

  let greeting = "";
  switch (role) {
    case "donor":
      greeting = `${firstName}'s Donor Dashboard`;
      break;
    case "company":
      greeting = "Company Dashboard";
      break;
    case "university":
      greeting = "University Dashboard";
      break;
    case "profile":
      greeting = `${firstName}' Profile`;
      break;
    case "donate":
      greeting = `Donate Page`;
      break;
    default:
      greeting = `Welcome ${firstName}`;
      break;
  }

  return (
    <div className="banner-container">
      <p>{greeting}</p>
    </div>
  );
}
