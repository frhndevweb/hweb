import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createData, updateData } from "@/lib/firebase";
import { type Portfolio } from "@shared/schema";

interface PortfolioFormProps {
  portfolioItem?: Portfolio | null;
  onClose: () => void;
}

export default function PortfolioForm({ portfolioItem, onClose }: PortfolioFormProps) {
  const [formData, setFormData] = useState({
    title: portfolioItem?.title || "",
    description: portfolioItem?.description || "",
    imageUrl: portfolioItem?.imageUrl || "",
    tags: portfolioItem?.tags.join(", ") || "",
    category: portfolioItem?.category || "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const portfolioData = {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
      };

      if (portfolioItem) {
        await updateData('portfolio', portfolioItem.id, portfolioData);
        toast({ title: "Portfolio berhasil diupdate" });
      } else {
        await createData('portfolio', portfolioData);
        toast({ title: "Portfolio berhasil ditambahkan" });
      }
      onClose();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Gagal menyimpan portfolio",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{portfolioItem ? "Edit Portfolio" : "Tambah Portfolio"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              data-testid="input-portfolio-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              data-testid="input-portfolio-description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL Gambar</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              required
              data-testid="input-portfolio-image"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="E-Commerce, Responsive, SEO"
              data-testid="input-portfolio-tags"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="E-Commerce"
              required
              data-testid="input-portfolio-category"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-portfolio">
              Batal
            </Button>
            <Button type="submit" disabled={loading} data-testid="button-save-portfolio">
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
