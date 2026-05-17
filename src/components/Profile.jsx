import React from 'react';
import ImageUpload from './ImageUpload';
import UploadCV from './UploadBox';
import { Info } from 'lucide-react';

const Profile = () => {
    return (
        <div className="page-container">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Espace d'Importation</h1>
                    <p className="text-slate-500 mt-1">Centralisez la gestion de vos fichiers et de votre identité.</p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-semibold border border-indigo-100">
                    <Info size={14} />
                    Traitement IA Sécurisé
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '32px',
                alignItems: 'start'
            }}>
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest px-1">
                        <span>01. Analyse Candidat</span>
                    </div>
                    <UploadCV />
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest px-1">
                        <span>02. Branding Profil</span>
                    </div>
                    <ImageUpload onUploadSuccess={() => { }} />
                </section>
            </div>
        </div>
    );
};

export default Profile;