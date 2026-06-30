import AdminForms from "@/ui-components/AdminPage/AdminForms";
import AdminNavbar from "@/ui-components/AdminPage/AdminNavbar"
import AdminNotifications from "@/ui-components/AdminPage/AdminNotifications";
import AdminStats from "@/ui-components/AdminPage/AdminStats";
const AdminPage = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <AdminNavbar/>
      <AdminNotifications/>
      <div className="px-6 flex flex-col gap-4">
        <AdminStats/>
        <AdminForms/>
      </div>
      
      
    </div>
  );
};

export default AdminPage;