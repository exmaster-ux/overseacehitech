# Team Images Directory

This directory contains professional photos of OVERSEACE HITECH team members.

## Image Requirements

### File Naming Convention:
- Use lowercase letters and hyphens
- Format: `firstname-lastname.jpg`
- Example: `ernest-mwakasenga.jpg`

### Image Specifications:
- **Format**: JPG or PNG
- **Dimensions**: 400x400px minimum (square aspect ratio preferred)
- **File Size**: Under 500KB for optimal loading
- **Quality**: High resolution, professional headshots

## Current Team Members:

1. **ernest-mwakasenga.jpg** - Ernest G. Mwakasenga (Managing Director) - Team Member #001
2. **wendo-kaisi.jpg** - Wendo Kaisi (Accountant) - Team Member #002
3. **fatma-mmwamtemi.jpg** - Fatma Mmwamtemi (Operations Officer) - Team Member #003
4. **saumu-shabani.jpg** - Saumu Shabani (Operations Officer) - Team Member #004
5. **joyce-mkamila.jpg** - Joyce Mkamila (Declarant Officer) - Team Member #005
6. **haule-nicholaus.jpg** - Haule Nicholaus (Documentation Specialist) - Team Member #006

## Fallback System:
If an image is not found, the system will automatically display a professional icon placeholder with the appropriate role-specific icon.

## Adding New Team Members:
1. Add the image file to this directory following the naming convention
2. Update the HTML in index.html with the new team member's information
3. Update this README file with the new team member details
```

## Updated CSS for Team Section

```css:css/team-enhancements.css
/* Team Section Enhancements */
.team-member-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.team-member-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.team-member-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
    z-index: 1;
}

.team-member-card:hover::before {
    left: 100%;
}

.team-image-container {
    position: relative;
    overflow: hidden;
}

.team-image-container img {
    transition: transform 0.3s ease;
}

.team-image-container:hover img {
    transform: scale(1.05);
}

/* Team member number badge */
.team-member-number {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(37, 99, 235, 0.9);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
}

/* Managing Director special styling */
.managing-director-card {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #3b82f6;
    position: relative;
}

.managing-director-card::after {
    content: '★';
    position: absolute;
    top: 15px;
    left: 15px;
    color: #fbbf24;
    font-size: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Team statistics animation */
.team-stat-number {
    animation: countUp 2s ease-out;
}

@keyframes countUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments for team section */
@media (max-width: 768px) {
    .team-member-card {
        margin-bottom: 1.5rem;
    }
    
    .team-image-container {
        height: 200px;
    }
    
    .managing-director-card .w-32.h-32 {
        width: 120px;
        height: 120px;
    }
}

@media (max-width: 480px) {
    .team-image-container {
        height: 180px;
    }
    
    .team-member-card .p-6 {
        padding: 1rem;
    }
    
    .managing-director-card .w-32.h-32 {
        width: 100px;
        height: 100px;
    }
}

/* Loading animation for team images */
.team-image-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
```

## Update the main HTML to include the CSS file

Add this line in the `<head>` section of your index.html:

```html:index.html
<link rel="stylesheet" href="css/team-enhancements.css">
```

## Create a Team Data JSON file for easy management

```json:data/team-members.json
{
  "managingDirector": {
    "id": "001",
    "name": "Ernest G. Mwakasenga",
    "position": "Managing Director",
    "image": "images/team/ernest-mwakasenga.jpg",
    "description": "Entrepreneurial leader with extensive experience in logistics and business development across East Africa.",
    "email": "ernest@overseacehitech.com",
    "phone": "+255 717 225 030"
  },
  "teamMembers": [
    {
      "id": "002",
      "name": "Wendo Kaisi",
      "position": "Accountant",
      "image": "images/team/wendo-kaisi.jpg",
      "description": "Responsible for financial management, budgeting, and ensuring accurate financial reporting for all company operations.",
      "department": "Finance",
      "icon": "fas fa-calculator"
    },
    {
      "id": "003",
      "name": "Fatma Mmwamtemi",
      "position": "Operations Officer",
      "image": "images/team/fatma-mmwamtemi.jpg",
      "description": "Oversees daily operations, coordinates logistics activities, and ensures smooth workflow across all departments.",
      "department": "Operations",
      "icon": "fas fa-cogs"
    },
    {
      "id": "004",
      "name": "Saumu Shabani",
      "position": "Operations Officer",
      "image": "images/team/saumu-shabani.jpg",
      "description": "Manages operational processes, client communications, and ensures timely delivery of logistics services.",
      "department": "Operations",
      "icon": "fas fa-clipboard-list"
    },
    {
      "id": "005",
      "name": "Joyce Mkamila",
      "position": "Declarant Officer",
      "image": "images/team/joyce-mkamila.jpg",
      "description": "Handles customs declarations, ensures compliance with regulations, and manages import/export documentation.",
      "department": "Customs",
      "icon": "fas fa-file-signature"
    },
    {
      "id": "006",
      "name": "Haule Nicholaus",
      "position": "Documentation Specialist",
      "image": "images/team/haule-nicholaus.jpg",
      "description": "Manages all documentation processes, maintains records, and ensures proper filing of all logistics paperwork.",
      "department": "Documentation",
      "icon": "fas fa-folder-open"
    }
  ]
}
