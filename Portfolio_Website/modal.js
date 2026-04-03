// ================================================================
//  PREMIUM FEATURES — Resume Modal & Project Detail Modal
//  GitHub Deployment Version
// ================================================================

// ── Resume Modal ────────────────────────────────────────────────

function openResumeModal() {
  document.getElementById('resumeModal').classList.add('active');
  document.body.classList.add('modal-open');
}

function closeResumeModal() {
  document.getElementById('resumeModal').classList.remove('active');
  document.body.classList.remove('modal-open');
}

// ── Project Detail Modal ────────────────────────────────────────

var projectExtraData = {
  'SatyaMath': {
    category: 'Blockchain',
    tech: ['Ethereum', 'Solidity', 'MetaMask', 'Ganache', 'Hardhat', 'JavaScript', 'Web3.js'],
    features: [
      'Secure commit-reveal voting mechanism for vote privacy',
      'Smart contract deployment on Ethereum test networks',
      'MetaMask wallet integration for user authentication',
      'Tamper-proof, decentralized, and transparent voting',
      'Local testing environment with Ganache blockchain'
    ],
    description: 'A secure blockchain-based e-voting system using a commit-reveal scheme to ensure vote privacy and integrity. Built on Ethereum with smart contracts for transparent, decentralized voting and MetaMask for wallet-based authentication.'
  },
  'Apna Apna Dekh': {
    category: 'Frontend',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
    features: [
      'Real-time expense tracking with dynamic graph updates',
      'Glowing neon-themed UI with modern design',
      'Zero-login simplicity for instant use',
      'Interactive pie and bar chart visualizations',
      'Persistent data storage using localStorage'
    ],
    description: 'A sleek personal expense tracker featuring real-time graph updates and a glowing neon UI. Built entirely with frontend technologies and Chart.js for beautiful data visualizations, requiring no login for maximum simplicity.'
  },
  'Jaan Pehchaan': {
    category: 'Java / DSA',
    tech: ['Java', 'Graph Theory', 'Data Structures', 'Algorithms', 'CLI'],
    features: [
      'Graph-based friend recommendation algorithm',
      'Mutual connection analysis for smart suggestions',
      'Social pattern recognition for better matches',
      'Feature-rich command-line interface',
      'Efficient data structures for managing relationships'
    ],
    description: 'A Java-powered friend recommender system for your social circle. Leverages graph-based algorithms to provide intelligent suggestions based on mutual connections and social patterns, accessible through a feature-rich CLI.'
  },
  'Karawaan': {
    category: 'Java / DSA',
    tech: ['Java', 'Swing GUI', "Dijkstra's Algorithm", 'Graph Theory', 'Weighted Graphs'],
    features: [
      "Shortest path finding using Dijkstra's algorithm",
      'Interactive Java Swing graphical interface',
      'VIT campus map with real locations',
      'Scalable graph-based architecture',
      'Visual route display on the campus map'
    ],
    description: "A Java-based route finder built for navigating the VIT campus using Dijkstra's Algorithm for optimal pathfinding. Features a user-friendly Swing GUI with interactive route visualization and a scalable graph architecture."
  },
  'Apna_Adda': {
    category: 'Full Stack',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'HTML/CSS', 'JavaScript'],
    features: [
      'Real-time property listing and search',
      'Admin dashboard with full CRUD operations',
      'MongoDB Atlas integration for cloud storage',
      'Tenant management and communication tools',
      'Responsive design optimized for all devices'
    ],
    description: 'A smart property listing and tenant management platform featuring real-time listings, comprehensive admin controls, and MongoDB integration. Built as a full-stack MERN-style application for seamless property management.'
  },
  'Anugrah': {
    category: 'Full Stack',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Multer', 'HTML/CSS', 'JavaScript'],
    features: [
      'Donation item form with comprehensive fields',
      'Image upload via Multer middleware',
      'Location-based donation tracking system',
      'User authentication with login/logout',
      'Responsive, mobile-friendly interface'
    ],
    description: 'A responsive donation management platform where users can submit items for donation with details including location mapping and image uploads. Features complete user authentication with secure session management.'
  },
  'Next Generation Ride': {
    category: 'Java / DSA',
    tech: ['Java', 'Swing GUI', 'Graph Theory', 'LinkedList', 'HashMap', 'OOP'],
    features: [
      'Graph-based route optimization for rides',
      'Dynamic cab booking and assignment system',
      'Driver management using HashMap for fast lookups',
      'Ride history tracking with LinkedList',
      'Intuitive Java Swing graphical interface'
    ],
    description: 'A Java Swing cab booking application leveraging graph theory for route optimization. Implements LinkedList for ride history management and HashMap for efficient driver lookup, all wrapped in an intuitive desktop interface.'
  },
  'Aqual Insights': {
    category: 'Full Stack',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'JavaScript', 'HTML/CSS'],
    features: [
      'Real-time water quality monitoring dashboard',
      'Community-driven issue reporting system',
      'MongoDB-powered persistent data storage',
      'RESTful API backend with Express.js',
      'Interactive charts for data visualization'
    ],
    description: 'A real-time water quality monitoring and issue reporting platform. Powered by MongoDB for data persistence and Node.js for the backend server, providing comprehensive dashboards for tracking water quality metrics and community reports.'
  },
  'Next_Gen_Ride': {
    category: 'Full Stack / IoT',
    tech: ['NFC', 'GPS Tracking', 'UPI Integration', 'Digital Wallet', 'Node.js', 'MongoDB'],
    features: [
      'NFC-based contactless tap-to-ride system',
      'GPS-powered real-time route tracking',
      'Integrated digital wallet management',
      'Seamless UPI payment gateway',
      'Distance-based smart fare calculation for students'
    ],
    description: 'An NFC-based, GPS-powered student transportation fare system with integrated digital wallets and seamless UPI payment support. Specifically designed for student commuters with intelligent fare calculation based on GPS-tracked distances.'
  }
};

