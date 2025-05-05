import { useNavigate } from 'react-router-dom';

export default function SidebarWidget() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ici vous pouvez ajouter la logique de déconnexion (suppression du token, etc.)
    localStorage.removeItem('token'); // Supprime le token si vous en utilisez un
    navigate('/signin');
  };

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 mx-auto w-full max-w-60 rounded-t-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      {/* <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        #1 Tailwind CSS Dashboard
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.
      </p> */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-full p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
        Déconnecter
      </button>
    </div>
  );
}
