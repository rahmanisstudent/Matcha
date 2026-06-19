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
  CheckCircle2,
  Clock,
  Gauge,
  Menu,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import ChatBot from './ChatBot';

export default function PageCareerPath({ onNavigate, onLogout, sessionId, agentState, setAgentState }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Baca data dari shared agentState
  const atsAnalysis = agentState?.ats_analysis || null;
  const atsMatchRate = atsAnalysis?.match_rate || 0;
  const masteredSkills = atsAnalysis?.mastered_skills || [];
  const skillGapsList = atsAnalysis?.skill_gaps || [];
  const learningRoadmap = agentState?.learning_roadmap || null;
  const roadmapPhases = learningRoadmap?.phases || [];

  // Hitung progres belajar
  const completedPhases = roadmapPhases.filter(p => p.completed).length;
  const totalPhases = roadmapPhases.length;
  const progressPercent = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0;

  const togglePhaseCompletion = (index) => {
    if (!agentState || !agentState.learning_roadmap) return;
    
    const updatedPhases = [...agentState.learning_roadmap.phases];
    updatedPhases[index] = {
      ...updatedPhases[index],
      completed: !updatedPhases[index].completed
    };
    
    const updatedState = {
      ...agentState,
      learning_roadmap: {
        ...agentState.learning_roadmap,
        phases: updatedPhases
      }
    };
    
    if (setAgentState) {
      setAgentState(updatedState);
    }
  };

  // Konversi skill gaps ke nama string
  const skillsNeed = skillGapsList.map(gap => typeof gap === 'string' ? gap : (gap.skill || gap.name || ''));

  const navItems = [
    { key: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { key: 'career-path', icon: <TrendingUp className="w-4 h-4" />, label: 'Jalur Karier', active: true },
    { key: 'resource', icon: <BookOpen className="w-4 h-4" />, label: 'Sumber Belajar' },
    { key: 'document', icon: <FileText className="w-4 h-4" />, label: 'Dokumen' },
    { key: 'setting', icon: <Settings className="w-4 h-4" />, label: 'Profil' },
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
            <p className="text-gray-800 font-bold text-[11px] leading-none mt-0.5">Jalur Karier</p>
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
          <button onClick={() => onNavigate('career-path')} className="w-full flex items-center gap-3 bg-[#e5f8ec] text-[#35a95b] px-4 py-3 rounded-xl font-bold text-sm transition-colors">
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

        <div className="mt-4 mb-4 bg-white/60 p-3 rounded-2xl flex items-center gap-3 border border-white">
           <div className="w-8 h-8 bg-[#e5f8ec] rounded-lg flex items-center justify-center text-[#35a95b]">
              <Sprout className="w-4 h-4" />
           </div>
           <div>
              <p className="text-[11px] font-bold text-gray-800">Pelatih AI</p>
              <p className="text-[10px] text-[#35a95b]">Siap membimbingmu</p>
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

      <main className="flex-1 rounded-none md:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-y-auto pb-24 md:pb-8">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-3 relative z-10">
          <div>
            <h4 className="text-[#35a95b] font-bold tracking-[0.15em] text-[10px] uppercase mb-1">Matcha Jalur Karier</h4>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Jalur Kariermu</h1>
          </div>
          <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-[#35a95b] text-xs font-bold shadow-sm border border-white/50 self-start sm:self-auto">
            Peta jalan dioptimalkan ATS
          </div>
        </div>

        {/* Jika belum ada data analisis, tampilkan empty state */}
        {!atsAnalysis ? (
          <div className="bg-[#fcfbfa] rounded-[2rem] p-8 sm:p-12 shadow-sm border border-white/50 text-center">
            <div className="w-16 h-16 bg-[#e5f8ec] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-[#35a95b]" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Belum Ada Analisis</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Unggah CV dan deskripsi pekerjaan target di Dashboard, lalu klik "Analisis & Buat Peta Jalanku" untuk melihat jalur kariermu di sini.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3fb067] to-[#8ccf32] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <ArrowRight className="w-4 h-4" /> Kembali ke Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* ATS Match Rate Card */}
            <div className="bg-[#fcfbfa] rounded-[2rem] p-5 sm:p-6 shadow-sm border border-white/50 mb-6 flex flex-col sm:flex-row items-center gap-6">
              
              {/* Lingkaran lebih besar */}
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center flex-shrink-0">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                   <circle cx="60" cy="60" r="50" fill="transparent" stroke="#e5f8ec" strokeWidth="9" />
                   <circle cx="60" cy="60" r="50" fill="transparent" stroke="#35a95b" strokeWidth="9"
                     strokeLinecap="round"
                     strokeDasharray={`${2 * Math.PI * 50}`}
                     strokeDashoffset={`${2 * Math.PI * 50 * (1 - atsMatchRate / 100)}`}
                     className="transition-all duration-1000"
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-none">{atsMatchRate}%</h2>
                 </div>
              </div>

              {/* Label & info di samping lingkaran */}
              <div className="flex flex-col gap-3">
                 <div>
                   <p className="text-[11px] font-bold tracking-widest text-[#35a95b] uppercase">Tingkat Kecocokan ATS</p>
                   <p className="text-sm font-semibold text-gray-600 mt-0.5">
                     {atsMatchRate >= 70 ? 'Profilmu sangat cocok!' : atsMatchRate >= 40 ? 'Cocok dengan catatan' : 'Perlu banyak peningkatan'}
                   </p>
                 </div>
                 <div className="bg-[#e4f7eb] px-4 py-2.5 rounded-full flex items-center gap-2 border border-white shadow-sm w-fit">
                    <Gauge className="w-4 h-4 text-[#35a95b]" />
                    <span className="text-gray-800 font-bold text-xs">
                      {atsMatchRate >= 70 ? 'Kecocokan Tinggi' : atsMatchRate >= 40 ? 'Kecocokan Sedang' : 'Perlu Peningkatan'}
                    </span>
                 </div>
                 {roadmapPhases.length > 0 && (
                   <div className="bg-[#e4f7eb] px-4 py-2.5 rounded-full flex items-center gap-2 border border-white shadow-sm w-fit">
                      <Clock className="w-4 h-4 text-[#35a95b]" />
                      <span className="text-gray-800 font-bold text-xs">{learningRoadmap?.total_weeks || roadmapPhases.length * 4} Minggu Roadmap</span>
                   </div>
                 )}
              </div>
            </div>

            {/* Skill Tracker */}
            <div className="bg-[#fcfbfa] rounded-[2rem] p-5 sm:p-6 shadow-sm border border-white/50 mb-6">
               <h3 className="flex items-center gap-2 font-bold text-gray-800 text-sm mb-5">
                 <Gauge className="w-4 h-4 text-[#35a95b]" /> Pelacak Kesenjangan Skill
               </h3>
               
               <div className="space-y-4">
                 {masteredSkills.length > 0 && (
                   <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <h4 className="text-[10px] font-bold text-[#35a95b] tracking-widest uppercase mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#35a95b]"></span> Skill yang Kamu Miliki ({masteredSkills.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                         {masteredSkills.map((skill, idx) => (
                           <span key={idx} className="bg-[#e4f7eb] text-[#2c8a4a] px-3 py-1.5 rounded-full text-[11px] font-bold">
                             {skill}
                           </span>
                         ))}
                      </div>
                   </div>
                 )}

                 {skillsNeed.length > 0 && (
                   <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <h4 className="text-[10px] font-bold text-[#f8aa18] tracking-widest uppercase mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f8aa18]"></span> Skill yang Perlu Dikembangkan ({skillsNeed.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                         {skillsNeed.map((skill, idx) => (
                           <span key={idx} className="bg-[#fff9ea] border border-[#fde8af] text-[#d68f11] px-3 py-1.5 rounded-full text-[11px] font-bold">
                             {skill}
                           </span>
                         ))}
                      </div>
                   </div>
                 )}

                 {masteredSkills.length === 0 && skillsNeed.length === 0 && (
                   <div className="text-center py-6 text-gray-400 text-sm">
                     Data skill belum tersedia dari analisis.
                   </div>
                 )}
               </div>
            </div>

            {/* Learning Roadmap */}
            <div className="bg-[#fcfbfa] rounded-[2rem] p-5 sm:p-6 shadow-sm border border-white/50">
               <h3 className="flex items-center gap-2 font-bold text-gray-800 text-sm mb-6">
                 <BookOpen className="w-4 h-4 text-[#35a95b]" /> Peta Jalan Belajar
                 {learningRoadmap?.total_weeks && (
                   <span className="ml-auto text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                     {learningRoadmap.total_weeks} Minggu
                   </span>
                 )}
               </h3>

               {/* Progress Bar */}
               {roadmapPhases.length > 0 && (
                 <div className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-bold text-gray-700">Progres Belajar</span>
                     <span className="text-xs font-bold text-[#35a95b]">{progressPercent}% Selesai ({completedPhases} dari {totalPhases} Modul)</span>
                   </div>
                   <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                     <div 
                       className="bg-gradient-to-r from-[#3fb067] to-[#8ccf32] h-full rounded-full transition-all duration-500 ease-out" 
                       style={{ width: `${progressPercent}%` }}
                     />
                   </div>
                 </div>
               )}

               {roadmapPhases.length === 0 ? (
                 <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 border-dashed">
                    <Sprout className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <h4 className="font-bold text-gray-600">Belum Ada Peta Jalan</h4>
                    <p className="text-xs text-gray-400 mt-1">Unggah CV dan Target Peranmu di Dashboard untuk membuat peta jalanmu.</p>
                 </div>
               ) : (
                 <div className="relative pl-6 space-y-5 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#35a95b] before:via-[#35a95b]/50 before:to-transparent">
                   
                    {roadmapPhases.map((phase, index) => {
                      const phaseName = phase.phase_name || phase.name || phase.title || `Fase ${index + 1}`;
                      const duration = phase.duration || phase.weeks || '';
                      const topics = phase.topics || phase.skills || phase.focus_areas || [];
                      const resources = phase.resources || phase.courses || [];
                      const isCompleted = phase.completed || false;

                      // Topic keyword untuk navigasi ke PageResource
                      const topicKeyword = (() => {
                        if (topics.length > 0) {
                          const firstTopic = topics[0];
                          return typeof firstTopic === 'string' ? firstTopic : (firstTopic.name || firstTopic.title || phaseName);
                        }
                        return phaseName;
                      })();

                      return (
                        <div key={index} className="relative flex items-start group">
                          <button
                            onClick={() => togglePhaseCompletion(index)}
                            className={`absolute left-0 -ml-[25px] w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-10 ${
                              isCompleted 
                                ? 'bg-[#35a95b] text-white' 
                                : 'bg-white border-gray-300 text-gray-300 hover:border-[#35a95b] hover:text-[#35a95b]'
                            }`}
                            title={isCompleted ? "Tandai belum selesai" : "Tandai selesai"}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Card fase — klik untuk ke PageResource dengan topik sesuai fase */}
                          <div
                            onClick={() => onNavigate('resource', topicKeyword)}
                            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm w-full hover:shadow-md hover:border-[#35a95b]/30 transition-all cursor-pointer group-hover:-translate-y-0.5 duration-200"
                          >
                             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                               <div className="flex items-center gap-2 flex-wrap">
                                 <h4 className="font-bold text-gray-900 text-[13px]">{phaseName}</h4>
                                 {duration && (
                                   <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#e4f7eb] text-[#35a95b] flex items-center gap-1">
                                     <Clock className="w-2.5 h-2.5" /> {duration}
                                   </span>
                                 )}
                               </div>
                               <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-bold text-gray-400">Fase {index + 1}/{roadmapPhases.length}</span>
                                 <span className="text-[9px] font-bold text-[#35a95b] bg-[#e5f8ec] px-2 py-0.5 rounded-full flex items-center gap-1">
                                   <ArrowRight className="w-2.5 h-2.5" /> Lihat Materi
                                 </span>
                               </div>
                             </div>

                             {/* Topics / Skills */}
                             {topics.length > 0 && (
                               <div className="flex flex-wrap gap-1.5 mb-2">
                                 {(Array.isArray(topics) ? topics : [topics]).map((topic, tIdx) => (
                                   <span key={tIdx} className="bg-gray-50 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                                     {typeof topic === 'string' ? topic : topic.name || topic.title || ''}
                                   </span>
                                 ))}
                               </div>
                             )}

                             {/* Resources / Courses */}
                             {resources.length > 0 && (
                               <div className="mt-2 pt-2 border-t border-gray-50">
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Rekomendasi:</p>
                                 <div className="space-y-1">
                                   {resources.slice(0, 3).map((res, rIdx) => {
                                     const resTitle = typeof res === 'string' ? res : (res.title || res.name || res.course_name || '');
                                     const resUrl = typeof res === 'object' ? (res.url || res.link || '') : '';
                                     return (
                                       <div key={rIdx} className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                                         <CheckCircle2 className="w-3 h-3 text-[#35a95b] flex-shrink-0" />
                                         {resUrl ? (
                                           <a href={resUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline truncate">
                                             {resTitle}
                                           </a>
                                         ) : (
                                           <span className="text-[11px] text-gray-600 truncate">{resTitle}</span>
                                         )}
                                       </div>
                                     );
                                   })}
                                 </div>
                               </div>
                             )}
                          </div>
                        </div>
                      );
                    })}
                 </div>
               )}
            </div>
          </>
        )}

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
