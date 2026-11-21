/**
 * TEJA CHAGANTI // SOFTWARE ENGINEERING PORTFOLIO SCRIPT
 * Version 2: Recruiter-Focused Engineering Platform
 * Modules: Project Category Filtering, Interactive Terminal Console,
 * Case Study Modal System, Command Palette, Active Nav Spy, Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initMobileNav();
  initProjectFiltering();
  initTerminalConsole();
  initCaseStudyModal();
  initCommandPalette();
  initClipboardActions();
  initTopicComposer();
});

/* ==========================================================================
   01. SCROLL REVEAL & HEADER SPY
   ========================================================================== */
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/* ==========================================================================
   02. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .drawer-footer a');

  function openDrawer() {
    drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   03. INTERACTIVE PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('[data-project-cat]');

  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const cardCats = card.getAttribute('data-project-cat')?.split(' ') || [];
        if (filterValue === 'all' || cardCats.includes(filterValue)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   04. COMPACT TERMINAL CONSOLE
   ========================================================================== */
function initTerminalConsole() {
  const terminalOutput = document.getElementById('terminalOutput');
  const termInput = document.getElementById('termInput');
  if (!terminalOutput || !termInput) return;

  const terminalData = {
    whoami: `
<span class="term-line cyan">Teja Chaganti</span> — Software Developer · Full-Stack Developer · AI Developer
Degree: B.Tech Computer Science & Engineering (Minor: ECE) | CGPA: 8.47 / 10 (2026)
Core Focus: Software engineering, programming, backend systems, APIs, databases, and practical AI integration.`,

    projects: `
<span class="term-line cobalt">01. CareerForge AI</span> -> Full-Stack AI Career Copilot (React.js, Node.js, Express, MongoDB Atlas, REST APIs)
<span class="term-line cobalt">02. QuizVerse</span> -> Real-time Multiplayer Platform (React.js, Node.js, WebSockets, State Engine)
<span class="term-line cobalt">03. FinanceFlow</span> -> AI Personal Finance Platform (React.js, Node.js, Express, MongoDB, Gemini AI)
<span class="term-line cobalt">04. AI-CRM-HCP</span> -> Healthcare CRM & Agentic Workflow (FastAPI, LangGraph, Groq LLM, SQLAlchemy, MySQL)
<span class="term-line cobalt">05. AI Spend Audit</span> -> Developer FinOps & Token Cost Auditor (Python, Node.js, REST APIs)
<span class="term-line cobalt">06. IPL Match Analysis</span> -> Sports Data Science & Interactive Dashboard (Python, Pandas, Plotly, Streamlit)`,

    skills: `
<span class="term-line emerald">[PROGRAMMING]</span> Java, Python, JavaScript (ES6+), C, C++, SQL
<span class="term-line emerald">[CORE CS]</span> Data Structures & Algorithms, OOP, DBMS, SDLC, REST APIs
<span class="term-line emerald">[BACKEND]</span> Node.js, Express.js, FastAPI, JWT Authentication, Microservices Fundamentals
<span class="term-line emerald">[FRONTEND]</span> React.js, Tailwind CSS, HTML5, CSS3, Vite, Material UI
<span class="term-line emerald">[DATABASES]</span> MySQL, MongoDB Atlas, PostgreSQL, SQLAlchemy ORM
<span class="term-line emerald">[AI INTEGRATION]</span> Generative AI, LLMs, LangGraph, OpenRouter, Google Gemini, Groq`,

    architecture: `
<span class="term-line cyan">[SOFTWARE ENGINEERING PRINCIPLES]</span>
1. Clean Modular Design: Separation of concerns across frontend, routing, controllers, and database models.
2. Robust API Design: Stateless JWT authentication, structured error handling, and parameter validation.
3. Database Reliability: Normalized relational schemas (MySQL) and flexible document models (MongoDB).
4. Practical AI: Grounded prompts, deterministic JSON extraction, and low-latency inference.`,

    contact: `
<span class="term-line cyan">Email:</span> <a href="mailto:chagantinvsteja@gmail.com" class="term-line emerald">chagantinvsteja@gmail.com</a>
<span class="term-line cyan">Phone:</span> +91 7382127521
<span class="term-line cyan">GitHub:</span> <a href="https://github.com/Tejachaganti" target="_blank" class="term-line cobalt">github.com/Tejachaganti</a>
<span class="term-line cyan">LinkedIn:</span> <a href="https://www.linkedin.com/in/chaganti-naga-veera-satya-teja-74b3b7327" target="_blank" class="term-line cobalt">linkedin.com/in/chaganti-naga-veera-satya-teja-74b3b7327</a>`,

    resume: `
<span class="term-line emerald">Triggering resume download...</span>
[File: resume.pdf (11 KB, ATS-Optimized) | B.Tech CSE 2026 | CGPA: 8.47 / 10 | 4 Internships]
<a href="resume.pdf" download="Teja_Chaganti_Resume.pdf" class="term-line cobalt">Click here if download does not start automatically</a>`,

    help: `
<span class="term-line cyan">Supported Commands:</span>
  <span class="term-line emerald">whoami</span>       - Candidate identity & qualifications
  <span class="term-line emerald">projects</span>     - Overview of engineered software projects
  <span class="term-line emerald">skills</span>       - Software engineering skills matrix
  <span class="term-line emerald">architecture</span> - Core software development philosophy
  <span class="term-line emerald">contact</span>      - Direct contact details & links
  <span class="term-line emerald">resume</span>       - Download verified resume PDF
  <span class="term-line emerald">clear</span>        - Clear the terminal console window`
  };

  function appendLine(htmlContent) {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    appendLine(`<div class="term-line"><span class="term-prompt-badge">teja@eng-station:~$</span> ${escapeHtml(cmdRaw)}</div>`);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (cmd === 'resume') {
      appendLine(terminalData.resume);
      const link = document.createElement('a');
      link.href = 'resume.pdf';
      link.download = 'Teja_Chaganti_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (terminalData[cmd]) {
      appendLine(terminalData[cmd]);
    } else {
      appendLine(`<span class="term-line dim">Command not recognized: "${escapeHtml(cmdRaw)}". Type <span class="term-line emerald">help</span> for valid commands.</span>`);
    }
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      termInput.value = '';
      handleCommand(val);
    }
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   05. PROJECT CASE STUDY MODAL SYSTEM
   ========================================================================== */
const projectCaseStudies = {
  careerforge: {
    title: 'CareerForge AI',
    category: 'Full-Stack Software Application with AI Capabilities',
    status: 'Primary Project',
    liveUrl: 'https://careerforge-ai-one.vercel.app',
    githubUrl: 'https://github.com/Tejachaganti/CareerForge-AI',
    overview: `CareerForge AI is a complete full-stack web application designed to help job seekers optimize resumes and prepare for technical hiring pipelines. Built with React.js, Node.js, Express.js, and MongoDB Atlas, it integrates external employment APIs (Adzuna) with OpenRouter LLMs to provide ATS scoring, automated gap analysis, and tailored career roadmap planning.`,
    architecture: `
[Client Frontend: React.js SPA + Tailwind CSS]
              │ (RESTful HTTPS Endpoints)
              ▼
[Backend Core: Node.js / Express.js]
  ├── JWT Auth Middleware & Security Headers
  ├── Resume Parsing & Text Extraction Engine
  ├── External Job Search Ingestion (Adzuna API)
  └── AI Co-Pilot & ATS Scoring (OpenRouter API)
              │
              ▼
[Database Layer: MongoDB Atlas Cloud Cluster]
  ├── User Accounts & Encrypted Credentials
  ├── Application Tracking Matrix & Resumes
  └── Cached Skill Maps & Recommendations`,
    features: [
      'React.js single-page application with modular, component-driven design',
      'Node.js & Express RESTful API backend with JWT authentication',
      'Resume text extraction and semantic ATS score evaluation algorithm',
      'Live job vacancy search and match calculation via Adzuna API integration',
      'Skill gap detection comparing user resumes against target job profiles',
      'Interactive interview preparation simulator and career roadmap generator',
      'Job application tracking system with persistent status states in MongoDB Atlas'
    ],
    challenges: `
<strong>1. Structured Data Consistency from Language Models:</strong> Resume evaluations from LLMs initially had variable formatting. Implemented strict JSON schema prompting and validation middleware to guarantee that frontend scoring dashboards receive uniform, typed payload structures.
<br><br>
<strong>2. External Job Ingestion & API Query Handling:</strong> Integrating live queries with Adzuna while maintaining fast response times required backend debouncing, parameter sanitization, and caching strategies.`,
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'OpenRouter AI', 'Adzuna API', 'JWT Authentication', 'Tailwind CSS', 'Vercel', 'Render']
  },

  quizverse: {
    title: 'QuizVerse',
    category: 'Real-Time Multiplayer Platform',
    status: 'Interactive Web Application',
    liveUrl: 'https://quizverse-live-gamma.vercel.app/',
    githubUrl: 'https://github.com/Tejachaganti/quizverse-live',
    overview: `QuizVerse is an interactive multiplayer quiz and trivia software platform engineered for synchronous multi-user sessions. It enables players to generate or enter private rooms via 6-character room codes, participating in live quizzes governed by a synchronized server clock, event-driven state updates, and dynamic leaderboard calculations.`,
    architecture: `
[Player Client A] ───┐                  ┌─── [Player Client B]
                     ▼                  ▼
          [Real-Time Event Sync Layer: WebSockets / Socket.io]
                            │
               [Game State Engine: Node.js / Express]
                 ├── Room Coordinator & Participant Registry
                 ├── Server-Authoritative Question Timer
                 └── Score Calculation & Rank delta Engine
                            │
                            ▼
              [Live In-Memory State & Match History]`,
    features: [
      'Multiplayer room creation and joining using unique 6-character room codes',
      'Real-time communication and synchronized game states across connected clients',
      'Server-authoritative timer preventing client-side latency manipulation',
      'Event-driven architecture handling answer submission, timeouts, and score updates',
      'Instantaneous score calculation based on answer speed, streak, and correctness',
      'Live dynamic leaderboard and match conclusion podium presentation'
    ],
    challenges: `
<strong>1. Synchronous Clocks Across Heterogeneous Connections:</strong> Relying on client clocks produced desynchronization. Resolved this by making the server the sole authoritative source of elapsed time, dispatching countdown events to ensure all participants experience identical question windows.
<br><br>
<strong>2. Connection Drops & Reconnection:</strong> Implemented session-backed room state so brief client disconnections do not terminate active participant records.`,
    stack: ['React.js', 'Node.js', 'Express.js', 'Socket.io / WebSockets', 'Tailwind CSS', 'State Management']
  },

  financeflow: {
    title: 'FinanceFlow',
    category: 'Full-Stack Personal Finance Application',
    status: 'Personal Project',
    liveUrl: 'https://financeflow-mauve.vercel.app',
    githubUrl: 'https://github.com/Tejachaganti/FinanceFlow',
    overview: `FinanceFlow is a full-stack personal finance and expense tracking application. Engineered with React.js, Node.js, Express.js, and MongoDB Atlas, it incorporates secure JWT authentication, speech-to-text expense recording, budget management, interactive spending charts, and an AI financial assistant powered by Google Gemini.`,
    architecture: `
[User Interface: React.js + Tailwind CSS + Vite]
              │ (REST APIs / JWT Authentication)
              ▼
[Backend Services: Node.js & Express.js]
  ├── Password Hashing (bcrypt) & JWT Auth Tokens
  ├── Transaction Controller & Budget Allocation Logic
  ├── Speech Recognition Text-to-Expense Parser
  ├── Google Gemini AI Financial Insights Service
  └── Report Generator (PDF and CSV stream exports)
              │
              ▼
[Cloud Database: MongoDB Atlas]
  ├── Encrypted User Profiles
  ├── Transaction Records & Categorized Ledgers
  └── Monthly Budget Targets`,
    features: [
      'Secure user authentication with JWT tokens and bcrypt password encryption',
      'Expense tracking with categorized ledgers and balance calculations',
      'Monthly budget planner with category limits and visual progress bars',
      'Voice expense recording utilizing browser Web Speech API integration',
      'Interactive financial analytics dashboard displaying trends and expense breakdowns',
      'Exportable PDF statements and CSV transaction records for external record-keeping',
      'Password reset workflow integrated with Resend Email API'
    ],
    challenges: `
<strong>1. Natural Language Voice Expense Processing:</strong> Spoken entries often vary in format (e.g. "spent 20 dollars on lunch yesterday"). Built client-side extraction regex and fallback logic to accurately extract amount, category, and date before committing the record.
<br><br>
<strong>2. Safe Financial AI Prompts:</strong> Tuned Google Gemini prompt constraints to deliver structured, analytical budget breakdowns without producing inaccurate or unauthorized financial claims.`,
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Google Gemini AI', 'Resend API', 'JWT', 'Tailwind CSS', 'Vercel', 'Render']
  },

  aicrm: {
    title: 'AI-CRM-HCP',
    category: 'Healthcare CRM & Agentic Backend',
    status: 'AI Systems Engineering',
    liveUrl: null,
    githubUrl: 'https://github.com/Tejachaganti/AI-CRM-HCP',
    overview: `AI-CRM-HCP is an AI-powered Customer Relationship Management platform engineered for pharmaceutical and life-sciences field representatives. Built with FastAPI, LangGraph, React.js, and SQLAlchemy, it streamlines interaction logging by taking unstructured conversational visit notes and extracting structured relational data (doctor, specialty, sentiment, discussed products, follow-ups) via an agent state graph.`,
    architecture: `
[Field Representative: Voice / Text Interaction Notes]
                        │
                        ▼
[Frontend UI: React.js + Material UI + Redux Toolkit]
                        │ (FastAPI REST Endpoints)
                        ▼
[LangGraph Agentic State Graph (Python / FastAPI)]
  ├── Node 1: HCP Entity Resolver (Doctor name, clinic, specialty)
  ├── Node 2: Sentiment & Clinical Interest Analysis (Groq LLM)
  ├── Node 3: Product Sampling & Discussion Extraction
  └── Node 4: Action Item & Follow-up Scheduler
                        │
                        ▼
[Database Layer: SQLAlchemy ORM -> MySQL / PostgreSQL]
  └── Structured HCP Interaction Records & Follow-up Tasks`,
    features: [
      'Natural-language interaction note logging removing manual multi-field entry',
      'LangGraph multi-step state graph for deterministic entity and sentiment extraction',
      'High-speed LLM inference powered by Groq API hardware accelerators',
      'Healthcare professional directory search and historical interaction logs',
      'Automated extraction of discussed pharmaceutical products and sample quantities',
      'Follow-up task scheduling and reminder dashboard',
      'Asynchronous FastAPI backend with auto-generated interactive Swagger API documentation'
    ],
    challenges: `
<strong>1. Medical Entity Grounding:</strong> To avoid model hallucinations in doctor names or clinic names, LangGraph conditional branches cross-reference extracted entities against existing relational records before inserting new entries.
<br><br>
<strong>2. Low Latency for Mobile Reps:</strong> Integrated Groq LLM inference to ensure end-to-end extraction finishes in under 1 second, making on-site logging practical.`,
    stack: ['FastAPI', 'Python', 'LangGraph', 'Groq LLM', 'React.js', 'Material UI', 'Redux Toolkit', 'SQLAlchemy', 'MySQL', 'Swagger']
  },

  spendaudit: {
    title: 'AI Spend Audit',
    category: 'Developer FinOps & Token Cost Auditor',
    status: 'Developer Tooling',
    liveUrl: null,
    githubUrl: 'https://github.com/Tejachaganti/AI-Spend-Audit',
    overview: `AI Spend Audit is a developer observability and cost tracking utility created to monitor, audit, and forecast expenses across LLM APIs (OpenAI, Gemini, OpenRouter) and cloud resources. It tracks token usage velocities, detects recursive loop anomalies, and generates audit reports to prevent runaway API billing.`,
    architecture: `
[API Ingestion & Proxy Layer]
  ├── Token Counter & Request Interceptor
  ├── Cost Attribution Engine (Model Pricing Index)
  └── Anomaly Detection Heuristics
              │
              ▼
[Audit Engine & Visualizer: Python / Node.js]
  ├── Provider Breakdown (Gemini, OpenRouter, Claude)
  ├── Budget Threshold Alerts & Runaway Loop Warnings
  └── Exportable CSV Audit Reports & Visual Breakdown`,
    features: [
      'Token counting and cost attribution per API endpoint and model tier',
      'Multi-provider pricing index covering OpenRouter, Google Gemini, and OpenAI',
      'Anomaly detection heuristics for runaway loops and recursive prompts',
      'Budget threshold alerts and projected consumption rates',
      'Visual breakdown charts displaying cost per service and model',
      'Exportable audit records for development billing reconciliation'
    ],
    challenges: `
<strong>1. Dynamic Multi-Provider Pricing:</strong> Implemented a centralized pricing registry handling varied input, output, and cached token costs across multiple model generations.
<br><br>
<strong>2. Minimal Overhead:</strong> Engineered the audit logger asynchronously so tracking adds less than 5ms to outbound network calls.`,
    stack: ['Python', 'Node.js', 'REST APIs', 'FinOps Logic', 'Data Visualization']
  },

  ipl: {
    title: 'IPL Match Data Analysis',
    category: 'Sports Analytics & Interactive Dashboard',
    status: 'Data Science',
    liveUrl: null,
    githubUrl: 'https://github.com/Tejachaganti/IPL-Match-Data-Analysis',
    overview: `An exploratory data analysis (EDA) and interactive visualization dashboard analyzing longitudinal match records from the Indian Premier League (IPL). Built with Python, Pandas, NumPy, Plotly, and Streamlit, it uncovers team performance trends, toss outcome impacts, venue biases, and player performance metrics.`,
    architecture: `
[Raw Historical IPL Datasets (CSV / SQL)]
              │
              ▼
[Data Wrangling & Pipeline: Python / Pandas / NumPy]
  ├── Standardized Franchise Names & Handled Missing Values
  ├── Feature Engineering (Toss Correlation, Venue Index)
  └── Aggregate Statistical Modeling
              │
              ▼
[Interactive Dashboard: Streamlit + Plotly]
  ├── Dynamic Venue & Team Filters
  ├── Match Winning Pattern Visualizations
  └── Player of the Match Leaderboard`,
    features: [
      'Historical team performance analysis: match counts, wins, and win percentages',
      'Toss outcome correlation: impact of batting vs. fielding first on match outcomes',
      'Venue-specific insights analyzing home stadium advantages across franchises',
      'Player of the Match awards leaderboard with comparative player metrics',
      'Comprehensive data cleaning, schema normalization, and standardized franchise naming',
      'Interactive Plotly charts rendered within an accessible Streamlit web application'
    ],
    challenges: `
<strong>1. Longitudinal Franchise Inconsistencies:</strong> Addressed franchise renames across seasons (e.g. Delhi Daredevils to Delhi Capitals) through strict mapping dictionaries and data validation.
<br><br>
<strong>2. Responsive Analytical Visualizations:</strong> Built reactive Plotly charts that update dynamically based on user-selected season spans and rival teams.`,
    stack: ['Python', 'Pandas', 'NumPy', 'Plotly', 'Streamlit', 'SQL', 'Data Analytics']
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  if (!modal) return;

  window.openProjectModal = function(projectId) {
    const data = projectCaseStudies[projectId];
    if (!data) return;

    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalOverview').innerHTML = data.overview;
    document.getElementById('modalArchDiagram').textContent = data.architecture.trim();

    const featList = document.getElementById('modalFeaturesList');
    featList.innerHTML = data.features.map(f => `<li style="display:flex;align-items:baseline;gap:8px;font-size:0.86rem;color:var(--text-secondary);"><span style="color:var(--emerald-light);font-weight:700;">✓</span> ${f}</li>`).join('');

    document.getElementById('modalChallenges').innerHTML = data.challenges;

    const stackWrap = document.getElementById('modalStackChips');
    stackWrap.innerHTML = data.stack.map(s => `<span class="stack-chip">${s}</span>`).join('');

    const liveBtn = document.getElementById('modalLiveBtn');
    if (data.liveUrl) {
      liveBtn.style.display = 'inline-flex';
      liveBtn.href = data.liveUrl;
    } else {
      liveBtn.style.display = 'none';
    }

    const ghBtn = document.getElementById('modalGhBtn');
    ghBtn.href = data.githubUrl;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  document.querySelectorAll('[data-case-study]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-case-study');
      openProjectModal(projId);
    });
  });
}

