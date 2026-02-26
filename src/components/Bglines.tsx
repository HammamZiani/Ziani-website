function Bglines() {
  return (
    <div className="hidden sm:block absolute border border-black inset-0 h-full w-full p-10 -z-10">
      <div className="h-full w-full border border-black relative">
        <div className="size-4 bg-black absolute -top-4 -left-4" />
        <div className="size-4 bg-black absolute -top-4 -right-4" />
        <div className="size-4 bg-black absolute -bottom-4 -left-4" />
        <div className="size-4 bg-black absolute -bottom-4 -right-4" />
      </div>
    </div>
  );
}

export default Bglines;
