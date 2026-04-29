'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Footer from '@/components/footer'

export default function WatchDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>Watch Our Demo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              See DeepShield in action - our advanced deepfake detection technology protecting digital authenticity.
            </p>
          </div>

          {/* Project Overview */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>
                Understanding DeepShield's mission and capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">What is DeepShield?</h3>
                  <p className="text-muted-foreground">
                    DeepShield is an advanced deepfake detection platform that uses cutting-edge AI and machine learning
                    algorithms to identify manipulated media content. Our technology analyzes videos, images, and audio
                    to detect signs of artificial generation or manipulation.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Real-time detection capabilities</li>
                    <li>• High accuracy across multiple media types</li>
                    <li>• User-friendly web interface</li>
                    <li>• Continuous learning and improvement</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Key Features</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-4 bg-secondary/50 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground">Multi-Modal Analysis</h4>
                      <p className="text-sm text-muted-foreground">Combines visual, audio, and metadata analysis for comprehensive detection</p>
                    </div>
                    <div className="p-4 bg-secondary/50 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground">Scalable Architecture</h4>
                      <p className="text-sm text-muted-foreground">Built to handle large volumes of content efficiently</p>
                    </div>
                    <div className="p-4 bg-secondary/50 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground">Privacy-First Design</h4>
                      <p className="text-sm text-muted-foreground">Processes content locally without compromising user privacy</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>

          {/* Demo Video */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Card>
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>
                Watch DeepShield detect deepfakes in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center border border-border">
                {/* Replace this with your actual demo video */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-muted-foreground">
                    Demo video will be embedded here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Replace with actual video URL or embed code
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  This demo showcases our detection algorithms processing various types of media content.
                </p>
              </div>
            </CardContent>
          </Card>
          </div>

          {/* Call to Action */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Ready to Try DeepShield?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Experience the power of AI-driven deepfake detection firsthand.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}