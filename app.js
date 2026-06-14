document.getElementById('changeBtn').addEventListener('click', function() {
    const message = document.getElementById('message');
    if (message.textContent === 'This is a simple static website.') {
        message.textContent = 'You clicked the button!';
    } else {
        message.textContent = 'This is a simple static website.';
    }
});
