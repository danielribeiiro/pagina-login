package com.example.login_api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public LoginController(UsuarioRepository repository) {
        this.repository = repository;
    }

    public record DadosLogin(String email, String senha) {}

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@RequestBody DadosLogin dados) {
        if (repository.findByEmail(dados.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado");
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(dados.email());
        usuario.setSenha(encoder.encode(dados.senha()));
        repository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody DadosLogin dados) {
        Optional<Usuario> usuario = repository.findByEmail(dados.email());
        if (usuario.isPresent() && encoder.matches(dados.senha(), usuario.get().getSenha())) {
            return ResponseEntity.ok("Login realizado com sucesso");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos");
    }
}