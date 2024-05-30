const mode = document.querySelector('#mode');
const calc = document.querySelector('#calc');
const simName = document.querySelector('#simName');
const form = document.querySelector('#form');
const m1 = document.querySelector('#m1'); // first input for mass of object 1
const m2 = document.querySelector('#m2'); // second input for mass of object 2
const v1 = document.querySelector('#v1'); // third input for velocity of object 1
const v2 = document.querySelector('#v2'); // fourth input for velocity of object 2
const v1primediv = document.querySelector('#v1primediv');
const v1prime = document.querySelector('#v1prime'); // fifth input for final velocity of object 1
const result = document.querySelector('#result'); // calculations
const explanation = document.querySelector('#explanation'); // explanation - if calculations successful will display
const checkbox = document.querySelector('#checkbox'); // checkbox to show whether or not to display explanation
const explanationP = document.querySelector('#explanationP'); // p where explanation text will change
const descriptionP = document.querySelector('#descriptionP'); // p after the h2
const reminderP = document.querySelector('#reminderP'); // p that is italicized
const reset = document.querySelector('#reset'); // resets input boxes

checkbox.checked = false; // fixes bug with checkbox being checked when page refreshes

function clearFields() {
    m1.value="";
    m2.value="";
    v1.value="";
    v2.value="";
    v1prime.value="";
    result.innerText="";
    explanation.classList.remove('shown');
    explanationP.classList.remove('shown');
    checkbox.checked = false;
}

function runGeneric() {
    clearFields();
    v1primediv.classList.add('shown');
    simName.innerText = "Momentum - Two Object Generic";
    descriptionP.innerText = "Calculate the remaining final velocity and the change in Kinetic Energy of the two-object system.";
    reminderP.innerHTML = "<i>Make sure that your v1' matches with object 1. Note the directions of the velocities with signs.</i>";

    form.addEventListener("submit", function(e){
        e.preventDefault();
    
        let mass1 = parseFloat(m1.value);
        let mass2 = parseFloat(m2.value);
        let velocity1 = parseFloat(v1.value);
        let velocity2 = parseFloat(v2.value);
        let velocity1prime = parseFloat(v1prime.value);
    
        if(isNaN(mass1) || isNaN(mass2) || isNaN(velocity1) || isNaN(velocity2) || isNaN(velocity1prime)) {
            result.innerText = "Cannot calculate! Make sure that all givens are present and in number form.";
            explanation.classList.remove('shown'); // removes explanation if already there from refresh
        }
        else {
            let velocity2prime = (mass1*velocity1 + mass2*velocity2 - mass1*velocity1prime) / (mass2);
            let initialK = 0.5 * mass1 * velocity1 * velocity1 + 0.5 * mass2 * velocity2 * velocity2;
            let finalK = 0.5 * mass1 * velocity1prime * velocity1prime + 0.5 * mass2 * velocity2prime * velocity2prime;
            let deltaK = finalK - initialK;
    
            result.innerHTML = `<b>v<sub>2</sub>'</b> = ${velocity2prime} m/s <br> <b>Initial KE</b> = ${initialK} J <br> <b>Final KE</b> = ${finalK} J <br> <b>&Delta;KE</b> = ${deltaK} J`;
    
            if (velocity1 === velocity2) {
                explanationP.innerText = "The initial speeds and directions of the objects are the same, so no collision occurs and the objects retain their original velocities.";
            }
            else {
                explanationP.innerHTML = `<b>Step 1: Define the system</b>. The system is the two objects, and momentum of the system is conserved because no external impulses (forces) act on the system. <br> 
                <b>Step 2: Apply conservation of momentum</b>. P<sub>sys</sub> = P<sub>sys</sub>', so m<sub>1</sub>v<sub>1</sub> + m<sub>2</sub>v<sub>2</sub> = m<sub>1</sub>v<sub>1</sub>' + m<sub>2</sub>v<sub>2</sub>'. <br>
                <b>Step 3: Rearrange variables</b>. v<sub>2</sub>' = (m<sub>1</sub>v<sub>1</sub> + m<sub>2</sub>v<sub>2</sub> - m<sub>1</sub>v<sub>1</sub>')/(m<sub>2</sub>) <br>
                <b>Step 4: Plug in numbers</b> v<sub>2</sub>' = (${mass1} * ${velocity1} + ${mass2} * ${velocity2} - ${mass1} * ${velocity1prime}) / (${mass2}) <br>
                <b>Step 5: Calculate</b> v<sub>2</sub>' = ${velocity2prime} m/s`;
            }
    
            explanation.classList.add('shown'); // makes checkbox for the explanation available
    
            checkbox.addEventListener("click", function () {
                if (checkbox.checked) {
                    explanationP.classList.add('shown'); // if checkbox is checked then explanation shown
                }
                if (!(checkbox.checked)) {
                    explanationP.classList.remove('shown'); // if checkbox unchecked then explanation not shown
                }
            })
        }
    
    })

    reset.addEventListener("click", function() {
        clearFields();
    })
}

