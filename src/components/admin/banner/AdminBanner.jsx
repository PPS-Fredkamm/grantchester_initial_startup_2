// CSS for this banner is coming from styles/components/banners.css

export default function AdminBanner() {
  let greeting = `System Admin Interface`;

  return (
    <div className="admin-banner-container">
      <p>{greeting}</p>
    </div>
  );
}
