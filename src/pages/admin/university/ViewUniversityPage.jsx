import AdminPageWrapper from "../wrapper/AdminPageWrapper";
import AdminUniversities from "../../../components/admin/university/AdminUniversities";
import AdminUniversityStats from "../../../components/admin/university/AdminUniversityStats";

export default function ViewUniversityPage() {
  return (
    <>
      <AdminPageWrapper
        StatsComponent={AdminUniversityStats}
        TableComponent={AdminUniversities}
      />
    </>
  );
}
