const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
    <span className="text-2xl leading-none flex-shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[10px] font-semibold text-white/45 uppercase tracking-widest mb-0.5 truncate">
        {label}
      </p>
      <p className="text-base font-semibold text-white truncate">{value}</p>
    </div>
  </div>
);

export default StatCard;
