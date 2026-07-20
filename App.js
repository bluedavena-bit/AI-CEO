// AI CEO™ Application Logic


function showForm(){

    const assessment = document.getElementById("assessment");

    assessment.classList.remove("hidden");

    assessment.scrollIntoView({
        behavior:"smooth"
    });

}





function proceedToPayment(){


    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const goal = document.getElementById("goal").value;


    if(!name || !email || !goal){

        alert("Please complete your name, email, and business goal.");

        return;

    }



    localStorage.setItem("ceoName", name);
    localStorage.setItem("ceoEmail", email);
    localStorage.setItem("ceoGoal", goal);



    document.getElementById("payment")
    .classList.remove("hidden");



    document.getElementById("payment")
    .scrollIntoView({
        behavior:"smooth"
    });


}







// PAYPAL CHECKOUT


window.addEventListener("load", function(){


if(window.paypal){


paypal.Buttons({


style:{

color:"blue",
shape:"rect",
label:"pay"

},



createOrder:function(data,actions){


return actions.order.create({

purchase_units:[{

description:"AI CEO™ Blueprint",

amount:{

value:"49.00"

}

}]


});


},




onApprove:function(data,actions){


return actions.order.capture()
.then(function(details){


generateBlueprint();


});


},




onCancel:function(){


alert("Payment cancelled.");

}




}).render("#paypal-button-container");


}



});









function generateBlueprint(){


const name =
localStorage.getItem("ceoName");


const goal =
localStorage.getItem("ceoGoal");



document.getElementById("result")
.classList.remove("hidden");



document.getElementById("blueprint")
.innerHTML = `


<h2>${name}'s AI CEO™ Blueprint</h2>


<h3>90-Day Growth Mission</h3>


<p>
Primary Goal:
<strong>${goal}</strong>
</p>




<h3>Days 1-30: Foundation</h3>

<ul>

<li>Create your CEO vision</li>

<li>Define your customer</li>

<li>Create your operating system</li>

</ul>




<h3>Days 31-60: Growth</h3>

<ul>

<li>Build marketing systems</li>

<li>Create partnerships</li>

<li>Increase visibility</li>

</ul>




<h3>Days 61-90: Expansion</h3>

<ul>

<li>Automate operations</li>

<li>Create additional revenue streams</li>

<li>Plan your next growth level</li>

</ul>




<h3>
Your CEO Journey Has Started 🚀
</h3>



`;



document.getElementById("result")
.scrollIntoView({

behavior:"smooth"

});


}








function restart(){

location.reload();

}
