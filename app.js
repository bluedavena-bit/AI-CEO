// AI CEO™ Application - Main Logic

// State Management
const appState = {
    currentQuestion: 1,
    totalQuestions: 6,
    formData: {},
    ceoScore: 0
};

// DOM Elements
const heroSection = document.getElementById('hero');
const quizSection = document.getElementById('quiz');
const resultsSection = document.getElementById('results');
const quizForm = document.getElementById('quizForm');
const progressFill = document.getElementById('progressFill');
const currentQuestionSpan = document.getElementById('currentQuestion');

// Buttons
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const restartBtn = document.getElementById('restartBtn');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
    updateProgressBar();
});

// Event Listeners
function attachEventListeners() {
    startBtn.addEventListener('click', () => startQuiz());
    backBtn.addEventListener('click', () => goToHero());
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextQuestion();
    });
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        previousQuestion();
    });
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitQuiz();
    });
    downloadBtn.addEventListener('click', () => downloadBlueprint());
    shareBtn.addEventListener('click', () => shareBlueprint());
    restartBtn.addEventListener('click', () => resetApp());
}

// Navigation Functions
function startQuiz() {
    heroSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    showQuestion(1);
}

function goToHero() {
    quizSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
}

function showQuestion(questionNumber) {
    // Hide all slides
    document.querySelectorAll('.question-slide').forEach(slide => {
        slide.classList.add('hidden');
    });

    // Show current slide
    const currentSlide = document.querySelector(`[data-question="${questionNumber}"]`);
    if (currentSlide) {
        currentSlide.classList.remove('hidden');
    }

    // Update UI
    appState.currentQuestion = questionNumber;
    updateProgressBar();
    updateButtonStates();
}

function nextQuestion() {
    if (validateCurrentQuestion()) {
        if (appState.currentQuestion < appState.totalQuestions) {
            showQuestion(appState.currentQuestion + 1);
            window.scrollTo(0, 0);
        }
    }
}

function previousQuestion() {
    if (appState.currentQuestion > 1) {
        showQuestion(appState.currentQuestion - 1);
        window.scrollTo(0, 0);
    }
}