function runElastic() {
    clearFields();
    v1primediv.classList.remove('shown');
    simName.innerText = "Momentum - Two Object Elastic";
    descriptionP.innerText = "Calculate the final velocities of two objects after an elastic collision knowing their masses and initial velocities.";
    reminderP.innerHTML = "<i>Note the directions of the velocities using signs.</i>";
    
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // prevents form from submitting
        // converts strings to numbers
        let mass1 = parseFloat(m1.value);
        let mass2 = parseFloat(m2.value);
        let velocity1 = parseFloat(v1.value);
        let velocity2 = parseFloat(v2.value);
        console.log(velocity2);
    
        if (isNaN(mass1) || isNaN(mass2) || isNaN(velocity1) || isNaN(velocity2)) { // checks to see if the inputs are actual numbers
            console.log("cannot calculate!");
            result.innerText = "Not enough givens! Cannot calculate!";
            explanation.classList.remove('shown'); // removes explanation if already there from refresh
        }
        else {
            let v1prime = (mass1 * velocity1 + 2 * mass2 * velocity2 - mass2 * velocity1) / (mass1 + mass2);
            console.log(v1prime);
            let v2prime = velocity1 - velocity2 + v1prime;
            console.log(v2prime);
            result.innerText = `v1' = ${v1prime} m/s and v2' = ${v2prime} m/s.`; // result of calculation
    
            if (velocity1 === velocity2) {
                explanationP.innerText = "The initial speeds and directions of the objects are the same, so no collision occurs and the objects retain their original velocities.";
            }
            else {
                explanationP.innerHTML = `Since this is an elastic collision, both <b>momentum</b> and <b>kinetic energy</b> are conserved. Therefore, we can apply both the conservation of momentum and the conservation of energy of the two-object system. However, an easier method that requires less algebra is to use a concept called relative velocities, which only applies in elastic collisions. <br><br> The magnitude of the relative velocity before and after an elastic collision is the same, but the direction (sign) changes. Hence, <i>v1-v2 = -(v1'-v2') = v2'-v1'</i>. With two unknowns, solve for one of them. In this simulation, v2' was solved for with <i>v2' = v1-v2+v1'</i>. <br><br> We will use the conservation of linear momentum to solve for the other variable. Since momentum is conserved, the momentum of the two-object system is the same before and after the collision. Since momentum is a product of mass and velocity, <i>m1v1 + m2v2 = m1v1' + m2v2'</i>. Plugging in <i>v2' = v1-v2+v1'</i> into v2', we have <i>m1v1+m2v2 = m1v1' + m2v1 - m2v2 +m2v1'</i>. Rearranging gives <i>v1' = (m1v1 + 2m2v2 - m2v1) / (m1+m2)</i>. Plug in numbers to reveal that <b>v1' = ${v1prime} m/s</b>. Use the second equation derived from relative velocities to solve for v2', which equals <b>${v2prime} m/s</b>. <br><br>Easy, right?`
            }
    
            explanation.classList.add('shown'); // makes checkbox for the explanation available
    
            checkbox.addEventListener("click", function () {
                if (checkbox.checked) {
                    explanationP.classList.add('shown'); // if checkbox is checked then explanation shown
                }
                if (!(checkbox.checked)) {
                    explanationP.classList.remove('shown'); // if checkbox unchecked then explanation not shown
                }
            })
        }
    })

    reset.addEventListener("click", function() {
        clearFields();
    })
}

