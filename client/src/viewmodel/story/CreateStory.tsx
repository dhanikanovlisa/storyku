import { useToast } from "@/components";
import { chapterProps, createStory } from "@/models";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

interface IFormInput {
  id: number;
  title: string;
  author: string;
  synopsis?: string;
  category?: string;
  status?: string;
  cover?: FileList;
  keyword?: string;
}

const useCreateStory = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { toast } = useToast();
  const [chapters, setChapters] = useState([]);
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      let coverName: string | undefined = undefined;

      if (data.cover && data.cover.length > 0) {
        coverName = data.cover[0].name;
      }

      const storyData = {
        ...data,
        cover: coverName,
      };

      const response = await createStory({}, storyData);
      console.log("response", response);

      if (response && response.error) {
        const errors = response.data.errors;
        Object.keys(errors).forEach((key) => {
          setError(key as keyof IFormInput, {
            type: "manual",
            message: errors[key][0],
          });
        });
      } else {
        toast({
          variant: "success",
          title: "Story created successfully!",
          description: "You have successfully created a story.",
        });
        reset();
      }
    } catch (error: unknown) {
      toast({
        variant: "error",
        title: "Error",
        description: `An error occurred: ${error}`,
      });
      console.error("Error creating stories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setValue("category", value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setValue("status", value);
  };

  const columns: ColumnDef<chapterProps>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "last_updated",
      header: "Last Updated",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const chapter = row.original;

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
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-blue-600">Edit Story</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log(chapter.id);
                }}
              >
                <Trash className="h-4 w-4 mr-2 text-red-600" />
                <span className="text-red-600">Delete Story</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return {
    columns,
    chapters,
    status,
    category,
    handleCategoryChange,
    handleStatusChange,
    register,
    errors,
    handleSubmit,
    onSubmit,
    loading,
  };
};

export default useCreateStory;
