const LoadingSpinner = () => (
  <div className="flex flex-col items-center gap-4 py-14">
    <div className="w-12 h-12 rounded-full border-[3px] border-white/10 border-t-white/80 animate-spin" />
    <p className="text-sm text-white/45 tracking-wider">Fetching weather…</p>
  </div>
);

export default LoadingSpinner;
