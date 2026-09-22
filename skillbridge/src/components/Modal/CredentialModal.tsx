import React, { useState } from 'react';
import { CredentialRecord, ProjectRecord, CompetitionRecord } from '../../types';

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  credential?: CredentialRecord;
  project?: ProjectRecord;
  competition?: CompetitionRecord;
  onToast: (msg: string) => void;
  onDeleteRecord?: (id: string) => void;
}

export const CredentialModal: React.FC<CredentialModalProps> = ({
  isOpen,
  onClose,
  credential,
  project,
  competition,
  onToast,
  onDeleteRecord,
}) => {
  const [activeTab, setActiveTab] = useState<'cert' | 'proj' | 'comp'>('cert');
  const [verifiedState, setVerifiedState] = useState<'Verified' | 'Pending Institutional Verification'>('Verified');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showCertDialog, setShowCertDialog] = useState(false);
  const [showBlockchainDialog, setShowBlockchainDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  if (!isOpen) return null;

  const currentCred = credential || {
    id: 'AWS-889104-X992',
    title: 'AWS Certified Solutions Architect – Associate',
    subtitle: 'AWS Training & Certification',
    badgeId: 'ID: #AWS-889104',
    issuer: 'Amazon Web Services & Stanford Cloud Academy',
    issuedDate: 'Oct 14, 2024',
    expiryDate: 'Oct 2027',
    status: 'Verified' as const,
    institutionalSignOff: "Active Dean's Ledger",
    description:
      'Validation of comprehensive distributed systems design, high-availability VPC architecture, automated auto-scaling pipelines, and multi-region data resilience standards tested against real-time disaster-recovery simulations.',
    skills: ['Cloud Architecture', 'Distributed Systems', 'AWS Lambda', 'DynamoDB', 'Terraform', 'Security & IAM'],
    artifactName: 'aws_solutions_architect_certificate_alexchen.pdf',
    artifactSize: '1.4 MB',
    artifactHash: 'SHA-256: 8f4a2b9c7d1e0f3a5b6c8d7e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8',
    blockchainTx: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
    category: 'certificate' as const,
  };

  const handleCopyId = () => {
    navigator.clipboard?.writeText(currentCred.id);
    setCopied(true);
    onToast(`Credential ID ${currentCred.id} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    onToast('Compiling verified PDF with cryptographic stamp...');
    setTimeout(() => {
      setDownloading(false);
      onToast('Download Complete: aws_solutions_architect_certificate_alexchen.pdf');
    }, 1200);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onToast('Public verification link copied to clipboard!');
  };

  const toggleVerificationStatus = () => {
    if (verifiedState === 'Verified') {
      setVerifiedState('Pending Institutional Verification');
      onToast('Record status toggled: Pending Institutional Verification');
    } else {
      setVerifiedState('Verified');
      onToast('Record status confirmed: Verified by Stanford Registrar');
    }
  };

  const getModalTitle = () => {
    if (activeTab === 'cert') return currentCred.title;
    if (activeTab === 'proj') return project?.title || 'Autonomous Agent Pipeline';
    return competition?.title || 'MIT Global Hackathon 2024';
  };

  const getBreadcrumb = () => {
    if (activeTab === 'cert') return 'CREDENTIAL & VERIFIED RECORD';
    if (activeTab === 'proj') return 'CAPSTONE & RESEARCH PROJECT';
    return 'COMPETITION & HONORS RECORD';
  };

  return (
    <>
      {/* Modal Backdrop Overlay */}
      <div
        className="fixed inset-0 z-50 bg-[#1E293B]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Modal Container */}
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-[640px] my-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200/90"
        >
          {/* Top Accent Bar (Brand Coral) */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#EE6356] via-[#EE6356]/80 to-[#d0e1fb]"></div>

          {/* Modal Header */}
          <div className="px-6 pt-5 pb-2 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-headline text-[11px] font-semibold text-slate-500 tracking-widest uppercase">
                  {getBreadcrumb()}
                </span>
                <span className="text-slate-300 font-headline text-xs">•</span>
                <span className="font-headline text-xs text-[#EE6356] font-semibold">Academic Portfolio</span>
              </div>

              <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                <h2 className="font-headline font-bold text-xl text-[#091426] tracking-tight truncate max-w-md">
                  {getModalTitle()}
                </h2>

                {/* Status chip (interactive toggle) */}
                <button
                  type="button"
                  onClick={toggleVerificationStatus}
                  title="Click to toggle demonstration verification status"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 font-headline text-xs text-[#091426] font-medium transition-colors cursor-pointer"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      verifiedState === 'Verified' ? 'bg-emerald-500' : 'bg-[#EE6356] animate-pulse'
                    }`}
                  ></span>
                  <span>{verifiedState}</span>
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-[#FFF1F0] text-slate-500 hover:text-[#EE6356] flex items-center justify-center transition-all duration-200 hover:rotate-90 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Segmented Context Switcher Tabs */}
          <div className="px-6 pt-2 pb-2">
            <div className="flex p-1 bg-slate-100 rounded-xl gap-1" role="tablist">
              <button
                type="button"
                onClick={() => setActiveTab('cert')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-headline font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'cert'
                    ? 'bg-white text-[#091426] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="truncate">Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('proj')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-headline font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'proj'
                    ? 'bg-white text-[#091426] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                <span className="truncate">Project View</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('comp')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-headline font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'comp'
                    ? 'bg-white text-[#091426] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">military_tech</span>
                <span className="truncate">Competition</span>
              </button>
            </div>
          </div>

          {/* Scrollable Modal Body */}
          <div className="px-6 py-2 overflow-y-auto space-y-4 flex-1 text-slate-800">
            {/* TAB 1: CERTIFICATE VIEW */}
            {activeTab === 'cert' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Rich Preview Card Banner */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#091426] via-[#1E293B] to-[#505F76] p-4 text-white shadow-sm">
                  <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[180px]">cloud_done</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[28px]">cloud</span>
                      </div>
                      <div>
                        <span className="font-headline text-[11px] text-slate-300 block uppercase tracking-wider">
                          AWS Training &amp; Certification
                        </span>
                        <h3 className="font-headline font-bold text-lg text-white leading-tight">
                          Solutions Architect Associate
                        </h3>
                      </div>
                    </div>

                    <div className="px-2.5 py-1 rounded bg-[#EE6356]/20 text-[#ffdad5] font-headline text-xs flex items-center gap-1 backdrop-blur-sm border border-[#EE6356]/30">
                      <span className="material-symbols-outlined text-[15px]">security</span>
                      <span>ID: #AWS-889104</span>
                    </div>
                  </div>

                  {/* Banner Meta Strip */}
                  <div className="mt-3.5 pt-2.5 bg-[#1E293B]/60 rounded-lg p-2.5 flex items-center justify-between text-xs relative z-10 flex-wrap gap-2 border border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <span className="material-symbols-outlined text-[16px] text-emerald-400">verified_user</span>
                      <span>Verified Ledger Stamp</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowCertDialog(true)}
                        className="font-headline text-xs text-white hover:text-[#ffdad5] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Original Cert</span>
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </button>
                      <span className="text-white/30">|</span>
                      <button
                        onClick={() => setShowBlockchainDialog(true)}
                        className="font-headline text-xs text-[#ffdad5] hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <span>Blockchain Ledger</span>
                        <span className="material-symbols-outlined text-[14px]">link</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Structured Meta Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 space-y-0.5 border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                      Issuing Authority
                    </span>
                    <span className="font-headline font-semibold text-xs text-[#091426] block truncate">
                      Amazon Web Services &amp; Stanford Cloud Academy
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 space-y-0.5 border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                      Validity Timeline
                    </span>
                    <span className="font-headline font-semibold text-xs text-[#091426] block truncate">
                      Oct 14, 2024 • Exp. Oct 2027
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-100">
                    <div>
                      <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                        Credential ID
                      </span>
                      <span className="font-mono text-xs text-[#091426] font-semibold block">{currentCred.id}</span>
                    </div>
                    <button
                      onClick={handleCopyId}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Copy Credential ID"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          copied ? 'text-emerald-600' : ''
                        }`}
                      >
                        {copied ? 'done' : 'content_copy'}
                      </span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 space-y-0.5 border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                      Institutional Sign-Off
                    </span>
                    <span className="font-headline font-semibold text-xs text-emerald-600 flex items-center gap-1 truncate">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Active Dean's Ledger
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="space-y-1">
                  <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                    Description &amp; Scope
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    Validation of comprehensive distributed systems design, high-availability VPC architecture,
                    automated auto-scaling pipelines, and multi-region data resilience standards tested against real-time
                    disaster-recovery simulations.
                  </p>
                </div>

                {/* Demonstrated Competencies */}
                <div className="space-y-1.5">
                  <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                    Demonstrated Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCred.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-[#FFF1F0] text-[#EE6356] border border-[#EE6356]/20 font-headline font-medium text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attached Files / Assets */}
                <div className="space-y-1.5">
                  <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                    Attached Verified Artifact
                  </span>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#EE6356]/10 text-[#EE6356] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                      </div>
                      <div className="truncate">
                        <span className="font-headline font-semibold text-xs text-[#091426] block truncate">
                          {currentCred.artifactName}
                        </span>
                        <span className="text-[11px] text-slate-500 block">1.4 MB • SHA-256 Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setShowCertDialog(true)}
                        className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-headline text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Preview
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Download verified PDF"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PROJECT VIEW */}
            {activeTab === 'proj' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1E293B] to-[#091426] p-4 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-headline text-[11px] text-[#ffdad5] block uppercase tracking-wider">
                        Stanford AI Lab Capstone
                      </span>
                      <h3 className="font-headline font-bold text-lg text-white">Autonomous Agent Pipeline</h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-sm">
                        Multi-modal agent orchestration with self-correcting vector feedback loop.
                      </p>
                    </div>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur text-white font-headline text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">code</span>
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 block uppercase">Duration</span>
                    <span className="font-headline font-bold text-base text-[#091426]">4 Months</span>
                    <span className="text-[11px] text-slate-500 block">Winter/Spring '24</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 block uppercase">Team Size</span>
                    <span className="font-headline font-bold text-base text-[#091426]">3 Engineers</span>
                    <span className="text-[11px] text-slate-500 block">Lead Architect</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 block uppercase">Benchmark</span>
                    <span className="font-headline font-bold text-base text-[#EE6356] tabular-nums">98.4%</span>
                    <span className="text-[11px] text-slate-500 block">Pass@1 Accuracy</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                    Tech Stack &amp; Architecture
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'LangChain', 'Qdrant Vector DB', 'Ray Distributed', 'Docker'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-[#FFF1F0] text-[#EE6356] font-headline text-xs border border-[#EE6356]/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 space-y-1 border border-slate-100 text-xs text-slate-700">
                  <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                    Executive Deliverable
                  </span>
                  <p>
                    Built a production-ready asynchronous event loop processing 2,400 query vectors per second with
                    self-healing fallback prompts, decreasing hallucinations across evaluation benchmarks by 42%.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: COMPETITION VIEW */}
            {activeTab === 'comp' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-[#1E293B] p-4 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-headline text-[11px] text-amber-200 block uppercase tracking-wider">
                        MIT Global Hackathon 2024
                      </span>
                      <h3 className="font-headline font-bold text-lg text-white">
                        1st Place — Autonomous Agents Track
                      </h3>
                      <p className="text-xs text-amber-100 mt-1">
                        Selected from 240+ international university teams in Cambridge, MA.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[24px]">emoji_events</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                      Awarding Body
                    </span>
                    <span className="font-headline font-semibold text-xs text-[#091426] block">
                      MIT Computer Science &amp; AI Laboratory
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">Role</span>
                    <span className="font-headline font-semibold text-xs text-[#091426] block">
                      Full-Stack Lead &amp; System Architect
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 space-y-1 border border-slate-100">
                  <span className="font-headline text-[11px] text-slate-500 uppercase tracking-wider block">
                    Project Pitch Abstract
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Engineered a zero-latency fault recovery protocol allowing distributed agent swarms to rebuild
                    context after node crashes within 240ms.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="px-6 py-3.5 bg-white flex items-center justify-between border-t border-slate-200 flex-wrap gap-2.5">
            {/* Left Auxiliary Actions */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (onDeleteRecord) onDeleteRecord(currentCred.id);
                  onToast('Record removed from academic portfolio view');
                  onClose();
                }}
                className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-headline font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Delete record from portfolio"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                <span className="hidden sm:inline">Delete</span>
              </button>

              <button
                type="button"
                onClick={() => setShowEditDialog(true)}
                className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-headline font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span className="hidden sm:inline">Edit Record</span>
              </button>
            </div>

            {/* Right Primary Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#091426] font-headline font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>Share</span>
              </button>

              {/* Coral Primary CTA */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="px-4 py-2 rounded-xl bg-[#EE6356] hover:bg-[#FA5246] text-white font-headline font-semibold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-75"
              >
                {downloading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Download Verified PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Dialog: View Original Certificate */}
      {showCertDialog && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#EE6356]">verified</span>
                <h3 className="font-headline font-bold text-base text-slate-900">Original Verified Certificate</h3>
              </div>
              <button
                onClick={() => setShowCertDialog(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Certificate Replica */}
            <div className="border-4 border-double border-slate-300 p-6 rounded-xl bg-[#FCFDFD] text-center space-y-3 relative shadow-inner">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-headline font-bold">
                Stanford University &amp; AWS Academy Credentials
              </div>
              <h4 className="font-headline font-extrabold text-xl text-[#091426]">Certificate of Achievement</h4>
              <p className="text-xs text-slate-500">This certifies that</p>
              <p className="font-headline font-bold text-lg text-[#EE6356]">Alex Chen</p>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                has successfully completed all rigorous examination milestones for AWS Certified Solutions Architect –
                Associate with distinction.
              </p>
              <div className="pt-3 flex items-center justify-between border-t border-slate-200 text-[10px] text-slate-500">
                <span>Oct 14, 2024</span>
                <span className="font-mono">ID: AWS-889104-X992</span>
                <span>Dean's Ledger Sealed</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowCertDialog(false)}
                className="px-4 py-2 bg-[#091426] text-white rounded-xl text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Dialog: Blockchain Ledger Proof */}
      {showBlockchainDialog && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#091426] text-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-emerald-400">link</span>
                <h3 className="font-headline font-bold text-base text-white">Cryptographic Ledger Proof</h3>
              </div>
              <button
                onClick={() => setShowBlockchainDialog(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-[#1E293B] p-3 rounded-xl border border-slate-700 space-y-1">
                <span className="text-slate-400 text-[10px] block uppercase">Network Protocol</span>
                <span className="text-emerald-400 font-bold">Ethereum Sepolia / Stanford Trust Anchor</span>
              </div>

              <div className="bg-[#1E293B] p-3 rounded-xl border border-slate-700 space-y-1">
                <span className="text-slate-400 text-[10px] block uppercase">Transaction Hash</span>
                <span className="text-slate-200 break-all select-all">{currentCred.blockchainTx}</span>
              </div>

              <div className="bg-[#1E293B] p-3 rounded-xl border border-slate-700 space-y-1">
                <span className="text-slate-400 text-[10px] block uppercase">Merkle Root &amp; SHA-256 Digest</span>
                <span className="text-slate-300 break-all select-all">{currentCred.artifactHash}</span>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Status: Block #20819441 • 14,290 confirmations • Zero-knowledge proof verified.
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowBlockchainDialog(false)}
                className="px-4 py-2 bg-[#EE6356] hover:bg-[#FA5246] text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Dialog: Edit Record */}
      {showEditDialog && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline font-bold text-base text-slate-900">Edit Portfolio Record</h3>
              <button
                onClick={() => setShowEditDialog(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-headline font-semibold text-slate-700 block mb-1">Record Title</label>
                <input
                  defaultValue={currentCred.title}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#EE6356]"
                />
              </div>

              <div>
                <label className="font-headline font-semibold text-slate-700 block mb-1">Issuing Authority</label>
                <input
                  defaultValue={currentCred.issuer}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#EE6356]"
                />
              </div>

              <div>
                <label className="font-headline font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  defaultValue={currentCred.description}
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#EE6356]"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setShowEditDialog(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  onToast('Record updated successfully!');
                }}
                className="px-4 py-2 bg-[#EE6356] hover:bg-[#FA5246] text-white rounded-xl font-semibold text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
