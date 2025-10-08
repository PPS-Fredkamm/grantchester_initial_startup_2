import AdminPageWrapper from "../wrapper/AdminPageWrapper";
import PendingUniversityStats from "../../../components/admin/university/pending/PendingUniversityStats";
import PendingUniversities from "../../../components/admin/university/pending/PendingUniversities";

export default function PendingUniversityPage() {
  return (
    <>
      <AdminPageWrapper
        StatsComponent={PendingUniversityStats}
        TableComponent={PendingUniversities}
      />
    </>
  );
}
