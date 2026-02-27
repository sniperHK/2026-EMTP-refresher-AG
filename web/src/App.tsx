import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { ScenarioPage } from '@/pages/ScenarioPage'
import { ToolPage } from '@/pages/ToolPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="scenario/:id" element={<ScenarioPage />} />
          <Route path="tools/:toolId" element={<ToolPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
