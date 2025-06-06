import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar"; 

const TeacherAppLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden"> 
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherAppLayout;