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
  Sparkles,
  UploadCloud,
  File,
  Lightbulb,
  ShieldCheck,
  Target,
  Menu,
  X,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import ChatBot from './ChatBot';
import { uploadDocument, analyzeJob } from '../services/api';

export default function PageDashboard({ onNavigate, onLogout, sessionId, agentState, setAgentState }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [cvFile, setCvFile] = useState(null);
  const [linkedinFile, setLinkedinFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState({ cv: false, linkedin: false });

  // Ambil nama user dari localStorage (yang disimpan saat login)
  const savedUser = localStorage.getItem('matcha_user');
  const userName = savedUser ? JSON.parse(savedUser).name || "Pengguna" : "Pengguna";

  // Status upload dari agentState
  const cvUploaded = agentState?.cv_uploaded || cvFile;
  const linkedinUploaded = agentState?.linkedin_uploaded || linkedinFile;
  const hasAnalysis = !!agentState?.ats_analysis;

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'cv') setCvFile(file);
    else setLinkedinFile(file);

    setIsUploading(prev => ({ ...prev, [type]: true }));
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('session_id', sessionId);
      formData.append('file_type', type);
      
      const result = await uploadDocument(formData);
      
      // Update shared state dengan info upload
      setAgentState({
        ...agentState,
        [`${type}_uploaded`]: true,
        [`${type}_filename`]: result.filename || file.name,
        [`${type}_text`]: result.extracted_text || '',
      });

      alert(`${type.toUpperCase()} berhasil diunggah!`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal mengunggah dokumen.");
      if (type === 'cv') setCvFile(null);
      else setLinkedinFile(null);
    } finally {
      setIsUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription) return alert("Deskripsi pekerjaan diperlukan.");
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeJob({
        session_id: sessionId,
        job_description: jobDescription,
        agent_state: agentState,
      });
      
      // Simpan seluruh response ke shared state
      if (result.agent_state) {
        setAgentState(result.agent_state);
      }
      
      if (result.agent_state?.ats_analysis) {
        alert("Analisis berhasil! Lihat hasil di Jalur Karier.");
        onNavigate('career-path');
      } else {
        alert(result.response || "Gagal melakukan analisis. Silakan lengkapi profil Anda.");
      }
    } catch (error) {
      console.error("Analyze error:", error);
      alert("Terjadi kesalahan saat analisis. Coba lagi.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const navItems = [
    { key: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', active: true },
    { key: 'career-path', icon: <TrendingUp className="w-4 h-4" />, label: 'Jalur Karier', active: false },
    { key: 'resource', icon: <BookOpen className="w-4 h-4" />, label: 'Sumber Belajar', active: false },
    { key: 'document', icon: <FileText className="w-4 h-4" />, label: 'Dokumen', active: false },
    { key: 'setting', icon: <Settings className="w-4 h-4" />, label: 'Profil', active: false },
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
            <p className="text-gray-800 font-bold text-[11px] leading-none mt-0.5">Platform Karier AI</p>
          </div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-white/70 text-gray-600">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f8f5eb] border-b border-white/50 px-4 py-3 flex flex-col gap-1 z-20 shadow-md">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { onNavigate(item.key); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors text-left ${
                item.active ? 'bg-[#e5f8ec] text-[#35a95b] font-bold' : 'text-gray-500 hover:bg-white/50'
              }`}
            >
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
          <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-3 bg-[#e5f8ec] text-[#35a95b] px-4 py-3 rounded-xl font-bold text-sm transition-colors">
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
          <button onClick={() => onNavigate('setting')} className="w-full flex items-center gap-3 text-gray-500 hover:bg-white/50 px-4 py-3 rounded-xl font-semibold text-sm transition-colors mt-4">
            <Settings className="w-4 h-4" /> Profil
          </button>
        </nav>

        <div className="flex gap-2 mt-auto">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 px-3 py-2.5 rounded-xl font-semibold text-xs shadow-sm hover:bg-gray-50 transition">
            <HelpCircle className="w-3.5 h-3.5" /> Bantuan
          </button>
          <button onClick={onLogout} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 px-3 py-2.5 rounded-xl font-semibold text-xs shadow-sm hover:bg-gray-50 transition">
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-[#e4f7eb] rounded-none md:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-sm border-0 md:border border-white/30 pb-24 md:pb-8">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/40 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 mb-6">
          <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-[#35a95b] text-[10px] font-bold tracking-widest uppercase mb-3 shadow-sm border border-white">
            <Sparkles className="w-3 h-3" /> Hub Utama
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Selamat datang, {userName}!</h1>
          <p className="text-gray-500 text-sm">Unggah dokumenmu dan tentukan target peran untuk memulai perjalanan kariermu.</p>
        </div>

        {/* Status Badges */}
        {(cvUploaded || linkedinUploaded || hasAnalysis) && (
          <div className="relative z-10 flex flex-wrap gap-2 mb-5">
            {cvUploaded && (
              <div className="flex items-center gap-1.5 bg-[#e5f8ec] text-[#35a95b] px-3 py-1.5 rounded-full text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> CV Terunggah
              </div>
            )}
            {linkedinUploaded && (
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> LinkedIn Terunggah
              </div>
            )}
            {hasAnalysis && (
              <button 
                onClick={() => onNavigate('career-path')}
                className="flex items-center gap-1.5 bg-[#fff9ea] text-[#d68f11] border border-[#fde8af] px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-[#fde8af]/30 transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> Lihat Hasil Analisis →
              </button>
            )}
          </div>
        )}

        <div className="relative z-10 flex flex-col lg:flex-row gap-5">
          <div className="flex-1 space-y-5">
            <div className="bg-[#fcfbfa] rounded-[2rem] p-5 shadow-sm border border-white/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-sm">Unggah CV / Resume</h3>
                <span className="bg-[#e4f7eb] text-[#35a95b] px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                  <FileText className="w-3 h-3" /> PDF
                </span>
              </div>
              <label className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                cvUploaded ? 'border-[#35a95b] bg-[#f0faf3]' : 'border-[#8ccf32] bg-white hover:bg-green-50'
              }`}>
                <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => handleFileUpload(e, 'cv')} />
                {isUploading.cv ? (
                  <RefreshCw className="w-8 h-8 text-[#35a95b] animate-spin mb-3" />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8ccf32] to-[#6fb324] rounded-xl flex items-center justify-center shadow-md mb-4">
                    {cvUploaded ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <File className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  </div>
                )}
                <p className="font-bold text-gray-800 text-[14px] sm:text-[15px] mb-1">
                  {cvFile ? cvFile.name : agentState?.cv_filename || "Seret & lepas atau klik untuk memilih"}
                </p>
                <p className="text-gray-400 text-xs px-4">
                  {cvUploaded ? 'CV berhasil diunggah. Klik untuk mengganti.' : 'Unggah resume terbaru untuk dianalisis AI.'}
                </p>
              </label>
            </div>

            <div className="bg-[#fcfbfa] rounded-[2rem] p-5 shadow-sm border border-white/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-sm">Unggah PDF Profil LinkedIn</h3>
                <span className="bg-[#e4f7eb] text-[#35a95b] px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                  <Target className="w-3 h-3" /> PDF
                </span>
              </div>
              <label className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                linkedinUploaded ? 'border-blue-400 bg-blue-50/30' : 'border-[#8ccf32] bg-white hover:bg-green-50'
              }`}>
                <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload(e, 'linkedin')} />
                {isUploading.linkedin ? (
                  <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8ccf32] to-[#6fb324] rounded-xl flex items-center justify-center shadow-md mb-4">
                    {linkedinUploaded ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  </div>
                )}
                <p className="font-bold text-gray-800 text-[14px] sm:text-[15px] mb-1">
                  {linkedinFile ? linkedinFile.name : agentState?.linkedin_filename || "Seret & lepas atau klik untuk memilih"}
                </p>
                <p className="text-gray-400 text-xs px-4">
                  {linkedinUploaded ? 'LinkedIn berhasil diunggah. Klik untuk mengganti.' : 'Tambahkan ekspor LinkedIn untuk melengkapi profilmu.'}
                </p>
              </label>
            </div>

          </div>

          <div className="flex-1 flex flex-col gap-5">
            <div className="bg-[#fcfbfa] rounded-[2rem] p-5 shadow-sm border border-white/50 flex-1 flex flex-col min-h-[200px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-sm">Persyaratan Pekerjaan</h3>
                <span className="bg-[#e4f7eb] text-[#35a95b] px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                  <Target className="w-3 h-3" /> Deskripsi Kebutuhan
                </span>
              </div>
              <textarea 
                className="w-full flex-1 bg-white border border-gray-100 rounded-2xl p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ccf32] focus:border-transparent resize-none shadow-inner min-h-[150px]"
                placeholder="Berikan deskripsi singkat skill yang dibutuhkan untuk pekerjaan impianmu..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="bg-[#fff9ea] rounded-[2rem] p-5 border border-[#fde8af] shadow-sm relative overflow-hidden">
              <div className="flex items-start gap-3 mb-5 relative z-10">
                <div className="mt-0.5 w-8 h-8 bg-[#8ccf32] rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Onboarding dipersonalisasi</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Kami akan menyesuaikan peta jalan, kesenjangan skill, dan tindakan mingguan.
                  </p>
                </div>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-4 bg-gradient-to-r from-[#3fb067] to-[#8ccf32] hover:from-[#35a95b] hover:to-[#7dc325] text-white rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Menganalisis...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Analisis &amp; Buat Peta Jalanku</>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-gray-400 text-[10px] font-medium relative z-10">
                <ShieldCheck className="w-3 h-3 text-[#35a95b]" />
                Data kamu tetap privat dan aman
              </div>
              
              <div className="absolute top-4 right-4 w-12 h-12 bg-[#1b5e3a] rounded-full flex items-center justify-center opacity-10 blur-[2px]">
                 <Sparkles className="w-6 h-6 text-[#aee449]" />
              </div>
            </div>

          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f8f5eb] border-t border-white/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30 flex items-center justify-around px-2 py-2">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-colors min-w-[56px] ${
              item.active ? 'text-[#35a95b]' : 'text-gray-400'
            }`}
          >
            {item.icon}
            <span className="text-[9px] font-semibold leading-none">{item.label}</span>
          </button>
        ))}
      </nav>

      <ChatBot sessionId={sessionId} agentState={agentState} setAgentState={setAgentState} />

    </div>
  );
}
