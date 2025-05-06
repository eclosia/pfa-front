import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import StudentsTable from "../../components/tables/UsersTables/StudentsTable";

export default function Students() {
	
	return (
		<>
			<PageMeta
				title="Students | Eclosia"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Students" />
			<div className="space-y-6">

				<StudentsTable />
				
			</div>
		</>
	);
}
