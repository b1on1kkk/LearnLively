import { Spinner } from "@nextui-org/react";

export const Loading = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      <Spinner color="secondary" size="lg" />
    </main>
  );
};
