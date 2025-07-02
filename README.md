# OVERSEACE HITECH INDUSTRIAL COMPANY LIMITED

## Project Overview

A comprehensive logistics and freight forwarding company website featuring modern design, interactive quote calculator, client success stories, and backend integration for form processing.

## Features Completed

### ✅ Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Hero Slider**: 4-slide carousel with navigation
- **Quote Calculator**: Real-time pricing estimation with multiple factors
- **Client Success Stories**: Showcase of 3 major client projects
- **Company History Timeline**: Detailed journey from 2013 to present
- **Gallery System**: Categorized images and videos with filtering
- **Contact Forms**: Multiple contact methods with validation
- **Performance Optimization**: Lazy loading, WebP support, CDN integration

### ✅ Backend Integration
- **PHP Form Processing**: Handles contact and quote requests
- **Email System**: HTML email templates with company branding
- **Data Validation**: Server-side input sanitization and validation
- **Error Handling**: Comprehensive error management
- **Logging System**: Form submission tracking

### ✅ Quote Calculator Features
- **Service-based Pricing**: Different base prices for each service type
- **Weight Calculation**: $50 per 100kg pricing factor
- **Distance Calculation**: $30 per 100km pricing factor
- **Cargo Type Multipliers**: 
  - General Cargo: 1.0x
  - Hazardous Materials: 1.5x
  - Perishable Goods: 1.3x
  - Oversized/Heavy Cargo: 2.0x
  - Containers: 1.2x
  - Vehicles: 1.4x
- **Timeline Multipliers**:
  - Urgent (24 hours): 2.0x
  - ASAP (3 days): 1.5x
  - Within a week: 1.2x
  - Within a month: 1.0x
  - Flexible: 0.9x
- **Quick Distance Reference**: Pre-defined routes for common destinations

## File Structure

```
Documents/Overseace/
├── index.html              # Homepage with all main features
├── services.html           # Services page
├── gallery.html           # Gallery page
├── process-form.php       # Backend form processing
├── config.php             # Configuration settings
├── README.md              # This documentation
├── js/
│   └── performance-optimizer.js  # Performance optimization script
├── images/
│   ├── hero/              # Hero slider images
│   ├── services/          # Service-related images
│   ├── gallery/           # Gallery images
│   └── backgrounds/       # Background images
└── videos/                # Promotional videos (overcv.mp4 to overcv12.mp4)
```

## Setup Instructions

### Prerequisites
- Web server with PHP support (Apache/Nginx)
- PHP 7.4 or higher
- Mail server configuration (for email functionality)

### Installation
1. Upload all files to your web server
2. Configure email settings in `config.php`
3. Set proper file permissions:
   ```bash
   chmod 644 *.html *.php *.md
   chmod 755 js/ images/ videos/
   chmod 666 form_submissions.log (create if doesn't exist)
   ```
4. Test form functionality by submitting a contact form

### Email Configuration
Update the following in `config.php`:
- `ADMIN_EMAIL`: Your email address to receive form submissions
- `FROM_EMAIL`: The sender email address
- Configure your server's mail settings

## Client Success Stories

### 1. Burundi Cement Company
- **Services**: Transportation of coal and gypsum, loading/offloading, clearing and forwarding
- **Scope**: Industrial materials logistics from Dar es Salaam Port to Burundi

### 2. State Mining Corporation
- **Services**: Coal transportation and shunting operations
- **Scope**: Specialized mining logistics with safety compliance

### 3. Heya Cereals and Nut Limited
- **Services**: Maize supply, transportation, clearing and forwarding
- **Scope**: Complete agricultural supply chain management

## Company History Timeline

- **2013**: Company foundation and incorporation
- **2014**: TRA accreditation as customs clearing agent
- **2016**: Regional expansion to 8 East African countries
- **2018**: Fleet modernization with GPS tracking
- **2020**: Digital transformation and system implementation
- **2023**: Celebrating 10 years of excellence

## Technical Features

### Performance Optimization
- Lazy loading for images and videos
- WebP format support detection
- Progressive loading of critical resources
- Minified CSS and optimized JavaScript

### Security Features
- Input sanitization and validation
- CSRF protection ready
- Rate limiting capabilities
- Error logging and monitoring

### SEO Optimization
- Semantic HTML structure
- Meta tags and descriptions
- Structured content organization
- Mobile-friendly design

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact Information
- **Email**: mudyhajixpro@gmail.com
- **Company**: OVERSEACE HITECH INDUSTRIAL COMPANY LIMITED
- **Registration**: Company No. 104318
- **Established**: December 3, 2013

## License
© 2024 OVERSEACE HITECH INDUSTRIAL COMPANY LIMITED. All rights reserved.
