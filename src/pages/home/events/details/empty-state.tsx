const EmptyState = () => {
  return (
    <div className="flex h-80 flex-col items-center justify-center gap-2">
      <p className="font-serif text-2xl/[100%]">No guests yet</p>
      <p className="leading-6 -tracking-[0.02em] text-[#626262]">
        Guests added to this event will appear here.
      </p>
    </div>
  );
};

export default EmptyState;
