'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, User, FileText, Plus, Search } from "lucide-react"
import { format } from "date-fns"

export default function Component() {
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [date, setDate] = useState<Date>()

  const consultations = [
    { id: 1, patientName: "Carlos Rodríguez", time: "09:00", status: "Programada" },
    { id: 2, patientName: "Ana Martínez", time: "10:30", status: "En progreso" },
    { id: 3, patientName: "Luis Gómez", time: "11:45", status: "Completada" },
    { id: 4, patientName: "Elena Sánchez", time: "14:15", status: "Programada" },
    { id: 5, patientName: "Javier Torres", time: "16:00", status: "Cancelada" },
  ]

  const statusColors = {
    "Programada": "bg-blue-100 text-blue-800",
    "En progreso": "bg-green-100 text-green-800",
    "Completada": "bg-gray-100 text-gray-800",
    "Cancelada": "bg-red-100 text-red-800"
  }

  const ConsultationDetails = ({ consultation }) => (
    <Card className="mt-4 transition-all duration-300 animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-sky-700 flex items-center justify-between">
          <span>Consulta con {consultation.patientName}</span>
          <Badge className={statusColors[consultation.status]}>{consultation.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-sky-500" />
            <span>Hora: {consultation.time}</span>
          </div>
          <Tabs defaultValue="notes">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">Notas</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="prescriptions">Recetas</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="space-y-2">
              <Textarea placeholder="Añadir notas de la consulta..." />
              <Button>Guardar Notas</Button>
            </TabsContent>
            <TabsContent value="history">
              <p>Historial médico del paciente...</p>
            </TabsContent>
            <TabsContent value="prescriptions">
              <p>Recetas médicas...</p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-sky-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-6xl bg-white shadow-xl">
        <CardHeader className="bg-sky-500 text-white">
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="mr-2" />
              Módulo de Consultas
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="text-sky-500">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Consulta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Programar Nueva Consulta</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Paciente</Label>
                    <Input id="patient" placeholder="Nombre del paciente" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input id="time" type="time" />
                  </div>
                  <Button className="w-full">Programar Consulta</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-sky-700 flex items-center justify-between">
                  <span>Consultas del Día</span>
                  <Input 
                    type="search" 
                    placeholder="Buscar consulta..." 
                    className="max-w-xs"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {consultations.map(consultation => (
                    <Button
                      key={consultation.id}
                      variant="ghost"
                      className="w-full justify-start mb-2 hover:bg-sky-50"
                      onClick={() => setSelectedConsultation(consultation)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${consultation.patientName.split(' ').map(n => n[0]).join('')}`} />
                        <AvatarFallback>{consultation.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{consultation.patientName}</div>
                        <div className="text-sm text-gray-500">{consultation.time}</div>
                      </div>
                      <Badge className={statusColors[consultation.status]}>{consultation.status}</Badge>
                    </Button>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-sky-700">Detalles de la Consulta</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedConsultation ? (
                  <ConsultationDetails consultation={selectedConsultation} />
                ) : (
                  <div className="text-center text-gray-500 mt-8">
                    <User className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">Seleccione una consulta para ver los detalles</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}