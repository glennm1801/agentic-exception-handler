import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Configuration from "./pages/Configuration";
import AccountReceivableExceptions from "./pages/AccountReceivableExceptions";
import AllScenarios from "./pages/AllScenarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ProtectedRoute>
              <SidebarProvider>
                <div className="min-h-screen w-full bg-gradient-modern flex">
                  <AppSidebar />
                  <SidebarInset className="flex-1">
                    <Header />
                    <main className="flex-1">
                      <div className="container mx-auto px-6 py-8">
                        <Breadcrumbs />
                        <Routes>
                          <Route path="/" element={<AllScenarios />} />
                          <Route path="/configuration" element={<Configuration />} />
                          <Route path="/scenarios" element={<div className="text-center py-12 text-muted-foreground">Select a scenario from the dropdown above</div>} />
                          <Route path="/scenarios/create" element={<div className="text-center py-12 text-muted-foreground">Create Scenario Page</div>} />
                          
                          <Route path="/scenarios/templates" element={<div className="text-center py-12 text-muted-foreground">Templates Page</div>} />
                          <Route path="/scenarios/recent" element={<div className="text-center py-12 text-muted-foreground">Recent Scenarios Page</div>} />
                          <Route path="/scenarios/account-receivable-exceptions" element={<AccountReceivableExceptions />} />
                          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </main>
                  </SidebarInset>
                </div>
              </SidebarProvider>
            </ProtectedRoute>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