function updateProgressBar() {
    const progress = (appState.currentQuestion / appState.totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestionSpan.textContent = appState.currentQuestion;
}

function updateButtonStates() {
    // Show/hide previous button
    prevBtn.style.display = appState.currentQuestion > 1 ? 'block' : 'none';

    // Show/hide next button and submit button
    if (appState.currentQuestion === appState.totalQuestions) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Form Validation
function validateCurrentQuestion() {
    const currentSlide = document.querySelector(`[data-question="${appState.currentQuestion}"]`);
    const inputs = currentSlide.querySelectorAll('input, textarea');
    
    for (let input of inputs) {
        if (input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA') {
            if (!input.value.trim()) {
                showValidationError(input);
                return false;
            }
        } else if (input.type === 'radio') {
            const name = input.name;
            const isChecked = currentSlide.querySelector(`input[name="${name}"]:checked`);
            if (!isChecked) {
                showValidationError(currentSlide.querySelector(`input[name="${name}"]`));
                return false;
            }
        }
    }
    
    return true;
}

function showValidationError(input) {
    input.style.borderColor = '#ef4444';
    setTimeout(() => {
        input.style.borderColor = '';
    }, 2000);
}

// Form Submission
function submitQuiz() {
    if (validateCurrentQuestion()) {
        collectFormData();
        calculateCEOScore();
        generateResults();
        showResults();
    }
}

function collectFormData() {
    const formElements = quizForm.elements;
    
    appState.formData = {
        name: formElements['name'].value.trim(),
        currentRole: formElements['currentRole'].value,
        primaryGoal: formElements['primaryGoal'].value,
        incomeLevel: formElements['incomeLevel'].value,
        challenge: formElements['challenge'].value.trim(),
        email: formElements['email'].value.trim(),
        newsletter: formElements['newsletter'].checked
    };
}

// CEO Score Calculation
function calculateCEOScore() {
    let baseScore = 70;
    
    // Adjust based on responses
    const incomeMap = {
        '$0-30K': -15,
        '$30K-60K': -5,
        '$60K-100K': 0,
        '$100K-200K': 10,
        '$200K+': 15
    };
    
    const roleMap = {
        'Employee': -5,
        'Entrepreneur': 15,
        'Freelancer': 10,
        'Student': 0,
        'Other': 5
    };
    
    baseScore += (incomeMap[appState.formData.incomeLevel] || 0);
    baseScore += (roleMap[appState.formData.currentRole] || 0);
    
    // Add randomness for realistic variation
    baseScore += Math.floor(Math.random() * 10) - 5;
    
    // Clamp between 40 and 98
    appState.ceoScore = Math.max(40, Math.min(98, baseScore));
}

// Generate Personalized Results
function generateResults() {
    const goal = appState.formData.primaryGoal;
    const role = appState.formData.currentRole;
    const income = appState.formData.incomeLevel;
    const challenge = appState.formData.challenge;

    // Generate Phase 1 items
    const phase1Items = {
        'Increase Income': [
            'Identify your highest-value services or products',
            'Create a pricing strategy to maximize revenue',
            'Build your authority and personal brand'
        ],
        'Build Business': [
            'Validate your business idea with target customers',
            'Create your 90-day business launch roadmap',
            'Build your initial customer acquisition system'
        ],
        'Advance Career': [
            'Define your ideal position and compensation target',
            'Map skills and credentials you need to acquire',
            'Develop your executive presence and visibility'
        ],
        'Personal Development': [
            'Identify your core values and life vision',
            'Create your personal development curriculum',
            'Build accountability partnerships and systems'
        ],
        'Work-Life Balance': [
            'Audit your current time allocation',
            'Design your ideal weekly schedule',
            'Establish boundaries and non-negotiables'
        ]
    };

    // Generate Phase 2 items
    const phase2Items = {
        'Increase Income': [
            'Launch new revenue stream',
            'Scale your marketing and lead generation',
            'Implement strategic partnerships'
        ],
        'Build Business': [
            'Acquire your first 10 paying customers',
            'Systemize your operations and delivery',
            'Build your team or outsourcing strategy'
        ],
        'Advance Career': [
            'Land a strategic project or role',
            'Build key professional relationships',
            'Increase your visibility in your industry'
        ],
        'Personal Development': [
            'Deep dive into one transformational skill',
            'Mentor someone in your area of expertise',
            'Create your personal mastermind group'
        ],
        'Work-Life Balance': [
            'Delegate or eliminate low-value activities',
            'Build systems for passive income',
            'Establish daily wellness practices'
        ]
    };

    // Generate Phase 3 items
    const phase3Items = {
        'Increase Income': [
            'Hit your income target and celebrate',
            'Create passive income streams',
            'Plan your 6-figure business strategy'
        ],
        'Build Business': [
            'Reach product-market fit',
            'Achieve your first $10K in revenue',
            'Plan for scaling to 7-figures'
        ],
        'Advance Career': [
            'Secure the promotion or new role',
            'Establish yourself as thought leader',
            'Create your 3-year executive roadmap'
        ],
        'Personal Development': [
            'Complete your transformation goals',
            'Share your learnings publicly',
            'Plan your next growth phase'
        ],
        'Work-Life Balance': [
            'Achieve your work-life ideal ratio',
            'Build sustainable success systems',
            'Design your thriving lifestyle'
        ]
    };

    // Update phases
    const phases = [
        phase1Items[goal] || phase1Items['Increase Income'],
        phase2Items[goal] || phase2Items['Increase Income'],
        phase3Items[goal] || phase3Items['Increase Income']
    ];

    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            const elementId = `phase${i}-${j}`;
            const element = document.getElementById(elementId);
            if (element && phases[i-1][j-1]) {
                element.textContent = phases[i-1][j-1];
            }
        }
    }

    // Generate Growth Strategies
    const strategies = generateStrategies(goal, role);
    updateStrategies(strategies);

    // Update score message
    updateScoreMessage();
}

