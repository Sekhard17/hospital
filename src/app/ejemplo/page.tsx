'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Inicio', 'Personajes', 'Misiones', 'Mapa', 'Vehículos']

  const carouselItems = [
    { image: "/images/ls.jpg", title: "Bienvenido a Los Santos" },
    { image: "/images/sf.jpg", title: "Explora San Fierro" },
    { image: "/images/lv.jpg", title: "Descubre Las Venturas" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : ''}`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold">GTA: SAN ANDREAS</div>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <a key={item} href="#" className="hover:text-gray-300 transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <Button variant="outline" className="hidden md:inline-flex">
              Comprar Ahora
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-2xl hover:text-gray-300 transition-colors">
                {item}
              </a>
            ))}
            <Button variant="outline" size="lg">
              Comprar Ahora
            </Button>
          </div>
        </div>
      )}

      <main>
        <section className="relative h-screen flex items-center justify-center">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[600px]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <h2 className="text-4xl md:text-6xl font-bold text-center">{item.title}</h2>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} />
          </div>
        </section>

        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Bienvenido a San Andreas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Mundo Abierto Extenso</h3>
                  <p>Explora los diversos paisajes de San Andreas, desde ciudades bulliciosas hasta zonas rurales.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Trama Atractiva</h3>
                  <p>Vive una narrativa cautivadora llena de giros inesperados y personajes inolvidables.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Actividades Sin Fin</h3>
                  <p>Disfruta de una amplia gama de actividades, desde misiones y minijuegos hasta la personalización de vehículos.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Personajes Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((_, index) => (
                <Card key={index} className="bg-gray-800">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gray-700 mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">Nombre del Personaje</h3>
                    <p className="text-center text-sm">Breve descripción del personaje y su papel en el juego.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">¿Listo para Jugar?</h2>
            <p className="text-xl mb-8">Únete a millones de jugadores y experimenta el icónico mundo de Grand Theft Auto: San Andreas</p>
            <Button size="lg" className="text-lg px-8 py-6">
              Comprar Ahora
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Rockstar Games. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
