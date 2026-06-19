import React from 'react';
import { 
  Sprout, 
  Sparkles, 
  Briefcase, 
  Layers, 
  Bot, 
  Star, 
  TrendingUp, 
  Map 
} from 'lucide-react';

export default function PageLanding({ onNext }) {
  return (
    <div className="min-h-screen bg-[#d2f3db] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-[500px] bg-gradient-to-b from-[#e5f8ec] to-[#d7f5e1] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white/60 p-5 sm:p-6 md:p-8 relative">
        <div className="flex flex-col items-center gap-2 mb-5">
          <div className="flex items-center gap-3 w-full justify-start">
            <div className="w-10 h-10 bg-[#8ccf32] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-[#8ccf32] font-semibold tracking-[0.2em] text-[10px] uppercase">Matcha</h1>
              <h2 className="text-[#3fb067] font-bold text-sm sm:text-base">Platform Karier AI</h2>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 gap-2">
          <div className="bg-[#eaf9ee] px-3 sm:px-4 py-2 rounded-full text-[#45b76f] font-medium text-[10px] sm:text-[11px] shadow-sm border border-white flex-1 text-center truncate">
            Momentum karier, dibangun setiap hari
          </div>
          <div className="bg-[#eaf9ee] px-3 sm:px-4 py-2 rounded-full text-[#8ccf32] font-bold text-[10px] sm:text-[11px] flex items-center gap-1 shadow-sm border border-white flex-shrink-0">
            <Sparkles className="w-3 h-3" /> Onboarding Premium
          </div>
        </div>

        <div className="relative h-56 sm:h-72 mb-6 flex items-center justify-center w-full">
          <div className="absolute w-48 sm:w-56 h-48 sm:h-56 bg-white/70 rounded-full blur-2xl"></div>
          
          <div className="relative w-full max-w-[320px] h-full flex items-center justify-center">
             <button 
               onClick={onNext}
               className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#8ccf32] to-[#6fb324] rounded-[1.25rem] flex items-center justify-center shadow-[0_0_40px_rgba(140,207,50,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer group"
             >
               <Briefcase className="text-white w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform" />
               <span className="absolute w-full h-full rounded-[1.25rem] border-2 border-[#8ccf32] animate-ping opacity-60"></span>
             </button>

             <div className="absolute top-[10%] left-[10%] w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#68c946] to-[#aee449] rounded-2xl shadow-sm opacity-90"></div>
             
             <div className="absolute top-[15%] left-[25%] bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-semibold text-gray-400 flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-white/60 z-10">
                <Layers className="w-3 h-3 text-orange-300" /> Lapisan Skill
             </div>

             <div className="absolute top-[8%] right-[15%] bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-semibold text-gray-400 flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-white/60 z-10">
                <Bot className="w-3 h-3 text-[#79c368]" /> Mentor AI
             </div>

             <div className="absolute top-[30%] right-[5%] w-10 h-14 sm:w-12 sm:h-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50"></div>
             <div className="absolute top-[40%] left-[2%] w-10 h-12 sm:w-12 sm:h-14 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50"></div>
             <div className="absolute top-[60%] right-[10%] w-12 h-12 sm:w-14 sm:h-14 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50"></div>
             <div className="absolute bottom-[10%] left-[5%] w-12 h-14 sm:w-14 sm:h-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50"></div>
             <div className="absolute bottom-[20%] right-[15%] w-14 h-10 sm:w-16 sm:h-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50"></div>

             <div className="absolute bottom-[5%] right-[5%] w-12 h-12 sm:w-14 sm:h-14 bg-[#f8aa18] rounded-2xl shadow-sm opacity-90"></div>

             <div className="absolute bottom-[20%] left-[10%] bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-semibold text-[#44b46c] flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-white/60 z-10">
                <Star className="w-3 h-3 text-yellow-400" /> Rekomendasi Terbaik
             </div>

             <div className="absolute bottom-[5%] left-[30%] bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-semibold text-[#44b46c] flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-white/60 z-10">
                <TrendingUp className="w-3 h-3 text-[#79c368]" /> Jalur Pertumbuhan
             </div>

             <div className="absolute bottom-[15%] right-[20%] bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-semibold text-[#44b46c] flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-white/60 z-10">
                <Map className="w-3 h-3 text-[#79c368]" /> Peta Belajar
             </div>

          </div>
        </div>

        <div className="mt-2 bg-gradient-to-b from-white/40 to-white/20 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="max-w-[65%]">
              <p className="text-[#a4e0b8] font-semibold text-[10px] mb-1 uppercase tracking-wider">Susun Pencapaianmu</p>
              <h3 className="text-lg sm:text-[22px] font-bold text-[#35a95b] leading-[1.1] mb-1">
                Dari Pelajar Menuju Kandidat Unggulan
              </h3>
              <p className="text-[#64c982] text-sm font-semibold">APC-10</p>
            </div>
            
            <button className="bg-[#fbb117] hover:bg-[#e8a315] text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl shadow-lg transition-transform hover:scale-105 text-[10px] sm:text-xs text-center flex-shrink-0">
              +42% lebih cepat <br/> berkembang
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white/50 rounded-xl p-2 sm:p-3 border border-white/40 shadow-sm flex flex-col justify-between">
              <p className="text-[#59b876] text-[9px] sm:text-[10px] font-medium mb-1">Panduan AI</p>
              <p className="text-[#3fb067] font-bold text-lg sm:text-xl leading-none">24/7</p>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3 border border-white/40 shadow-sm flex flex-col justify-between">
              <p className="text-[#59b876] text-[9px] sm:text-[10px] font-medium mb-1">Jalur Karier</p>
              <p className="text-[#3fb067] font-bold text-lg sm:text-xl leading-none">120+</p>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3 border border-white/40 shadow-sm flex flex-col justify-between">
              <p className="text-[#59b876] text-[9px] sm:text-[10px] font-medium mb-1">Progres Mingguan</p>
              <p className="text-[#3fb067] font-bold text-lg sm:text-xl leading-none">Cerdas</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}