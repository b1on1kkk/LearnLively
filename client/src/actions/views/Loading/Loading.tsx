import { Spinner } from "@nextui-org/react";

export const Loading = () => {
  return (
    <main className="h-full flex items-center justify-center">
      <Spinner color="secondary" size="lg" />
    </main>
  );
};
