import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { createData, updateData } from "@/lib/firebase";
import { type Service } from "@shared/schema";

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
}

export default function ServiceForm({ service, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: service?.title || "",
    description: service?.description || "",
    features: service?.features.join("\n") || "",
    price: service?.price || "",
    icon: service?.icon || "user",
    popular: service?.popular || false,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        features: formData.features.split("\n").filter(f => f.trim()),
      };

      if (service) {
        await updateData('services', service.id, serviceData);
        toast({ title: "Layanan berhasil diupdate" });
      } else {
        await createData('services', serviceData);
        toast({ title: "Layanan berhasil ditambahkan" });
      }
      onClose();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Gagal menyimpan layanan",
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
          <DialogTitle>{service ? "Edit Layanan" : "Tambah Layanan"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              data-testid="input-service-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              data-testid="input-service-description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="features">Fitur (satu per baris)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
              data-testid="input-service-features"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Harga</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Mulai dari 299K"
              required
              data-testid="input-service-price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full p-2 border border-border rounded"
              data-testid="select-service-icon"
            >
              <option value="user">User</option>
              <option value="building">Building</option>
              <option value="blog">Blog</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="popular"
              checked={formData.popular}
              onCheckedChange={(checked) => setFormData({ ...formData, popular: !!checked })}
              data-testid="checkbox-service-popular"
            />
            <Label htmlFor="popular">Layanan Populer</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-service">
              Batal
            </Button>
            <Button type="submit" disabled={loading} data-testid="button-save-service">
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
