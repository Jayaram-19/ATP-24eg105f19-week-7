// src/styles/common.js
// Theme: Deep Dark Glassmorphism — rich gradients, backdrop blurs, vibrant fuchsia/violet accents
// Highly premium, dynamic UI with smooth hover animations

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] selection:bg-fuchsia-500/30 text-slate-200";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16 relative z-10";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-3xl p-7 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/[0.15] transition-all duration-300 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 tracking-tight mb-2 drop-shadow-sm";
export const headingClass = "text-2xl md:text-3xl font-bold tracking-tight text-white";
export const subHeadingClass = "text-lg md:text-xl font-semibold text-white tracking-tight";
export const bodyText = "text-slate-300 leading-relaxed font-light";
export const mutedText = "text-sm text-slate-400 font-light";
export const linkClass = "text-fuchsia-400 hover:text-fuchsia-300 transition-colors font-medium hover:underline decoration-fuchsia-400/30 underline-offset-4";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer text-sm tracking-wide border border-white/10";
export const secondaryBtn =
  "bg-white/5 border border-white/10 text-white font-medium px-6 py-2.5 rounded-full hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 cursor-pointer text-sm tracking-wide backdrop-blur-md";
export const ghostBtn = "text-fuchsia-400 font-medium hover:text-fuchsia-300 transition-colors cursor-pointer text-sm active:scale-95 flex items-center gap-1";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl p-10 max-w-4xl mx-auto relative overflow-hidden";
export const formTitle = "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight text-center mb-8";
export const labelClass = "text-[0.8rem] uppercase tracking-wider font-semibold text-slate-400 mb-2 block ml-1";
export const inputClass =
  "w-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-5 py-3.5 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-4 focus:ring-fuchsia-500/10 transition-all duration-300";
export const formGroup = "mb-6 relative";
export const submitBtn =
  "w-full bg-gradient-to-r from-violet-600 hover:from-violet-500 to-fuchsia-600 hover:to-fuchsia-500 text-white font-bold tracking-wide py-3.5 rounded-2xl shadow-[0_4px_14px_0_rgba(192,38,211,0.39)] hover:shadow-[0_6px_20px_rgba(192,38,211,0.5)] active:scale-[0.98] transition-all duration-300 mt-4";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-slate-950/70 backdrop-blur-2xl border-b border-white/5 h-[64px] flex items-center sticky top-0 z-50 shadow-sm";
export const navContainerClass = "max-w-5xl mx-auto w-full flex items-center justify-between px-6";
export const navBrandClass = "text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight";
export const navLinksClass = "flex items-center gap-8";
export const navLinkClass = "text-[0.85rem] text-slate-400 hover:text-white transition-colors font-medium tracking-wide";
export const navLinkActiveClass = "text-[0.85rem] text-fuchsia-400 font-bold tracking-wide drop-shadow-[0_0_10px_rgba(192,38,211,0.3)]";

// ─── Article / Blog Grid ─────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10";
export const articleCardClass = cardClass + " flex flex-col gap-3 group";
export const articleTitle = "text-xl font-bold text-white leading-snug tracking-tight group-hover:text-fuchsia-400 transition-colors";
export const articleExcerpt = "text-sm text-slate-400 leading-relaxed font-light mt-1";
export const articleMeta = "text-[0.7rem] uppercase tracking-widest text-violet-400 font-semibold mb-1";
export const articleBody = "text-slate-300 leading-loose text-[1rem] max-w-2xl font-light";
export const timestampClass = "text-xs text-slate-500 flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-bold text-white bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full uppercase tracking-wider w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-4xl mx-auto px-6 py-14 relative z-10 bg-slate-950 min-h-screen text-slate-200";

export const articleHeader = "mb-12 flex flex-col gap-5";

export const articleCategory = "text-[0.75rem] font-bold uppercase tracking-widest text-fuchsia-400 w-fit drop-shadow-[0_0_8px_rgba(192,38,211,0.4)]";

export const articleMainTitle = "text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 leading-[1.1] tracking-tight";

export const articleAuthorRow =
  "flex items-center justify-between border-y border-white/10 py-5 text-sm text-slate-400 mt-4";

export const authorInfo = "flex items-center gap-3 font-medium text-white";

export const articleContent = "text-slate-300 leading-loose text-[1.1rem] whitespace-pre-line mt-10 font-light [&>p]:mb-6";

export const articleFooter = "border-t border-white/10 mt-16 pt-8 text-sm text-slate-500 italic";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-4 mt-8";

export const editBtn = primaryBtn;

export const deleteBtn = "bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold px-6 py-2.5 rounded-full hover:bg-rose-500 hover:text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-95 transition-all duration-300 text-sm";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-4 right-4 text-[0.65rem] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 backdrop-blur-md";

export const articleStatusDeleted =
  "absolute top-4 right-4 text-[0.65rem] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 backdrop-blur-md";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl px-5 py-4 text-sm font-medium backdrop-blur-md flex items-center justify-center text-center shadow-lg";
export const successClass =
  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl px-5 py-4 text-sm font-medium backdrop-blur-md flex items-center shadow-lg";
export const loadingClass = "text-fuchsia-400 text-sm font-medium animate-pulse text-center py-12 flex flex-col items-center gap-3";
export const emptyStateClass = "text-center text-slate-500 font-light py-20 text-lg flex flex-col items-center bg-white/[0.02] border border-white/5 rounded-3xl border-dashed";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper = "mt-16 flex flex-col gap-6";

export const commentCard = "bg-white/[0.02] border border-white-[0.05] rounded-3xl p-6 hover:bg-white/[0.04] transition-all duration-300";

export const commentHeader = "flex items-center justify-between mb-3";

export const commentUser = "text-sm font-bold text-white tracking-wide";

export const commentTime = "text-xs text-slate-500 font-medium";

export const commentText = "text-slate-300 text-sm leading-loose mt-2 font-light";

export const avatar =
  "w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center text-sm font-bold shadow-md";

export const commentUserRow = "flex items-center gap-4";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-white/10 my-10";