import { useEffect, useRef } from "react";

export default function useScrollSync() {
  const mainDivRef = useRef<HTMLDivElement | null>(null);
  const syncedDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (syncedDivRef.current) {
      syncedDivRef.current.style.paddingLeft = "1px";
    }
  }, [syncedDivRef]);

  const handleScroll = () => {
    if (mainDivRef.current && syncedDivRef.current) {
      // Sync the scrollTop and scrollLeft
      syncedDivRef.current.scrollTop = mainDivRef.current.scrollTop;
      syncedDivRef.current.scrollLeft = mainDivRef.current.scrollLeft;
    }
  };
  const handleScrollX = () => {
    if (mainDivRef.current && syncedDivRef.current) {
      // Sync the  scrollLeft
      syncedDivRef.current.scrollLeft = mainDivRef.current.scrollLeft;
    }
  };
  const handleScrollY = () => {
    if (mainDivRef.current && syncedDivRef.current) {
      // Sync the scrollTop
      syncedDivRef.current.scrollTop = mainDivRef.current.scrollTop;
    }
  };

  return {
    mainDivRef,
    syncedDivRef,
    handleScroll,
    handleScrollX,
    handleScrollY,
  };
}
