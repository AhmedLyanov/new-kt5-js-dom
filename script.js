const numberInput = document.getElementById('SetNumber');
const numberCardInput = document.getElementById('NumberCard');


numberInput.addEventListener('input', function() {
    let formattedValue = this.value.replace(/\D/g, ''); 

    formattedValue = formattedValue.replace(/\d{4}(?=\d)/g, '$& ');
  
    numberCardInput.value = formattedValue; 
});

const setNameInput = document.getElementById('SetName');
const numberNameInput = document.getElementById('NumberName');

setNameInput.addEventListener('input', function() {
  
    const filteredValue = this.value.replace(/[^a-zA-Zа-яА-Я]/g, '');

    numberNameInput.value = filteredValue;
});


const setInputFilter = function(textbox, inputFilter) {
    ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty('oldValue')) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = '';
            }
        });
    });
};


setInputFilter(numberInput, function(value) {
    return /^\d*$/.test(value); 
});
const setYearInput = document.getElementById('SetYear');
const yearJobInput = document.getElementById('YearJob');

setYearInput.addEventListener('input', function() {
    
    let inputValue = this.value.replace(/\D/g, '');

   
    if (inputValue.length > 2) {
        inputValue = inputValue.replace(/(\d{2})/, '$1 / ');
    }

  
    inputValue = inputValue.slice(0, 7);

    this.value = inputValue;

    yearJobInput.value = inputValue;
});

setYearInput.maxLength = 7;

const numberCardInput2 = document.getElementById('NumberCard');

function processNumberCardInput() {
    let formattedValue = numberCardInput2.value.replace(/\D/g, ''); 

    if (formattedValue.length < 16) { 
        
        numberCardInput2.value = "Неверное количество"; 
    } else {
      
        numberCardInput2.value = formattedValue.slice(0, 16); 
    }
}


numberCardInput2.addEventListener('input', processNumberCardInput);


const saveCardButton = document.getElementById('SaveCard');
saveCardButton.addEventListener('click', processNumberCardInput);

const saveCardButton2 = document.getElementById('SaveCard');


saveCardButton2.addEventListener('click', function(event) {
    event.preventDefault(); 
    processNumberCardInput(); 
});



const saveCardButton3 = document.getElementById('SaveCard');

saveCardButton3.addEventListener('click', function() {
    const numberValue = document.getElementById('SetNumber').value.trim();
    const nameValue = document.getElementById('SetName').value.trim();
    const yearValue = document.getElementById('SetYear').value.trim();
    const numberCardValue = document.getElementById('NumberCard').value.trim();
    const yearJobValue = document.getElementById('YearJob').value.trim();
    
    // Проверка заполнения полей
    if (numberValue === '' && nameValue === '' && yearValue === '') {
        alert("Вы не заполнили ни одно поле");
        return;
    } else if (numberValue === '' || nameValue === '' || yearValue === '') {
        alert("Вы заполнили не все поля");
        return;
    }

    
    if (numberCardValue.length !== 16) {
        alert("Ваш 16-значный код не корректный");
        return;
    }

 
    if (yearJobValue.length < 3) {
        alert("Срок действия вашей карты не корректный");
        return;
    }

    const cardDetails = {
        "16-значный номер": numberValue,
        "Имя получателя": nameValue,
        "Срок годности": yearValue,
    };

   
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let key in cardDetails) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        cell1.textContent = key;
        cell2.textContent = cardDetails[key];

        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
    }

   
    const oldTable = document.querySelector('table');
    if (oldTable) {
        oldTable.remove();
    }

    
    table.appendChild(tbody);
    document.body.appendChild(table);
});