function openProjectModal(data) {
  var modal = document.getElementById('projectModal');

  document.getElementById('projectModalImage').src = data.imgSrc;
  document.getElementById('projectModalImage').alt = data.title;
  document.getElementById('projectModalTitle').textContent = data.title;
  document.getElementById('projectModalCategory').textContent = data.category;
  document.getElementById('projectModalDesc').textContent = data.description;

  // Tech tags
  var techContainer = document.getElementById('projectModalTech');
  techContainer.innerHTML = '';
  data.tech.forEach(function (t) {
    var tag = document.createElement('span');
    tag.className = 'project-modal-tech-tag';
    tag.textContent = t;
    techContainer.appendChild(tag);
  });

  // Features list
  var featContainer = document.getElementById('projectModalFeatures');
  featContainer.innerHTML = '';
  data.features.forEach(function (f) {
    var li = document.createElement('li');
    li.textContent = f;
    featContainer.appendChild(li);
  });

  // Repository link
  var repoBtn = document.getElementById('projectModalRepoBtn');
  repoBtn.href = data.repoUrl;

  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.classList.remove('modal-open');
}

// ── Init Features ────────────────────────────────────────────────

function initFeatures() {

  // Resume: Intercept the "Download Resume" button
  var allExploreLinks = document.querySelectorAll('.explore');
  allExploreLinks.forEach(function (link) {
    if (link.textContent.trim() === 'Download Resume') {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openResumeModal();
      });
    }
  });

  // Resume: Tab switching
  document.querySelectorAll('.resume-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.resume-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      document.querySelectorAll('.resume-tab-panel').forEach(function (p) {
        p.classList.remove('active');
      });
      tab.classList.add('active');
      var panelId = 'tab-' + tab.getAttribute('data-tab');
      document.getElementById(panelId).classList.add('active');
    });
  });

  // Projects: Attach click handlers to every .card
  document.querySelectorAll('#work1 .card').forEach(function (card) {
    card.style.position = 'relative';

    card.addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

      var imgEl = card.querySelector('.image-wrapper img.default-img') || card.querySelector('img');
      var titleEl = card.querySelector('h4');
      var descEl = card.querySelector('p');
      var btnEl = card.querySelector('button');

      var title = titleEl ? titleEl.textContent.trim() : 'Project';
      var desc = descEl ? descEl.textContent.trim() : '';
      var repoUrl = '#';

      if (btnEl && btnEl.getAttribute('onclick')) {
        var match = btnEl.getAttribute('onclick').match(/'([^']+)'/);
        if (match) repoUrl = match[1];
      }

      var extra = projectExtraData[title] || {};

      openProjectModal({
        imgSrc: imgEl ? imgEl.src : '',
        title: title,
        category: extra.category || 'Project',
        description: extra.description || desc,
        tech: extra.tech || [],
        features: extra.features || [],
        repoUrl: repoUrl
      });
    });
  });
}

// Run immediately if DOM is already parsed, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeatures);
} else {
  initFeatures();
}

// Close on overlay click
document.addEventListener('click', function (e) {
  if (e.target.id === 'resumeModal') closeResumeModal();
  if (e.target.id === 'projectModal') closeProjectModal();
});

// Close on ESC key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeResumeModal();
    closeProjectModal();
  }
});
