import { Pagination } from "@nextui-org/react";

export const Footer = () => {
  return (
    <footer className="flex justify-center">
      <Pagination
        total={3}
        initialPage={1}
        variant="bordered"
        classNames={{
          item: "border-slate-900 hover:hover:bg-gray-600 text-slate-400 font-semibold hover:text-white",
          cursor:
            "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        }}
      />
    </footer>
  );
};
