const EmptyState = (props: { header: string; description: string }) => {
  const {
    header = 'No guests yet',
    description = 'Guests added to this event will appear here.',
  } = props;

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-2">
      <h2 className="font-serif text-2xl/[100%]">{header}</h2>
      <p className="leading-6 -tracking-[0.02em] text-[#626262]">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
