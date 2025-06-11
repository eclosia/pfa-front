import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TeachersTable from "../components/tables/TeachersTable";

export default function Teachers() {
	
	return (
		<>
			<PageMeta
				title="Teachers | Eclosia"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Professeurs" />
			<div className="space-y-6">

				<TeachersTable />
				
			</div>
		</>
	);
}
