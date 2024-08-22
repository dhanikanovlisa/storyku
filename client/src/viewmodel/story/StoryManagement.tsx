import { useToast } from "@/components";
import { deleteStory, fetchStories } from "@/models";
import { useCallback, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { storyProps } from "@/models";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const useStory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [filterDialog, setFilterDialog] = useState(false);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [searchField, setSearchField] = useState("");
  const { toast } = useToast();
  const [meta, setMeta] = useState({
    from: 0,
    to: 0,
    page: 1,
    last_page: 1,
    pageSize: 10,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce function to delay the API call
  const debouncedGetStories = useCallback(
    debounce(() => {
      getStories();
    }, 150),
    [page, pageSize, searchField, category, status]
  );

  const getStories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchStories(page, pageSize, searchField, category, status);
      console.log(response.data);
      setStories(response.data.data);
      setMeta(response.data.meta);
      setPageSize(response.data.meta.pageSize)
      setPage(response.data.meta.page);
    } catch (error) {
      console.error("Error fetching Expenses:", error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchField, category, status]);

  const handleOpenFilterDialog = () => {
    setFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterDialog(false);
  };

  const handleDeleteStory = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteStory(id, {});
      if (response && response.error) {
        toast({
          variant: "error",
          title: "Error",
          description: `An error occurred: ${response.data.errors}`,
        });
      } else {
        toast({
          variant: "success",
          title: "Story deleted successfully!",
          description: "You have successfully deleted the story.",
        });
        getStories();
      }
    } catch (error: unknown) {
      toast({
        variant: "error",
        title: "Error",
        description: `An error occurred: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    debouncedGetStories(); // Debounced API call
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    debouncedGetStories(); // Debounced API call
  };

  const handleReset = () => {
    setCategory("");
    setStatus("");
    setSearchField("");
    getStories();
  };

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

  const handleSearch = (value: string) => {
    setSearchField(value);
    debouncedGetStories(); // Debounced API call
  };

  useEffect(() => {
    getStories();
  }, [getStories]);

  const columns: ColumnDef<storyProps>[] = [
    {
      accessorKey: "id",
      header: "No",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Writers",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "keyword",
      header: "Keyword",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const story = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/dashboard/story/edit/${story.id}`);
                }}
              >
                <Edit className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-blue-600">Edit Story</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleDeleteStory(story.id);
                }}
              >
                <Trash className="h-4 w-4 mr-2 text-red-600" />
                <span className="text-red-600">Delete Story</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Story</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return {
    loading,
    stories,
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
    handleDeleteStory,
    fetchStories,
    columns,
    handleSearch,
    getStories,
  };
};

export default useStory;
