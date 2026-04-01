import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { ScenarioPage } from '@/pages/ScenarioPage'
import { ToolPage } from '@/pages/ToolPage'
import { ContentPage } from '@/pages/ContentPage'
import { HandoutPage } from '@/pages/HandoutPage'
import { QuizPage } from '@/pages/QuizPage'
import { SlidesPage } from '@/pages/SlidesPage'
import { RoadmapPage } from '@/pages/RoadmapPage'
import { TeacherDashboardPage } from '@/pages/TeacherDashboardPage'
import { MessageBoardPage } from '@/pages/MessageBoardPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="scenario/:id" element={<ScenarioPage />} />
          <Route path="tools/:toolId" element={<ToolPage />} />
          <Route path="content/:moduleId" element={<ContentPage />} />
          <Route path="handout" element={<HandoutPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="quiz/:type" element={<QuizPage />} />
          <Route path="slides/:slideId" element={<SlidesPage />} />
          <Route path="slides" element={<SlidesPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="messages" element={<MessageBoardPage />} />
          <Route path="teacher-dashboard" element={<TeacherDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
