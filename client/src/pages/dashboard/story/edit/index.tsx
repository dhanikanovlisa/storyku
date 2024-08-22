import React from "react";
import { InputField, SideBar, Button, Loading } from "@/components";
import SelectField from "@/components/select-field";
import TextAreaField from "@/components/text-area";
import { categoriesList, statusList } from "@/models";
import { useEditStory } from "@/viewmodel";
import { Plus } from "lucide-react";

export default function EditStoryPage() {
  const {
    story,
    loading,
    category,
    status,
    handleCategoryChange,
    handleStatusChange,
    register,
    errors,
    onSubmit,
    handleSubmit,
  } = useEditStory();

  return (
    <main className="flex h-full">
      <SideBar />
      <div className="flex-1 flex flex-col py-4 px-2 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Edit Stories</h1>
        </div>
        <div className="mt-4">
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-4 shadow-lg rounded-lg">
                <div className="flex gap-2">
                  <InputField
                    {...register("title")}
                    label="Title"
                    name="title"
                    errors={errors}
                    placeholder="Title"
                    disabled={loading}
                    defaultValue={story.title} 
                  />
                  <InputField
                    {...register("author")}
                    label="Writer Name"
                    name="author"
                    errors={errors}
                    placeholder="Writer Name"
                    disabled={loading}
                    defaultValue={story.author} 
                  />
                </div>
                <TextAreaField
                  {...register("synopsis")}
                  label="Synopsis"
                  name="synopsis"
                  errors={errors}
                  disabled={loading}
                  placeholder="Synopsis"
                  defaultValue={story.synopsis} 
                />
                <div className="flex gap-2">
                  <SelectField
                    items={categoriesList || []}
                    value={category}
                    label="Category"
                    onValueChange={handleCategoryChange}
                    placeholder="Select Category"
                    className="w-[500px]"
                  />
                  <InputField
                    {...register("keyword")}
                    label="Keyword"
                    name="keyword"
                    errors={errors}
                    placeholder="Keyword"
                    disabled={loading}
                    defaultValue={story.keyword}
                  />
                </div>
                <div className="flex gap-2">
                  <InputField
                    {...register("cover")}
                    type="file"
                    label="Cover"
                    name="cover"
                    errors={errors}
                    placeholder="Cover"
                    className="w-[500px]"
                    disabled={loading}
                    
                  />
                  <SelectField
                    items={statusList || []}
                    value={status}
                    label="Status"
                    onValueChange={handleStatusChange}
                    placeholder="Select Status"
                    className="w-[600px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="button" variant="orange" className="rounded-full">
                    <Plus size={24} />
                    Add Chapter
                  </Button>
                </div>
                {/**Chapters */}
                <div className="mt-4">
                  {/* <DataTable columns={columns} data={chapters} /> */}
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-10">
                <Button variant="outline" className="rounded-full">
                  Cancel
                </Button>
                <Button type="submit" variant="orange" className="rounded-full">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}