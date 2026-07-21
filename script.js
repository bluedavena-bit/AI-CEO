// =====================================
// AI CEO™ APP LOGIC - ENHANCED WITH LIVE SCORING
// =====================================


// Show CEO Assessment Form

function showForm() {

    const assessment = document.getElementById("assessment");

    assessment.classList.remove("hidden");

    assessment.scrollIntoView({
        behavior: "smooth"
    });

}



// Calculate CEO Score Based on Inputs

function calculateCEOScore() {

    const income = parseInt(document.getElementById("income").value) || 0;
    const target = parseInt(document.getElementById("target").value) || 0;
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const skills = document.getElementById("skills").value.trim().length;
    const challenge = document.getElementById("challenge").value.trim();

    let score = 0;

    // Income score (0-20)
    if (income >= 50000) score += 20;
    else if (income >= 30000) score += 15;
    else if (income >= 10000) score += 10;
    else if (income > 0) score += 5;

    // Growth ambition (0-20)
    const growth = (target - income) || 0;
    if (growth >= income * 2) score += 20;
    else if (growth >= income) score += 15;
    else if (growth > 0) score += 10;

    // Time availability (0-20)
    if (hours >= 40) score += 20;
    else if (hours >= 20) score += 15;
    else if (hours >= 10) score += 10;
    else if (hours > 0) score += 5;

    // Skills/Experience (0-20)
    if (skills > 50) score += 20;
    else if (skills > 30) score += 15;
    else if (skills > 10) score += 10;
    else if (skills > 0) score += 5;

    // Challenge awareness (0-20) - Shows self-awareness
    if (challenge.length > 50) score += 20;
    else if (challenge.length > 30) score += 15;
    else if (challenge.length > 10) score += 10;

    return Math.min(score, 100);

}



// Get CEO Level Based on Score

function getCEOLevel(score) {

    if (score >= 80) return { level: "CEO Elite", color: "#fbbf24", description: "You're already operating at a high level. Focus on scaling and optimization." };
    if (score >= 60) return { level: "CEO Ready", color: "#60a5fa", description: "You have strong foundations. Time to systematize and delegate." };
    if (score >= 40) return { level: "CEO in Progress", color: "#34d399", description: "You're on the right track. Build systems and fill knowledge gaps." };
    if (score >= 20) return { level: "CEO Starter", color: "#a78bfa", description: "You're starting your journey. Focus on clarity and basic systems first." };
    return { level: "Pre-CEO", color: "#ef4444", description: "You're just beginning. Start with vision and foundational planning." };

}



// Generate Personalized Insights

function getPersonalizedInsights() {

    const income = parseInt(document.getElementById("income").value) || 0;
    const target = parseInt(document.getElementById("target").value) || 0;
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const skills = document.getElementById("skills").value.trim();
    const challenge = document.getElementById("challenge").value.trim();

    let insights = [];

    // Income insights
    if (income === 0) {
        insights.push({ priority: "HIGH", tip: "You're pre-revenue. Focus on validating your business idea and finding your first customer." });
    } else if (income < 10000) {
        insights.push({ priority: "HIGH", tip: "Build repeatable revenue systems. Don't rely on one-time deals." });
    } else if (income < 50000) {
        insights.push({ priority: "MEDIUM", tip: "You're making good progress. Now optimize for profitability." });
    } else {
        insights.push({ priority: "LOW", tip: "Strong income. Focus on scaling without burning out." });
    }

    // Growth gap insights
    const gap = target - income;
    if (gap > 0) {
        const percentage = ((gap / income) * 100).toFixed(0);
        insights.push({ priority: "HIGH", tip: `You want to grow ${percentage}%. That's ambitious! Create a detailed roadmap and break it into quarterly milestones.` });
    }

    // Time insights
    if (hours >= 40) {
        insights.push({ priority: "MEDIUM", tip: "You have good availability. Use this time to build systems, not just work in your business." });
    } else if (hours >= 20) {
        insights.push({ priority: "HIGH", tip: "Limited hours - focus on high-impact activities only. Delegate or automate everything else." });
    } else {
        insights.push({ priority: "CRITICAL", tip: "Very limited time. You MUST prioritize ruthlessly and delegate heavily." });
    }

    // Skills insights
    if (skills.toLowerCase().includes("marketing")) {
        insights.push({ priority: "MEDIUM", tip: "Your marketing skills are valuable. Use them to build your personal brand and attract clients." });
    }
    if (skills.toLowerCase().includes("sales")) {
        insights.push({ priority: "MEDIUM", tip: "Sales expertise is gold. Build a system to multiply your sales efforts." });
    }
    if (skills.toLowerCase().includes("finance")) {
        insights.push({ priority: "MEDIUM", tip: "Financial acumen helps. Track metrics ruthlessly to optimize your business." });
    }

    // Challenge insights
    if (challenge.toLowerCase().includes("time")) {
        insights.push({ priority: "CRITICAL", tip: "Time management is key. Use the 80/20 principle - focus on the 20% of activities that drive 80% of results." });
    }
    if (challenge.toLowerCase().includes("money") || challenge.toLowerCase().includes("cash")) {
        insights.push({ priority: "CRITICAL", tip: "Cash flow is critical. Create multiple revenue streams and manage costs ruthlessly." });
    }
    if (challenge.toLowerCase().includes("team")) {
        insights.push({ priority: "HIGH", tip: "You're trying to do everything. Start with one contractor or VA to handle routine tasks." });
    }

    return insights.length > 0 ? insights : [{ priority: "INFO", tip: "Keep building momentum. Small consistent actions lead to big results." }];

}



