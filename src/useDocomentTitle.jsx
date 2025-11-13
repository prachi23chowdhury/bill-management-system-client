import { useEffect } from 'react';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title || 'MyApp'; 
    }, [title]);
};

export default useDocumentTitle;
