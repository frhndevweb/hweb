import { User, Building, FileText, Check } from "lucide-react";
import { useServices } from "@/hooks/use-firebase-data";

export default function Services() {
  const { data: services, loading } = useServices();

  const defaultServices = [
    {
      id: "1",
      title: "Website Portofolio",
      description: "Tampilkan karya dan kemampuan Anda dengan website portofolio pribadi yang menarik dan profesional.",
      features: ["Desain modern & responsive", "Gallery karya interaktif", "Form kontak terintegrasi", "SEO optimized"],
      price: "Mulai dari 299K",
      icon: "user",
      popular: false
    },
    {
      id: "2",
      title: "Website Bisnis",
      description: "Tingkatkan kredibilitas bisnis Anda dengan website company profile yang profesional dan berkualitas tinggi.",
      features: ["Company profile lengkap", "Katalog produk/jasa", "WhatsApp integration", "Google Maps embed"],
      price: "Mulai dari 499K",
      icon: "building",
      popular: true
    },
    {
      id: "3",
      title: "Blog & Custom",
      description: "Website blog personal atau custom sesuai kebutuhan spesifik Anda dengan fitur lengkap.",
      features: ["CMS untuk posting artikel", "Kategori & tag system", "Komentar & sharing", "Custom functionality"],
      price: "Mulai dari 399K",
      icon: "blog",
      popular: false
    }
  ];

  const servicesToShow = loading ? defaultServices : (services.length > 0 ? services : defaultServices);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return <User size={32} className="text-primary" />;
      case 'building':
        return <Building size={32} className="text-white" />;
      case 'blog':
        return <FileText size={32} className="text-accent" />;
      default:
        return <User size={32} className="text-primary" />;
    }
  };

  return (
    <section id="layanan" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Layanan Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berbagai jenis website profesional sesuai kebutuhan Anda
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesToShow.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-card rounded-2xl p-8 border shadow-sm ${
                service.popular 
                  ? 'bg-primary text-white border-primary shadow-lg transform scale-105' 
                  : 'bg-card border-border'
              }`}
              data-testid={`service-card-${index}`}
            >
              <div className={`w-14 h-14 ${service.popular ? 'bg-white/20' : 'bg-primary/10'} rounded-xl flex items-center justify-center mb-6`}>
                {getIcon(service.icon)}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${service.popular ? 'text-white' : 'text-foreground'}`} data-testid={`service-title-${index}`}>
                {service.title}
              </h3>
              <p className={`mb-6 ${service.popular ? 'text-white/80' : 'text-muted-foreground'}`} data-testid={`service-description-${index}`}>
                {service.description}
              </p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm" data-testid={`service-feature-${index}-${featureIndex}`}>
                    <Check size={16} className={`mr-3 ${service.popular ? 'text-accent' : 'text-green-500'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className={`text-2xl font-bold mb-4 ${service.popular ? 'text-accent' : 'text-primary'}`} data-testid={`service-price-${index}`}>
                {service.price}
              </div>
              {service.popular && (
                <div className="bg-accent/20 text-accent text-xs font-semibold px-3 py-2 rounded-lg inline-block">
                  MOST POPULAR
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
