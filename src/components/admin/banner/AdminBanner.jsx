// CSS for this banner is coming from the MemberBanner.css file
import "./AdminBanner.css";

export default function AdminBanner() {
  let greeting = `System Admin Interface`;

  return (
    <div className="admin-banner-container">
      <p>{greeting}</p>
    </div>
  );
}