function generateStrategies(goal, role) {
    const strategyMap = {
        'Increase Income': {
            strategies: [
                {
                    title: 'Premium Service Package',
                    description: 'Bundle your top services and charge premium rates',
                    income: Math.floor(Math.random() * 2000) + 1000
                },
                {
                    title: 'Passive Income Product',
                    description: 'Create digital products, courses, or templates',
                    income: Math.floor(Math.random() * 2000) + 1000
                },
                {
                    title: 'Strategic Partnerships',
                    description: 'Partner with complementary businesses for revenue sharing',
                    income: Math.floor(Math.random() * 2000) + 1000
                }
            ]
        },
        'Build Business': {
            strategies: [
                {
                    title: 'Validate Your Niche',
                    description: 'Run a 30-day market validation campaign',
                    income: Math.floor(Math.random() * 2000) + 500
                },
                {
                    title: 'Build Your MVP',
                    description: 'Create a minimal viable product quickly',
                    income: Math.floor(Math.random() * 2000) + 500
                },
                {
                    title: 'Launch Strategy',
                    description: 'Plan your go-to-market and customer acquisition',
                    income: Math.floor(Math.random() * 2000) + 1000
                }
            ]
        },
        'Advance Career': {
            strategies: [
                {
                    title: 'Skill Development',
                    description: 'Master the skills needed for your next role',
                    income: Math.floor(Math.random() * 3000) + 2000
                },
                {
                    title: 'Network Building',
                    description: 'Connect with decision-makers in your industry',
                    income: Math.floor(Math.random() * 3000) + 2000
                },
                {
                    title: 'Visibility Campaign',
                    description: 'Become a known expert in your field',
                    income: Math.floor(Math.random() * 3000) + 2000
                }
            ]
        },
        'Personal Development': {
            strategies: [
                {
                    title: 'Daily Habits System',
                    description: 'Build morning and evening CEO routines',
                    income: 500
                },
                {
                    title: 'Learning Plan',
                    description: 'Design a 90-day personal growth curriculum',
                    income: 500
                },
                {
                    title: 'Accountability System',
                    description: 'Create weekly reviews and milestone tracking',
                    income: 500
                }
            ]
        },
        'Work-Life Balance': {
            strategies: [
                {
                    title: 'Time Optimization',
                    description: 'Eliminate time-wasters and batch tasks',
                    income: Math.floor(Math.random() * 1500) + 500
                },
                {
                    title: 'Delegation Playbook',
                    description: 'Delegate or automate low-value activities',
                    income: Math.floor(Math.random() * 1500) + 500
                },
                {
                    title: 'Wealth System',
                    description: 'Build passive income for location freedom',
                    income: Math.floor(Math.random() * 2000) + 1000
                }
            ]
        }
    };

    return strategyMap[goal] || strategyMap['Increase Income'];
}

function updateStrategies(strategies) {
    strategies.strategies.forEach((strategy, index) => {
        const titleEl = document.getElementById(`strategy${index + 1}-title`);
        const descEl = document.getElementById(`strategy${index + 1}-desc`);
        const incomeEl = document.querySelector(`.strategy-item:nth-child(${index + 1}) .potential-income`);
        
        if (titleEl) titleEl.textContent = strategy.title;
        if (descEl) descEl.textContent = strategy.description;
        if (incomeEl) incomeEl.textContent = `Potential: +$${strategy.income.toLocaleString()}/month`;
    });
}

function updateScoreMessage() {
    const score = appState.ceoScore;
    let message = '';
    
    if (score >= 80) {
        message = 'Exceptional Leader - Ready to 10X';
    } else if (score >= 70) {
        message = 'Strong Foundation - Ready to Scale';
    } else if (score >= 60) {
        message = 'Solid Progress - Time to Accelerate';
    } else {
        message = 'Emerging Potential - Let\'s Build Momentum';
    }
    
    const scoreMessage = document.getElementById('scoreMessage');
    scoreMessage.textContent = message;
}

