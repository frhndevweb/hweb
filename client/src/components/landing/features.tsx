import { Rocket, Smartphone, Gift, Palette } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Rocket size={32} className="text-primary" />,
      title: "24 Jam Selesai",
      description: "Website Anda siap dalam waktu paling cepat 24 jam",
      bgColor: "bg-primary/10"
    },
    {
      icon: <Smartphone size={32} className="text-accent" />,
      title: "100% Responsif",
      description: "Tampilan sempurna di semua perangkat",
      bgColor: "bg-accent/10"
    },
    {
      icon: <Gift size={32} className="text-green-500" />,
      title: "Domain Gratis",
      description: "Pilih domain .xyz, .my.id, atau .biz.id gratis",
      bgColor: "bg-green-500/10"
    },
    {
      icon: <Palette size={32} className="text-purple-500" />,
      title: "UI/UX Modern",
      description: "Desain terkini yang menarik dan user-friendly",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Mengapa Memilih HWeb?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami menghadirkan solusi website terdepan dengan kualitas premium dan harga terjangkau
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center service-card" data-testid={`feature-${index}`}>
              <div className={`w-16 h-16 mx-auto mb-4 ${feature.bgColor} rounded-2xl flex items-center justify-center`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2" data-testid={`feature-title-${index}`}>{feature.title}</h3>
              <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
