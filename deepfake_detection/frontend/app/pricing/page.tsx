'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Footer from '@/components/footer'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and creators',
      price: '$9',
      period: '/month',
      features: [
        '10 uploads per month',
        'Basic detection accuracy',
        'Email support',
        'Standard processing speed',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'For serious content creators and teams',
      price: '$29',
      period: '/month',
      features: [
        'Unlimited uploads',
        'Advanced detection (99%+ accuracy)',
        'Priority email & chat support',
        'Fast processing (< 2 seconds)',
        'Batch processing',
        'Custom branding',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      period: 'contact sales',
      features: [
        'Unlimited everything',
        'Highest accuracy with custom training',
        '24/7 phone & chat support',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'On-premise deployment',
      ],
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-sm text-primary font-medium">Transparent Pricing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Simple, Honest Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Choose the perfect plan for your needs. All plans include a 14-day free trial, no credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`border-border relative animate-fade-in ${plan.highlighted ? 'ring-2 ring-primary' : ''}`} style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth" className="block w-full">
                  <Button
                    size="lg"
                    className="w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/10 border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Yes! Cancel your subscription at any time. No lock-in contracts or hidden fees.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Do you offer discounts for annual billing?</h3>
              <p className="text-muted-foreground">Yes. Annual billing comes with 20% off. Contact sales for more options.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Is there a free tier?</h3>
              <p className="text-muted-foreground">Everyone gets a 14-day free trial. Upgrade to a paid plan anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold text-foreground">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <a href="mailto:contact@deepshield.com" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}