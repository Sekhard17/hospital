'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, Calendar, Activity, Pill, FileText, ChevronRight, 
  Heart, Droplet, Brain, Stethoscope
} from "lucide-react"

export default function Component() {
  const [selectedVisit, setSelectedVisit] = useState(null)

  const patientInfo = {
    name: "María González",
    age: 45,
    gender: "Femenino",
    bloodType: "O+",
    allergies: ["Penicilina", "Polen"],
    chronicConditions: ["Hipertensión", "Diabetes tipo 2"]
  }

  const visits = [
    { id: 1, date: "2023-05-15", reason: "Control rutinario" },
    { id: 2, date: "2023-07-22", reason: "Dolor abdominal" },
    { id: 3, date: "2023-09-10", reason: "Seguimiento diabetes" },
    { id: 4, date: "2023-11-05", reason: "Gripe estacional" },
    { id: 5, date: "2024-01-18", reason: "Control anual" }
  ]

  const VisitDetails = ({ visit }) => (
    <Card className="mt-4 transition-all duration-300 animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-sky-700">
          Visita del {visit.date}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2"><strong>Motivo:</strong> {visit.reason}</p>
        <Tabs defaultValue="vitals" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vitals">Vitales</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
            <TabsTrigger value="treatment">Tratamiento</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
          </TabsList>
          <TabsContent value="vitals" className="space-y-2">
            <div className="flex items-center"><Heart className="mr-2 text-red-500" /> Presión arterial: 120/80 mmHg</div>
            <div className="flex items-center"><Activity className="mr-2 text-green-500" /> Frecuencia cardíaca: 72 bpm</div>
            <div className="flex items-center"><Stethoscope className="mr-2 text-blue-500" /> Frecuencia respiratoria: 16 rpm</div>
            <div className="flex items-center"><Droplet className="mr-2 text-red-500" /> Nivel de glucosa: 110 mg/dL</div>
          </TabsContent>
          <TabsContent value="diagnosis">
            <p>Hipertensión controlada. Niveles de glucosa ligeramente elevados.</p>
          </TabsContent>
          <TabsContent value="treatment">
            <ul className="list-disc list-inside">
              <li>Continuar con medicación actual para hipertensión</li>
              <li>Ajustar dosis de insulina</li>
              <li>Recomendar dieta baja en sodio y azúcares</li>
            </ul>
          </TabsContent>
          <TabsContent value="notes">
            <p>Paciente muestra buena adherencia al tratamiento. Se sugiere seguimiento en 3 meses.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-sky-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl bg-white shadow-xl">
        <CardHeader className="bg-sky-500 text-white">
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="mr-2" />
              Historial Médico
            </span>
            <Badge variant="secondary" className="text-sky-500">
              ID: 12345
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-sky-700">Información del Paciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt={patientInfo.name} />
                    <AvatarFallback>{patientInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{patientInfo.name}</h3>
                    <p className="text-sm text-gray-500">{patientInfo.age} años, {patientInfo.gender}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p><strong>Tipo de sangre:</strong> {patientInfo.bloodType}</p>
                  <div>
                    <strong>Alergias:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patientInfo.allergies.map(allergy => (
                        <Badge key={allergy} variant="outline">{allergy}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Condiciones crónicas:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patientInfo.chronicConditions.map(condition => (
                        <Badge key={condition} variant="outline">{condition}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-sky-700">Historial de Visitas</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {visits.map(visit => (
                    <Button
                      key={visit.id}
                      variant="ghost"
                      className="w-full justify-start mb-2 hover:bg-sky-50"
                      onClick={() => setSelectedVisit(visit)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="flex-1 text-left">{visit.date}</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          {selectedVisit && <VisitDetails visit={selectedVisit} />}
        </CardContent>
      </Card>
    </div>
  )
}