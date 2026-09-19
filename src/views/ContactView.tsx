import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  RadioTower, 
  Clock, 
  DollarSign, 
  Share2
} from 'lucide-react';
import { RADIO_INFO } from '../data/mockData';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Général',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Général',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" />
          <span>ÉCOUTE & PROXIMITÉ AUDITEURS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
          CONTACTEZ RADIO SHIMA FM 95.9
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Une suggestion d'émission, une alerte info dans votre province, un partenariat commercial ou une dédicace en direct ? Notre équipe vous répond avec réactivité.
        </p>
      </div>

      {/* Grid: Coordonnées + Formulaire (Req #28) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Coordonnées détaillées (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Coordonnées Officielles
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Siège & Studios :</strong>
                  <span className="text-slate-600 dark:text-slate-300">{RADIO_INFO.address}</span>
                  <span className="block text-slate-400 text-xs mt-0.5">Rumonge, Burunga, Burundi</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Téléphone Direct Antenne :</strong>
                  <a href={`tel:${RADIO_INFO.phone}`} className="text-red-600 font-bold hover:underline font-mono">
                    {RADIO_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">WhatsApp Auditeurs & Dédicaces :</strong>
                  <a href={`https://wa.me/25769959000`} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline font-mono">
                    {RADIO_INFO.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Rédaction en Chef :</strong>
                  <a href={`mailto:${RADIO_INFO.redactionEmail}`} className="text-blue-600 hover:underline">
                    {RADIO_INFO.redactionEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Régie Publicitaire & Partenariats :</strong>
                  <a href={`mailto:${RADIO_INFO.commercialEmail}`} className="text-amber-600 font-semibold hover:underline">
                    {RADIO_INFO.commercialEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Map Representation */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Plan d'accès au studio (Rumonge) :
              </span>
              <div className="rounded-2xl overflow-hidden aspect-16/9 bg-slate-800 border border-slate-700 relative flex items-center justify-center p-4 text-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
                  alt="Carte de Rumonge"
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="relative z-10 bg-slate-950/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-red-500 font-bold text-xs">
                    <RadioTower className="w-4 h-4" />
                    <span>STUDIO SHIMA FM 95.9</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Quartier Burunga, Rumonge</p>
                  <p className="text-[10px] text-amber-400 font-mono">Rumonge, Burunga, Burundi 🇧🇮</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Col: Formulaire de contact (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                Envoyez-nous un message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Remplissez ce formulaire et notre service d'accueil vous recontactera sous 24h.
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>
                  <strong>Message envoyé avec succès !</strong> Merci de nous avoir écrit. La rédaction ou le service commercial vous répondra rapidement.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: David Niyungeko"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Adresse E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: david@exemple.bi"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Numéro de Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+257 69..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Sujet de votre message
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  >
                    <option value="Général">Informations Générales</option>
                    <option value="Rédaction">Proposer une information / Alerte info</option>
                    <option value="Publicité">Campagne publicitaire / Sponsoring</option>
                    <option value="Dédicace">Dédicace & Musique</option>
                    <option value="Partenariat">Partenariat média</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Votre Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Écrivez votre message ici avec précision..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer mon message à Radio Shima FM</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
