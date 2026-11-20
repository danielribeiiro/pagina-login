const formulario = document.getElementById("formulario-login");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const dados = {
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value
  };

  try {
    const resposta = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const texto = await resposta.text();
    mensagem.textContent = texto;
    mensagem.style.color = resposta.ok ? "green" : "red";
  } catch (erro) {
    mensagem.textContent = "Não foi possível conectar à API.";
    mensagem.style.color = "red";
  }
});