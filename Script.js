// =====================================
// AI CEO™ APP LOGIC
// =====================================


// Show CEO Assessment Form

function showForm() {

    const assessment = document.getElementById("assessment");

    assessment.classList.remove("hidden");

    assessment.scrollIntoView({
        behavior: "smooth"
    });

}



// Move Customer To Payment

function proceedToPayment() {


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const goal = document.getElementById("goal").value.trim();


    if (!name || !email || !goal) {

        alert("Please complete your name, email, and business goal.");

        return;

    }



    localStorage.setItem("ceoName", name);
    localStorage.setItem("ceoEmail", email);
    localStorage.setItem("ceoGoal", goal);



    const payment = document.getElementById("payment");

    payment.classList.remove("hidden");


    payment.scrollIntoView({
        behavior: "smooth"
    });



    loadPayPal();


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

                    description:"AI CEO™ 90-Day Blueprint",

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
                    "! Your AI CEO Blueprint is ready."
                );


                generateBlueprint();


            });


        },



        onError:function(error){

            console.error(error);

            alert(
                "Payment error. Please try again."
            );

        }



    }).render("#paypal-button-container");


}





// =====================================
// CREATE BLUEPRINT
// =====================================


function generateBlueprint(){


    const name = localStorage.getItem("ceoName");

    const goal = localStorage.getItem("ceoGoal");



    document.getElementById("result")
    .classList.remove("hidden");



    document.getElementById("blueprint")
    .innerHTML = `


    <h2>${name}'s AI CEO™ Blueprint</h2>


    <h3>Your Main Goal:</h3>

    <p>
    ${goal}
    </p>


    <hr>


    <h3>Days 1-30: Foundation</h3>

    <ul>

    <li>Clarify your business vision</li>

    <li>Identify your ideal customer</li>

    <li>Create your offer</li>

    <li>Build your basic systems</li>

    </ul>



    <h3>Days 31-60: Growth</h3>

    <ul>

    <li>Create consistent marketing</li>

    <li>Build partnerships</li>

    <li>Improve customer outreach</li>

    <li>Increase revenue opportunities</li>

    </ul>




    <h3>Days 61-90: CEO Expansion</h3>

    <ul>

    <li>Automate tasks</li>

    <li>Create repeatable processes</li>

    <li>Track business growth</li>

    <li>Operate like a CEO</li>

    </ul>



    <h3>
    Congratulations!
    </h3>

    <p>
    Your AI CEO™ journey has officially started.
    </p>


    `;



    document.getElementById("result")
    .scrollIntoView({

        behavior:"smooth"

    });


}





// =====================================
// RESET APP
// =====================================


function restart(){

    localStorage.clear();

    location.reload();

}
