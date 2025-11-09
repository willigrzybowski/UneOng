
document.getElementById('form-cadastro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const Nome_user = document.getElementById('txtnome').value.trim();
  const Email_user = document.getElementById('txtemail').value.trim();
  const Senha_user = document.getElementById('txtsenha').value.trim();

  const res = await fetch('/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Nome_user, Senha_user,Email_user })
    
  });

 if (res.ok) {
    alert('Cadastrado com sucesso');
                window.location.href = '/cadastros/login-doador.html';


  }
  else{
    const responseData = await res.json();
    alert('Erro ao criar usuário: ' + responseData.error);
  }
});