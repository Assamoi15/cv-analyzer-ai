import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Sparkles,
  Upload,
  BrainCircuit,
  Settings,
  ChevronRight
} from "lucide-react";

function Sidebar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="sidebar flex flex-col h-full bg-slate-900 text-slate-300 w-64 border-r border-slate-800 shadow-xl">
      {/* Logo */}
      <div className="sidebar-logo p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="sidebar-logo-icon bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Sparkles size={22} fill="currentColor" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
            CV Analyzer
            <span className="block text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-semibold mt-1">IA Entreprise</span>
          </h2>
        </div>
      </div>

      <nav className="sidebar-nav flex-1 px-4 space-y-8 overflow-y-auto">
        {/* Section: Vue d'ensemble */}
        <div>
          <div className="sidebar-section-label px-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Général</div>
          <ul className="space-y-1">
            <li>
              <NavLink to="/recruiter/dashboard" className={({ isActive }) => `sidebar-link group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white"}`}>
                <div className="flex items-center gap-3 font-medium text-sm">
                  <LayoutDashboard size={18} />
                  <span>Tableau de bord</span>
                </div>
                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity`} />
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Section: Gestion Talents */}
        <div>
          <div className="sidebar-section-label px-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Gestion Talents</div>
          <ul className="space-y-1">
            <li>
              <NavLink to="/recruiter/candidates" className={({ isActive }) => `sidebar-link group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white"}`}>
                <div className="flex items-center gap-3 font-medium text-sm">
                  <Users size={18} />
                  <span>Candidats</span>
                </div>
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${true ? "bg-slate-700 text-slate-300" : ""}`}>12</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/recruiter/upload" className={({ isActive }) => `sidebar-link group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white"}`}>
                <div className="flex items-center gap-3 font-medium text-sm">
                  <Upload size={18} />
                  <span>Importer CV</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Section: Intelligence IA */}
        <div>
          <div className="sidebar-section-label px-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Intelligence IA</div>
          <ul className="space-y-1">
            <li>
              <NavLink to="/recruiter/toolkit" className={({ isActive }) => `sidebar-link group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white"}`}>
                <div className="flex items-center gap-3 font-medium text-sm">
                  <BrainCircuit size={18} />
                  <span>Outils IA</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="user-profile-mini flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-700/50 mb-4">
          <div className="user-avatar h-9 w-9 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-xs shadow-inner">
            {localStorage.getItem('role') === 'admin' ? 'AD' : 'RE'}
          </div>
          <div className="user-meta flex-1 overflow-hidden">
            <span className="user-name block text-sm font-semibold text-white truncate">{localStorage.getItem('username') || 'Utilisateur'}</span>
            <span className="user-role block text-[10px] text-slate-500 uppercase font-bold tracking-tight italic">{localStorage.getItem('role')}</span>
          </div>
          <Settings size={16} className="text-slate-500 cursor-pointer hover:rotate-45 transition-transform" />
        </div>
        <button className="logout-btn w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl font-semibold text-sm hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5" onClick={logout}>
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Sidebar;