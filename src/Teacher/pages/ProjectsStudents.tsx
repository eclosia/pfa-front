import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ProjectsStudentsTable from "../components/tables/ProjectsStudentsTable";

export default function ProjectsStudents() {
	
	return (
		<>
			<PageMeta
				title="Students | Eclosia"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Students" />
			<div className="space-y-6">

				<ProjectsStudentsTable />
				
			</div>
		</>
	);
}
