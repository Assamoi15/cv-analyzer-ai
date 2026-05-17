import React, { useState, useRef } from 'react';
import { CloudUpload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import API from '../services/api';

const ImageUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    const validateAndSetFile = (selectedFile) => {
        if (!selectedFile) return;

        // Validation du type (Images seulement)
        if (!selectedFile.type.startsWith('image/')) {
            setErrorMessage('Format non supporté. Veuillez choisir une image (JPG, PNG).');
            setStatus('error');
            return;
        }

        // Validation de la taille (ex: 5MB max)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setErrorMessage('Fichier trop lourd (5 Mo maximum).');
            setStatus('error');
            return;
        }

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setStatus('idle');
        setErrorMessage('');
    };

    const handleUpload = async () => {
        if (!file) return;
        setStatus('uploading');

        const formData = new FormData();
        formData.append('file', file); // 'file' doit correspondre à la clé attendue par ton API Fast API/Flask

        try {
            const response = await API.post('/upload-image', formData); // Utilise ton instance API centralisée
            setStatus('success');
            if (onUploadSuccess) onUploadSuccess(response.data);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.response?.data?.detail || "Échec de l'envoi vers le serveur.");
        }
    };

    const reset = () => {
        setFile(null);
        setPreview(null);
        setStatus('idle');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="upload-card" style={{ maxWidth: '450px', margin: '0 auto' }}>
            <div className="mb-4 text-center">
                <h2 style={{ marginBottom: '8px' }}>Image de profil</h2>
                <p className="text-muted" style={{ fontSize: '14px' }}>Personnalisez votre compte avec une photo professionnelle</p>
            </div>

            {!preview ? (
                <div
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-blue-500', 'bg-blue-50'); }}
                    onDragLeave={(e) => { e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50'); }}
                    onDrop={(e) => { e.preventDefault(); validateAndSetFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileInputRef.current?.click()}
                    className="upload-zone"
                >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => validateAndSetFile(e.target.files[0])} />
                    <div className="upload-icon-wrap">
                        <CloudUpload size={24} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-700">Cliquez ou glissez la photo ici</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG ou GIF jusqu'à 5Mo</p>
                </div>
            ) : (
                <div className="relative group">
                    <img src={preview} alt="Preview" className="w-full h-56 object-cover rounded-xl border border-slate-200 shadow-inner" />
                    <button onClick={reset} className="absolute top-2 right-2 p-1.5 bg-white/90 text-slate-600 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}

            {/* Feedback Messages */}
            {status === 'success' && (
                <div className="mt-4 flex items-center p-3 bg-green-50 text-green-700 rounded-lg border border-green-100 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" /> Image envoyée avec succès !
                </div>
            )}
            {status === 'error' && (
                <div className="mt-4 flex items-center p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" /> {errorMessage}
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || status === 'uploading' || status === 'success'}
                className="btn-primary"
                style={{ width: '100%', marginTop: '20px' }}
            >
                {status === 'uploading' ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Envoi en cours...</> : "Mettre à jour l'image"}
            </button>
        </div>
    );
};

export default ImageUpload;