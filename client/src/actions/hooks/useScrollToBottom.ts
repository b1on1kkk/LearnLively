import { useEffect, useRef } from "react";

const useScrollToBottom = <T>(
  dependency: T
): React.MutableRefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency]);

  return ref;
};

export default useScrollToBottom;
