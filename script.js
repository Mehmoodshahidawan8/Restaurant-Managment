document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display menu items
    fetch('http://localhost:3000/api/menu')
        .then(response => response.json())
        .then(menuItems => {
            const menuContainer = document.getElementById('menu-items');
            menuItems.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('menu-item');
                div.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p><p>$${item.price}</p><img src="${item.imageUrl}" alt="${item.name}" />`;
                menuContainer.appendChild(div);
            });
        });

    // Handle reservation form submission
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value
        };

        fetch('http://localhost:3000/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => alert('Reservation made successfully!'))
        .catch(err => alert('Error in making reservation.'));
    });

    // Handle order form submission
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const orderData = {
            name: document.getElementById('order-name').value,
            address: document.getElementById('order-address').value,
            phone: document.getElementById('order-phone').value,
            items: [],  // Collect item IDs based on user's selections
            totalAmount: 0,
            deliveryTime: 'ASAP'
        };

        fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => alert('Order placed successfully!'))
        .catch(err => alert('Error in placing order.'));
    });
});
