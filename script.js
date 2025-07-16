const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!userName || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const user = {
        userName,
        email,
        password,
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users))
    alert('Signup successful!')
    signupForm.reset();
    window.location.href = 'index.html';
})