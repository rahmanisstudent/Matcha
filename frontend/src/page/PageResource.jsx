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
  Clock,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import ChatBot from './ChatBot';

export default function PageResource({ onNavigate, onLogout, initialTopic = '', agentState, sessionId, setAgentState }) {
  // <FILTER CATEGORIES>
  const categories = ["Semua", "Coursera", "Udemy", "YouTube", "Gratis", "Rekomendasi"];

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Baca data katalog kursus dari agentState (hasil pencarian Chroma di backend)
  const backendCourses = agentState?.courses_catalog || [];

  // Map data backend ke format UI yang diharapkan PageResource
  const coursesData = backendCourses.map(course => {
    // Generate colorCode based on platform
    let colorCode = "bg-gradient-to-br from-blue-500 to-indigo-600";
    if (course.platform === "Udemy") {
      colorCode = "bg-gradient-to-br from-purple-500 to-pink-600";
    } else if (course.platform === "YouTube") {
      colorCode = "bg-gradient-to-br from-red-500 to-orange-600";
    } else if (course.platform === "Dicoding") {
      colorCode = "bg-gradient-to-br from-green-500 to-teal-600";
    }

    const skillsText = Array.isArray(course.skills_covered) ? course.skills_covered.join(", ") : "";

    return {
      id: course.id || Math.random().toString(),
      platform: course.platform || "Online",
      title: course.title || "Kursus Tanpa Judul",
      description: skillsText ? `Keahlian yang dipelajari: ${skillsText}` : "Tingkatkan keahlianmu dengan kursus terarah ini.",
      duration: `${course.duration_weeks || 4} minggu`,
      level: course.level ? (course.level.charAt(0).toUpperCase() + course.level.slice(1)) : "Semua Level",
      price: course.price || 0,
      colorCode,
      url: course.url || "#"
    };
  });

  const [searchQuery, setSearchQuery] = useState(initialTopic);

  const filteredCourses = coursesData.filter(c => {
    let matchCategory = false;
    if (activeCategory === "Semua") {
      matchCategory = true;
    } else if (activeCategory === "Rekomendasi") {
      matchCategory = true; // All courses here are recommendations
    } else if (activeCategory === "Gratis") {
      matchCategory = c.price === 0;
    } else {
      matchCategory = c.platform === activeCategory;
    }
    
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const navItems = [
    { key: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { key: 'career-path', icon: <TrendingUp className="w-4 h-4" />, label: 'Jalur Karier' },
    { key: 'resource', icon: <BookOpen className="w-4 h-4" />, label: 'Sumber Belajar', active: true },
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
            <p className="text-gray-800 font-bold text-[11px] leading-none mt-0.5">Sumber Belajar</p>
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
          <button onClick={() => onNavigate('resource')} className="w-full flex items-center gap-3 bg-[#e5f8ec] text-[#35a95b] px-4 py-3 rounded-xl font-bold text-sm transition-colors">
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
              <p className="text-[11px] font-bold text-gray-800">Panduan AI</p>
              <p className="text-[10px] text-[#35a95b]">Rekomendasi belajar</p>
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
            <div className="inline-flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full text-[#35a95b] text-[10px] font-bold tracking-widest uppercase mb-3 shadow-sm border border-white/50">
              <BookOpen className="w-3 h-3" /> Katalog Belajar
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Katalog Belajar</h1>
            <p className="text-gray-500 text-sm mt-1">Apa yang ingin kamu pelajari hari ini?</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
             <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-[#35a95b] text-xs font-bold shadow-sm border border-white/50 flex items-center gap-1.5">
               <Sparkles className="w-3.5 h-3.5" /> Pilihan dipersonalisasi
             </div>
             {searchQuery && (
               <div className="bg-[#fff9ea] text-[#d68f11] px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm border border-[#fde8af] flex items-center gap-2">
                 Filter: "{searchQuery}"
                 <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                    <span className="sr-only">Hapus Filter</span>
                    &times;
                 </button>
               </div>
             )}
          </div>
        </div>

        <div className="bg-[#fcfbfa] rounded-full p-1.5 shadow-sm border border-white/50 mb-6 flex overflow-x-auto gap-1">
           {categories.map((cat, idx) => (
             <button 
               key={idx}
               onClick={() => setActiveCategory(cat)}
               className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                 activeCategory === cat 
                 ? (cat === 'Rekomendasi' ? 'bg-[#8ccf32] text-white shadow-sm' : 'bg-white text-gray-800 shadow-sm border border-gray-100')
                 : 'text-gray-500 hover:bg-white/50'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-[#fcfbfa] rounded-[2rem] p-8 sm:p-12 shadow-sm border border-white/50 text-center relative z-10">
            <div className="w-16 h-16 bg-[#e5f8ec] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <BookOpen className="w-8 h-8 text-[#35a95b]" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Belum Ada Rekomendasi Belajar</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Unggah CV dan lakukan analisis target peran terlebih dahulu di Dashboard agar kami dapat merekomendasikan kursus terbaik dari katalog untukmu.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3fb067] to-[#8ccf32] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <ArrowRight className="w-4 h-4" /> Mulai Analisis di Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative z-10">
             {filteredCourses.map(course => (
               <div key={course.id} className="bg-[#fcfbfa] rounded-[2rem] overflow-hidden shadow-sm border border-white/50 flex flex-col hover:shadow-md transition-shadow group">
                  
                  <div className={`h-28 sm:h-32 ${course.colorCode} relative p-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                     <span className="bg-white/70 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm inline-block">
                       {course.platform}
                     </span>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col bg-white">
                     <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                       {course.title}
                     </h3>
                     <p className="text-gray-500 text-xs leading-relaxed mb-5 flex-1 line-clamp-3">
                       {course.description}
                     </p>
                     
                     <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 mb-4">
                       <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5" /> {course.duration}
                       </div>
                       <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[10px] font-bold">
                          {course.level}
                       </span>
                     </div>

                     <a 
                       href={course.url} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="w-full py-3 bg-gradient-to-r from-[#3fb067] to-[#8ccf32] hover:from-[#35a95b] hover:to-[#7dc325] text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 text-center font-bold"
                     >
                       Mulai Belajar <ArrowRight className="w-4 h-4" />
                     </a>
                  </div>
               </div>
             ))}
          </div>
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
