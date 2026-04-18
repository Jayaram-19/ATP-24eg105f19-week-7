// src/styles/common.js
// Theme: Neon Glassmorphism — Dark gradient backgrounds, frosted glass cards, vibrant accents

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-gradient-to-br from-slate-950 via-[#0a0f25] to-slate-900 min-h-screen text-slate-200 selection:bg-fuchsia-500/30";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14 relative z-10";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-2xl hover:-translate-y-1 hover:shadow-indigo-500/20 hover:border-white/20 transition-all duration-300 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight leading-tight mb-4";
export const headingClass = "text-2xl font-bold text-white tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-slate-100 tracking-tight";
export const bodyText = "text-slate-300 leading-relaxed font-light";
export const mutedText = "text-sm text-slate-400 font-light";
export const linkClass = "text-fuchsia-400 hover:text-fuchsia-300 hover:underline underline-offset-4 transition-all duration-200";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer text-sm tracking-wide";
export const secondaryBtn =
  "bg-white/5 backdrop-blur-md border border-white/20 text-white font-medium px-6 py-2.5 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer text-sm tracking-wide";
export const ghostBtn = "text-violet-400 font-medium hover:text-violet-300 hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 max-w-lg mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.5)] ring-1 ring-white/5 relative z-10";
export const formTitle = "text-3xl font-bold text-white tracking-tight text-center mb-8 drop-shadow-sm";
export const labelClass = "text-xs font-semibold text-slate-300 mb-2 block uppercase tracking-wider";
export const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-200 backdrop-blur-sm";
export const formGroup = "mb-5";
export const submitBtn =
  "w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer mt-4 text-sm tracking-widest uppercase";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-slate-950/60 backdrop-blur-xl border-b border-white/10 px-8 h-16 flex items-center sticky top-0 z-50 shadow-lg";
export const navContainerClass = "max-w-5xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400 tracking-tighter";
export const navLinksClass = "flex items-center gap-8";
export const navLinkClass = "text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium tracking-wide";
export const navLinkActiveClass = "text-sm text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400 font-bold tracking-wide";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10";
export const articleCardClass =
  "relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all duration-300 flex flex-col gap-3 cursor-pointer group hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] hover:border-violet-500/30";
export const articleTitle = "text-lg font-bold text-white leading-snug tracking-tight group-hover:text-violet-300 transition-colors duration-300";
export const articleExcerpt = "text-sm text-slate-300 leading-relaxed font-light line-clamp-3";
export const articleMeta = "text-xs text-slate-400 font-medium";
export const articleBody = "text-slate-200 leading-[1.85] text-[1rem] max-w-2xl font-light";
export const timestampClass = "text-xs text-slate-400 flex items-center gap-1.5 font-medium";
export const tagClass = "text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest border border-fuchsia-400/30 bg-fuchsia-400/10 px-2.5 py-1 rounded-full w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-4xl mx-auto px-6 py-14 relative z-10";

export const articleHeader = "mb-12 flex flex-col gap-5";

export const articleCategory = "text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full w-fit border border-violet-400/20";

export const articleMainTitle = "text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md";

export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-white/10 py-5 text-sm text-slate-400 bg-white/5 backdrop-blur-md rounded-2xl px-6 mt-6";

export const authorInfo = "flex items-center gap-3 font-semibold text-white";

export const articleContent = "text-slate-200 leading-loose text-lg whitespace-pre-line mt-10 font-light";

export const articleFooter = "border-t border-white/10 mt-16 pt-8 text-sm text-slate-500";
// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-4 mt-8";

export const editBtn = "bg-white/10 hover:bg-violet-600 border border-white/10 hover:border-transparent text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-violet-500/25";

export const deleteBtn = "bg-rose-500/10 hover:bg-rose-600 border border-rose-500/30 hover:border-transparent text-rose-400 hover:text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-rose-500/25";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]";

export const articleStatusDeleted =
  "absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl px-5 py-3.5 text-sm font-medium flex items-center backdrop-blur-sm shadow-inner";
export const successClass =
  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl px-5 py-3.5 text-sm font-medium flex items-center backdrop-blur-sm shadow-inner";
export const loadingClass = "text-violet-400 text-sm font-medium animate-pulse text-center py-12 flex items-center justify-center gap-3";
export const emptyStateClass = "text-center text-slate-400 py-20 text-sm font-light bg-white/5 border border-white/5 rounded-3xl backdrop-blur-sm";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper = "mt-16 flex flex-col gap-6";

export const commentCard = "bg-white/5 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/10";

export const commentHeader = "flex items-center justify-between mb-3";

export const commentUser = "text-sm font-bold text-white tracking-wide";

export const commentTime = "text-xs text-slate-500 font-medium";

export const commentText = "text-slate-300 text-sm leading-relaxed mt-2 font-light";

export const avatar =
  "w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-500/30 ring-2 ring-white/10";

export const commentUserRow = "flex items-center gap-3.5";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-white/10 my-10 relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-16 after:h-px after:bg-gradient-to-r after:from-transparent after:via-violet-500/50 after:to-transparent";