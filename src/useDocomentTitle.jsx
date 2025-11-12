import { useEffect } from 'react';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title || 'MyApp'; // fallback title
    }, [title]);
};

export default useDocumentTitle;
