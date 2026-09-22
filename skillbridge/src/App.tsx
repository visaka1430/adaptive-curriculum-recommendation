import React, { useState } from 'react';
import { AppScreen, UserProfile, UserRole } from './types';
import { initialUser, sampleCredential, sampleProject, sampleCompetition } from './data/mockData';
import { TopScreenBar } from './components/Navigation/TopScreenBar';
import { AuthScreen } from './components/Auth/AuthScreen';
import { DashboardScreen } from './components/Dashboard/DashboardScreen';
import { EmptyStatesShowcase } from './components/EmptyStates/EmptyStatesShowcase';
import { CredentialModal } from './components/Modal/CredentialModal';
import { FloatingActionButton } from './components/Common/FloatingActionButton';
import { Toast } from './components/Common/Toast';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('desktop-auth');
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleLoginSuccess = (role: UserRole, email: string) => {
    setUser((prev) => ({
      ...prev,
      role,
      email,
      name: role === 'student' ? 'Alex Chen' : 'Dr. Helen Vance (Dean)',
    }));
    setCurrentScreen('dashboard');
  };

  const handleSwitchRole = () => {
    const nextRole: UserRole = user.role === 'student' ? 'institution' : 'student';
    setUser((prev) => ({
      ...prev,
      role: nextRole,
      name: nextRole === 'student' ? 'Alex Chen' : 'Dr. Helen Vance (Dean)',
      email: nextRole === 'student' ? 'alex.chen@university.edu' : 'dean.office@mit.edu',
    }));
    showToast(`Switched active persona to ${nextRole === 'student' ? 'Student (Alex Chen)' : 'Institutional Administrator'}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-body">
      {/* Universal Screen Switcher Navigation Bar */}
      <TopScreenBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          setCurrentScreen(screen);
          showToast(`Navigated to ${screen}`);
        }}
        onOpenModal={() => setIsCredentialModalOpen(true)}
      />

      {/* Screen Views */}
      <div className="flex-1">
        {currentScreen === 'desktop-auth' && (
          <AuthScreen
            mode="desktop"
            onLoginSuccess={handleLoginSuccess}
            onToast={showToast}
          />
        )}

        {currentScreen === 'mobile-auth' && (
          <AuthScreen
            mode="mobile"
            onLoginSuccess={handleLoginSuccess}
            onToast={showToast}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            user={user}
            onOpenCredentialModal={() => setIsCredentialModalOpen(true)}
            onNavigateToZeroData={() => setCurrentScreen('zero-data-showcase')}
            onToast={showToast}
            onSwitchRole={handleSwitchRole}
          />
        )}

        {currentScreen === 'zero-data-showcase' && (
          <EmptyStatesShowcase
            onToast={showToast}
            onOpenCredentialModal={() => setIsCredentialModalOpen(true)}
          />
        )}
      </div>

      {/* Centerpiece Modal: AWS Certified Solutions Architect – Associate */}
      <CredentialModal
        isOpen={isCredentialModalOpen}
        onClose={() => setIsCredentialModalOpen(false)}
        credential={sampleCredential}
        project={sampleProject}
        competition={sampleCompetition}
        onToast={showToast}
        onDeleteRecord={(id) => {
          showToast(`Record ${id} removed from demo view`);
        }}
      />

      {/* Floating Action Button for Quick Actions */}
      <FloatingActionButton
        onOpenModal={() => setIsCredentialModalOpen(true)}
        onOpenQuickSim={() => {
          setCurrentScreen('zero-data-showcase');
          showToast('Opened Zero-Data Showcase. Click "Test Add Action" to simulate adding items!');
        }}
        onNavigateShowcase={() => {
          setCurrentScreen('zero-data-showcase');
          showToast('Switched to Zero-Data Patterns Showcase');
        }}
      />

      {/* Global Interactive Feedback Toast */}
      <Toast message={toastMessage} visible={Boolean(toastMessage)} />
    </div>
  );
}

export default App;
