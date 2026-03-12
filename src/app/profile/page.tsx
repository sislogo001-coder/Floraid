"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  User, 
  MapPin, 
  CalendarDays,
  Flower2,
  MessageSquare,
  Settings,
  Edit,
  Leaf,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase"
import { useAuthStore } from "@/store/auth"
import { Profile, MyPlant, ForumPost } from "@/types"
import { getInitials } from "@/lib/utils"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, setUser } = useAuthStore()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [plants, setPlants] = useState<MyPlant[]>([])
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [username, setUsername] = useState("")
  const [region, setRegion] = useState("")
  const [bio, setBio] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }
    fetchData()
  }, [isAuthenticated])

  const fetchData = async () => {
    const supabase = createClient()

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single()

    if (profileData) {
      setProfile(profileData)
      setUsername(profileData.username || "")
      setRegion(profileData.region || "")
      setBio(profileData.bio || "")
    }

    const { data: plantsData } = await supabase
      .from("my_plants")
      .select("*")
      .eq("user_id", user?.id)

    const { data: postsData } = await supabase
      .from("forum_posts")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })
      .limit(5)

    if (plantsData) setPlants(plantsData)
    if (postsData) setPosts(postsData)
    setLoading(false)
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        region,
        bio,
      })
      .eq("id", user.id)

    if (!error) {
      setProfile({ ...profile!, username, region, bio })
      setUser({ ...profile!, username, region, bio })
    }

    setSaving(false)
    setEditing(false)
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl font-bold text-primary">Mi Perfil</h1>
            <Button 
              variant="ghost" 
              onClick={() => setEditing(!editing)}
              className="gap-2"
            >
              {editing ? (
                <>Cancelar</>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Editar
                </>
              )}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading text-3xl font-bold text-primary">
                      {getInitials(profile?.username || "U")}
                    </span>
                  </div>
                  {editing ? (
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nombre de usuario"
                      className="text-center mb-3"
                    />
                  ) : (
                    <h2 className="font-heading text-xl font-bold text-primary">
                      {profile?.username || "Usuario"}
                    </h2>
                  )}
                  <p className="text-sm text-text-secondary">
                    Miembro desde {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("es-MX", { year: "numeric", month: "long" }) : "recientemente"}
                  </p>
                </CardContent>
              </Card>

              {editing && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Editar información</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="label">Región</label>
                      <Input
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="México, Colombia, etc."
                      />
                    </div>
                    <div>
                      <label className="label">Bio</label>
                      <textarea
                        className="input min-h-[80px]"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Cuéntanos sobre ti..."
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Guardando..." : "Guardar cambios"}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!editing && (
                <Card className="mt-4">
                  <CardContent className="pt-6 space-y-4">
                    {profile?.region && (
                      <div className="flex items-center gap-3 text-text-secondary">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.region}</span>
                      </div>
                    )}
                    {profile?.bio && (
                      <p className="text-sm text-text-secondary">{profile.bio}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Flower2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{plants.length}</p>
                        <p className="text-sm text-text-secondary">Plantas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-accent/10">
                        <MessageSquare className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{posts.length}</p>
                        <p className="text-sm text-text-secondary">Posts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flower2 className="h-5 w-5" />
                    Mis plantas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {plants.length === 0 ? (
                    <div className="text-center py-6">
                      <Flower2 className="h-10 w-10 mx-auto mb-2 text-primary/30" />
                      <p className="text-text-secondary text-sm mb-4">
                        No tienes plantas en tu jardín
                      </p>
                      <Link href="/identify">
                        <Button size="sm">Identificar mi primera planta</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {plants.slice(0, 6).map((plant) => (
                        <div key={plant.id} className="aspect-square rounded-lg bg-surface-dark overflow-hidden">
                          {plant.image_url ? (
                            <img 
                              src={plant.image_url} 
                              alt={plant.nickname}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Leaf className="h-6 w-6 text-primary/20" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Actividad reciente en foros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {posts.length === 0 ? (
                    <div className="text-center py-6">
                      <MessageSquare className="h-10 w-10 mx-auto mb-2 text-primary/30" />
                      <p className="text-text-secondary text-sm mb-4">
                        No has publicado nada aún
                      </p>
                      <Link href="/forums/new">
                        <Button size="sm">Crear mi primer post</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {posts.slice(0, 5).map((post) => (
                        <Link 
                          key={post.id} 
                          href={`/forums/post/${post.id}`}
                          className="block p-3 rounded-lg hover:bg-surface-dark transition-colors"
                        >
                          <h4 className="font-medium text-primary truncate">{post.title}</h4>
                          <p className="text-xs text-text-secondary mt-1">
                            {new Date(post.created_at).toLocaleDateString("es-MX")}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
