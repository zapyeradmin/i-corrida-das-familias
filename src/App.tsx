
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PixPayment from "./pages/PixPayment";
import CardPayment from "./pages/CardPayment";
import SiteDesign from "./pages/SiteDesign";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./hooks/useAuth";
import { AthleteAuthProvider } from "./hooks/useAthleteAuth";
import { AthletePrivateRoute } from "./components/AthletePrivateRoute";
import AthleteLogin from "./pages/AthleteLogin";
import AthleteDashboard from "./pages/AthleteDashboard";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AthleteAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/pix-payment" element={<PixPayment />} />
                <Route path="/card-payment" element={<CardPayment />} />
                
                {/* Rotas do atleta */}
                <Route path="/atleta/login" element={<AthleteLogin />} />
                
                {/* Rotas protegidas do atleta */}
                <Route element={<AthletePrivateRoute />}>
                  <Route path="/atleta/perfil" element={<AthleteDashboard />} />
                </Route>
                
                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/site-design" element={<SiteDesign />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <WhatsAppButton />
            </BrowserRouter>
          </TooltipProvider>
        </AthleteAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
