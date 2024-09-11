'use client'

import { useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'  // Importar el hook useRouter
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Users, FileText, PlusCircle, Stethoscope, Pill, 
  Calendar, ChartBar, Settings, LogOut, ArrowLeft
} from "lucide-react"

type Screen = 'main' | 'newRecord' | 'omnicell'

interface DashboardItemProps {
  icon: ReactNode
  title: string
  onClick: () => void
}

export default function Component() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main')
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()  // Inicializar el router

  const DashboardItem = ({ icon, title, onClick }: DashboardItemProps) => (
    <Card 
      className="p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      onClick={onClick}
    >
      <div className="text-sky-500 mb-2">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
    </Card>
  )

  const MainScreen = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-sky-700">Bienvenido, Dr. Epuyao</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardItem icon={<Users size={24} />} title="Lista de Pacientes" onClick={() => {}} />
        {/* Aquí redirigimos al historial médico */}
        <DashboardItem icon={<FileText size={24} />} title="Historial Médico" onClick={() => router.push('/dashboard/historial')} />
        <DashboardItem icon={<PlusCircle size={24} />} title="Nuevo Registro" onClick={() => setCurrentScreen('newRecord')} />
        <DashboardItem icon={<Stethoscope size={24} />} title="Consultas" onClick={() => router.push('/dashboard/consulta')} />
        <DashboardItem icon={<Pill size={24} />} title="Recetas" onClick={() => {}} />
        <DashboardItem icon={<Calendar size={24} />} title="Agenda" onClick={() => {}} />
        <DashboardItem icon={<ChartBar size={24} />} title="Estadísticas" onClick={() => {}} />
        <DashboardItem icon={<Settings size={24} />} title="Configuración" onClick={() => {}} />
      </div>
      <Card className="bg-gradient-to-r from-sky-500 to-sky-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="mr-2" />
            Omnicell - Bodega de Remedios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Acceso rápido a la gestión de medicamentos</p>
          <Button variant="secondary" onClick={() => setCurrentScreen('omnicell')}>
            Acceder a Omnicell
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const NewRecordScreen = () => (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Nuevo Registro de Paciente</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input placeholder="Nombre del paciente" />
          <Input placeholder="Apellido del paciente" />
          <Input placeholder="RUT del paciente" />
          <Textarea placeholder="Estado actual del paciente" />
          <Textarea placeholder="Enfermedades crónicas (diabetes, hipertensión, etc.)" />
          <Textarea placeholder="Tratamientos/Curaciones realizadas" />
          <Textarea placeholder="Medicamentos recetados" />
          <Button type="submit" className="w-full">Guardar Registro</Button>
        </form>
      </CardContent>
    </Card>
  )

  const OmnicellScreen = () => (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Omnicell - Gestión de Medicamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Buscar medicamento..." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">Inventario Actual</Button>
            <Button variant="outline">Solicitar Reposición</Button>
            <Button variant="outline">Registrar Salida</Button>
            <Button variant="outline">Reportes de Uso</Button>
          </div>
          <Textarea placeholder="Notas o instrucciones especiales" />
          <Button className="w-full">Confirmar Acción</Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-sky-100 p-4"> {/* Fondo siempre completo */}
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-sky-500 text-white">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
              <Stethoscope className="mr-2" />
              Hospital Río Bueno - Dashboard Médico
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {currentScreen === 'main' && <MainScreen />}
            {currentScreen === 'newRecord' && <NewRecordScreen />}
            {currentScreen === 'omnicell' && <OmnicellScreen />}
          </CardContent>
        </Card>

        <div className="fixed bottom-4 right-4 space-x-2">
          {currentScreen !== 'main' && (  /* El botón Volver solo se muestra fuera del dashboard principal */
            <Button variant="solid" onClick={() => setCurrentScreen('main')} className="bg-blue-600 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
            </Button>
          )}
          <Button variant="destructive">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  )
}
