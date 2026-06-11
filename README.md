# 🎯 Quizzer

> **Transform PDF documents into interactive quizzes in seconds.**  
> A smart, free web application that automatically generates quiz questions from your PDF files, complete with instant scoring and performance analytics.

![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

---

## ✨ Features

-  **Smart PDF Processing** — Upload any PDF and instantly extract content
-  **Auto Quiz Generation** — AI-powered dynamic question creation from document text
-  **Multiple Question Types** — Multiple choice, true/false, and fill-in-the-blank formats
-  **Real-time Scoring** — Get instant feedback with detailed performance metrics
-  **Quiz History** — Track your learning progress and revisit past quizzes
-  **Clean, Intuitive UI** — Responsive design that works on desktop, tablet, and mobile
-  **Fast & Lightweight** — Optimized performance for smooth user experience
-  **Privacy First** — All processing happens locally; your PDFs are never stored on servers

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React.js 18+ |
| **Styling** | CSS3 / Tailwind CSS |
| **PDF Processing** | PDF.js, pdfjs-dist |
| **State Management** | React Hooks (useState, useEffect, useContext) |
| **Build Tool** | Vite / Create React App |
| **Version Control** | Git & GitHub |

---

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/unsazareenwork-alt/quizzer.git
   cd quizzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📖 How to Use

### 1. Upload Your PDF
- Click the **"Upload PDF"** button
- Select a PDF file from your computer
- Wait for the document to be processed (progress bar shows extraction status)

### 2. Generate Quiz
- Once processed, click **"Generate Quiz"**
- Choose difficulty level: Easy, Medium, Hard
- Select number of questions (5-20)
- Click **"Create Quiz"**

### 3. Take the Quiz
- Answer all questions displayed on screen
- Submit your answers when ready
- View instant feedback and score breakdown

### 4. Review Results
- See your total score and percentage
- Review questions you got wrong
- View detailed explanations
- Export results as PDF (coming soon)

---

## 📁 Project Structure

```
quizzer/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── PDFUploader.jsx         # PDF upload and processing
│   │   ├── QuizGenerator.jsx       # Quiz configuration
│   │   ├── QuizInterface.jsx       # Quiz display and interaction
│   │   └── ResultsPage.jsx         # Score and feedback display
│   ├── services/
│   │   ├── pdfService.js           # PDF extraction logic
│   │   ├── quizService.js          # Quiz generation algorithms
│   │   └── storageService.js       # LocalStorage management
│   ├── styles/
│   │   ├── global.css
│   │   └── components.css
│   ├── App.jsx
│   └── index.js
├── package.json
├── .gitignore
└── README.md
```

---

##  How It Works (Technical Deep Dive)

### PDF Processing Pipeline
1. **File Upload** → User selects a PDF file
2. **Extraction** → PDF.js library extracts text and metadata
3. **Text Cleaning** → Remove formatting artifacts and normalize content
4. **Chunking** → Break text into logical sections
5. **Analysis** → Identify key concepts and important sentences

### Quiz Generation Algorithm
1. **Content Analysis** → Analyze extracted text for key terms and concepts
2. **Question Formation** → Generate questions based on identified content
3. **Answer Creation** → Create plausible correct and incorrect options
4. **Difficulty Assignment** → Categorize questions by complexity level
5. **Shuffling** → Randomize question order for variety

### Scoring & Analytics
- Real-time score calculation as user submits answers
- Performance breakdown by question type
- Time tracking for each quiz attempt
- Historical data stored in browser's LocalStorage

---

##  Key Features in Detail

### Smart PDF Extraction
- Handles multi-page documents
- Preserves text formatting and structure
- Intelligent section detection
- Supports scanned PDFs (OCR-ready for future enhancement)

### Dynamic Quiz Generation
- Context-aware question creation
- Multiple difficulty levels
- Diverse question formats
- Prevents duplicate questions from same content

### User Analytics
- Track quiz performance over time
- Identify weak areas
- Set learning goals
- Export study statistics

---

## 🚧 Upcoming Features

- [ ] **User Accounts** — Save quizzes and track long-term progress
- [ ] **OCR Support** — Process scanned and image-based PDFs
- [ ] **Quiz Sharing** — Share generated quizzes with classmates
- [ ] **Collaborative Learning** — Multi-player quiz modes
- [ ] **Custom Question Editor** — Manually edit auto-generated questions
- [ ] **Mobile App** — Native iOS and Android applications
- [ ] **Question Bank** — Access pre-made quizzes from other users
- [ ] **Export Options** — Download quizzes as DOCX, PDF, or JSON

---

##  Contributing

Contributions are welcome! Whether it's bug fixes, feature requests, or improvements, here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow React best practices and hooks conventions
- Write clean, commented code
- Test features thoroughly before submitting PR
- Update README if adding new features
- Keep commits atomic and descriptive

---

## 🐛 Known Issues & Limitations

| Issue | Status | Details |
|-------|--------|---------|
| Large PDF Processing |  | Files >50MB may cause browser slowdown |
| OCR for Scanned PDFs |  | Currently text-based PDFs only |
| Cross-browser Support |  | Works on Chrome, Firefox, Safari, Edge |
| Mobile Responsiveness |  | Fully responsive design |

---

##  Performance Metrics

- **Average Quiz Generation Time**: <5 seconds for 10-page PDF
- **Browser Storage**: LocalStorage (~5MB per quiz history)
- **Bundle Size**: ~150KB (gzipped)
- **Supported PDF Size**: Up to 50MB

---

##  Support & Contact

- **GitHub Issues** — Report bugs and request features
- **Email** — unsazareenwork@gmail.com
- **LinkedIn** — [Unsa Zareen](https://www.linkedin.com/in/unsa-zareen-4b63b530b)

---

##  License

This project is licensed under the MIT License — see the LICENSE file for details.

---

##  Acknowledgments

- **PDF.js** — For powerful PDF processing capabilities
- **React Community** — For excellent documentation and tools
- **All Contributors** — Who've helped improve this project

---

## 🎓 Learning Resources

If you're interested in understanding the technologies used:
- [React.js Documentation](https://react.dev)
- [PDF.js Official Guide](https://mozilla.github.io/pdf.js/)
- [JavaScript ES6+ Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

---

<div align="center">

**Made with ❤️ by [Unsa Zareen](https://github.com/unsazareenwork-alt)**

⭐ **If you find this useful, please consider starring the repository!**

</div>
