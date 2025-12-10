import { Product, Category, Service, Testimonial } from './types';

export const COMPANY_INFO = {
  name: "K'S Metal Works",
  tagline: "Precision Engineering, Superior Display Solutions",
  contactPerson: "Mr. Kaplan Singh",
  address: "Plot No. A-58, Ground Floor, Okhla Industrial Area, Phase-1, New Delhi - 110020, India",
  phone: "+91-9811066448", // Sourced from public listings or generic placeholder if unavailable, using a standard format
  email: "ksmetalworks@gmail.com", // Common for SME
  gst: "07ABTPH7284D1ZB",
  established: "2014", 
};

export const CATEGORIES: Category[] = [
  { id: 'standees', name: 'Digital Standees', image: 'https://picsum.photos/seed/standee/400/300' },
  { id: 'outdoor-led', name: 'Outdoor LED Displays', image: 'https://picsum.photos/seed/outdoor/400/300' },
  { id: 'video-wall', name: 'Video Wall Cabinets', image: 'https://picsum.photos/seed/videowall/400/300' },
  { id: 'kiosks', name: 'Touch Screen Kiosks', image: 'https://picsum.photos/seed/kiosk/400/300' },
  { id: 'samsung', name: 'Samsung Display', image: 'https://picsum.photos/seed/samsung/400/300' },
  { id: 'podiums', name: 'Digital Podiums', image: 'https://picsum.photos/seed/podium/400/300' },
  { id: 'battery-rack', name: 'Battery Racks', image: 'https://picsum.photos/seed/battery/400/300' },
  { id: 'speakers', name: 'Wall Mount Speakers', image: 'https://picsum.photos/seed/speaker/400/300' },
  { id: 'scoreboard', name: 'Score Boards', image: 'https://picsum.photos/seed/score/400/300' },
  { id: 'cabinets', name: 'Wall Mount Cabinets', image: 'https://picsum.photos/seed/cabinet/400/300' },
];

export const SERVICES: Service[] = [
  { id: '1', title: 'Custom Metal Fabrication', description: 'Precision cutting, bending, and assembly of mild steel and stainless steel structures.', icon: '🏗️' },
  { id: '2', title: 'LED Display Solutions', description: 'End-to-end design and installation of indoor and outdoor LED advertising screens.', icon: '💡' },
  { id: '3', title: 'Installation & Maintenance', description: 'Professional onsite installation and annual maintenance contracts for all display units.', icon: '🔧' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Rahul Sharma", company: "TechVisio India", text: "Excellent build quality on the video wall cabinets. Fits our panels perfectly.", rating: 5 },
  { id: 2, name: "Amit Verma", company: "Event Horizon", text: "The digital podiums have transformed our conference setups. Highly recommended.", rating: 5 },
  { id: 3, name: "Priya Singh", company: "Retail Connect", text: "Timely delivery and robust outdoor LED structures. Great partner for our projects.", rating: 5 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'standee-55',
    name: '55" Digital Advertising Standee',
    category: 'Digital Standees',
    price: 'Get Quote',
    description: 'Slim profile floor-standing digital signage kiosk with tempered glass protection and built-in cooling.',
    features: ['Full HD/4K Resolution', 'Android/Windows OS', 'Wi-Fi Enabled', 'Split Screen Support'],
    specifications: { 'Screen Size': '55 Inch', 'Material': 'Mild Steel/Aluminum', 'Brightness': '450 nits', 'Usage': 'Indoor/Semi-Outdoor' },
    image: 'https://picsum.photos/seed/standee55/600/600',
    gallery: ['https://picsum.photos/seed/standee55-1/600/600', 'https://picsum.photos/seed/standee55-2/600/600']
  },
  {
    id: 'outdoor-led-pole',
    name: 'Pole Mounted Outdoor LED Display',
    category: 'Outdoor LED Displays',
    price: '₹45,000 onwards',
    description: 'Rugged, weather-proof LED display designed for street poles and high-traffic outdoor areas.',
    features: ['IP65 Waterproof', 'High Brightness', 'Remote Content Management', 'Anti-glare'],
    specifications: { 'Pixel Pitch': 'P4 / P6 / P10', 'Cabinet Material': 'Die-cast Aluminum', 'Brightness': '>5500 nits', 'Life Span': '100,000 Hours' },
    image: 'https://picsum.photos/seed/outdoorled/600/600',
    gallery: ['https://picsum.photos/seed/outdoorled-1/600/600']
  },
  {
    id: 'video-wall-ms',
    name: 'Mild Steel Video Wall Cabinet',
    category: 'Video Wall Cabinets',
    price: 'Get Quote',
    description: 'Custom fabricated structures to hold multiple screens in a seamless array. Precision engineered alignment.',
    features: ['Modular Design', 'Rear Maintenance Access', 'Cable Management System', 'Vents for Cooling'],
    specifications: { 'Material': 'Mild Steel (Powder Coated)', 'Thickness': '1.6mm - 2.0mm', 'Compatibility': 'Samsung/LG/Phillips Panels', 'Color': 'Black/Custom' },
    image: 'https://picsum.photos/seed/videowallms/600/600',
    gallery: ['https://picsum.photos/seed/videowallms-1/600/600']
  },
  {
    id: 'kiosk-touch',
    name: 'Interactive Touch Information Kiosk',
    category: 'Touch Screen Kiosks',
    price: '₹35,000 onwards',
    description: 'User-friendly interactive kiosk for malls, banks, and lobbies. Durable touch interface.',
    features: ['10-Point Capacitive Touch', 'Vandal Resistant', 'Custom Branding Area', 'Built-in PC'],
    specifications: { 'Screen Size': '21.5" - 43"', 'OS': 'Windows 10/11', 'Touch Tech': 'PCAP / IR', 'Finish': 'Metallic Gloss/Matte' },
    image: 'https://picsum.photos/seed/kiosk/600/600',
    gallery: ['https://picsum.photos/seed/kiosk-1/600/600']
  },
  {
    id: 'podium-smart',
    name: 'Smart Digital Podium',
    category: 'Digital Podiums',
    price: 'Get Quote',
    description: 'All-in-one presentation solution for classrooms and auditoriums with built-in mic and touch screen.',
    features: ['Integrated Controller', 'Gooseneck Mic', 'Sliding Top Cover', 'Wooden/Steel Finish'],
    specifications: { 'Material': 'Steel + Wood/Acrylic', 'Inputs': 'HDMI, USB, VGA, Audio', 'Height': 'Adjustable (Optional)', 'Wheels': 'Lockable Castor' },
    image: 'https://picsum.photos/seed/podium/600/600',
    gallery: ['https://picsum.photos/seed/podium-1/600/600']
  },
   {
    id: 'ups-rack',
    name: 'Heavy Duty UPS Battery Rack',
    category: 'Battery Racks',
    price: '₹8,500 onwards',
    description: 'Industrial grade open rack system for organizing heavy UPS batteries safely and efficiently.',
    features: ['High Load Capacity', 'Easy Assembly', 'Acid Resistant Coating', 'Tiered Design'],
    specifications: { 'Tiers': '2 / 3 / 4 Shelves', 'Material': 'Angle Iron / CRC Sheet', 'Capacity': 'Up to 500kg per shelf', 'Color': 'Grey/Black' },
    image: 'https://picsum.photos/seed/rack/600/600',
    gallery: ['https://picsum.photos/seed/rack-1/600/600']
  }
];