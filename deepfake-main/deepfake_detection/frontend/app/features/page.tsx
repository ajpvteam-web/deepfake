'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle, Zap, Shield, Eye, Cpu, Globe } from 'lucide-react'
import Footer from '@/components/footer'

export default function FeaturesPage() {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "High Accuracy Detection",
      description: "Our AI achieves 90-99.8% accuracy in detecting deepfake images and videos, using advanced machine learning algorithms."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Lightning Fast Analysis",
      description: "Process images and videos in seconds with our optimized algorithms, perfect for real-time detection needs."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption, ensuring your data remains private and protected."
    },
    {
      icon: <Eye className="w-8 h-8 text-accent" />,
      title: "Multi-Modal Analysis",
      description: "Combines visual, audio, and metadata analysis for comprehensive deepfake detection across all media types."
    },
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Advanced AI Technology",
      description: "Powered by cutting-edge convolutional neural networks and transformer architectures for superior detection."
    },
    {
      icon: <Globe className="w-8 h-8 text-accent" />,
      title: "Scalable Architecture",
      description: "Built to handle millions of requests with our cloud-native, auto-scaling infrastructure."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-sm text-primary font-medium">Advanced Features</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Powerful Deepfake Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Discover the comprehensive suite of features that make DeepShield the most advanced deepfake detection platform available.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:border-primary/50 transition-colors animate-fade-in" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="bg-secondary/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Technical Specifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              DeepShield's robust architecture ensures reliable performance across all use cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mx-auto max-w-4xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">&lt;2s</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold text-foreground">Ready to Experience These Features?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who trust DeepShield for their deepfake detection needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/watch-demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}