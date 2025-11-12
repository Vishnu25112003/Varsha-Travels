# Varsha Travels - Project Structure

## 🌐 Website Live at: http://localhost:5174/

## Project Overview
Varsha Travels is a premium car rental and tour booking website for exploring Tamil Nadu, Kerala, and Karnataka with a modern, responsive UI using React, React Router, and Tailwind CSS.

## Color Scheme
- **Primary Color**: #ABE7B2 (Light Green)
- **Secondary Color**: #BBDCE5 (Light Blue)
- **Background**: Black (#000000)

## Navigation Structure

### Navbar (Fixed, Common to All Pages)
- **Left Side**: Logo (V) + Varsha Travels branding
- **Right Side**: Home | About | Destination | Gallery | Contact | Book Now
- **Mobile**: Hamburger menu
- **Features**: Active link highlighting, smooth transitions

### Footer (Common to All Pages)
- Quick links
- Services information
- Contact details
- Social media links

---

## Pages & Features

### 1. **Home Page** (`/`)
- **Full Screen Carousel**
  - Auto-play with manual controls (arrows + dots)
  - Hero text overlay
  - 5-second interval auto-rotate

- **About Section**
  - Company overview with emoji icon
  - Brief description
  - "Read More" button → navigates to `/about`

- **Popular Packages Carousel**
  - 8 top destinations in card-based grid
  - Emoji icons with place descriptions
  - Explore buttons for each place

- **Why Choose Us**
  - 3 key differentiators
  - Stats cards

- **Contact CTA Section**
  - Simple "Contact Us" button
  - Navigates to `/contact` page

---

### 2. **About Page** (`/about`)
- **Full Screen Image Carousel**
  - Company/travel related images
  - Auto-play carousel with controls

- **Company History**
  - 15+ years background
  - Evolution of the business
  - Milestones

- **What We Provide**
  - 6 service cards (Premium Vehicles, Professional Drivers, etc.)
  - Hover effects with gradient backgrounds
  - Icon + Title + Description

- **Core Values**
  - Safety First
  - Customer Satisfaction
  - Transparency
  - Environmental Responsibility

- **Statistics Section**
  - 15+ Years
  - 1200+ Trips
  - 500+ Customers
  - 4.9/5 Rating

---

### 3. **Destination Page** (`/destination`)
- **Full Screen Carousel**
  - Different UI from home page
  - Travel destination images
  - Auto-play with manual controls

- **State-Based Filter**
  - "All" (default)
  - Tamil Nadu
  - Kerala
  - Karnataka
  - Goa
  - Sticky filter bar below carousel

- **Card-Based Place Display**
  - Grid layout (2-3 columns)
  - Each place as a card with emoji icon
  - **On Hover**:
    - Blur effect
    - Place name appears
    - "Read More" button visible

- **Place Detail Popup**
  - Modal overlay on "Read More" click
  - Full place description
  - Highlights (list of attractions)
  - "Book This Destination" button
  - Close button (X)

- **Place Data Includes**:
  - 12 destinations across 4 states
  - Name, description, details, highlights, state info

---

### 4. **Gallery Page** (`/gallery`)
- **Car Carousel**
  - Auto-play carousel with vehicle images
  - Full screen display

- **Our Premium Fleet Section**
  - 8 vehicles displayed as cards
  - **Card Contents**:
    - Vehicle emoji
    - Name (e.g., "Maruti Swift")
    - Type (Hatchback, SUV, etc.)
    - Capacity (passengers)
    - Price per day
    - Features list (5-6 items)
    - "Book Now" button

- **Vehicle Categories**
  - Economy Vehicles (Maruti Swift, Tata Nexon)
  - Premium SUVs (Hyundai Creta, Mahindra XUV 500)
  - Luxury & Group (BMW 5, Tempo, AC Bus)

- **Why Our Fleet**
  - Regular Maintenance
  - Latest Technology
  - Clean & Hygienic
  - Fuel Efficient

---

### 5. **Contact Page** (`/contact`)
- **Header Section**
  - Page title "Contact Us"
  - Subtitle

- **Contact Form (Left Side)**
  - Full Name
  - Email Address
  - Phone Number
  - Subject
  - Message (textarea)
  - Submit button

- **Contact Information (Right Side)**
  - **Address Card**: Varsha Travels, Chennai, TN
  - **Phone Card**: +91 9876543210 (24/7 support)
  - **Email Card**: 3 email addresses (info, bookings, support)
  - **Hours Card**: Business hours
  - **Social Media Links**: Facebook, Instagram, Twitter, WhatsApp

- **Map Section**
  - Embedded Google Map (Chennai, TN)
  - Shows company location

---

### 6. **Book Now Page** (`/booking`)
- **Header Section**
  - Title: "Book Your Journey"
  - Subtitle

- **Booking Form** (Multi-section form)
  - **Personal Information**:
    - Full Name
    - Email Address
    - Phone Number

  - **Travel Details**:
    - Destination dropdown (12 places)
    - Vehicle Type dropdown (8 vehicles)
    - Pickup Date (date picker)
    - Dropoff Date (date picker)
    - Number of Passengers (number input)

  - **Additional Information**:
    - Special Requests/Preferences (textarea)

  - **Terms & Conditions**:
    - Checkbox for agreement

  - **Submit Button**: "Complete Booking"
  - Confirmation message: "We will contact you within 2 hours"

- **FAQ Section**
  - 4 common questions with answers
  - Card-based layout
  - Easy to expand

---

## Component Architecture

### Components (Reusable)
- **Navbar.jsx**: Fixed navigation with routing
- **Footer.jsx**: Common footer for all pages
- **Carousel.jsx**: Reusable carousel component
  - Props: slides, autoPlay, interval
  - Features: Auto-play, manual arrows, dot indicators
  - Smooth transitions with CSS

### Pages (Route-based)
- **Home.jsx**: Landing page with all sections
- **About.jsx**: Company information
- **Destination.jsx**: State-filtered destination explorer
- **Gallery.jsx**: Vehicle fleet showcase
- **Contact.jsx**: Contact information & form
- **Booking.jsx**: Multi-section booking form

### Data
- **data/places.js**: 12 destinations with details & state info
- **data/vehicles.js**: 8 vehicles with specs & pricing

---

## Styling

### Tailwind CSS Configuration
- Custom colors in theme (primary & secondary)
- Animation definitions (fade-in, slide-up, slide-down, pulse-slow, bounce-slow)
- Responsive breakpoints (mobile-first)

### Design Features
- Dark theme (black background)
- Gradient overlays
- Hover effects with scale/translate
- Blur effects on interactive elements
- Border animations
- Smooth transitions (0.3s-1s)
- Box shadows with primary/secondary colors

### Custom CSS
- Smooth scrolling (html)
- Custom scrollbar styling
  - Track: black
  - Thumb: primary color (#ABE7B2)
  - Hover: secondary color (#BBDCE5)

---

## Functionality Highlights

### Carousel Component
- Configurable auto-play (interval adjustable)
- Previous/Next button navigation
- Dot indicators for slide selection
- Smooth opacity transitions (1000ms)
- Works with image URLs or JSX elements

### Form Handling
- Controlled components with state management
- Form validation (required fields)
- Email & phone input types
- Date picker for travel dates
- Submit handlers with console logs & alerts
- Form reset after submission

### Navigation
- React Router v6 implementation
- Route-based page rendering
- Link components for internal navigation
- Active link highlighting on navbar
- Mobile-responsive menu toggle

### Responsive Design
- Mobile-first approach
- Hidden elements on mobile (hamburger shows menu)
- Grid layouts that stack on mobile
- Flexible padding/margins
- Touch-friendly button sizes

---

## Installation & Running

### Prerequisites
```bash
npm install react-router-dom
npm install @splinetool/react-spline (optional, for 3D models)
npm install tailwindcss postcss autoprefixer
```

### Start Dev Server
```bash
npm run dev
```
Server runs at: http://localhost:5174/

### Build for Production
```bash
npm run build
```

---

## File Structure
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Carousel.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Destination.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   └── Booking.jsx
├── data/
│   ├── places.js
│   └── vehicles.js
├── App.jsx
├── App.css
└── index.css
```

---

## Features Summary

✅ Multi-page routing with React Router
✅ Responsive design (mobile, tablet, desktop)
✅ Carousel with auto-play & manual controls
✅ State-based filtering (destinations by state)
✅ Popup modals for place details
✅ Form handling with validation
✅ Smooth animations & transitions
✅ Custom color scheme (#ABE7B2, #BBDCE5)
✅ Gradient backgrounds & overlays
✅ Hover effects on interactive elements
✅ Sticky filters
✅ Embedded Google Maps
✅ Professional UI/UX design
✅ 12 destinations with detailed information
✅ 8 vehicles with specifications
✅ FAQs section
✅ Statistics display
✅ Social media links

---

## Next Steps

1. Replace placeholder images with actual travel photos
2. Connect forms to backend API
3. Implement payment gateway for bookings
4. Add email notifications
5. Add user authentication
6. Add booking management dashboard
7. Integrate with SMS notifications
8. Add testimonials/reviews section
9. SEO optimization
10. Analytics integration

