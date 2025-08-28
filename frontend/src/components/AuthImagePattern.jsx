const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center bg-base-200 p-8 w-full min-h-[60vh]">
      <div className="w-full max-w-md text-center">
        {/* Box Grid */}
        <div className="grid grid-cols-3  gap-3 mb-8" aria-hidden="true">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-blue-500/20 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-base-content">{title}</h2>
        <p className="text-base text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
