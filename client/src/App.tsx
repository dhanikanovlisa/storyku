import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage, StoryManagementPage, NotFoundPage } from './pages';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard/story" element={<StoryManagementPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
