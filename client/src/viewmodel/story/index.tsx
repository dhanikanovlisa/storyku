import { SelectProps } from "@/components/select-field";
import { fetchStories } from "@/models";
import { useCallback, useEffect, useState } from "react";

const useStory = () => {
    const [loading, setLoading] = useState(false);
    const [stories, setStories] = useState([]);
    const [filterDialog, setFilterDialog] = useState(false);
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('')
    const [meta, setMeta] = useState({
        from: 0,
        to: 0,
        page: 1,
        last_page: 1,
        pageSize: 10,
        total: 0,
    });
    const [page, setPage] = useState(1);    
    const getStories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchStories(page, meta.pageSize);
            console.log(response.data);
            setStories(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching Expenses:", error);
          } finally {
            setLoading(false);
          }
    }, [page, meta.pageSize]);
    const handleOpenFilterDialog = () => {
        setFilterDialog(true);
    }
    const handleCloseFilterDialog = () => {
        setFilterDialog(false);
    }
    const categories: SelectProps[] = [
        {
            id:"1",
            name:'Technology',
            value: 'Technology',
        },
        {
            id:"2",
            name:'Financial',
            value: 'Financial',
        },
        {
            id:"3",
            name:'Health',
            value: 'Health',
        }

    ]
    const handleCategoryChange = (value:string) => {
        setCategory(value);
    }
    const statusList: SelectProps[] = [
        {
            id:"1",
            name:'Draft',
            value: 'Draft',
        },
        {
            id:"2",
            name:'Published',
            value: 'Published',
        },
    ]
    const handleStatusChange = (value:string) => {
        setStatus(value);
    }

    const handleReset = () => {
        setCategory('');
        setStatus('');
    }

    const handlePrev = () => {
        if (meta.page > 1) {
          setPage(page - 1);
        }
      };
      const handleNext = () => {
        if (page < meta.last_page) {
          setPage(page + 1);
        }
      };
    useEffect(() => {
        getStories();
    }, [getStories]);

    return {
        loading,
        stories,
        categories,
        statusList,
        category,
        status,
        meta,
        filterDialog,
        handleOpenFilterDialog,
        handleCloseFilterDialog,
        setFilterDialog,
        handleCategoryChange,
        handleStatusChange,
        handleReset,
        handlePrev,
        handleNext,
        setPage,
    }
}

export default useStory;