function runInelastic() {
    clearFields();
    v1primediv.classList.remove('shown');
    simName.innerText = "Momentum - Two Object Totally Inelastic";
    descriptionP.innerText = "Calculate the final velocity and change in Kinetic Energy of two objects after a totally elastic collision, after which the two objects stick together.";
    reminderP.innerHTML = "<i>Note the directions of the velocities using signs.</i>";

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // prevents form from submitting
        // converts strings to numbers
        let mass1 = parseFloat(m1.value);
        let mass2 = parseFloat(m2.value);
        let velocity1 = parseFloat(v1.value);
        let velocity2 = parseFloat(v2.value);
        console.log(velocity2);
    
        if (isNaN(mass1) || isNaN(mass2) || isNaN(velocity1) || isNaN(velocity2)) { // checks to see if the inputs are actual numbers
            console.log("cannot calculate!");
            result.innerText = "Not enough givens! Cannot calculate!";
            explanation.classList.remove('shown'); // removes explanation if already there from refresh
        }
        else {
            let vprime = (mass1 * velocity1 + mass2 * velocity2) / (mass1 + mass2);
            let initialK = 0.5 * mass1 * velocity1 * velocity1 + 0.5 * mass2 * velocity2 * velocity2;
            let finalK = 0.5 * (mass1 + mass2) * vprime * vprime;
            let deltaK = finalK - initialK;
            result.innerHTML = `<b>v'</b> = ${vprime} m/s <br> <b>Initial KE</b> = ${initialK} J <br> <b>Final KE</b> = ${finalK} J <br> <b>&Delta;KE</b> = ${deltaK} J`; // result of calculation
    
            if (velocity1 === velocity2) {
                explanationP.innerText = "The initial speeds and directions of the objects are the same, so no collision occurs and the objects retain their original velocities.";
            }
            else {
                explanationP.innerHTML = `<b>Step 1: Define the system</b>. The system is the two objects, and momentum of the system is conserved because no external impulses (forces) act on the system. <br>
                <b>Step 2: Apply conservation of momentum</b>. Since this is a totally inelastic collision, the two objects stick together after the collision. P<sub>sys</sub> = P<sub>sys</sub>', so m<sub>1</sub>v<sub>1</sub> + m<sub>2</sub>v<sub>2</sub> = (m<sub>1</sub> + m<sub>2</sub>)v'<br>
                <b>Step 3: Rearrange variables</b>. v' = (m<sub>1</sub>v<sub>1</sub> + m<sub>2</sub>v<sub>2</sub>)/(m<sub>1</sub> + m<sub>2</sub>) <br>
                <b>Step 4: Plug in numbers</b> v<sub>2</sub>' = (${mass1} * ${velocity1} + ${mass2} * ${velocity2}) / (${mass1} + ${mass2}) <br>
                <b>Step 5: Calculate</b> v<sub>2</sub>' = ${vprime} m/s`
            }
    
            explanation.classList.add('shown'); // makes checkbox for the explanation available
    
            checkbox.addEventListener("click", function () {
                if (checkbox.checked) {
                    explanationP.classList.add('shown'); // if checkbox is checked then explanation shown
                }
                if (!(checkbox.checked)) {
                    explanationP.classList.remove('shown'); // if checkbox unchecked then explanation not shown
                }
            })
        }
    })

    reset.addEventListener("click", function() {
        clearFields();
    })
}

if(mode[0].selected) {
    calc.classList.remove('shown');
}
if(mode[1].selected) { // generic
    calc.classList.add('shown');
    runGeneric();
}
if(mode[2].selected) { // elastic
    calc.classList.add('shown');
    runElastic();
}
if(mode[3].selected) { // totally inelastic
    calc.classList.add('shown');
    runInelastic();
}

mode.addEventListener('change', function() {
    if(mode[0].selected) {
        calc.classList.remove('shown');
    }
    if(mode[1].selected) { // generic
        calc.classList.add('shown');
        runGeneric();
    }
    if(mode[2].selected) { // elastic
        calc.classList.add('shown');
        runElastic();
    }
    if(mode[3].selected) { // totally inelastic
        calc.classList.add('shown');
        runInelastic();
    }
})