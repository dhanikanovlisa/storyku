import {
  Button,
  DataTable,
  DialogModal,
  InputField,
  Loading,
  PaginationComponent,
  SideBar,
} from "@/components";
import { useStory } from "@/viewmodel";
import { Filter, Plus } from "lucide-react";
import { columns } from "./columns";
import SelectField from "@/components/select-field";

export default function StoryManagementPage() {
  const {
    categories,
    meta,
    statusList,
    category,
    status,
    stories,
    loading,
    filterDialog,
    setFilterDialog,
    handleCloseFilterDialog,
    handleOpenFilterDialog,
    handleCategoryChange,
    handleStatusChange,
    handleReset,
    setPage,
    handlePrev,
    handleNext,
  } = useStory();
  return (
    <main className="flex h-full">
      <SideBar />
      <div className="flex-1 flex flex-col p-4 min-h-screen">
        {/**Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Stories</h1>
        </div>

        {/**Filtering */}
        <div className="flex w-full justify-between gap-2 mt-4">
          <InputField
            className="w-9/12"
            name="search"
            placeholder="Search by Writers/Title"
            // onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="flex gap-2 ">
            <DialogModal
              open={filterDialog}
              onOpenChange={setFilterDialog}
              title="Filter"
              trigger={
                <Button
                  onClick={handleOpenFilterDialog}
                  size="icon"
                  className="rounded-full bg-white border border-slate-200 "
                >
                  <Filter
                    size={24}
                    className="text-slate-700 hover:text-white"
                  />
                </Button>
              }
            >
              <div className="flex flex-col gap-2 items-center align-middle justify-center">
                <SelectField
                  items={categories || []}
                  value={category}
                  label="Category"
                  onValueChange={handleCategoryChange}
                  placeholder="Select Category"
                  className="w-[400px]"
                />
                <SelectField
                  items={statusList || []}
                  value={status}
                  label="Status"
                  onValueChange={handleStatusChange}
                  placeholder="Select Status"
                  className="w-[400px]"
                />
              </div>
              <div className="flex justify-between align-middle items-center">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={handleCloseFilterDialog}
                  >
                    Cancel
                  </Button>
                  <Button variant="orange" className="rounded-full">
                    Filter
                  </Button>
                </div>
              </div>
            </DialogModal>
            <Button variant="orange" className="rounded-full">
              <Plus size={24} />
              <span className="ml-2 text-white">Add Story</span>
            </Button>
          </div>
        </div>

        <div className="flex-grow container py-10">
          {loading ? (
            <div className="flex items-center justify-center h-ful">
              <Loading />
            </div>
          ) : (
            <DataTable columns={columns} data={stories} />
          )}
          <div className="mt-auto flex justify-between items-center align-middle py-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {meta.from} to {meta.to} of {meta.total} entries
              </p>
            </div>
            <div>
            <PaginationComponent
              page={meta.page}
              length={meta.last_page}
              last_page={meta.last_page}
              setPage={setPage}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
