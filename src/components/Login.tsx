'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Hospital, User, Lock } from "lucide-react"

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [rut, setRut] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => setIsLoading(false), 2000) 
  }

  const formatRut = (value: string) => {
    // Remover puntos, guiones y letras no válidas
    let cleaned = value.replace(/[^\dkK]/g, '')

    // Limitar el número a 12 caracteres
    if (cleaned.length > 12) {
      cleaned = cleaned.slice(0, 12)
    }

    // No permitir que el número supere 99 millones
    const numValue = parseInt(cleaned.slice(0, -1), 10)
    if (numValue > 99000000) {
      cleaned = '99000000' + cleaned.slice(-1) // Mantiene el dígito verificador
    }

    // Formatear el RUT con puntos y guión
    const formattedRut = cleaned.replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])$/, '$1.$2.$3-$4')

    return formattedRut
  }

  const handleRutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setRut(formatRut(value))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-4">
      <div className="absolute inset-0 bg-sky-100 -z-10"></div>
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-sky-600 text-white text-center py-6">
          <CardTitle className="text-2xl font-bold flex items-center justify-center">
            <Hospital className="mr-2 h-6 w-6 animate-pulse" />
            Hospital Río Bueno
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="rut" className="text-sky-700">RUT</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <Input 
                  id="rut" 
                  placeholder="Ingrese su RUT" 
                  className="pl-10" 
                  value={rut} 
                  onChange={handleRutChange} 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sky-700">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <Input id="password" type="password" placeholder="Ingrese su contraseña" className="pl-10" required />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
