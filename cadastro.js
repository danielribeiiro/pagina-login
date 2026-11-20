const formulario = document.getElementById("formulario-cadastro");
const mensagem = document.getElementById("mensagem");
const botao = formulario.querySelector("button");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmar").value;

  if (senha !== confirmar) {
    mensagem.textContent = "As senhas não são iguais.";
    mensagem.style.color = "red";
    return;
  }

  if (senha.length < 6) {
    mensagem.textContent = "A senha precisa ter pelo menos 6 caracteres.";
    mensagem.style.color = "red";
    return;
  }

  botao.disabled = true;

  try {
    const resposta = await fetch("http://localhost:8080/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const texto = await resposta.text();
    mensagem.textContent = texto;
    mensagem.style.color = resposta.ok ? "green" : "red";

    if (resposta.ok) {
      formulario.reset();
    }
  } catch (erro) {
    mensagem.textContent = "Não foi possível conectar à API.";
    mensagem.style.color = "red";
  } finally {
    botao.disabled = false;
  }
});