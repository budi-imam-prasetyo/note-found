import { AuthButton } from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import NoteFound from "@/app/assets/note-found-logo.png"
import { FileText, Users, Clock, Shield, Zap, Database, Palette, FolderSyncIcon as Sync, CheckCircle, ArrowRight, Github } from 'lucide-react';
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="absolute left-1/2 -translate-x-1/2 w-full overflow-hidden ">
        <p className="text-center text-[500px] font-semibold opacity-5 text-white">404</p>
      </div>

      {/* Navigation */}
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"} className="flex items-center gap-2">
              <Image src={NoteFound} alt="Note Found Logo" className="h-8 w-8" />

              <span className="text-xl font-bold">Note Found</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 w-full flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Built with Next.js & Supabase
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Collaborative Note-Taking
              <span className="text-primary block">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Note Found is a modern web application that provides personal note management capabilities with real-time synchronization, authentication, and an intuitive interface.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://github.com/budi-imam-prasetyo/note-found" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Github className="mr-2 h-5 w-5" />
                View Source
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Free & Open Source
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Real-time Sync
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Secure Authentication
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for efficient note-taking and collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Collaborative Editing</CardTitle>
                <CardDescription>
                  Work together with your team in real-time with seamless collaboration features
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Timestamped Content</CardTitle>
                <CardDescription>
                  Every note entry is automatically timestamped for better organization and tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  Built-in authentication and session management powered by Supabase
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Dark/Light Theme</CardTitle>
                <CardDescription>
                  Responsive design with dark and light theme support for comfortable viewing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sync className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Sync</CardTitle>
                <CardDescription>
                  Content synchronization across all devices and users in real-time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Rich Note Editor</CardTitle>
                <CardDescription>
                  Intuitive note editor with support for multiple notes and editable titles
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="w-full py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">System Architecture</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on modern, scalable technologies for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Next.js Frontend</CardTitle>
                <CardDescription>
                  Modern React framework with server-side rendering and optimal performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>RESTful API</CardTitle>
                <CardDescription>
                  Middleware layer providing clean API endpoints for seamless data operations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Supabase Database</CardTitle>
                <CardDescription>
                  PostgreSQL database with real-time capabilities and built-in authentication
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Three-Tier Architecture</CardTitle>
                <CardDescription className="text-lg">
                  The system follows a robust three-tier architecture ensuring scalability,
                  maintainability, and optimal separation of concerns between presentation,
                  business logic, and data layers.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who trust Note Found for their note-taking needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Taking Notes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                <span className="text-xl font-bold">Note Found</span>
              </div>
              <p className="text-muted-foreground">
                A modern collaborative note-taking application built with Next.js and Supabase.
              </p>
            </div>

            {/* <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="#" className="block hover:text-foreground transition-colors">Features</Link>
                <Link href="#" className="block hover:text-foreground transition-colors">Documentation</Link>
                <Link href="#" className="block hover:text-foreground transition-colors">API Reference</Link>
              </div>
            </div> */}

            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="https://github.com/budi-imam-prasetyo" className="block hover:text-foreground transition-colors">GitHub</Link>
                <Link href="#" className="block hover:text-foreground transition-colors">Community</Link>
                <Link href="#" className="block hover:text-foreground transition-colors">Support</Link>
              </div>
            </div>

          </div>

          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Note Found. Built with Next.js and Supabase.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