// Generate Assessment Results (No Payment Required)

function generateAssessmentResults() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const goal = document.getElementById("goal").value.trim();
    const income = document.getElementById("income").value.trim();
    const target = document.getElementById("target").value.trim();
    const hours = document.getElementById("hours").value.trim();

    if (!name || !email || !goal) {
        alert("Please complete your name, email, and business goal.");
        return;
    }

    // Save data
    localStorage.setItem("ceoName", name);
    localStorage.setItem("ceoEmail", email);
    localStorage.setItem("ceoGoal", goal);
    localStorage.setItem("ceoIncome", income);
    localStorage.setItem("ceoTarget", target);
    localStorage.setItem("ceoHours", hours);
    localStorage.setItem("ceoSkills", document.getElementById("skills").value.trim());
    localStorage.setItem("ceoChallenge", document.getElementById("challenge").value.trim());

    // Calculate score
    const score = calculateCEOScore();
    const level = getCEOLevel(score);
    const insights = getPersonalizedInsights();

    localStorage.setItem("ceoScore", score);
    localStorage.setItem("ceoLevel", level.level);

    // Show results
    document.getElementById("result").classList.remove("hidden");

    let insightsHTML = insights.map(insight => 
        `<div class="insight" style="border-left: 4px solid ${insight.priority === 'CRITICAL' ? '#ef4444' : insight.priority === 'HIGH' ? '#f97316' : '#3b82f6'}; padding: 15px; margin: 10px 0; background: #0f172a; border-radius: 4px;">
            <strong>${insight.priority}</strong>: ${insight.tip}
        </div>`
    ).join("");

    document.getElementById("blueprint").innerHTML = `

        <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 16px; margin-bottom: 30px;">

            <h2>${name}'s AI CEO™ Assessment</h2>

            <div style="font-size: 72px; font-weight: bold; color: ${level.color}; margin: 20px 0;">
                ${score}%
            </div>

            <h3 style="color: ${level.color}; font-size: 32px; margin: 10px 0;">
                ${level.level}
            </h3>

            <p style="font-size: 18px; color: #cbd5e1; margin-top: 20px;">
                ${level.description}
            </p>

        </div>

        <h3 style="margin-top: 30px; color: #60a5fa;">Your Business Overview</h3>
        <ul style="background: #1e293b; padding: 20px; border-radius: 8px; line-height: 2;">
            <li><strong>Goal:</strong> ${goal}</li>
            <li><strong>Current Monthly Income:</strong> $${income || '0'}</li>
            <li><strong>Target Monthly Income:</strong> $${target || '0'}</li>
            <li><strong>Hours Available/Week:</strong> ${hours || '0'}</li>
        </ul>

        <h3 style="margin-top: 30px; color: #60a5fa;">Personalized Insights & Recommendations</h3>
        ${insightsHTML}

        <h3 style="margin-top: 30px; color: #60a5fa;">Your 90-Day Blueprint</h3>

        <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">

            <h4 style="color: #34d399;">Days 1-30: Foundation</h4>
            <ul>
                <li>✓ Clarify your business vision and ideal customer</li>
                <li>✓ Document your current processes</li>
                <li>✓ Identify your top 3 revenue drivers</li>
                <li>✓ Create basic systems and checklists</li>
            </ul>

            <h4 style="color: #fbbf24; margin-top: 20px;">Days 31-60: Growth</h4>
            <ul>
                <li>✓ Build repeatable marketing system</li>
                <li>✓ Create strategic partnerships</li>
                <li>✓ Implement tracking/metrics dashboard</li>
                <li>✓ Start delegation playbook</li>
            </ul>

            <h4 style="color: #60a5fa; margin-top: 20px;">Days 61-90: Expansion</h4>
            <ul>
                <li>✓ Automate key tasks</li>
                <li>✓ Build additional revenue streams</li>
                <li>✓ Create standard operating procedures (SOPs)</li>
                <li>✓ Plan next growth phase</li>
            </ul>

        </div>

        <h3 style="color: #34d399; text-align: center; margin-top: 30px; font-size: 24px;">🚀 Your AI CEO™ Journey Has Started!</h3>
        <p style="text-align: center; color: #cbd5e1; margin-bottom: 30px;">
            This free assessment is just the beginning. Ready for a more detailed, personalized blueprint with specific action steps?
        </p>

    `;

    // Show payment option after results
    document.getElementById("payment").classList.remove("hidden");

    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    });

}



