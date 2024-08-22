import { InputField, SideBar, useToast, Button } from "@/components";
import { createStory } from "@/models";
import { useForm } from "react-hook-form";
interface IFormInput {
  id: number;
  title: string;
  author: string;
  synopsis?: string;
  category?: string;
  status?: string;
  cover?: string;
  keyword?: string;
}
export default function CreateStoryPage() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();
  const { toast } = useToast();
  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    try {
      console.log("data", data);
      const response = await createStory({}, data);
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
          title: "Expense created successfully!",
          description: "You have successfully created an Expense.",
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
    }
  };
  return (
    <main className="flex h-full">
      <SideBar />
      <div className="flex-1 flex flex-col p-4 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Add Stories</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              {...register("title")}
              label="Title"
              name="title"
              errors={errors}
              placeholder="Title"
            />
            <InputField
              {...register("author")}
              label="Writer Name"
              name="writer-name"
              errors={errors}
              placeholder="Writer Name"
            />
            <InputField
              {...register("synopsis")}
              label="Synopsis"
              name="synopsis"
              errors={errors}
              placeholder="Synopsis"
            />
            <InputField
              {...register("category")}
              label="Category"
              name="category"
              errors={errors}
              placeholder="Category"
            />
            <InputField
              {...register("status")}
              label="Status"
              name="status"
              errors={errors}
              placeholder="Status"
            />
            <InputField
              {...register("cover")}
              label="Cover"
              name="cover"
              errors={errors}
              placeholder="Cover"
            />
            <InputField
              {...register("keyword")}
              label="Keyword"
              name="keyword"
              errors={errors}
              placeholder="Keyword"
            />
            <div className="flex space-x-2">
              <Button variant="outline" className="rounded-full">
                Cancel
              </Button>
              <Button variant="orange" className="rounded-full">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
