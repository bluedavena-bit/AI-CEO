function showForm() {
    document.getElementById("assessment").classList.remove("hidden");
    window.scrollTo({
        top: document.getElementById("assessment").offsetTop,
        behavior: "smooth"
    });
}

// Store form data for payment
let formData = {};

function proceedToPayment() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let goal = document.getElementById("goal").value;
    let income = document.getElementById("income").value;
    let target = document.getElementById("target").value;
    let skills = document.getElementById("skills").value;
    let challenge = document.getElementById("challenge").value;
    let hours = document.getElementById("hours").value;

    if (!name || !email || !goal) {
        alert("Please enter your name, email, and main goal.");
        return;
    }

    // Store form data
    formData = {
        name: name,
        email: email,
        goal: goal,
        income: income,
        target: target,
        skills: skills,
        challenge: challenge,
        hours: hours
    };

    // Show payment section
    document.getElementById("assessment").classList.add("hidden");
    document.getElementById("payment").classList.remove("hidden");

    // Initialize PayPal buttons
    initializePayPal();

    window.scrollTo({
        top: document.getElementById("payment").offsetTop,
        behavior: "smooth"
    });
}

function initializePayPal() {
    paypal.Buttons({
        createOrder(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: "49.00",
                            currency_code: "USD"
                        },
                        description: "CEO Blueprint - 90 Day Action Plan",
                        custom_id: formData.email
                    }
                ]
            });
        },
        onApprove(data, actions) {
            return actions.order.capture().then(function(orderData) {
                // Payment successful
                generateBlueprintAfterPayment();
            });
        },
        onError(err) {
            console.error(err);
            alert("An error occurred during the transaction. Please try again.");
        }
    }).render("#paypal-button-container");
}

function generateBlueprintAfterPayment() {
    let name = formData.name;
    let goal = formData.goal;
    let income = formData.income;
    let target = formData.target;
    let skills = formData.skills;
    let challenge = formData.challenge;
    let hours = formData.hours;

    let score = 50;

    if(skills.length > 5) score += 10;
    if(hours >= 5) score += 10;
    if(challenge.length > 5) score += 5;

    let blueprint = `
    
    <h3>${name}'s CEO Blueprint</h3>

    <p><strong>Starting CEO Score:</strong> ${score}/100</p>

    <p>
    <strong>Your Main Goal:</strong><br>
    ${goal}
    </p>

    <h3>First 30 Days: Foundation</h3>
    <ul>
        <li>Create a clear action plan.</li>
        <li>Identify income opportunities.</li>
        <li>Build daily success habits.</li>
        <li>Use your skills: ${skills}</li>
    </ul>

    <h3>Days 31-60: Growth</h3>
    <ul>
        <li>Take consistent action toward your goal.</li>
        <li>Increase your income opportunities.</li>
        <li>Track progress weekly.</li>
    </ul>

    <h3>Days 61-90: Expansion</h3>
    <ul>
        <li>Improve what is working.</li>
        <li>Create repeatable systems.</li>
        <li>Prepare for the next level.</li>
    </ul>

    <h3>CEO Challenge</h3>

    <p>
    Your biggest obstacle identified:
    <br>
    ${challenge}
    </p>

    <p>
    Available time weekly:
    ${hours} hours
    </p>

    <p>
    Current income:
    ${income}
    </p>

    <p>
    Target income:
    ${target}
    </p>

    <hr>

    <strong>
    Your next move:
    Take one action today that moves you closer to your goal.
    </strong>

    `;

    document.getElementById("blueprint").innerHTML = blueprint;
    document.getElementById("payment").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    window.scrollTo({
        top: document.getElementById("result").offsetTop,
        behavior:"smooth"
    });
}

function restart() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("assessment").classList.remove("hidden");
    document.getElementById("payment").classList.add("hidden");
    
    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("goal").value = "";
    document.getElementById("income").value = "";
    document.getElementById("target").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("challenge").value = "";
    document.getElementById("hours").value = "";

    window.scrollTo({
        top: document.getElementById("assessment").offsetTop,
        behavior: "smooth"
    });
}
