"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Upload, 
  Flower2, 
  MapPin, 
  CalendarDays,
  FileText,
  Droplets
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase"
import { useAuthStore } from "@/store/auth"

export default function AddPlantPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [image, setImage] = useState<string | null>(null)
  const [nickname, setNickname] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [wateringDays, setWateringDays] = useState(7)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isAuthenticated) {
    router.push("/auth/login")
    return null
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    const supabase = createClient()

    const { data: plant, error } = await supabase
      .from("my_plants")
      .insert({
        user_id: user.id,
        nickname,
        image_url: image,
        location: location || null,
        notes: notes || null,
        acquired_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (!error && plant) {
      await supabase
        .from("watering_schedule")
        .insert({
          user_id: user.id,
          plant_id: plant.id,
          frequency_days: wateringDays,
          last_watered: new Date().toISOString(),
          next_watering: new Date(Date.now() + wateringDays * 24 * 60 * 60 * 1000).toISOString(),
          reminder_enabled: true,
        })
    }

    setLoading(false)
    router.push("/garden")
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <Link 
            href="/garden" 
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Mi Jardín
          </Link>

          <h1 className="font-heading text-3xl font-bold text-primary mb-6">
            Agregar planta
          </h1>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Foto de la planta</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className={`
                    border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                    ${image 
                      ? "border-primary bg-primary/5" 
                      : "border-primary/30 hover:border-primary hover:bg-primary/5"
                    }
                  `}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {image ? (
                    <img src={image} alt="Plant" className="max-h-64 mx-auto rounded-lg" />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 mx-auto mb-3 text-primary/50" />
                      <p className="font-medium text-primary">Subir foto</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="label">Nombre de la planta *</label>
                  <div className="relative">
                    <Flower2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      placeholder="Mi monstera"
                      className="pl-11"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Ubicación</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      placeholder="Sala, balcón, jardín..."
                      className="pl-11"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Notas</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
                    <textarea
                      className="input pl-11 min-h-[100px]"
                      placeholder="Notas sobre tu planta..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Programar riego
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="label">Frecuencia de riego (días)</label>
                  <Input
                    type="number"
                    min={1}
                    max={60}
                    value={wateringDays}
                    onChange={(e) => setWateringDays(parseInt(e.target.value) || 7)}
                  />
                  <p className="text-sm text-text-secondary mt-2">
                    Esta planta necesita riego cada <strong>{wateringDays} días</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Link href="/garden" className="flex-1">
                <Button type="button" variant="secondary" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Guardando..." : "Agregar planta"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
