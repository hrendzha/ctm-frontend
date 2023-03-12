import { useEffect, useState } from "react";
import { api } from "api";
import { IImageItem } from "interfaces";

const useImages = (pageNum = 1, searchValue = "", perPage = 10) => {
  const [images, setImages] = useState<IImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const abortController = new AbortController();

    api.images
      .get(searchValue, pageNum, perPage, { signal: abortController.signal })
      .then(({ items, totalPages, page }) => {
        setImages(prev => (page === 1 ? items : [...prev, ...items]));
        setHasNextPage(page < totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("catch", error);
        setIsLoading(false);
        if (abortController.signal.aborted) return;
        setIsError(true);
        setError({ message: error.message });
      });

    return () => abortController.abort();
  }, [pageNum, searchValue, perPage]);

  return { isLoading, isError, error, images, hasNextPage };
};

export { useImages };
