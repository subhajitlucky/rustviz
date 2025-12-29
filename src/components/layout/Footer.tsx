import { Github, Twitter, ExternalLink } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-muted/20 mt-20">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">RustViz</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            A deep-dive visualizer for Rust internals. Built for developers who want to master memory, ownership, and concurrency.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="https://doc.rust-lang.org/book/" className="hover:text-primary flex items-center gap-1" target="_blank" rel="noreferrer">The Rust Book <ExternalLink className="h-3 w-3" /></a></li>
                            <li><a href="https://rust-lang-nursery.github.io/rust-cookbook/" className="hover:text-primary flex items-center gap-1" target="_blank" rel="noreferrer">Rust Cookbook <ExternalLink className="h-3 w-3" /></a></li>
                            <li><a href="https://play.rust-lang.org/" className="hover:text-primary flex items-center gap-1" target="_blank" rel="noreferrer">Rust Playground <ExternalLink className="h-3 w-3" /></a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© 2025 RustViz. No trackers. Just code.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-foreground">Privacy</a>
                        <a href="#" className="hover:text-foreground">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