// Show Results
function showResults() {
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // Personalize greeting
    const userGreeting = document.getElementById('userGreeting');
    userGreeting.textContent = `Welcome, ${appState.formData.name}! 🎉`;

    // Update CEO Score
    const scoreNumber = document.getElementById('ceoScore');
    scoreNumber.textContent = appState.ceoScore;

    // Scroll to top
    window.scrollTo(0, 0);
}

// Action Functions
function downloadBlueprint() {
    const blueprintText = generateBlueprintText();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(blueprintText));
    element.setAttribute('download', `${appState.formData.name}-CEO-Blueprint.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function generateBlueprintText() {
    return `
════════════════════════════════════════════════════════════════════════════════
                        AI CEO™ PERSONAL BLUEPRINT
════════════════════════════════════════════════════════════════════════════════

Executive: ${appState.formData.name}
Goal: ${appState.formData.primaryGoal}
Current Role: ${appState.formData.currentRole}
Income Level: ${appState.formData.incomeLevel}
CEO Score: ${appState.ceoScore}/100

────────────────────────────────────────────────────────────────────────────────
YOUR CHALLENGE
────────────────────────────────────────────────────────────────────────────────
${appState.formData.challenge}

────────────────────────────────────────────────────────────────────────────────
90-DAY POWER PLAN
────────────────────────────────────────────────────────────────────────────────

PHASE 1 (Days 1-30): Foundation
✓ Define your north star metric
✓ Create your daily CEO routine
✓ Build your accountability system

PHASE 2 (Days 31-60): Acceleration
✓ Scale your revenue streams
✓ Build your leadership presence
✓ Establish key partnerships

PHASE 3 (Days 61-90): Domination
✓ Hit your primary goal
✓ Create systems for passive income
✓ Plan your next quarter growth

────────────────────────────────────────────────────────────────────────────────
DAILY CEO ACTIONS (15 Min/Day)
────────────────────────────────────────────────────────────────────────────────
📱 Morning: Review goals, set 3 priorities, review metrics
💪 Midday: Execute on highest-impact activities
📊 Evening: Track progress, celebrate wins, plan tomorrow

════════════════════════════════════════════════════════════════════════════════
Generated by AI CEO™ - Become the CEO of Your Life
════════════════════════════════════════════════════════════════════════════════
`;
}

function shareBlueprint() {
    const text = `I just created my CEO Blueprint with AI CEO™! My score: ${appState.ceoScore}/100. Goal: ${appState.formData.primaryGoal}. Join me: Create your blueprint now!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'AI CEO™ Blueprint',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(text);
        alert('Blueprint info copied to clipboard! Share it anywhere.');
    }
}

function resetApp() {
    // Reset state
    appState.currentQuestion = 1;
    appState.formData = {};
    appState.ceoScore = 0;
    
    // Reset form
    quizForm.reset();
    
    // Show hero
    resultsSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// API Integration Ready (Placeholder for Claude/OpenAI)
function initializeAPIIntegration() {
    // This function will be populated when connecting to Claude/OpenAI API
    // It will allow:
    // 1. More personalized AI-generated insights
    // 2. Real-time personalized recommendations
    // 3. AI-powered 90-day plan generation
    // 4. Smart strategy suggestions based on user data
    
    // Example structure:
    /*
    const apiEndpoint = 'YOUR_API_ENDPOINT';
    const apiKey = 'YOUR_API_KEY';
    
    async function generateAIBlueprint(userData) {
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'claude-3-sonnet',
                    messages: [
                        {
                            role: 'user',
                            content: `Generate a personalized CEO blueprint for: ${JSON.stringify(userData)}`
                        }
                    ]
                })
            });
            
            const data = await response.json();
            return data.content[0].text;
        } catch (error) {
            console.error('API Error:', error);
        }
    }
    */
}

// Ready for API integration when needed
console.log('AI CEO™ App Loaded - Ready for API Integration');
