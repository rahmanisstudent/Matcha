const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/** Helper: Kirim request dengan JSON body */
async function request(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

/** Helper: Kirim request dengan FormData (untuk upload file) */
async function requestForm(endpoint, formData) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

// ENDPOINTS

/** 
 * POST /chat — Chat dengan AI
 * @param {Object} payload - Data chat (misal: { session_id: "...", message: "..." })
 */
export const sendChatMessage = (payload) =>
  request('/chat', { method: 'POST', body: JSON.stringify(payload) });

/** 
 * POST /upload — Upload dokumen
 * @param {FormData} formData - Data form berisi file dan info tambahan
 */
export const uploadDocument = (formData) =>
  requestForm('/upload', formData);

/** 
 * GET /preview/{session_id}/{file_type} — Preview dokumen
 * @param {string} sessionId - ID sesi user
 * @param {string} fileType - Jenis file (misal: 'cv' atau 'linkedin')
 */
export const previewDocument = (sessionId, fileType) =>
  request(`/preview/${sessionId}/${fileType}`);

/** 
 * POST /review-document — Review dokumen
 * @param {Object} payload - Data untuk review (misal: { session_id: "...", file_type: "..." })
 */
export const reviewDocument = (payload) =>
  request('/review-document', { method: 'POST', body: JSON.stringify(payload) });

/** 
 * POST /analyze-job — Analisis pekerjaan
 * @param {Object} payload - Data analisis pekerjaan (misal: { session_id: "...", job_description: "..." })
 */
export const analyzeJob = (payload) =>
  request('/analyze-job', { method: 'POST', body: JSON.stringify(payload) });

/** 
 * POST /delete-document — Hapus dokumen
 * @param {Object} payload - Data dokumen yang akan dihapus (misal: { session_id: "...", file_type: "..." })
 */
export const deleteDocument = (payload) =>
  request('/delete-document', { method: 'POST', body: JSON.stringify(payload) });

/** 
 * GET /session/{session_id} — Ambil data sesi
 * @param {string} sessionId - ID Sesi
 */
export const getSessionState = (sessionId) =>
  request(`/session/${sessionId}`);
