import React, { useState } from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  TrendingUp, 
  BookOpen, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut,
  User,
  GraduationCap,
  Target,
  Clock,
  AlertTriangle,
  RefreshCw,
  Save,
  Pencil,
  Menu,
  X
} from 'lucide-react';
import ChatBot from './ChatBot';

export default function PageSetting({ onNavigate, onLogout, user, onUpdateUser, sessionId, agentState, setAgentState }) {
  // <USER PROFILE>
  const [profile, setProfile] = useState({
    fullName: user?.name || "",
    educationalBackground: user?.education || "",
    targetCareerGoal: user?.goal || "",
    weeklyStudyTime: user?.studyTime || ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    // <PATCH /users/me>
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      if (onUpdateUser) {
        onUpdateUser({
          name: profile.fullName,
          education: profile.educationalBackground,
          goal: profile.targetCareerGoal,
          studyTime: profile.weeklyStudyTime
        });
      }
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm("Apakah kamu yakin? Tindakan ini akan menghapus permanen peta jalan, data skill, dan dokumenmu.")) {
      // <POST /users/me/reset>
      alert("Semua layanan direset. Kamu akan keluar dari aplikasi.");
      onLogout();
    }
  };

  const navItems = [
    { key: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { key: 'career-path', icon: <TrendingUp className="w-4 h-4" />, label: 'Jalur Karier' },
    { key: 'resource', icon: <BookOpen className="w-4 h-4" />, label: 'Sumber Belajar' },
    { key: 'document', icon: <FileText className="w-4 h-4" />, label: 'Dokumen' },
    { key: 'setting', icon: <Settings className="w-4 h-4" />, label: 'Profil', active: true },
  ];

  return (
    <div className="min-h-screen bg-[#c8f0d5] font-sans flex flex-col md:flex-row md:p-4 md:gap-4">

      <div className="md:hidden flex items-center justify-between bg-[#f8f5eb] px-4 py-3 border-b border-white/50 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8ccf32] rounded-xl flex items-center justify-center shadow-md">
            <Sprout className="text-white w-4 h-4" />
          </div>
          <div>
            <p className="text-[#35a95b] font-bold tracking-[0.1em] text-[9px] uppercase leading-none">Matcha</p>
            <p className="text-gray-800 font-bold text-[11px] leading-none mt-0.5">Pengaturan</p>
          </div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-white/70 text-gray-600">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f8f5eb] border-b border-white/50 px-4 py-3 flex flex-col gap-1 z-20 shadow-md">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { onNavigate(item.key); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors text-left ${item.active ? 'bg-[#e5f8ec] text-[#35a95b] font-bold' : 'text-gray-500 hover:bg-white/50'}`}>
              {item.icon} {item.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2 border-t border-white/50 mt-1">
            <button className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2.5 rounded-xl font-semibold text-xs">
              <HelpCircle className="w-3.5 h-3.5" /> Bantuan
            </button>
            <button onClick={onLogout} className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2.5 rounded-xl font-semibold text-xs">
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </button>
          </div>
        </div>
      )}

      <aside className="hidden md:flex w-56 lg:w-64 bg-[#f8f5eb] rounded-3xl p-5 lg:p-6 flex-col shadow-sm border border-white/50 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-3 mb-8 pl-2">
          <div className="w-10 h-10 bg-[#8ccf32] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Sprout className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[#35a95b] font-bold tracking-[0.1em] text-[10px] uppercase">Matcha</h1>
            <h2 className="text-gray-800 font-bold text-xs leading-tight mt-0.5">Platform Karier AI</h2>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-3 text-gray-500 hover:bg-white/50 px-4 py-3 rounded-xl font-semibold text-sm transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button onClick={() => onNavigate('career-path')} className="w-full flex items-center gap-3 text-gray-500 hover:bg-white/50 px-4 py-3 rounded-xl font-semibold text-sm transition-colors">
            <TrendingUp className="w-4 h-4" /> Jalur Karier
          </button>
          <button onClick={() => onNavigate('resource')} className="w-full flex items-center gap-3 text-gray-500 hover:bg-white/50 px-4 py-3 rounded-xl font-semibold text-sm transition-colors">
            <BookOpen className="w-4 h-4" /> Sumber Belajar
          </button>
          <button onClick={() => onNavigate('document')} className="w-full flex items-center gap-3 text-gray-500 hover:bg-white/50 px-4 py-3 rounded-xl font-semibold text-sm transition-colors">
            <FileText className="w-4 h-4" /> Dokumen
          </button>
          <button onClick={() => onNavigate('setting')} className="w-full flex items-center gap-3 bg-[#e5f8ec] text-[#35a95b] px-4 py-3 rounded-xl font-bold text-sm transition-colors mt-4">
            <Settings className="w-4 h-4" /> Profil
          </button>
        </nav>

        <div className="mt-4 mb-4 bg-white/60 p-3 rounded-2xl flex items-center gap-3 border border-white">
           <div className="w-8 h-8 bg-[#e5f8ec] rounded-lg flex items-center justify-center text-[#35a95b]">
              <Sprout className="w-4 h-4" />
           </div>
           <div>
              <p className="text-[11px] font-bold text-gray-800">Asisten AI</p>
              <p className="text-[10px] text-[#35a95b]">Butuh bantuan pengaturan?</p>
           </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 px-3 py-2.5 rounded-xl font-semibold text-xs shadow-sm hover:bg-gray-50 transition">
            <HelpCircle className="w-3.5 h-3.5" /> Bantuan
          </button>
          <button onClick={onLogout} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 px-3 py-2.5 rounded-xl font-semibold text-xs shadow-sm hover:bg-gray-50 transition">
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 rounded-none md:rounded-3xl p-4 sm:p-6 lg:p-10 relative overflow-y-auto pb-24 md:pb-10 space-y-5 sm:space-y-6">
        
        <div className="mb-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Pengaturan</h1>
          <p className="text-gray-500 text-sm">Perbarui profil dan preferensimu.</p>
        </div>

        <div className="bg-[#fcfbfa] rounded-[2rem] p-6 sm:p-8 shadow-sm border border-white/50">
          <h2 className="flex items-center gap-2 font-extrabold text-gray-900 text-lg mb-6 sm:mb-8">
            <Pencil className="w-5 h-5 text-[#35a95b]" /> Profil &amp; Tujuan
          </h2>

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#35a95b]" />
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#8ccf32] transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Latar Belakang Pendidikan / Jurusan</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#35a95b]" />
                <input
                  type="text"
                  name="educationalBackground"
                  value={profile.educationalBackground}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#8ccf32] transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Target Karier / Pekerjaan Impian</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#35a95b]" />
                <input
                  type="text"
                  name="targetCareerGoal"
                  value={profile.targetCareerGoal}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#8ccf32] transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Waktu Belajar Mingguan</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#35a95b]" />
                <input
                  type="text"
                  name="weeklyStudyTime"
                  value={profile.weeklyStudyTime}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#8ccf32] transition shadow-sm"
                />
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full py-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 ${
                saved 
                  ? 'bg-[#e4f7eb] text-[#35a95b] border-2 border-[#8ccf32]' 
                  : 'bg-gradient-to-r from-[#3fb067] to-[#8ccf32] hover:from-[#35a95b] hover:to-[#7dc325] text-white hover:scale-[1.01] active:scale-95'
              }`}
            >
              {isSaving ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Menyimpan...</>
              ) : saved ? (
                <><Save className="w-4 h-4" /> Perubahan Tersimpan!</>
              ) : (
                <><Save className="w-4 h-4" /> Simpan Perubahan</>
              )}
            </button>
          </div>
        </div>

        <div className="bg-[#fff5f5] rounded-[2rem] p-6 sm:p-8 shadow-sm border border-red-100">
          <h2 className="flex items-center gap-2 font-extrabold text-red-600 text-lg mb-3">
            <AlertTriangle className="w-5 h-5" /> Zona Berbahaya
          </h2>
          <p className="text-red-500 text-sm leading-relaxed mb-6">
            Mereset layanan akan menghapus permanen peta jalan, data skill, dan dokumen yang diunggah. Tindakan ini tidak dapat dibatalkan.
          </p>
          <button 
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> Reset Semua Layanan
          </button>
        </div>

      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f8f5eb] border-t border-white/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30 flex items-center justify-around px-2 py-2">
        {navItems.map(item => (
          <button key={item.key} onClick={() => onNavigate(item.key)}
            className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-colors min-w-[56px] ${item.active ? 'text-[#35a95b]' : 'text-gray-400'}`}>
            {item.icon}
            <span className="text-[9px] font-semibold leading-none">{item.label}</span>
          </button>
        ))}
      </nav>

      <ChatBot sessionId={sessionId} agentState={agentState} setAgentState={setAgentState} />
    </div>
  );
}
