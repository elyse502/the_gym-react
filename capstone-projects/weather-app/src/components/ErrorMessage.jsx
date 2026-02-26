const ErrorMessage = ({ message }) => (
  <div className="flex items-start gap-4 bg-red-400/10 border border-red-400/25 rounded-2xl p-5 backdrop-blur-sm">
    <span className="text-2xl flex-shrink-0">⚠️</span>
    <div>
      <p className="text-[15px] font-semibold text-red-300 mb-1">
        Something went wrong
      </p>
      <p className="text-[13px] text-red-300/70 leading-relaxed">{message}</p>
    </div>
  </div>
);

export default ErrorMessage;
