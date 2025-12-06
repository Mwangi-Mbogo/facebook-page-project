
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const forgotPasswordLink = document.getElementById("forgotPassword");
const createAccountBtn = document.getElementById("createAccountBtn");
const signupModel = document.getElementById("signupModel");
const closeModelBtn = document.getElementById("closeModel");
const signupForm = document.getElementById("signupForm");
const forgotModel = document.getElementById("forgotModel");
const closeForgotModelBtn = document.getElementById("closeForgotModel");
const forgotForm = document.getElementById("forgotForm");
const forgotEmail = document.getElementById("forgotEmail");
const cancelForgotBtn = document.getElementById("cancelForgot");

function hideMessage(){
  errorMessage.style.display = "none";
  successMessage.style.display = "none";
}

function showError(message){
  hideMessage();
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function showSuccess(message){
  hideMessage();
  successMessage.textContent = message;
  successMessage.style.display = "block";
}

function showToast(message, type = "success"){
  const existingToast = document.querySelectorAll('.toast');
  existingToast.forEach(toast => toast.remove());

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon = type === "success" ? " " : " ";

  text.innerHTML = `
  <div class = 'toast.content'>
     <span class = 'toast-icon'>${icon}</span>
     <span>${message}</span>
     <button class = 'toast-close'>&times;</button>
  </div>
  `
  document.body.appendChild(toast);

  setTimeout(() =>{
    toast.classList.add("show");
  }, 100);

  setTimeout(() =>{
    toast.classList.remove('show');
    setTimeout(() =>{
      if(toast.parentNode){
        toast.remove();
      }
    }, 3000);
  }, 4000);

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () =>{
    toast.classList.remove('show');
    setTimeout(() =>{
      if(toast.parentNode){
        toast.remove();
      }
    }, 300);
  });

  function isValidEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  loginForm.addEventListener('submit', function(e){
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if(!email){
      showError("Please enter your email or phone number");
      emailInput.focus();
      return;
    }

    if(!password){
      showError("Please enter your password")
      passwordInput.focus();
      return;
    }

    if(email.include('@') && !isValidEmail(email)){
      showError('Please enter a valid email address');
      emailInput.focus();
      return;
    }

    if(password.length < 6){
      showError('Password must be at least 6 characters long');
      passwordInput.focus();
      return;
    }

    showSuccess('Login successful! Redirecting...');

    setTimeout(() =>{
      emailInput.value = "";
      passwordInput.value = "";
      hideMessage();
    }, 2000);
  });
}

forgotPasswordLink.addEventListener('click', function(e){
    e.preventDefault();
    forgotModel.classList.add('active');
    document.body.style.overflow = "hidden";
}); 

closeForgotModelBtn.addEventListener("click", function(){
  forgotModel.classList.remove("active");
  document.body.overflow = "auto";
});

forgotModel.addEventListener('click', function(e){
  if(e.target === forgotModel){
    forgotModel.classList.remove("active");
    document.body.style.overflow = "auto"
  }
});

forgotForm.addEventListener('submit', function(e){
  e.preventDefault;
  const email = document.getElementById("forgotEmail").value.trim();

  if(email){
    showToast("Please enter your email or mobile number", "error");
    return;
  }

  forgotModel.classList.remove("active");
  document.body.style.overflow = "auto";
  showToast("Password reset link has been sent to your email", "success");
  forgotForm.reset();
});

createAccountBtn.addEventListener("click", function(){
  signupModel.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeModelBtn.addEventListener("click", function(){
  closeModelBtn.classList.remove("active");
  document.body.style.overflow = "auto";
});

signupModel.addEventListener("click", function(e){
  signupModel.classList.remove("active");
  document.body.overflow = "auto";
});


signupForm.addEventListener('submit', function(e){
  e.preventDefault();
  const firstName = signupForm.querySelector('input[placeholder="First name"]').value.trim();
  const lastName = signupForm.querySelector('input[placeholder="Last name"]').value.trim();
  const email = signupForm.querySelector('input[placeholder="Mobile number or email"]').value.trim();
  const password = signupForm.querySelector('input[placeholder="New password"]').value.trim();
  const gender = signupForm.querySelector('input[placeholder="gender"]:checked').value.trim();

  if(!firstName || !lastName){
    showToast('Please enter your first and last name', 'error');
    return;
  }

  if(!email){
    showToast('Please enter your email or phone number', 'error');
    return;
  }

  if(!password || password.length < 6){
    showToast('Password must be at least 6 characters long', 'error');
    return;
  }

  if(!firstName || !lastName){
    showToast('Please select your gender', 'error');
    return;
  }

  signupModel.classList.remove("active");
  document.body.style.overflow = "auto";
  showToast(`Welcome ${firstName}! Your account has been created successfully!`);
  signupForm.reset();
});

emailInput.addEventListener('input', function(){
  if(errorMessage.style.display === "block"){
    hideMessage();
  }
});

passwordInput.addEventListener('input', function(){
  if(errorMessage.style.display === "block"){
    hideMessage();
  }
});