import { Button, InputField, SideBar, useToast } from "@/components";
import { createChapter } from "@/models";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface IFormInput {
  id: number;
  title: string;
  story: string;
}
export default function CreateChapterPage() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IFormInput>();
  const { toast } = useToast();
  //   const [value, setValue] = useState('');
  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    try {
      console.log("data", data);
      const response = await createChapter(1, {}, data);
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
          <h1 className="text-2xl font-bold text-gray-600">Add Chapter</h1>
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
            <Controller
              name="story"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReactQuill value={field.value} onChange={field.onChange} />
              )}
            />
            ;
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
