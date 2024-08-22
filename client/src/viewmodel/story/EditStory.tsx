import { useToast } from "@/components";
import { fetchStoryById, updateStory } from "@/models";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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

const useEditStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState({
    title: "",
    author: "",
    synopsis: "",
    category: "",
    status: "",
    cover: "",
    keyword: "",
  });
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
    getValues,
    reset,
  } = useForm<IFormInput>();
  const getStory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchStoryById(Number(id), {});
      console.log("Expense", response);
      if (response.error) {
        console.error("Error fetching Expenses:", response.data);
      } else {
        setStory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Expenses:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);
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

      const response = await updateStory(1, {}, storyData);
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
          variant: "default",
          title: "Story created successfully!",
          description: "You have successfully created a story.",
        });
        reset();
      }
    } catch (error: unknown) {
      toast({
        variant: "default",
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

  useEffect(() => {
    getStory();
  }, [getStory]);

  return {
    story,
    chapters,
    status,
    category,
    handleCategoryChange,
    handleStatusChange,
    register,
    getValues,
    errors,
    handleSubmit,
    onSubmit,
    loading,
  };
};

export default useEditStory;
