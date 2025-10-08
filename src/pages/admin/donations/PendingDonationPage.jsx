import AdminPageWrapper from "../wrapper/AdminPageWrapper";
import AdminPending from "../../../components/admin/donations/pending/AdminPending";
import AdminPendingStats from "../../../components/admin/donations/pending/AdminPendingStats";

export default function PendingDonationPage() {
  return (
    <>
      <AdminPageWrapper
        StatsComponent={AdminPendingStats}
        TableComponent={AdminPending}
      />
    </>
  );
}
