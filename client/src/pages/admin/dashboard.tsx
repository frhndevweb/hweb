import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { logoutAdmin, onAuthStateChange } from "@/lib/firebase";
import { useServices, usePortfolio, useTestimonials, useFAQs } from "@/hooks/use-firebase-data";
import ServiceForm from "@/components/admin/service-form";
import PortfolioForm from "@/components/admin/portfolio-form";
import TestimonialForm from "@/components/admin/testimonial-form";
import { LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { deleteData } from "@/lib/firebase";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const { data: services } = useServices();
  const { data: portfolio } = usePortfolio();
  const { data: testimonials } = useTestimonials();
  const { data: faqs } = useFAQs();

  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setLocation("/admin/login");
      }
    });

    return unsubscribe;
  }, [setLocation]);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast({
        title: "Logout berhasil",
        description: "Sampai jumpa lagi!",
      });
      setLocation("/admin/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        await deleteData(type, id);
        toast({
          title: "Berhasil",
          description: "Item berhasil dihapus",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus item",
          variant: "destructive",
        });
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">HWeb Admin</h1>
          <Button onClick={handleLogout} variant="outline" data-testid="button-logout">
            <LogOut className="mr-2" size={16} />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Layanan</TabsTrigger>
            <TabsTrigger value="portfolio">Portofolio</TabsTrigger>
            <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
            <TabsTrigger value="faqs">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Kelola Layanan</h2>
              <Button onClick={() => setShowServiceForm(true)} data-testid="button-add-service">
                <Plus className="mr-2" size={16} />
                Tambah Layanan
              </Button>
            </div>
            
            <div className="grid gap-4">
              {services.map((service, index) => (
                <Card key={service.id} data-testid={`service-item-${index}`}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {service.title}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingItem(service);
                            setShowServiceForm(true);
                          }}
                          data-testid={`button-edit-service-${index}`}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete('services', service.id)}
                          data-testid={`button-delete-service-${index}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                    <p className="font-semibold mt-2">{service.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Kelola Portofolio</h2>
              <Button onClick={() => setShowPortfolioForm(true)} data-testid="button-add-portfolio">
                <Plus className="mr-2" size={16} />
                Tambah Portofolio
              </Button>
            </div>
            
            <div className="grid gap-4">
              {portfolio.map((item, index) => (
                <Card key={item.id} data-testid={`portfolio-item-${index}`}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {item.title}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingItem(item);
                            setShowPortfolioForm(true);
                          }}
                          data-testid={`button-edit-portfolio-${index}`}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete('portfolio', item.id)}
                          data-testid={`button-delete-portfolio-${index}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Kelola Testimoni</h2>
              <Button onClick={() => setShowTestimonialForm(true)} data-testid="button-add-testimonial">
                <Plus className="mr-2" size={16} />
                Tambah Testimoni
              </Button>
            </div>
            
            <div className="grid gap-4">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.id} data-testid={`testimonial-item-${index}`}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {testimonial.name}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingItem(testimonial);
                            setShowTestimonialForm(true);
                          }}
                          data-testid={`button-edit-testimonial-${index}`}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete('testimonials', testimonial.id)}
                          data-testid={`button-delete-testimonial-${index}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{testimonial.position}</p>
                    <p className="italic">"{testimonial.content}"</p>
                    <div className="flex mt-2">
                      {Array.from({length: testimonial.rating}, (_, i) => (
                        <span key={i} className="text-accent">★</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Kelola FAQ</h2>
            </div>
            
            <div className="grid gap-4">
              {faqs.map((faq, index) => (
                <Card key={faq.id} data-testid={`faq-item-${index}`}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {faq.question}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete('faqs', faq.id)}
                          data-testid={`button-delete-faq-${index}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Forms */}
      {showServiceForm && (
        <ServiceForm
          service={editingItem}
          onClose={() => {
            setShowServiceForm(false);
            setEditingItem(null);
          }}
        />
      )}
      {showPortfolioForm && (
        <PortfolioForm
          portfolioItem={editingItem}
          onClose={() => {
            setShowPortfolioForm(false);
            setEditingItem(null);
          }}
        />
      )}
      {showTestimonialForm && (
        <TestimonialForm
          testimonial={editingItem}
          onClose={() => {
            setShowTestimonialForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}
