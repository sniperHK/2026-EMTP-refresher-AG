import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { ScenarioPage } from '@/pages/ScenarioPage'
import { ToolPage } from '@/pages/ToolPage'
import { ContentPage } from '@/pages/ContentPage'
import { HandoutPage } from '@/pages/HandoutPage'
import { QuizPage } from '@/pages/QuizPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="scenario/:id" element={<ScenarioPage />} />
          <Route path="tools/:toolId" element={<ToolPage />} />
          <Route path="content/:moduleId" element={<ContentPage />} />
          <Route path="handout" element={<HandoutPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="quiz/:type" element={<QuizPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
