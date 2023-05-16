const useBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
};

export default useBaseUrl;
