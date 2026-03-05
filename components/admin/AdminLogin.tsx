import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Anmeldung fehlgeschlagen. Bitte pruefen Sie Ihre Zugangsdaten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#2d6a4f] flex items-center justify-center mx-auto mb-5 shadow-sm">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Verwaltung</h1>
          <p className="text-base text-[#1a1a1a]/50 mt-2">HeinsEco Klimaportal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e0e0da] p-8 space-y-5 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-base">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a]/60 mb-2">E-Mail-Adresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-[#e0e0da] bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f]"
              placeholder="admin@klimaportal.de"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a]/60 mb-2">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-[#e0e0da] bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f]"
              placeholder="Passwort eingeben"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#2d6a4f] text-white text-lg font-semibold hover:bg-[#245a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-2"
          >
            {loading ? 'Wird angemeldet...' : 'Anmelden'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
