// CSS for this banner is coming from the MemberBanner.css file
// import "./MemberBanner.css";

export default function AdminBanner() {
  let greeting = `Site Admin Dashboard`;

  return (
    <div className="banner-container">
      <p>{greeting}</p>
    </div>
  );
}
