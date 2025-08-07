import { useState, useRef, useEffect, useCallback } from "react";

function useInfiniteScroll(loading: boolean, hasMoreItems: boolean, searchError: boolean) {
    const [page, setPage] = useState(1)
    const observer = useRef<IntersectionObserver | null>(null);


    const reset = () => {
        setPage(1)
    }

    const lastNodeRef = useCallback((node: HTMLDivElement | null) => {
     
        if (loading || !hasMoreItems || searchError) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMoreItems]);

    return { page, reset, lastNodeRef }
}

export default useInfiniteScroll;