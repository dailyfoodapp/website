import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Legal from './pages/Legal'
import Help from './pages/Help'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const App = () => (
  <TooltipProvider>
    <Sonner position="top-right" richColors />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
)

export default App
