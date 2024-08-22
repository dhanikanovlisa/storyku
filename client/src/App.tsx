import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateChapterPage, CreateStoryPage, DashboardPage, StoryManagementPage, NotFoundPage, EditStoryPage } from './pages';
import { Toaster } from './components';
function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard/story" element={<StoryManagementPage/>}>
          </Route>
          <Route path="/dashboard/story/create" element={<CreateStoryPage/>} />
          <Route path="/dashboard/story/edit/:id" element={<EditStoryPage/>} />
          <Route path="/dashboard/story/chapter/create" element={<CreateChapterPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
