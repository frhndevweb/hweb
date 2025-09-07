import { Star, User } from "lucide-react";
import { useTestimonials } from "@/hooks/use-firebase-data";

export default function Testimonials() {
  const { data: testimonials, loading } = useTestimonials();

  const defaultTestimonials = [
    {
      id: "1",
      name: "Andi Pratama",
      position: "Owner Toko Online",
      content: "Pelayanan sangat memuaskan! Website saya selesai dalam 20 jam dan hasilnya melebihi ekspektasi. Desainnya modern dan responsive.",
      rating: 5
    },
    {
      id: "2",
      name: "Sarah Indah",
      position: "Marketing Manager",
      content: "Tim HWeb sangat profesional dan responsif. Website company profile kami jadi terlihat lebih berkelas dan menarik klien baru.",
      rating: 5
    },
    {
      id: "3",
      name: "Budi Santoso",
      position: "Fotografer Freelance",
      content: "Harga terjangkau dengan kualitas premium. Plus dapat domain gratis! Recommended banget untuk yang butuh website cepat.",
      rating: 5
    }
  ];

  const testimonialsToShow = loading ? defaultTestimonials : (testimonials.length > 0 ? testimonials : defaultTestimonials);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-accent fill-accent' : 'text-gray-300'}`}
      />
    ));
  };

  const getIconColor = (index: number) => {
    const colors = ['bg-primary/20 text-primary', 'bg-accent/20 text-accent', 'bg-green-500/20 text-green-500'];
    return colors[index % colors.length];
  };

  return (
    <section id="testimoni" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Testimoni Klien</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apa kata klien tentang layanan kami
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsToShow.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="service-card bg-card rounded-2xl p-6 border border-border shadow-sm"
              data-testid={`testimonial-card-${index}`}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-accent text-sm" data-testid={`testimonial-rating-${index}`}>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic" data-testid={`testimonial-content-${index}`}>
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className={`w-10 h-10 ${getIconColor(index)} rounded-full flex items-center justify-center mr-3`}>
                  <User size={20} />
                </div>
                <div>
                  <p className="font-semibold" data-testid={`testimonial-name-${index}`}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid={`testimonial-position-${index}`}>
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
