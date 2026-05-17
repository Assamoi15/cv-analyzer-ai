import React, { useEffect, useState } from 'react';
import StatsCards from "./StatsCards";
import ScoreChart from "./ScoreChart";
import TopCandidates from "./TopCandidates";
import API from "../services/api";
import { Users, ShieldCheck, Activity, Brain, Database, Server, Mail, ChevronRight } from "lucide-react";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    API.get("/stats"),
                    API.get("/users")
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                console.error("Erreur de récupération Admin:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="page-container">
            {/* Header avec Badge de Statut */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <ShieldCheck className="text-indigo-600" size={28} />
                        Console d'Administration
                    </h1>
                    <p className="text-slate-500 mt-1">Supervision globale et santé de l'infrastructure IA.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-semibold border border-emerald-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Système Opérationnel
                </div>
            </div>

            {/* Cartes de Statistiques Globales */}
            <StatsCards stats={stats} />

            {/* Graphique d'Activité Full-Width */}
            <div className="chart-card mt-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6 px-2">
                    <h2 className="text-lg font-bold text-slate-800">Activité de la Plateforme</h2>
                    <Activity size={18} className="text-slate-400" />
                </div>
                <ScoreChart history={stats?.history ?? []} />
            </div>

            {/* Grille : Gestion des Utilisateurs & Santé Système */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                {/* Liste des Utilisateurs Modernisée */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                            <Users size={20} className="text-indigo-600" />
                            Utilisateurs actifs
                        </h2>
                        <ChevronRight size={18} className="text-slate-300 cursor-pointer hover:text-indigo-600 transition-colors" />
                    </div>

                    <div className="space-y-4">
                        {users.map((user, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs uppercase group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    {user.username.slice(0, 2)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-900">{user.username}</h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Mail size={12} />
                                        {user.email || 'support@enterprise.ai'}
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                                    }`}>
                                    {user.role === 'admin' ? 'Administrateur' : 'Recruteur'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grille de Santé Système */}
                <div className="space-y-6">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">État des Services</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <StatusCard icon={<Server size={18} />} title="API Backend" status="Online" color="text-emerald-600" bg="bg-emerald-50" />
                        <StatusCard icon={<Brain size={18} />} title="Moteur IA" status="Optimal" color="text-indigo-600" bg="bg-indigo-50" />
                        <StatusCard icon={<Database size={18} />} title="Database" status="Connected" color="text-blue-600" bg="bg-blue-50" />
                        <StatusCard icon={<Activity size={18} />} title="Flux Ops" status={`${stats?.total_cv || 124} analyses`} color="text-amber-600" bg="bg-amber-50" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatusCard = ({ icon, title, status, color, bg }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-default">
        <div className={`p-2 w-fit ${bg} ${color} rounded-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{title}</p>
            <p className="text-sm font-extrabold text-slate-900">{status}</p>
        </div>
    </div>
);

export default AdminDashboard;