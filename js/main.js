document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}&password=${password}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            loadNaseleniMesta();
        } else {
            alert('Грешно потребителско име или парола');
        }
    });
});

function loadNaseleniMesta() {
    fetch('../php/CRUD/settlements.php')
    .then(response => response.json())
    .then(data => {
        const naseleniMestaList = document.getElementById('naseleniMestaList');
        naseleniMestaList.innerHTML = '';
        data.forEach(naselenoMyasto => {
            const li = document.createElement('li');
            li.textContent = naselenoMyasto.name;
            li.addEventListener('click', () => loadOfficesByNaselenoMyasto(naselenoMyasto.id));
            naseleniMestaList.appendChild(li);
        });
    });
}

function loadOfficesByNaselenoMyasto(naselenoMyastoId) {
    fetch(`../php/CRUD/office.php?naseleno_myasto_id=${naselenoMyastoId}`)
    .then(response => response.json())
    .then(data => {
        const ofisiList = document.getElementById('ofisiList');
        ofisiList.innerHTML = '';
        data.forEach(ofis => {
            const li = document.createElement('li');
            li.textContent = ofis.name;
            li.addEventListener('click', () => loadOfficeDetails(ofis.id));
            ofisiList.appendChild(li);
        });
    });
}

function loadOfficeDetails(officeId) {
    fetch(`../php/CRUD/settlements.php?office_id=${officeId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('officeDetails').innerHTML = `
            <h3>${data.office.name}</h3>
            <p>Управител: ${data.office.manager}</p>
            <p>Адрес: ${data.office.address}</p>
            <p>Телефон: ${data.office.phone}</p>
            <p>Работно време: ${data.office.working_hours}</p>
            <button onclick="editOffice(${officeId})">Редактирай офис</button>
        `;

        const kurieriDetails = document.getElementById('kurieriDetails');
        kurieriDetails.innerHTML = '<h3>Куриери</h3>';
        data.kurieri.forEach(kurier => {
            kurieriDetails.innerHTML += `
                <p>${kurier.full_name} - ${kurier.phone} <button onclick="editKurier(${kurier.id})">Редактирай</button></p>
            `;
        });

        const avtomobiliDetails = document.getElementById('avtomobiliDetails');
        avtomobiliDetails.innerHTML = '<h3>Автомобили</h3>';
        data.avtomobili.forEach(avtomobil => {
            avtomobiliDetails.innerHTML += `
                <p>${avtomobil.marka} ${avtomobil.model} (${avtomobil.reg_number}) - ${avtomobil.kurier ? avtomobil.kurier : 'Без куриер'} <button onclick="editAvtomobil(${avtomobil.id})">Редактирай</button></p>
            `;
        });
    });
}

function editOffice(officeId) {
    fetch(`../php/CRUD/office_details.php?office_id=${officeId}`)
    .then(response => response.json())
    .then(data => {
        const editForm = document.getElementById('editForm');
        editForm.innerHTML = `
            <input type="hidden" name="type" value="office">
            <input type="hidden" name="id" value="${data.office.id}">
            <label>Наименование:</label>
            <input type="text" name="name" value="${data.office.name}" required><br>
            <label>Управител:</label>
            <input type="text" name="manager" value="${data.office.manager}" required><br>
            <label>Адрес:</label>
            <input type="text" name="address" value="${data.office.address}" required><br>
            <label>Телефон:</label>
            <input type="text" name="phone" value="${data.office.phone}" required><br>
            <label>Работно време:</label>
            <input type="text" name="working_hours" value="${data.office.working_hours}" required><br>
        `;
        document.getElementById('editSection').style.display = 'block';
    });
}

function editKurier(kurierId) {
    fetch(`../php/CRUD/courier_details.php?kurier_id=${kurierId}`)
    .then(response => response.json())
    .then(data => {
        const editForm = document.getElementById('editForm');
        editForm.innerHTML = `
            <input type="hidden" name="type" value="kurier">
            <input type="hidden" name="id" value="${data.kurier.id}">
            <label>Персонален номер:</label>
            <input type="text" name="personal_number" value="${data.kurier.personal_number}" required><br>
            <label>Потребителско име:</label>
            <input type="text" name="username" value="${data.kurier.username}" required><br>
            <label>Парола:</label>
            <input type="password" name="password" value="${data.kurier.password}" required><br>
            <label>Три имена:</label>
            <input type="text" name="full_name" value="${data.kurier.full_name}" required><br>
            <label>Телефон:</label>
            <input type="text" name="phone" value="${data.kurier.phone}" required><br>
        `;
        document.getElementById('editSection').style.display = 'block';
    });
}

function editAvtomobil(avtomobilId) {
    fetch(`../php/CRUD/car_details.php?avtomobil_id=${avtomobilId}`)
    .then(response => response.json())
    .then(data => {
        const editForm = document.getElementById('editForm');
        editForm.innerHTML = `
            <input type="hidden" name="type" value="avtomobil">
            <input type="hidden" name="id" value="${data.avtomobil.id}">
            <label>Марка:</label>
            <input type="text" name="marka" value="${data.avtomobil.marka}" required><br>
            <label>Модел:</label>
            <input type="text" name="model" value="${data.avtomobil.model}" required><br>
            <label>Регистрационен номер:</label>
            <input type="text" name="reg_number" value="${data.avtomobil.reg_number}" required><br>
            <label>Разход на гориво:</label>
            <input type="number" step="0.01" name="fuel_consumption" value="${data.avtomobil.fuel_consumption}" required><br>
        `;
        document.getElementById('editSection').style.display = 'block';
    });
}

document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    let url;
    if (formData.get('type') === 'office') {
        url = '../php/CRUD/update_office.php';
    } else if (formData.get('type') === 'kurier') {
        url = '../php/CRUD/update_courier.php';
    } else if (formData.get('type') === 'avtomobil') {
        url = '../php/CRUD/update_car.php';
    }

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Успешно обновяване');
            document.getElementById('editSection').style.display = 'none';
            loadOfficeDetails(data.id); // Reload the office details after update
        } else {
            alert('Грешка при обновяване');
        }
    });
});