/* ==========================================================================
   06. COMMAND PALETTE (CTRL+K / CMD+K)
   ========================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('cmdModal');
  const triggerBtn = document.querySelector('.cmd-palette-btn');
  const searchInput = document.getElementById('cmdSearchInput');
  const resultsList = document.getElementById('cmdResultsList');
  if (!modal || !searchInput || !resultsList) return;

  const commandItems = [
    { title: 'Home / Hero Overview', category: 'Navigation', action: () => scrollToSection('hero') },
    { title: 'About Me & Philosophy', category: 'Navigation', action: () => scrollToSection('about') },
    { title: 'Software Projects Showcase', category: 'Navigation', action: () => scrollToSection('projects') },
    { title: 'Technical Arsenal & Skills', category: 'Navigation', action: () => scrollToSection('skills') },
    { title: 'Professional Experience & Internships', category: 'Navigation', action: () => scrollToSection('experience') },
    { title: 'Credentials & Certifications', category: 'Navigation', action: () => scrollToSection('certifications') },
    { title: 'GitHub Codebase & Activity', category: 'Navigation', action: () => scrollToSection('github') },
    { title: 'Download Resume (PDF)', category: 'Action', action: () => downloadResume() },
    { title: 'Contact Me / Recruiter Actions', category: 'Navigation', action: () => scrollToSection('contact') },
    { title: 'CareerForge AI (Live Demo)', category: 'Project Link', action: () => window.open('https://careerforge-ai-one.vercel.app', '_blank') },
    { title: 'QuizVerse (Live Demo)', category: 'Project Link', action: () => window.open('https://quizverse-live-gamma.vercel.app/', '_blank') },
    { title: 'FinanceFlow (Live Demo)', category: 'Project Link', action: () => window.open('https://financeflow-mauve.vercel.app', '_blank') },
    { title: 'View GitHub Profile', category: 'Social Link', action: () => window.open('https://github.com/Tejachaganti', '_blank') },
    { title: 'View LinkedIn Profile', category: 'Social Link', action: () => window.open('https://www.linkedin.com/in/chaganti-naga-veera-satya-teja-74b3b7327', '_blank') },
    { title: 'Copy Email Address', category: 'Action', action: () => copyToClipboard('chagantinvsteja@gmail.com', 'Email copied to clipboard!') }
  ];

  function openCmd() {
    modal.classList.add('open');
    searchInput.value = '';
    renderItems(commandItems);
    searchInput.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeCmd() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function scrollToSection(id) {
    closeCmd();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function downloadResume() {
    closeCmd();
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Teja_Chaganti_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloading verified resume...');
  }

  function renderItems(items) {
    resultsList.innerHTML = items.map((item, idx) => `
      <li class="cmd-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="color:var(--cobalt-light);">›</span>
          <span>${item.title}</span>
        </div>
        <span style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);">${item.category}</span>
      </li>
    `).join('');

    resultsList.querySelectorAll('.cmd-item').forEach((li, idx) => {
      li.addEventListener('click', () => {
        items[idx].action();
      });
    });
  }

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = commandItems.filter(item => 
      item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
    renderItems(filtered);
  });

  searchInput.addEventListener('keydown', (e) => {
    const items = resultsList.querySelectorAll('.cmd-item');
    let activeIdx = Array.from(items).findIndex(el => el.classList.contains('active'));

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeIdx < items.length - 1) {
        items[activeIdx]?.classList.remove('active');
        items[activeIdx + 1]?.classList.add('active');
        items[activeIdx + 1]?.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeIdx > 0) {
        items[activeIdx]?.classList.remove('active');
        items[activeIdx - 1]?.classList.add('active');
        items[activeIdx - 1]?.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const currentActive = items[activeIdx];
      if (currentActive) {
        currentActive.click();
      }
    }
  });

  triggerBtn?.addEventListener('click', openCmd);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCmd();
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closeCmd();
      } else {
        openCmd();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeCmd();
    }
  });
}

/* ==========================================================================
   07. CLIPBOARD ACTIONS & TOAST NOTIFICATION
   ========================================================================== */
