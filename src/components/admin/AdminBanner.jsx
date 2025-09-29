import { useSelector } from "react-redux";

// CSS for this banner is coming from the MemberBanner.css file
// import "./MemberBanner.css";

export default function AdminBanner() {

  const profileCDO = useSelector((state) => state.auth.profileCDO);
  const firstName = profileCDO?.firstName || "User";

  let greeting = `${firstName}'s Site Admin Dashboard`;

  return (
    <div className="banner-container">
      <p>{greeting}</p>
    </div>
  );
}