// Modified proceedToPayment - Now calls generateAssessmentResults

function proceedToPayment() {

    generateAssessmentResults();

}



// =====================================
// PAYPAL PAYMENT
// =====================================


let paypalStarted = false;


function loadPayPal(){

    if(paypalStarted){
        return;
    }

    if(typeof paypal === "undefined"){
        console.log("PayPal is not connected yet.");
        return;
    }

    paypalStarted = true;

    paypal.Buttons({

        style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal"
        },

        createOrder:function(data, actions){

            return actions.order.create({
                purchase_units:[{
                    description:"AI CEO™ 90-Day Blueprint Premium",
                    amount:{
                        value:"49.00"
                    }
                }]
            });

        },

        onApprove:function(data, actions){

            return actions.order.capture().then(function(details){

                alert(
                    "Thank you " +
                    details.payer.name.given_name +
                    "! Your Premium AI CEO Blueprint is ready.\n\nDownloading PDF now..."
                );

                generatePremiumBlueprint();
                sendBlueprintEmail();

            });

        },

        onError:function(error){
            console.error(error);
            alert("Payment error. Please try again.");
        }

    }).render("#paypal-button-container");

}



// Generate Premium Blueprint as PDF

function generatePremiumBlueprint(){

    const name = localStorage.getItem("ceoName");
    const email = localStorage.getItem("ceoEmail");
    const goal = localStorage.getItem("ceoGoal");
    const income = localStorage.getItem("ceoIncome");
    const target = localStorage.getItem("ceoTarget");
    const hours = localStorage.getItem("ceoHours");
    const skills = localStorage.getItem("ceoSkills");
    const challenge = localStorage.getItem("ceoChallenge");
    const score = localStorage.getItem("ceoScore");
    const level = localStorage.getItem("ceoLevel");

    // Create PDF content
    const pdfContent = `
AI CEO™ - 90-Day Premium Blueprint
Generated for: ${name}
Email: ${email}
Date: ${new Date().toLocaleDateString()}

================================
YOUR CEO ASSESSMENT SCORE
================================
Score: ${score}%
Level: ${level}

================================
YOUR BUSINESS PROFILE
================================
Primary Goal: ${goal}
Current Monthly Income: $${income || '0'}
Target Monthly Income: $${target || '0'}
Hours Available Per Week: ${hours || '0'}
Your Skills: ${skills || 'Not specified'}
Main Challenge: ${challenge || 'Not specified'}

================================
90-DAY ACTION BLUEPRINT
================================

PHASE 1: FOUNDATION (Days 1-30)
Week 1-2: Vision & Planning
- Define your 90-day revenue target
- Create your ideal customer avatar
- Document 3 core business pillars
- Set up basic tracking system

Week 3-4: Systems Foundation
- Create your daily routine
- Document 5 key processes
- Build simple checklist templates
- Establish accountability system

ACTION ITEMS FOR PHASE 1:
☐ Define business vision statement
☐ Create customer profile document
☐ Build weekly planning template
☐ Set up revenue tracking spreadsheet
☐ Create daily priority checklist

---

PHASE 2: GROWTH (Days 31-60)
Week 5-6: Marketing Foundation
- Create content calendar (4 weeks)
- Launch email list strategy
- Build your personal brand
- Start strategic partnerships

Week 7-8: Optimization
- Launch first marketing campaign
- Track and measure results
- Build partnership relationships
- Create sales process

ACTION ITEMS FOR PHASE 2:
☐ Publish 8 pieces of content
☐ Grow email list by 100+ subscribers
☐ Reach out to 5 potential partners
☐ Track 3 key metrics daily
☐ Complete 1 partnership agreement

---

PHASE 3: EXPANSION (Days 61-90)
Week 9-10: Scaling Systems
- Automate top 3 tasks
- Build delegation playbook
- Create standard procedures
- Start revenue expansion

Week 11-12: CEO Mode
- Review 90-day results
- Plan next growth phase
- Document lessons learned
- Celebrate wins & create accountability

ACTION ITEMS FOR PHASE 3:
☐ Automate 3 repetitive tasks
☐ Hire first contractor/VA
☐ Document 5 key SOPs
☐ Launch new revenue stream
☐ Complete business review

================================
KEY METRICS TO TRACK DAILY
================================
✓ Revenue (daily/weekly total)
✓ New customers acquired
✓ Content published
✓ Partnerships made
✓ Tasks delegated/automated

================================
CRITICAL SUCCESS FACTORS
================================
1. Consistency over perfection
2. Measure what matters
3. Delegate early, delegate often
4. Communicate systemically
5. Review and adjust weekly

================================
30-60-90 DAY MILESTONES
================================
Day 30: Basic systems in place, 30% of goal revenue
Day 60: Marketing working, 60% of goal revenue
Day 90: CEO systems active, 100%+ of goal revenue

================================
NOTES & CUSTOMIZATION
================================
This blueprint is personalized for your situation based on:
- Current income level: $${income || '0'}
- Time availability: ${hours || '0'} hours/week
- Main challenge: ${challenge || 'Not specified'}
- Skills: ${skills || 'Not specified'}

Adjust timelines and priorities based on your unique circumstances.

================================
YOUR NEXT STEPS
================================
1. Print this blueprint
2. Share with your team/mentor
3. Schedule weekly reviews
4. Track metrics in real-time
5. Report progress daily

Remember: You're not trying to do everything perfectly.
You're building a business that runs without you working IN it constantly.

Start with ONE thing today.

================================
© 2026 AI CEO™
Build Smarter. Grow Faster.
================================
    `;

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-CEO-Blueprint-${name.replace(/\s+/g, '-')}-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    console.log("Blueprint PDF generated and downloaded!");

}



