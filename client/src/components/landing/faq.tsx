import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFAQs } from "@/hooks/use-firebase-data";

export default function FAQ() {
  const { data: faqs, loading } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultFAQs = [
    {
      id: "1",
      question: "Berapa lama proses pembuatan website?",
      answer: "Proses pembuatan website kami paling cepat 24 jam untuk website sederhana. Untuk website yang lebih kompleks, biasanya membutuhkan 3-7 hari kerja tergantung tingkat kerumitan dan fitur yang diminta.",
      order: 0
    },
    {
      id: "2",
      question: "Domain gratis apa saja yang tersedia?",
      answer: "Kami menyediakan domain gratis untuk ekstensi .xyz, .my.id, dan .biz.id. Domain ini gratis untuk tahun pertama. Jika Anda membutuhkan domain .com atau .id, kami dapat bantu dengan biaya tambahan.",
      order: 1
    },
    {
      id: "3",
      question: "Apakah website akan responsive di mobile?",
      answer: "Ya, semua website yang kami buat 100% responsive dan mobile-friendly. Website akan tampil sempurna di berbagai perangkat mulai dari smartphone, tablet, hingga desktop dengan berbagai ukuran layar.",
      order: 2
    },
    {
      id: "4",
      question: "Bagaimana sistem pembayaran?",
      answer: "Sistem pembayaran kami fleksibel. Anda bisa membayar DP 50% di awal, sisanya setelah website selesai. Kami menerima pembayaran via transfer bank, e-wallet (Dana, OVO, GoPay), dan cryptocurrency.",
      order: 3
    },
    {
      id: "5",
      question: "Apakah ada garansi dan after-sales support?",
      answer: "Ya, kami memberikan garansi 30 hari untuk bug fixing dan minor adjustment. Kami juga menyediakan layanan maintenance dan update konten dengan biaya yang sangat terjangkau.",
      order: 4
    }
  ];

  const faqsToShow = loading ? defaultFAQs : (faqs.length > 0 ? faqs.sort((a, b) => a.order - b.order) : defaultFAQs);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pertanyaan yang sering diajukan tentang layanan kami
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqsToShow.map((faq, index) => (
            <div 
              key={faq.id} 
              className="bg-card rounded-xl border border-border overflow-hidden"
              data-testid={`faq-item-${index}`}
            >
              <button 
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
                data-testid={`faq-button-${index}`}
              >
                <span className="font-semibold text-foreground" data-testid={`faq-question-${index}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-muted-foreground transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4" data-testid={`faq-answer-${index}`}>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
