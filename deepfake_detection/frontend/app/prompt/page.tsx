'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface UploadedImage {
  id: string
  name: string
  url: string
  status: 'pending' | 'analyzing' | 'complete'
  result?: {
    score: number
    isAuthentic: boolean
  }
}

export default function PromptPage() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    )
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        if (!imageUrl) return

        const newImage: UploadedImage = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          url: imageUrl,
          status: 'pending'
        }

        setImages(prev => [...prev, newImage])
        
        // Simulate analysis
        setTimeout(() => {
          setImages(prev => prev.map(img => 
            img.id === newImage.id 
              ? { 
                  ...img, 
                  status: 'analyzing',
                  result: {
                    score: Math.floor(Math.random() * 20) + 80,
                    isAuthentic: Math.random() > 0.3
                  }
                }
              : img
          ))
          
          setTimeout(() => {
            setImages(prev => prev.map(img => 
              img.id === newImage.id 
                ? { ...img, status: 'complete' }
                : img
            ))
          }, 1500)
        }, 1000)
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Image Deepfake Detector</h1>
          <p className="text-muted-foreground">Upload images to analyze if they are authentic or deepfake</p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 mb-8
            ${isDragging 
              ? 'border-primary bg-primary/10 scale-[1.02]' 
              : 'border-border hover:border-primary/50 hover:bg-secondary/50'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                Drop images here or click to upload
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports JPG, PNG, WEBP up to 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden group">
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Status Overlay */}
                  {image.status !== 'complete' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      {image.status === 'pending' ? (
                        <span className="text-white text-sm">Waiting...</span>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white text-sm">Analyzing...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">{image.name}</p>
                  {image.result && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        image.result.isAuthentic 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {image.result.isAuthentic ? '✅ Authentic' : '⚠️ Suspicious'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {image.result.score}% authentic
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No images uploaded</h3>
            <p className="text-muted-foreground text-sm">Upload images above to start detection</p>
          </div>
        )}
      </main>
    </div>
  )
}