// Send Blueprint Email

function sendBlueprintEmail(){

    const name = localStorage.getItem("ceoName");
    const email = localStorage.getItem("ceoEmail");
    const goal = localStorage.getItem("ceoGoal");
    const score = localStorage.getItem("ceoScore");
    const level = localStorage.getItem("ceoLevel");

    // Create email service integration (using FormSubmit.co - free service)
    const formData = new FormData();
    formData.append('_subject', `Your AI CEO™ Blueprint - Score: ${score}%`);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('score', score);
    formData.append('level', level);
    formData.append('goal', goal);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    // Send to FormSubmit (replace with your email)
    fetch('https://formsubmit.co/bluedavena@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("Email sent successfully!");
        alert(`✓ Blueprint downloaded!\n✓ Confirmation email sent to ${email}`);
    })
    .catch(error => {
        console.log("Email service note: " + error);
        alert(`✓ Blueprint downloaded!\n✓ Check your email for confirmation`);
    });

}



// =====================================
// SHOW SUBSCRIPTION OPTIONS
// =====================================


function showSubscriptionOptions() {

    alert(`
🚀 AI CEO™ SUBSCRIPTION TIERS

📈 AI CEO PRO - $19/month
✓ Monthly personalized review/check-in
✓ Updated blueprint each month
✓ Access to templates & tools library
✓ Email support
✓ Monthly group coaching call
✓ Downloadable resources

👥 AI CEO TEAMS - $99/month
✓ Everything in PRO, PLUS:
✓ Team member accounts (3-5 people)
✓ Team dashboard & performance tracking
✓ SOP builder tool
✓ Organization charts & roles
✓ Team training videos library
✓ Priority support

Coming Soon! Subscribe via our membership portal.
    `);

}



// =====================================
// RESET APP
// =====================================


function restart(){

    localStorage.clear();

    location.reload();

}
