# S Annapoorani - Portfolio Website

A responsive, high-performance personal portfolio website for **S Annapoorani**, a Computer Science student from Coimbatore, Tamil Nadu.

## Features
- **Responsive Layout**: Designed for mobile, tablet, laptop, and desktop viewports.
- **Color Theme**: Clean Light-Blue and Dark-Blue design with toggleable Dark Mode (saved in `localStorage`).
- **Typography**: Google Fonts (Lato / Open Sans) with crisp hierarchy and readable typography.
- **Hero Section**: Typist animation effect, description, direct navigation buttons, resume download link, and initial avatar badge.
- **Technical Skills**: Animated progress bars (C, Python, Java, JavaScript) and spoken languages.
- **Projects**: Grid layout linking to GitHub repositories (including Scholarship Eligibility Verification and String Utility Box).
- **Academic Performance**: Compact semester marks table with custom styled header and tabular numerals.
- **Certifications**: 13 verified certifications (Coursera, Celonis Academy, ICT Academy, FutureSkills Prime / NASSCOM) in a 2-column card grid.
- **Contact Form with Strict Name Validation**:
  - Restricts Name input to alphabetic letters `A-Z`, `a-z`, and single spaces between words.
  - Rejects numbers, special characters, punctuation, and emojis.
  - Real-time `beforeinput` prevention of invalid keystrokes and double spaces.
  - Paste sanitization and warning for stripped characters.
  - Validates against regex: `^[A-Za-z]+(?: [A-Za-z]+)*$`.
  - Honest submission feedback with clear Demo Mode disclosure when no backend email server is connected.
- **Back-to-Top Button**: Floating scroll-to-top button appearing smoothly on scroll.

## Project Structure
```
.
├── index.html                # Semantic HTML5 markup
├── style.css                 # Custom CSS with responsive styling & dark mode
├── script.js                 # Dynamic rendering, typing animation, & strict validation
├── S_Annapoorani_Resume.pdf  # Resume document
└── README.md                 # Documentation
```

## Running Locally
Open `index.html` directly in any web browser, or serve it using any local HTTP server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## GitHub Pages Deployment
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio website with strict name validation"
   git branch -M main
   git remote add origin https://github.com/Annapoorani1208/portfolio.git
   git push -u origin main
   ```
2. Enable GitHub Pages under **Repository Settings > Pages**:
   - Source: Deploy from branch `main` / root.
   - Live URL: `https://annapoorani1208.github.io/portfolio/`
