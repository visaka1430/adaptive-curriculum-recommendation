import React, { useState } from 'react';
import { UserRole } from '../../types';
import { SkillBridgeLogo } from '../Common/Illustrations';

interface AuthScreenProps {
  mode: 'desktop' | 'mobile';
  onLoginSuccess: (role: UserRole, email: string) => void;
  onToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  mode,
  onLoginSuccess,
  onToast,
}) => {
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('alex.chen@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [mobileFrame, setMobileFrame] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'student') {
      setEmail('alex.chen@university.edu');
    } else {
      setEmail('dean.office@mit.edu');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onToast(`Welcome, ${role === 'student' ? 'Alex Chen' : 'Campus Administrator'}!`);
      onLoginSuccess(role, email);
    }, 700);
  };

  const handleSSOLogin = (provider: string) => {
    setLoading(true);
    onToast(`Authenticating with ${provider}...`);
    setTimeout(() => {
      setLoading(false);
      onToast(`Authenticated via ${provider} SSO!`);
      onLoginSuccess(role, email);
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForgotModal(false);
    onToast(`Reset instructions sent to ${forgotEmail || email}`);
  };

  // Auth Card Inner content (shared between mobile and desktop right column)
  const renderAuthCard = () => (
    <div className="w-full max-w-[480px] bg-white rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-900/5 border border-slate-100/90 relative z-10 transition-all">
      {/* Top Accent Light */}
      <div className="absolute -top-10 right-10 w-36 h-36 rounded-full bg-[#FF6F61]/10 blur-2xl pointer-events-none"></div>

      {/* Brand Emblem & Header */}
      <div className="flex flex-col items-center text-center">
        {/* Node Arc Emblem */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
          <SkillBridgeLogo className="w-9 h-9" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6F61] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6F61]"></span>
          </span>
        </div>

        {/* Wordmark Title */}
        <div className="mt-3.5 flex items-center justify-center">
          <span className="font-headline font-bold text-2xl text-[#1E293B] tracking-tight">Skill</span>
          <span className="font-headline font-bold text-2xl text-[#FF6F61] tracking-tight ml-0.5">Bridge</span>
        </div>

        {/* Tagline */}
        <p className="mt-1 font-headline font-semibold text-xs tracking-widest text-slate-500 uppercase">
          beat the job market
        </p>
      </div>

      {/* Role Toggle Tabs: Student vs Institution */}
      <div className="relative mt-6 p-1 bg-slate-100 rounded-2xl flex items-center select-none">
        {/* Sliding Indicator */}
        <div
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#1E293B] rounded-xl shadow-md transition-transform duration-300 ease-out"
          style={{ transform: role === 'student' ? 'translateX(0%)' : 'translateX(100%)' }}
        ></div>

        {/* Tab: Student */}
        <button
          type="button"
          onClick={() => handleRoleChange('student')}
          className={`relative z-10 flex-1 py-2.5 text-center font-headline font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            role === 'student' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">school</span>
          Student
        </button>

        {/* Tab: Institution */}
        <button
          type="button"
          onClick={() => handleRoleChange('institution')}
          className={`relative z-10 flex-1 py-2.5 text-center font-headline font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            role === 'institution' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">domain</span>
          Institution
        </button>
      </div>

      {/* Login Form */}
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label className="font-headline font-medium text-xs text-slate-700" htmlFor="auth-email">
            {role === 'student' ? 'Student or Campus Email' : 'Institutional Administrator Email'}
          </label>
          <div className="relative flex items-center rounded-xl border border-slate-200 bg-slate-50 transition-all custom-ring">
            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
              alternate_email
            </span>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'student' ? 'alex.chen@university.edu' : 'dean.office@mit.edu'}
              className="w-full h-11 pl-11 pr-4 bg-transparent text-slate-900 rounded-xl text-sm placeholder:text-slate-400 border-0 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5">
          <label className="font-headline font-medium text-xs text-slate-700" htmlFor="auth-password">
            Password
          </label>
          <div className="relative flex items-center rounded-xl border border-slate-200 bg-slate-50 transition-all custom-ring">
            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
              lock
            </span>
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-11 pl-11 pr-11 bg-transparent text-slate-900 rounded-xl text-sm placeholder:text-slate-400 border-0 focus:ring-0 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs mt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#FF6F61] focus:ring-[#FF6F61]/20 accent-[#FF6F61] cursor-pointer"
            />
            <span className="text-slate-600 font-medium">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="font-semibold text-[#FF6F61] hover:text-[#FA5246] transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Primary CTA Button (Coral) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-2 bg-[#FF6F61] hover:bg-[#FA5246] text-white rounded-xl font-headline font-semibold text-sm shadow-md shadow-[#FF6F61]/25 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span className="tracking-wide">
                {role === 'student' ? 'Log In as Student' : 'Log In to Campus Console'}
              </span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-5 flex items-center justify-center">
        <div className="w-full h-px bg-slate-200"></div>
        <span className="absolute px-3 bg-white text-xs font-semibold uppercase tracking-wider text-slate-400">
          or continue with
        </span>
      </div>

      {/* Quick SSO Options */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSSOLogin('Stanford Campus SSO')}
          className="flex items-center justify-center gap-2 h-11 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-headline font-semibold text-slate-700 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[19px] text-[#1E293B]">account_balance</span>
          <span className="truncate">Campus SSO</span>
        </button>

        <button
          type="button"
          onClick={() => handleSSOLogin('Google Workspace')}
          className="flex items-center justify-center gap-2 h-11 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-headline font-semibold text-slate-700 transition-all active:scale-[0.99] cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span className="truncate">Google</span>
        </button>
      </div>

      {/* Create Account Prompt */}
      <div className="mt-5 text-center">
        <p className="text-xs text-slate-500 font-medium">
          New to SkillBridge?
          <button
            type="button"
            onClick={() => onToast('Registration portal requested. Select role above.')}
            className="font-headline font-semibold text-[#FF6F61] hover:text-[#FA5246] ml-1 transition-colors cursor-pointer"
          >
            Create account
          </button>
        </p>
      </div>

      {/* 256-bit Institutional Verification Badge */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-center">
        <span className="material-symbols-outlined text-slate-400 text-[18px]">verified_user</span>
        <span className="text-[11px] text-slate-500 font-medium tracking-tight">
          Institutional grade 256-bit credential verification
        </span>
      </div>
    </div>
  );

  // Forgot Password Modal
  const renderForgotModal = () => {
    if (!showForgotModal) return null;
    return (
      <div className="fixed inset-0 z-50 bg-[#1E293B]/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-headline font-bold text-lg text-slate-900">Reset Password</h3>
            <button
              onClick={() => setShowForgotModal(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Enter your university or campus administrator email to receive a secure recovery magic link.
          </p>
          <form onSubmit={handleForgotSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="alex.chen@university.edu"
              className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6F61]"
            />
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#FF6F61] hover:bg-[#FA5246] text-white text-xs font-semibold shadow-sm"
              >
                Send Magic Link
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Screen 1: Mobile Auth Screen
  if (mode === 'mobile') {
    return (
      <div className="min-h-screen bg-[#F7F9FB] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#FF6F61]/20">
        {renderForgotModal()}

        {/* Floating Toggle: View in Mobile Frame or Full Viewport */}
        <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-200 shadow-sm text-xs">
          <span className="text-slate-600 font-medium">Device Frame:</span>
          <button
            onClick={() => setMobileFrame(!mobileFrame)}
            className={`px-2 py-0.5 rounded-full font-semibold transition-colors ${
              mobileFrame ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {mobileFrame ? 'Framed 390px' : 'Fluid Full'}
          </button>
        </div>

        {/* Ambient Decorative Background Blobs matching Screen 1 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-slate-200/50 blur-3xl"></div>
          <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-[#FF6F61]/10 blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl"></div>
        </div>

        {/* Mobile Header Bar matching Screen 1 */}
        <div className="w-full px-6 flex items-center justify-between h-14 relative z-10 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#091426] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[18px]">hub</span>
            </div>
            <span className="font-headline font-bold text-lg text-[#091426] tracking-tight">SkillBridge</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EE6356] animate-pulse"></span>
            <span className="font-headline text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Institutional
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <main className={`relative z-10 flex-1 flex flex-col justify-center px-4 py-6 w-full mx-auto ${
          mobileFrame ? 'max-w-[420px] my-6 border-8 border-slate-800 rounded-[44px] shadow-2xl bg-white overflow-hidden' : 'max-w-md'
        }`}>
          <div className="w-full">
            {renderAuthCard()}
          </div>
        </main>

        {/* Mobile Footer matching Screen 1 */}
        <footer className="w-full px-6 py-4 flex flex-col items-center justify-center gap-2 relative z-10 text-xs text-slate-500">
          <p className="font-medium text-center">© SkillBridge Education Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <button onClick={() => onToast('Privacy Policy')} className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </button>
            <span className="text-slate-300">•</span>
            <button onClick={() => onToast('Terms of Service')} className="hover:text-slate-900 transition-colors">
              Terms of Service
            </button>
            <span className="text-slate-300">•</span>
            <button onClick={() => onToast('Contact Support')} className="hover:text-slate-900 transition-colors">
              Support
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // Screen 4: Desktop Auth & Landing Screen
  return (
    <div className="bg-[#F8FAFC] font-body text-slate-900 antialiased min-h-screen flex flex-col justify-between selection:bg-[#FF6F61]/20 selection:text-[#E8584A] relative overflow-x-hidden">
      {renderForgotModal()}

      {/* Ambient Decorative Background Blobs for Full Desktop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full bg-slate-200/50 blur-3xl"></div>
        <div className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-[#FF6F61]/10 blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-blue-100/40 blur-3xl"></div>
        {/* Grid overlay pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      {/* Desktop Header: 64px Height */}
      <header className="w-full h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-6 sm:px-12 flex items-center justify-between">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
          {/* Left: Logo & Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E293B] flex items-center justify-center shadow-sm shadow-slate-900/10">
              <SkillBridgeLogo className="w-6 h-6" inverted />
            </div>
            <div className="flex items-baseline font-headline font-bold text-2xl tracking-tight">
              <span className="text-[#1E293B]">Skill</span>
              <span className="text-[#FF6F61] ml-0.5">Bridge</span>
            </div>
          </div>

          {/* Center / Right: Institutional Status & Navigation Links */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-headline font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#FF6F61] animate-pulse"></span>
              <span>Institutional Portal 2.4</span>
            </div>
            <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <button
                onClick={() => onToast('Campus Partners: Stanford, MIT, Berkeley, Carnegie Mellon, and 450+ colleges')}
                className="text-slate-600 hover:text-[#1E293B] transition-colors hidden sm:inline-block cursor-pointer"
              >
                Campus Partners
              </button>
              <button
                onClick={() => onToast('Help Center: Connecting students to career services & registrars')}
                className="text-slate-600 hover:text-[#1E293B] transition-colors cursor-pointer"
              >
                Help Center
              </button>
              <button
                onClick={() => handleRoleChange(role === 'student' ? 'institution' : 'student')}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 text-[#1E293B] font-semibold text-xs tracking-wide transition-all cursor-pointer"
              >
                {role === 'student' ? 'Institutional Admin' : 'Switch to Student'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area: Spacious Desktop Layout */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Desktop Hero Presentation / Value Proposition */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm w-fit mb-6">
              <span className="material-symbols-outlined text-[18px] text-[#FF6F61]">auto_graph</span>
              <span className="font-headline text-xs font-semibold text-slate-700 tracking-wide uppercase">
                AI-Powered Career Pathway
              </span>
            </div>

            <h1 className="font-headline font-extrabold text-4xl xl:text-5xl text-[#1E293B] tracking-tight leading-[1.15]">
              Bridging Higher Education &amp; <span className="text-[#FF6F61]">Industry Success</span>.
            </h1>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-lg">
              Empowering university students to validate in-demand skills, connect directly with enterprise recruiters,
              and conquer the modern job market.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-3.5 max-w-md">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1E293B] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                </div>
                <div>
                  <p className="font-headline font-semibold text-sm text-[#1E293B]">University-Verified Credentials</p>
                  <p className="text-xs text-slate-500">
                    Seamless SSO validation with MIT, Stanford, UC, and 450+ campuses.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6F61] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">hub</span>
                </div>
                <div>
                  <p className="font-headline font-semibold text-sm text-[#1E293B]">Curriculum-to-Career Match</p>
                  <p className="text-xs text-slate-500">
                    Real-time skill gap analytics aligned directly to open hiring pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Student & Campus Trust Metric */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 flex items-center gap-6">
              <div>
                <span className="font-headline font-bold text-xl text-[#1E293B] tabular-nums">140,000+</span>
                <p className="text-xs text-slate-500">Active Students</p>
              </div>
              <div className="h-7 w-px bg-slate-200"></div>
              <div>
                <span className="font-headline font-bold text-xl text-[#1E293B] tabular-nums">94.8%</span>
                <p className="text-xs text-slate-500">Verified Placement Rate</p>
              </div>
              <div className="h-7 w-px bg-slate-200"></div>
              <div>
                <span className="font-headline font-bold text-xl text-[#1E293B] tabular-nums">450+</span>
                <p className="text-xs text-slate-500">Partner Institutions</p>
              </div>
            </div>
          </div>

          {/* Right Column: Centered Desktop Auth Card */}
          <div className="lg:col-span-6 flex justify-center w-full">
            {renderAuthCard()}
          </div>
        </div>
      </main>

      {/* Desktop Web Footer */}
      <footer className="w-full bg-white/70 border-t border-slate-200/80 px-6 sm:px-12 py-5 relative z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© 2025 SkillBridge Education Ecosystem. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => onToast('Privacy Policy')} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-slate-300">•</span>
            <button onClick={() => onToast('Terms of Service')} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span className="text-slate-300">•</span>
            <button onClick={() => onToast('Support desk online')} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Support
            </button>
            <span className="text-slate-300">•</span>
            <button onClick={() => onToast('FERPA & SOC2 Type II Certified')} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Security Compliance
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
