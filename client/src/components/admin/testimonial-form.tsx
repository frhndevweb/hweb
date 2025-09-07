import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createData, updateData } from "@/lib/firebase";
import { type Testimonial } from "@shared/schema";

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onClose: () => void;
}

export default function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    position: testimonial?.position || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (testimonial) {
        await updateData('testimonials', testimonial.id, formData);
        toast({ title: "Testimoni berhasil diupdate" });
      } else {
        await createData('testimonials', formData);
        toast({ title: "Testimoni berhasil ditambahkan" });
      }
      onClose();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Gagal menyimpan testimoni",
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
          <DialogTitle>{testimonial ? "Edit Testimoni" : "Tambah Testimoni"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              data-testid="input-testimonial-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Posisi/Jabatan</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
              data-testid="input-testimonial-position"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Testimoni</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              data-testid="input-testimonial-content"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <select
              id="rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full p-2 border border-border rounded"
              data-testid="select-testimonial-rating"
            >
              <option value={1}>1 Bintang</option>
              <option value={2}>2 Bintang</option>
              <option value={3}>3 Bintang</option>
              <option value={4}>4 Bintang</option>
              <option value={5}>5 Bintang</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-testimonial">
              Batal
            </Button>
            <Button type="submit" disabled={loading} data-testid="button-save-testimonial">
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
