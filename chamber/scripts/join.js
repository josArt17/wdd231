document.getElementById('timestamp').value = new Date().toISOString();
const dataMembership = '../chamber/data/membership.json';

const buttonGold = document.querySelector('#gold');
const buttonSilver = document.querySelector('#silver');
const buttonBronze = document.querySelector('#bronze');
const buttonNonProfit = document.querySelector('#nonProfit');

buttonGold.addEventListener('click', function(){
    let value = buttonGold.value;
    showModal(value);
});

buttonSilver.addEventListener('click', function(){
    let value = buttonSilver.value;
    showModal(value);
});

buttonBronze.addEventListener('click', function(){
    let value = buttonBronze.value;
    showModal(value);
});

buttonNonProfit.addEventListener('click', function(){
    let value = buttonNonProfit.value;
    showModal(value);
});

const showModal = (value) => {
    const membershipModal = document.querySelector('#membership-details'); 

    membershipModal.innerHTML = '';

    fetch(dataMembership)
    .then(response => response.json())
    .then(data => {
        const membershipLevels = data.membership_levels;

        const membership = membershipLevels[value];

        if (membership) {

            let containerButtonClose = document.createElement('div');
            containerButtonClose.classList.add('containerButtonClose');

            let buttonClose = document.createElement('button');
            buttonClose.textContent = 'X';
            buttonClose.setAttribute('id', 'close-modal');

            let membershipTitle = document.createElement('h2');
            membershipTitle.textContent = membership.name;

            let costMemberShip = document.createElement('p');
            costMemberShip.textContent = `Cost: $ ${membership.cost}`;

            let hrLine = document.createElement('hr');

            let benefitsList = document.createElement('ul');
            membership.benefits.forEach(benefit => {
                let listItem = document.createElement('li');
                listItem.textContent = benefit;
                benefitsList.appendChild(listItem);
            });

            containerButtonClose.appendChild(membershipTitle);
            containerButtonClose.appendChild(buttonClose);
            membershipModal.appendChild(containerButtonClose);
            membershipModal.appendChild(costMemberShip);
            membershipModal.appendChild(hrLine);
            membershipModal.appendChild(benefitsList);

            if (typeof membershipModal.showModal === 'function') {
                membershipModal.showModal();
            } else {
                membershipModal.style.display = 'block';
            }

            buttonClose.addEventListener('click', function() {
                if (typeof membershipModal.close === 'function') {
                    membershipModal.close();
                } else {
                    membershipModal.style.display = 'none';
                }
            });
        } else {
            console.error('No data for:', value);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


