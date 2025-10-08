import AdminPageWrapper from "../wrapper/AdminPageWrapper";
import AdminAllDonations from "../../../components/admin/donations/AdminAllDonations";
import AdminDonationStats from "../../../components/admin/donations/AdminDonationStats";

export default function ViewDonationsPage() {
  return (
    <>
      <AdminPageWrapper
        StatsComponent={AdminDonationStats}
        TableComponent={AdminAllDonations}
      />
    </>
  );
}
