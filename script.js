
// ES - 17 

// Scrivi un programma per la gestione di una rubrica telefonica:

// Crea un oggetto rubrica con la proprieta’ contatti che sara’ un array di oggetti, ovvero i singoli contatti. 

// I contatti dovranno avere almeno 2 proprieta’ Nome e Telefono.

  
//   Implementa i metodi dell'oggetto per le seguenti operazioni:
//       V Visualizzazione dell'intera lista contatti
//       V Inserimento di un nuovo contatto
//       V Modifica di uno contatto passando in input il nome del contatto
//       V Cancellazione di un contatto passando in input il nome del contatto
//       - Ricerca passando il nome e restituendo il singolo contatto.

// Consigli:

// Per il momento utilizziamo nomi diversi per i contatti.
// RIcorda che Javascript e’ case sensitive quindi marco e’ diverso da Marco 


let rubrica = {

        contatti : [
            { 'id' : 0 , 'nome' : 'Alessio' , 'telefono' : 3473596650},
            { 'id' : 1 , 'nome' : 'Marco' , 'telefono' : 3446784567},
            { 'id' : 2 , 'nome' : 'Antonio' , 'telefono' : 3471298457},
            { 'id' : 3 , 'nome' : 'Matteo' , 'telefono' : 3333956002},
            { 'id' : 4 , 'nome' : 'Giancarlo' , 'telefono' : 3295673933},
            { 'id' : 5 , 'nome' : 'Francesco' , 'telefono' : 3345783109}
        ],

        showContacts : function (contacts = this.contatti) {

                let rowCards = document.querySelector('#row-cards');

                rowCards.innerHTML = '';

                contacts.forEach( contatto => {

                let card = document.createElement('div');

                card.classList.add('col-12','mb-3');

                card.innerHTML = `
                        <div class="card-custom shadow text-white">
                            <div class="card-body d-flex align-items-center justify-content-between">
                                <i class="fas fa-user-alt"></i>
                                <p class="lead mb-0 text-warning">${contatto.nome}</p>
                                <p class="lead mb-0 text-info">${contatto.telefono}</p>
                                <div class="d-flex">
                                <button contact-id="${contatto.id}" type="button" class="btn-delete me-2 btn btn-danger d-flex justify-content-center align-items-center"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                `;

                rowCards.appendChild(card);
            });

            let btnDelete = document.querySelectorAll('.btn-delete');

            btnDelete.forEach( btn => {
                btn.addEventListener('click', function () {
                    let id = btn.getAttribute('contact-id');

                    rubrica.contatti.forEach( (contatto, index) => {
                        if (contatto.id == id) {
                            rubrica.contatti.splice(index,1);
                        }
                    })

                    rubrica.showContacts();
                    rubrica.showAlert('Contatto rimosso', 'danger');
                })
            })

        },

        newContact : function () {
            let name = document.querySelector('#input-new-name');
            let phone = document.querySelector('#input-new-phone');
            let id = this.contatti[this.contatti.length - 1].id + 1;

            let newContact = {};
            newContact.nome = name.value;
            newContact.telefono = phone.value;
            newContact.id = id;
            this.contatti.push(newContact);

            name.value = '';
            phone.value = '';

            this.showContacts();
            this.showAlert('Contatto aggiunto', 'success');
        },

        easyModContact : function () {
            let inputOldName = document.querySelector('#input-mod-oldName');
            let inputNewName = document.querySelector('#input-mod-name');
            let inputPhone = document.querySelector('#input-mod-phone');

            let find = false; // creo una variabile che sia false, quando trovo il contatto col nome diventa true
            
            this.contatti.forEach( contatto => {

                if (contatto.nome.toLowerCase() === inputOldName.value.toLowerCase()) {
                    
                    contatto.nome = inputNewName.value;
                    contatto.telefono = inputPhone.value;
                    find = true;

                }

            })

            if (find) {
                this.showContacts();
                this.showAlert('Contatto modificato', 'success');

                inputOldName.value = '';
                inputNewName.value = '';
                inputPhone.value = '';
            } else {
                this.showAlert('Contatto non trovato', 'warning');
            }

        },

        showAlert : function(messaggio, type = 'info') {
            let alert = document.querySelector('.instant-message');
            let p = document.querySelector('.instant-message p');

            p.innerHTML = messaggio;
            alert.classList.add(`bg-${type}`);
            alert.classList.add('active');
            
            setTimeout(this.hideAlert , 3000);
        },

        hideAlert : function() {
            let alert = document.querySelector('.instant-message');
            alert.classList.forEach(el => {

                if (el.includes('bg')) {
                    alert.classList.remove(el);
                }

            })
            alert.classList.remove('active');
        },

        easyRemoveContact : function () {
            let removeContactInput = document.querySelector('#input-rem-name');

            let toRemove = this.contatti.findIndex(contatto => contatto.nome.toLowerCase() === removeContactInput.value.toLowerCase())

            if (toRemove == -1) {
                this.showAlert('Contatto non trovato', 'warning');
            } else {
                this.contatti.splice(toRemove, 1);
                this.showContacts();
                this.showAlert('Contatto eliminato', 'success');
                removeContactInput.value = '';
            }
            
        },

        searchContact : function (searched) {
            let rowCards = document.querySelector('#row-cards');
            
            let filtered = this.contatti.filter( contatto => contatto.nome.toLowerCase().includes(searched));

            if (inputSearch.value != '') {
                this.showContacts(filtered);
            } else {
                rowCards.innerHTML = '';
            }
        }
}



// VISUALIZZA CONTATTI

const btnShowContacts = document.querySelector('#btn-show-contacts');

btnShowContacts.addEventListener('click', function () {
        rubrica.showContacts();


});



// VAGGIUNGI NUOVO CONTATTO

const btnNewContact = document.querySelector('#btn-new-contact');
let nameIn = document.querySelector('#input-new-name');
let phoneIn = document.querySelector('#input-new-phone');

btnNewContact.addEventListener('click', function () {
    if ((nameIn.value != '') || (phoneIn.value != '')) {
        rubrica.newContact();
    } 
});



// MODIFICA NOME CONTATTO

const btnModName = document.querySelector('#btn-mod-contact');

btnModName.addEventListener('click', function () {
    rubrica.easyModContact();
})



// ELIMINA CONTATTO

const btnRemoveContact = document.querySelector('#btn-rem-contact');

btnRemoveContact.addEventListener('click', function () {
    rubrica.easyRemoveContact();
})



// RICERCA CONTATTO

const inputSearch = document.querySelector('#input-search');

inputSearch.addEventListener('input', function () {
    rubrica.searchContact(inputSearch.value.toLowerCase());
})