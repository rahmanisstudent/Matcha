<p align="center">
  <img src="https://raw.githubusercontent.com/rahmanisstudent/Matcha/main/frontend/public/logoMatchaa.png" alt="Matcha Logo" width="300"/>
</p>

# <p align="center">🍵 Matcha Career AI</p>

<div align="center">
  <p><strong>Asisten karir adaptif berbasis AI yang membantu kamu menemukan jalur karir yang tepat</strong></p>
  <p>Analisis skill gap, review CV & LinkedIn, dan buat learning roadmap dalam satu platform</p>
  
  <br />

  [![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
  [![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent-FF6B35?style=for-the-badge)](https://langchain-ai.github.io/langgraph/)
  [![Groq](https://img.shields.io/badge/Groq-LLM-F55036?style=for-the-badge)](https://groq.com)
</div>

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🧠 **Intent-Aware Chat** | AI memahami konteks percakapan & mendeteksi perubahan arah karir otomatis |
| 📊 **Skill Gap Analysis** | Analisis kesenjangan skill vs kebutuhan industri + ATS match rate (0–100) |
| 🗺️ **Learning Roadmap** | Peta jalan belajar personal dengan fase, durasi, dan rekomendasi kursus |
| 📄 **CV Reviewer** | Review CV mendalam: kelebihan, kekurangan, dan keyword ATS yang perlu ditambahkan |
| 💼 **LinkedIn Reviewer** | Optimasi profil LinkedIn: headline, about, skills untuk menarik recruiter |
| 🔍 **Job Description Match** | Paste JD → langsung dapat analisis kesesuaian & gap vs profil kamu |

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                                 │
│                  React 19 + Vite (Frontend)                         │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND (main.py)                        │
│   POST /chat  ·  POST /upload  ·  POST /analyze-job                 │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │               LANGGRAPH MULTI-AGENT PIPELINE                 │   │
│  │                                                              │   │
│  │  [01 Intent Classifier] ──► [02 User Profiler] ──► [Router] │   │
│  │       ▲ IndoBERT (local)                                     │   │
│  │       ▲ Groq LLM (fallback)              │                   │   │
│  │                                          ▼                   │   │
│  │              ┌───────────────────────────────┐               │   │
│  │              │   Conditional Branch (1/4):   │               │   │
│  │              │   • Skill Gap Analyzer        │               │   │
│  │              │   • CV Reviewer               │               │   │
│  │              │   • LinkedIn Reviewer         │               │   │
│  │              │   • General Responder         │               │   │
│  │              └───────────────────────────────┘               │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  In-Server Resources:                                               │
│  📁 ChromaDB (vector DB)  ·  🧠 IndoBERT Model  ·  🗄️ SQLite DB    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌─────────────┐  ┌────────────┐  ┌──────────────┐
   │  Groq API   │  │ Tavily API │  │ ATS ML Model │
   │ (LLM calls) │  │(web search)│  │  /predict    │
   └─────────────┘  └────────────┘  └──────────────┘
```

### Komponen AI

| Komponen | Teknologi | Fungsi |
|---|---|---|
| **Intent Classifier** | IndoBERT (fine-tuned) + Groq LLM | Klasifikasi 8 jenis intent dari pesan user |
| **User Profiler** | Groq LLM | Ekstrak & update profil karir dari percakapan |
| **Skill Gap Analyzer** | Groq LLM + ChromaDB + Tavily | Analisis gap, roadmap, ATS analysis |
| **ATS Match Rate** | Random Forest Regressor | Prediksi kesesuaian CV vs Job Description (0–100) |
| **CV / LinkedIn Reviewer** | Groq LLM | Review dokumen & saran optimasi |
| **Session Memory** | SQLite | Persistensi state percakapan antar request |

---

## 🚀 Cara Menjalankan (Lokal)

### Prasyarat

- Python 3.9+
- Node.js 18+
- API key: [Groq](https://console.groq.com) · [Tavily](https://tavily.com)

### 1. Clone & Setup Backend

```bash
git clone https://github.com/rahmanisstudent/Matcha.git
cd Matcha

# Buat virtual environment
python -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt
```

### 2. Konfigurasi Environment

Buat file `.env` di root project (lihat `.env.example`):

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
TAVILY_API_KEY=tvly-xxxxxxxxxxxxxxxxxxxx

# Opsional — jika ATS model di-deploy terpisah:
# ATS_MODEL_API_URL=https://your-ats-model.railway.app
```

### 3. Jalankan Backend

```bash
# Terminal 1 — FastAPI main server (port 8000)
python main.py

# Terminal 2 — ATS Model API (port 8080) [opsional, ada fallback lokal]
python ats_model_app/api.py
```

### 4. Jalankan Frontend

```bash
cd frontend
npm install
npm run dev
# Buka http://localhost:5173
```

---

## 📁 Struktur Proyek

```
matcha/
├── 📄 main.py                    # FastAPI entry point & semua endpoint
├── 📄 app.py                     # Versi alternatif app
│
├── 📂 agent/                     # Core AI system (LangGraph)
│   ├── graph.py                  # Definisi graph & routing logic
│   ├── nodes.py                  # Semua node agent (6 nodes)
│   ├── state.py                  # MatchaState TypedDict
│   ├── prompts.py                # Semua prompt template
│   ├── memory.py                 # SQLite session persistence
│   ├── chroma_client.py          # ChromaDB vector search
│   ├── tavily_search.py          # Tavily web search integration
│   └── indobert_intent_model/    # Fine-tuned IndoBERT model files
│       ├── model.safetensors
│       ├── config.json
│       └── tokenizer.json
│
├── 📂 ats_model_app/             # ATS Match Rate ML microservice
│   ├── api.py                    # FastAPI microservice (port 8080)
│   ├── model.py                  # Inference logic
│   ├── features.py               # Feature extraction (TF-IDF, dll)
│   ├── train.py                  # Training script Random Forest
│   ├── model.joblib              # Trained RF model
│   └── vectorizer.joblib         # Fitted TF-IDF vectorizer
│
├── 📂 frontend/                  # React + Vite app
│   └── src/
│       ├── pages/Dashboard.jsx   # Halaman utama
│       └── components/
│           ├── ChatPanel.jsx     # Panel chat interaktif
│           ├── Onboarding.jsx    # Flow onboarding user baru
│           ├── ProfilePanel.jsx  # Panel profil & status
│           └── Sidebar.jsx       # Navigasi sidebar
│
├── 📂 chroma_db/                 # ChromaDB vector database
├── 📂 data/                      # Data mentah (jobs, courses)
├── 📂 matcha-data/               # Dataset training & referensi
├── 📂 utils/                     # Utility functions
├── 📂 uploads/                   # File PDF yang di-upload user
│
├── 📄 ai_flow.html               # Diagram arsitektur AI (production)
└── 📄 ai_flow_detail.html        # Penjelasan alur AI end-to-end
```

---

## 🔄 Alur Kerja AI (End-to-End)

```
User kirim pesan
       │
       ▼
FastAPI load session lama dari SQLite
       │
       ▼
[Node 1] Intent Classifier
  ├─ IndoBERT (lokal, tanpa API call) → deteksi intent + confidence
  └─ Groq LLM (fallback jika IndoBERT gagal)
       │
       ▼
[Node 2] User Profiler
  ├─ Jika profil sudah ada → skip LLM (fast-path, hemat token)
  └─ Jika belum → Groq LLM ekstrak profil dari percakapan
       │
       ▼
[Router] route_after_profiler()
       │
   ┌───┴────────────────────────────────────┐
   │ Pilih 1 dari 4 berdasarkan intent:     │
   │                                        │
   ├─ CAREER / SKILL / RESOURCE             │
   │    → Skill Gap Analyzer (Node 3)       │
   │      • ChromaDB + Tavily (paralel)     │
   │      • Groq LLM → JSON roadmap        │
   │      • ATS ML Model → override score   │
   │                                        │
   ├─ CV_REVIEW → CV Reviewer (Node 4)      │
   │                                        │
   ├─ LINKEDIN_REVIEW → LinkedIn (Node 5)   │
   │                                        │
   └─ PUSH_BACK / CONFIRM / CONSTRAINT      │
        → General Responder (Node 6)        │
       └────────────────────────────────────┘
       │
       ▼
save_session() → SQLite
       │
       ▼
JSON response → React frontend render
```

> 📄 Lihat diagram visual interaktif: [`ai_flow.html`](https://github.com/rahmanisstudent/Matcha/blob/main/ai_flow.html) · [`ai_flow_detail.html`](https://github.com/rahmanisstudent/Matcha/blob/main/ai_flow_detail.html)

---

## 🤖 Intent yang Didukung

| Intent | Contoh Pesan | Node yang Dipanggil |
|---|---|---|
| `CAREER_EXPLORATION` | *"Saya mau jadi Data Scientist"* | Skill Gap Analyzer |
| `SKILL_INQUIRY` | *"Skill apa yang harus saya pelajari?"* | Skill Gap Analyzer |
| `RESOURCE_REQUEST` | *"Rekomendasiin kursus dong"* | Skill Gap Analyzer |
| `CV_REVIEW` | *"Bisa review CV saya?"* | CV Reviewer |
| `LINKEDIN_REVIEW` | *"Review LinkedIn saya"* | LinkedIn Reviewer |
| `CONSTRAINT_UPDATE` | *"Saya cuma bisa 5 jam seminggu"* | General Responder |
| `PUSH_BACK` | *"Roadmap itu terlalu susah"* | General Responder |
| `CONFIRMATION` | *"Oke, setuju"* | General Responder |

---

## 🛠️ Tech Stack

### Backend

- **[FastAPI](https://fastapi.tiangolo.com)** — REST API server
- **[LangGraph](https://langchain-ai.github.io/langgraph/)** — Multi-agent orchestration
- **[Groq](https://groq.com)** — LLM inference (llama-3.3-70b, qwen3-32b, llama-3.1-8b)
- **[HuggingFace Transformers](https://huggingface.co)** — IndoBERT fine-tuning & inference
- **[ChromaDB](https://trychroma.com)** — Vector database untuk skills, jobs, courses
- **[Tavily](https://tavily.com)** — Real-time web search API
- **[scikit-learn](https://scikit-learn.org)** — Random Forest Regressor (ATS model)
- **[PyMuPDF](https://pymupdf.readthedocs.io)** — Ekstraksi teks dari PDF
- **SQLite** — Session persistence

### Frontend

- **[React 19](https://react.dev)** — UI framework
- **[Vite 8](https://vitejs.dev)** — Build tool & dev server
- **[TailwindCSS 4](https://tailwindcss.com)** — Styling
- **[Axios](https://axios-http.com)** — HTTP client
- **[Lucide React](https://lucide.dev)** — Icon library

---

## 🌐 Deployment

Set environment variables berikut di server backend:

```env
GROQ_API_KEY=...
TAVILY_API_KEY=...

# Jika ATS model di-deploy sebagai microservice terpisah:
ATS_MODEL_API_URL=https://your-ats-service.railway.app
```

**Rekomendasi stack deployment:**

| Layanan | Platform |
|---|---|
| Frontend | Vercel / Netlify |
| Backend (main.py) | Railway / Render / VPS |
| ATS Model API (opsional) | Railway / Render (server terpisah) |

> ⚠️ **Catatan:** `IndoBERT` (~500MB) dan `ChromaDB` di-bundle langsung ke server backend. Pastikan server memiliki RAM ≥ 2GB.

---

## 📜 Lisensi

MIT License — bebas digunakan dan dimodifikasi.

---

<p align="center">Dibuat dengan 🍵 dan semangat belajar</p>
