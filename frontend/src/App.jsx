import React, { useState } from 'react';
import PageLanding from './page/PageLanding';
import PageLogin from './page/PageLogin';
import PageDashboard from './page/PageDashboard';
import PageCareerPath from './page/PageCareerPath';
import PageResource from './page/PageResource';
import PageDocument from './page/PageDocument';
import PageSetting from './page/PageSetting';
import { getSessionState } from './services/api';

function generateSessionId() {
  return Math.random().toString(36).substring(2, 10);
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedTopic, setSelectedTopic] = useState('');
  
  // Load user synchronously from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('matcha_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Shared state: session dan data hasil analisis dari backend
  const [sessionId, setSessionId] = useState(() => {
    const saved = localStorage.getItem('matcha_session_id');
    if (saved) return saved;
    const id = generateSessionId();
    localStorage.setItem('matcha_session_id', id);
    return id;
  });

  const [agentState, setAgentState] = useState(() => {
    const saved = localStorage.getItem('matcha_agent_state');
    let stateObj = {};
    if (saved) {
      try { stateObj = JSON.parse(saved); } catch { /* ignore */ }
    }
    
    // Ensure agentState has user_profile sync'd with the current user
    const savedUser = localStorage.getItem('matcha_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        stateObj.user_profile = {
          ...(stateObj.user_profile || {}),
          user_name: u.name || '',
          target_role: u.goal || '',
          hours_per_week: u.studyTime || '',
          educational_background: u.education || ''
        };
      } catch { /* ignore */ }
    }
    return stateObj;
  });

  // Persist agentState ke localStorage agar tidak hilang saat refresh
  const updateAgentState = (newState) => {
    setAgentState(newState);
    localStorage.setItem('matcha_agent_state', JSON.stringify(newState));
  };

  React.useEffect(() => {
    if (!sessionId) return;

    const syncSession = async () => {
      try {
        const result = await getSessionState(sessionId);
        if (result.agent_state && Object.keys(result.agent_state).length > 0) {
          setAgentState(prev => {
            const merged = { ...prev, ...result.agent_state };
            localStorage.setItem('matcha_agent_state', JSON.stringify(merged));
            return merged;
          });
        }
      } catch (error) {
        console.error("Gagal sinkronisasi sesi dari backend:", error);
      }
    };

    syncSession();
  }, [sessionId]);

  const handleUpdateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('matcha_user', JSON.stringify(updatedUser));

    // Sinkronkan ke agentState.user_profile
    const updatedAgentState = {
      ...agentState,
      user_profile: {
        ...(agentState.user_profile || {}),
        user_name: updatedUser.name || '',
        target_role: updatedUser.goal || '',
        hours_per_week: updatedUser.studyTime || '',
        educational_background: updatedUser.education || ''
      }
    };
    updateAgentState(updatedAgentState);
  };

  const handleNavigate = (page, topic = '') => {
    setSelectedTopic(topic);
    setCurrentPage(page);
  };

  const handleLoginSubmit = (userData) => {
    setUser(userData);
    localStorage.setItem('matcha_user', JSON.stringify(userData));

    // Sinkronkan ke agentState.user_profile saat login
    const updatedAgentState = {
      ...agentState,
      user_profile: {
        ...(agentState.user_profile || {}),
        user_name: userData.name || '',
        target_role: userData.goal || '',
        hours_per_week: userData.studyTime || '',
        educational_background: userData.education || ''
      }
    };
    updateAgentState(updatedAgentState);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('matcha_user');
    localStorage.removeItem('matcha_agent_state');
    localStorage.removeItem('matcha_session_id');
    setAgentState({});
    const newId = generateSessionId();
    localStorage.setItem('matcha_session_id', newId);
    setSessionId(newId);
    setCurrentPage('landing');
  };

  const renderProtectedRoute = (Component, props) => {
    if (!user) {
      return <PageLogin onNext={handleLoginSubmit} />;
    }
    return <Component {...props} user={user} />;
  };

  // Shared props untuk halaman yang membutuhkan data backend
  const sharedProps = {
    onNavigate: handleNavigate,
    onLogout: handleLogout,
    sessionId,
    agentState,
    setAgentState: updateAgentState,
    onUpdateUser: handleUpdateUser,
  };

  switch (currentPage) {
    case 'landing':
      return <PageLanding onNext={() => setCurrentPage('login')} />;
    case 'login':
      return <PageLogin onNext={handleLoginSubmit} />;
    case 'dashboard':
      return renderProtectedRoute(PageDashboard, sharedProps);
    case 'career-path':
      return renderProtectedRoute(PageCareerPath, sharedProps);
    case 'resource':
      return renderProtectedRoute(PageResource, { ...sharedProps, initialTopic: selectedTopic });
    case 'document':
      return renderProtectedRoute(PageDocument, sharedProps);
    case 'setting':
      return renderProtectedRoute(PageSetting, sharedProps);
    default:
      return <PageLanding onNext={() => setCurrentPage('login')} />;
  }
}