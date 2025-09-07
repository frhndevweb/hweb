import { Eye } from "lucide-react";
import { usePortfolio } from "@/hooks/use-firebase-data";

export default function Portfolio() {
  const { data: portfolio, loading } = usePortfolio();

  const defaultPortfolio = [
    {
      id: "1",
      title: "Toko Online Fashion",
      description: "Website e-commerce modern dengan sistem pembayaran terintegrasi",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["E-Commerce", "Responsive"],
      category: "E-Commerce"
    },
    {
      id: "2",
      title: "PT Maju Bersama",
      description: "Company profile professional untuk perusahaan konstruksi",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["Company Profile", "SEO Ready"],
      category: "Corporate"
    },
    {
      id: "3",
      title: "Portofolio Fotografer",
      description: "Website portofolio kreatif dengan galeri foto interaktif",
      imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["Portfolio", "Creative"],
      category: "Portfolio"
    }
  ];

  const portfolioToShow = loading ? defaultPortfolio : (portfolio.length > 0 ? portfolio : defaultPortfolio);

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'e-commerce':
        return 'bg-primary/10 text-primary';
      case 'responsive':
        return 'bg-accent/10 text-accent';
      case 'company profile':
        return 'bg-primary/10 text-primary';
      case 'seo ready':
        return 'bg-green-500/10 text-green-500';
      case 'portfolio':
        return 'bg-primary/10 text-primary';
      case 'creative':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-muted/50 text-muted-foreground';
    }
  };

  return (
    <section id="portofolio" className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Portofolio Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat beberapa website yang telah kami buat untuk klien kami
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioToShow.map((item, index) => (
            <div 
              key={item.id} 
              className="service-card bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
              data-testid={`portfolio-item-${index}`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-48 object-cover" 
                data-testid={`portfolio-image-${index}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" data-testid={`portfolio-title-${index}`}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`portfolio-description-${index}`}>
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                      data-testid={`portfolio-tag-${index}-${tagIndex}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a 
            href="https://wa.me/+6282241003726" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
            data-testid="button-lihat-portfolio"
          >
            <Eye className="mr-2" size={20} />
            Lihat Portfolio Lengkap
          </a>
        </div>
      </div>
    </section>
  );
}
