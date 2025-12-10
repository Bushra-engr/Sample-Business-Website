import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { Menu, X, MessageSquare, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ChevronRight, ChevronDown, Rotate3D } from 'lucide-react';
import { COMPANY_INFO, CATEGORIES, PRODUCTS, SERVICES, TESTIMONIALS } from './constants';
import { sendMessageToGemini } from './services/geminiService';
import { Product } from './types';

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-industrial-900 border-b border-industrial-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-industrial-accent rounded-sm flex items-center justify-center">
              <span className="text-industrial-900 font-bold text-xl">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-wider text-lg">K'S METAL</span>
              <span className="text-industrial-steel text-xs tracking-[0.2em] uppercase">Works</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-industrial-accent bg-industrial-800'
                      : 'text-gray-300 hover:text-industrial-accent hover:bg-industrial-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-industrial-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-industrial-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-industrial-900 border-b border-industrial-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-industrial-accent hover:bg-industrial-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-industrial-900 border-t-4 border-industrial-accent text-gray-300">
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">K'S Metal Works</h3>
          <p className="text-sm text-gray-400 mb-4">{COMPANY_INFO.tagline}</p>
          <div className="flex flex-col space-y-3 mb-4">
             <div className="flex items-start"><MapPin size={16} className="mr-2 mt-1 text-industrial-accent flex-shrink-0" /> <span className="text-sm">{COMPANY_INFO.address}</span></div>
             <div className="flex items-center"><Phone size={16} className="mr-2 text-industrial-accent flex-shrink-0" /> <span className="text-sm">{COMPANY_INFO.phone}</span></div>
             <div className="flex items-center"><Mail size={16} className="mr-2 text-industrial-accent flex-shrink-0" /> <span className="text-sm">{COMPANY_INFO.email}</span></div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-industrial-accent"><Facebook size={20} /></a>
            <a href="#" className="hover:text-industrial-accent"><Instagram size={20} /></a>
            <a href="#" className="hover:text-industrial-accent"><Linkedin size={20} /></a>
          </div>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-industrial-accent">Products</Link></li>
            <li><Link to="/services" className="hover:text-industrial-accent">Services</Link></li>
            <li><Link to="/about" className="hover:text-industrial-accent">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-industrial-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.slice(0, 5).map(c => (
              <li key={c.id}><Link to={`/products?cat=${c.id}`} className="hover:text-industrial-accent">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="w-full h-64 md:h-auto rounded-lg overflow-hidden border border-industrial-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.687483742686!2d77.2755293!3d28.5240375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1509176313d%3A0x28f731677353160e!2sOkhla%20Industrial%20Area%2C%20Phase%201%2C%20New%20Delhi%2C%20Delhi%20110020!5e0!3m2!1sen!2sin!4v1709280000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
            className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          ></iframe>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-industrial-800 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. GST: {COMPANY_INFO.gst}
      </div>
    </div>
  </footer>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; parts: { text: string }[] }[]>([
    { role: 'model', parts: [{ text: "Hello! Welcome to K'S Metal Works. I can help you with product details, specifications, or getting a quote. How can I assist you today?" }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API (excluding the very first welcome message if needed, but passing full history is usually fine)
      const apiHistory = messages.map(m => ({ role: m.role, parts: m.parts }));
      const responseText = await sendMessageToGemini(input, apiHistory);
      
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText || "I didn't quite catch that." }] }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting right now." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-industrial-800 border border-industrial-700 w-80 sm:w-96 h-[500px] rounded-lg shadow-2xl flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          <div className="bg-industrial-900 p-4 border-b border-industrial-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-white font-semibold">IronBot AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-industrial-accent text-industrial-900 font-medium' 
                    : 'bg-industrial-700 text-gray-200'
                }`}>
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-industrial-700 p-3 rounded-lg text-sm text-gray-400 flex gap-1">
                   <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-3 bg-industrial-900 border-t border-industrial-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products..." 
              className="flex-1 bg-industrial-800 border border-industrial-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-industrial-accent"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-industrial-accent hover:bg-amber-600 text-industrial-900 p-2 rounded transition-colors disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-industrial-accent hover:bg-amber-600 text-industrial-900 p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 font-bold"
      >
        <MessageSquare size={24} />
        <span className="hidden sm:inline">Chat with AI</span>
      </button>
    </div>
  );
};

const Product360Viewer = ({ imageUrl }: { imageUrl: string }) => {
    // Simulated 360 viewer with perspective
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startX.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const delta = e.clientX - startX.current;
        setRotation(prev => prev + delta * 0.5);
        startX.current = e.clientX;
    };

    const handleMouseUp = () => setIsDragging(false);

    return (
        <div className="relative group">
            <div className="absolute top-0 right-0 z-10 p-2">
                 <div className="bg-black/60 text-industrial-accent text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Rotate3D size={14} /> 360° View
                 </div>
            </div>
            <div 
                className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing [perspective:1000px] border border-industrial-700"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {rotation === 0 && (
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none transition-opacity duration-500 opacity-100 group-hover:opacity-0">
                        Drag to Rotate
                    </div>
                )}
                <img 
                    src={imageUrl} 
                    alt="360 View"
                    className="w-full h-full object-cover shadow-2xl"
                    style={{ transform: `rotateY(${rotation}deg)`, transition: isDragging ? 'none' : 'transform 0.2s ease-out' }} 
                    draggable={false}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-black">
                        <span className="text-xl">⟲</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-black">
                        <span className="text-xl">⟳</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- PAGES ---

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[600px] bg-industrial-900 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/factory/1920/1080')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-900 via-industrial-900/80 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-10 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Precision <span className="text-industrial-accent">Metal</span> Fabrication & <br/> 
              Display Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Over 10 years of excellence in manufacturing Video Wall Cabinets, Digital Standees, and Kiosks.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-industrial-accent text-industrial-900 px-8 py-3 rounded font-bold hover:bg-amber-600 transition-colors">
                Explore Products
              </Link>
              <Link to="/contact" className="border-2 border-industrial-accent text-industrial-accent px-8 py-3 rounded font-bold hover:bg-industrial-accent hover:text-industrial-900 transition-colors">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-industrial-800 py-10 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-white mb-1">10+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-white mb-1">ISO 9001</div>
            <div className="text-sm text-gray-400">Certified Quality</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-white mb-1">GST Verified</div>
            <div className="text-sm text-gray-400">Trusted Business</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-gray-400">Client Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-20 bg-industrial-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center border-l-4 border-industrial-accent inline-block pl-4">Product Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/products?cat=${cat.id}`} className="group relative block overflow-hidden rounded-lg aspect-[4/3] bg-industrial-800 border border-industrial-700 hover:border-industrial-accent transition-colors">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <h3 className="text-white font-medium text-sm md:text-base group-hover:text-industrial-accent transition-colors">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-industrial-800 border-t border-industrial-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-gray-300 mb-8">
            From design to installation, we provide end-to-end metal fabrication services tailored to your specific requirements.
          </p>
          <Link to="/contact" className="inline-block bg-industrial-accent text-industrial-900 px-8 py-3 rounded font-bold hover:bg-amber-600 transition-colors">
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [filter, setFilter] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catId = params.get('cat');
    if (catId) {
      const category = CATEGORIES.find(c => c.id === catId);
      if (category) setFilter(category.name);
    }
  }, [location]);

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-industrial-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-industrial-accent pl-4">Our Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-industrial-800 p-4 rounded-lg border border-industrial-700 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setFilter('All')}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${filter === 'All' ? 'bg-industrial-accent text-industrial-900 font-bold' : 'text-gray-300 hover:bg-industrial-700'}`}
                  >
                    All Products
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setFilter(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded text-sm ${filter === cat.name ? 'bg-industrial-accent text-industrial-900 font-bold' : 'text-gray-300 hover:bg-industrial-700'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-industrial-800 rounded-lg overflow-hidden border border-industrial-700 hover:border-industrial-accent transition-all duration-300 flex flex-col group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-industrial-900/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {product.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-industrial-accent font-semibold text-sm">{product.price}</span>
                      <Link to={`/products/${product.id}`} className="text-sm bg-industrial-700 hover:bg-white hover:text-industrial-900 text-white px-3 py-2 rounded transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                  No products found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
             <div className="min-h-screen bg-industrial-900 py-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl text-white font-bold mb-4">Product Not Found</h2>
                    <Link to="/products" className="text-industrial-accent hover:underline">Return to Products</Link>
                </div>
             </div>
        );
    }

    return (
        <div className="min-h-screen bg-industrial-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/products" className="text-gray-400 hover:text-white flex items-center text-sm">
                        &larr; Back to Products
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image / 360 View */}
                    <div className="space-y-4">
                        <Product360Viewer imageUrl={product.image} />
                        <div className="grid grid-cols-4 gap-2">
                            {product.gallery.map((img, idx) => (
                                <img key={idx} src={img} className="w-full h-20 object-cover rounded border border-industrial-700 cursor-pointer hover:border-industrial-accent" alt="" />
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                        <div className="text-industrial-accent text-xl font-semibold mb-6">{product.price}</div>
                        
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="bg-industrial-800 rounded-lg p-6 border border-industrial-700 mb-8">
                            <h3 className="text-white font-semibold mb-4 border-b border-industrial-700 pb-2">Specifications</h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key}>
                                        <dt className="text-gray-400">{key}</dt>
                                        <dd className="text-white font-medium">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-white font-semibold">Key Features:</h3>
                            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                {product.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Link to="/contact" className="flex-1 bg-industrial-accent text-industrial-900 py-3 rounded font-bold text-center hover:bg-amber-600 transition-colors">
                                Request Quote
                            </Link>
                            <button className="flex-1 border border-industrial-700 text-white py-3 rounded font-bold hover:bg-industrial-800 transition-colors">
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProcessPage = () => (
  <div className="min-h-screen bg-industrial-900 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white text-center mb-16">Manufacturing Process</h1>
      
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-industrial-700 hidden md:block"></div>
        
        {[
          { title: "Design & CAD", desc: "Our engineers create precise 3D models and CAD drawings based on client requirements.", step: 1 },
          { title: "Fabrication", desc: "Using advanced CNC laser cutting and bending machines to shape the raw metal.", step: 2 },
          { title: "Assembly & Welding", desc: "Expert certified welders assemble the structure with high durability MIG/TIG welding.", step: 3 },
          { title: "Surface Treatment", desc: "7-tank process and powder coating to ensure rust proofing and aesthetic finish.", step: 4 },
          { title: "Quality Check & Delivery", desc: "Rigorous testing of dimensions and finish before dispatching to site.", step: 5 }
        ].map((item, index) => (
          <div key={index} className={`flex items-center justify-between mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="w-full md:w-5/12">
               <div className="bg-industrial-800 p-6 rounded-lg border border-industrial-700 hover:border-industrial-accent transition-colors shadow-lg">
                 <div className="text-industrial-accent text-5xl font-bold mb-4 opacity-20">0{item.step}</div>
                 <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                 <p className="text-gray-400">{item.desc}</p>
               </div>
            </div>
            <div className="w-2/12 hidden md:flex justify-center">
              <div className="w-8 h-8 bg-industrial-accent rounded-full border-4 border-industrial-900 shadow-neon"></div>
            </div>
            <div className="w-full md:w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
    <div className="min-h-screen bg-industrial-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-4">About K'S Metal Works</h1>
                <div className="w-20 h-1 bg-industrial-accent mx-auto"></div>
            </div>
            
            <div className="bg-industrial-800 p-8 rounded-lg border border-industrial-700 mb-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Established in {COMPANY_INFO.established}, <strong>K'S Metal Works</strong> has emerged as a premier manufacturer in the field of customized metal fabrication and digital display housing solutions. Located in the industrial heart of New Delhi, we serve clients across India with precision-engineered products.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                    We specialize in mild steel and stainless steel fabrication, providing robust housing for expensive digital electronics like Video Walls, Kiosks, and Outdoor LEDs. Our commitment to quality (ISO 9001 certified) ensures that every product leaving our factory is built to last.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-industrial-800 p-6 rounded-lg border-l-4 border-industrial-accent">
                    <h3 className="text-white font-bold mb-2">Company Facts</h3>
                    <ul className="text-gray-400 space-y-2 text-sm">
                        <li><strong>Annual Turnover:</strong> ₹40 Lakhs - 1.5 Crore</li>
                        <li><strong>GST No:</strong> {COMPANY_INFO.gst}</li>
                        <li><strong>Location:</strong> New Delhi, India</li>
                        <li><strong>Nature of Business:</strong> Manufacturer</li>
                    </ul>
                </div>
                 <div className="bg-industrial-800 p-6 rounded-lg border-l-4 border-industrial-accent">
                    <h3 className="text-white font-bold mb-2">Our Capabilities</h3>
                    <ul className="text-gray-400 space-y-2 text-sm">
                        <li>CNC Laser Cutting</li>
                        <li>CNC Bending</li>
                        <li>Powder Coating Plant</li>
                        <li>MIG/TIG Welding</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const ServicesPage = () => (
    <div className="min-h-screen bg-industrial-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-12 text-center">Our Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES.map(service => (
                    <div key={service.id} className="bg-industrial-800 p-8 rounded-lg border border-industrial-700 hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-4xl mb-6">{service.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                        <p className="text-gray-400">{service.description}</p>
                    </div>
                ))}
            </div>
             <div className="mt-20">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map(t => (
                        <div key={t.id} className="bg-industrial-800 p-6 rounded relative">
                            <div className="text-industrial-accent text-4xl absolute top-4 right-4">"</div>
                            <p className="text-gray-300 mb-6 italic relative z-10">{t.text}</p>
                            <div>
                                <div className="text-white font-bold">{t.name}</div>
                                <div className="text-gray-500 text-sm">{t.company}</div>
                                <div className="flex text-industrial-accent mt-1">
                                    {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ContactPage = () => (
    <div className="min-h-screen bg-industrial-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-12 text-center">Contact Us</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-industrial-800 p-8 rounded-lg border border-industrial-700">
                        <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-industrial-700 p-3 rounded text-industrial-accent">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <div className="text-white font-medium">Address</div>
                                    <div className="text-gray-400">{COMPANY_INFO.address}</div>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="bg-industrial-700 p-3 rounded text-industrial-accent">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <div className="text-white font-medium">Phone</div>
                                    <div className="text-gray-400">{COMPANY_INFO.phone}</div>
                                    <div className="text-gray-400 text-sm">Contact Person: {COMPANY_INFO.contactPerson}</div>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="bg-industrial-700 p-3 rounded text-industrial-accent">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div className="text-white font-medium">Email</div>
                                    <div className="text-gray-400">{COMPANY_INFO.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Google Map Real Iframe */}
                    <div className="h-64 md:h-80 bg-industrial-800 rounded-lg overflow-hidden relative group border border-industrial-700">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.687483742686!2d77.2755293!3d28.5240375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1509176313d%3A0x28f731677353160e!2sOkhla%20Industrial%20Area%2C%20Phase%201%2C%20New%20Delhi%2C%20Delhi%20110020!5e0!3m2!1sen!2sin!4v1709280000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location"
                            className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        ></iframe>
                    </div>
                </div>

                <div className="bg-industrial-800 p-8 rounded-lg border-t-4 border-industrial-accent shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Name</label>
                                <input type="text" className="w-full bg-industrial-900 border border-industrial-700 rounded px-4 py-2 text-white focus:border-industrial-accent focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Phone</label>
                                <input type="text" className="w-full bg-industrial-900 border border-industrial-700 rounded px-4 py-2 text-white focus:border-industrial-accent focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email</label>
                            <input type="email" className="w-full bg-industrial-900 border border-industrial-700 rounded px-4 py-2 text-white focus:border-industrial-accent focus:outline-none" />
                        </div>
                        <div>
                             <label className="block text-sm text-gray-400 mb-1">Interested In</label>
                            <select className="w-full bg-industrial-900 border border-industrial-700 rounded px-4 py-2 text-white focus:border-industrial-accent focus:outline-none">
                                <option>General Inquiry</option>
                                <option>Video Wall Quote</option>
                                <option>Digital Standee Quote</option>
                                <option>Installation Service</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Message</label>
                            <textarea rows={4} className="w-full bg-industrial-900 border border-industrial-700 rounded px-4 py-2 text-white focus:border-industrial-accent focus:outline-none"></textarea>
                        </div>
                        <button className="w-full bg-industrial-accent text-industrial-900 font-bold py-3 rounded hover:bg-amber-600 transition-colors">
                            Send Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

// --- MAIN LAYOUT ---

const Layout = () => {
  return (
    <div className="bg-industrial-900 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;