import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Legal from './pages/Legal'
import Help from './pages/Help'
import Contact from './pages/Contact'
import DeleteAccount from './pages/DeleteAccount'
import NotFound from './pages/NotFound'
import UnilagGroupFoodBuying from './pages/UnilagGroupFoodBuying'

const App = () => (
  <TooltipProvider>
    <Sonner position="top-right" richColors />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route
          path="/unilag-group-food-buying"
          element={<UnilagGroupFoodBuying />}
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
)

export default App
