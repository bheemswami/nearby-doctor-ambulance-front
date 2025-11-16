type LoaderProps = {
  text?: string;
};

const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return (
    <div className="py-6 text-center">
      {/* Animated Dots */}
      <div className="flex justify-center items-center gap-3">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:.2s]" />
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:.4s]" />
      </div>

      <p className="text-gray-500 text-sm mt-2">{text}</p>
    </div>
  );
};

export default Loader;