function copyToClipboard(text, message) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message || 'Copied to clipboard!');
    }).catch(() => fallbackCopy(text, message));
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(message || 'Copied to clipboard!');
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(textarea);
}

function showToast(msg) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:var(--emerald-light);">✓</span> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initClipboardActions() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetText = el.getAttribute('data-copy');
      const msg = el.getAttribute('data-copy-msg') || 'Copied to clipboard!';
      copyToClipboard(targetText, msg);
    });
  });
}

/* ==========================================================================
   08. RECRUITER TOPIC COMPOSER
   ========================================================================== */
function initTopicComposer() {
  const topicPills = document.querySelectorAll('.topic-pill');
  const mainMailLink = document.getElementById('composerSendBtn');
  if (!mainMailLink) return;

  const emailBase = 'chagantinvsteja@gmail.com';

  const topics = {
    fulltime: {
      subject: 'Interview Invitation / Software Developer Opportunity',
      body: 'Hi Teja,\n\nWe reviewed your software engineering portfolio and were impressed with your projects, computer science foundations, and practical full-stack development experience. We would like to discuss a Software Developer / Full-Stack Engineer opportunity with our team.\n\nBest regards,\n[Your Name / Company]'
    },
    project: {
      subject: 'Software Engineering / Full-Stack Project Collaboration',
      body: 'Hi Teja,\n\nI reviewed your portfolio and would like to discuss a software project collaboration involving full-stack development and backend APIs.\n\nLooking forward to speaking with you!\n\nBest,\n[Your Name]'
    },
    chat: {
      subject: 'Technical Coffee Chat & Engineering Connect',
      body: 'Hi Teja,\n\nI really liked your projects and would love to connect for a quick technical chat to discuss your software engineering journey.\n\nCheers,\n[Your Name]'
    }
  };

  topicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      topicPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');

      const key = pill.getAttribute('data-topic');
      const selected = topics[key] || topics.fulltime;
      
      const mailtoUrl = `mailto:${emailBase}?subject=${encodeURIComponent(selected.subject)}&body=${encodeURIComponent(selected.body)}`;
      mainMailLink.href = mailtoUrl;
    });
  });
}
