export const Main = () => {
  const fakeArray = new Array(11).fill(0);

  return (
    <main className="mt-3 h-full bg-[#050615] rounded-2xl shadow-2xl px-6 divide-y divide-dashed divide-slate-800 mb-3 border-slate-900 border-2">
      {fakeArray.map(() => {
        return (
          <div className="flex text-sm text-slate-500 font-semibold py-5">
            <span className="flex-[2]">Arafat Ahmed Chowdhury</span>
            <span className="flex-1">1</span>
            <span className="flex-[2]">arafat.nayeem@gmail.com</span>
            <span className="flex-1">4/2</span>
            <span>Graphic D.</span>
          </div>
        );
      })}
    </main>
  );
};
