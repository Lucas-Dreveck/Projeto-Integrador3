const onOpenForgotPassword = () => {
    const form = document.querySelector('#forgot');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        forgot();
    });

    const backToLogin = document.querySelector('#backToLogin');
    backToLogin.addEventListener('click', () => {
        getMainFrameContent('login');
    });
};

const forgot = async () => {
    const email = document.querySelector('#email').value;

    await fetch(`${URL}/forgot-password?email=${email}`, {
        method: 'POST',
        headers,
    })
    .then(async response => { 
        return { 
            ok: response.ok, 
            message: await response.text() 
        } 
    })
    .then(data => {
        if (!data.ok) {
            throw new Error(data.message);
        }
        toastAlert(data.message, "success");
        goToNextStep(email);
    })
    .catch(error => {
        toastAlert(error, "error");
    });
}

const goToNextStep = (email) => {
    const form = document.querySelector('#forgot');
    form.classList.add('hidden');

    const nextStep = document.querySelector('#recovery');
    nextStep.classList.remove('hidden');

    const formRecovery = document.querySelector('#recovery');
    formRecovery.addEventListener('submit', (event) => {
        event.preventDefault();
        recovery(email);
    });
}

const recovery = async (email) => {
    const recoveryCode = document.querySelector('#recoveryCode').value;
    const password = document.querySelector('#newPassword').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    if (password !== confirmPassword) {
        toastAlert("Senhas não conferem", "error");
        return;
    }
    await fetch(`${URL}/reset-password?email=${email}&recoveryCode=${recoveryCode}&newPassword=${password}`, {
        method: 'POST',
        headers,
    })
    .then(async response => { 
        return { 
            ok: response.ok, 
            message: await response.text() 
        } 
    })
    .then(data => {
        if (!data.ok) {
            throw new Error(data.message);
        }
        toastAlert(data.message, "success");
        getMainFrameContent('login');
    })
    .catch(error => {
        toastAlert(error, "error");
    });
}