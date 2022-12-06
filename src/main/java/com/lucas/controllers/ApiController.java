package com.lucas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.model.Usuario;
import com.lucas.repository.UsuarioRepository;

/**
 *
 * A sample greetings controller to return greeting text
 */
@RestController
public class ApiController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping(value = "listartodos")
    @ResponseBody
    public ResponseEntity<java.util.List<Usuario>> listarUsuarios() {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();

        // Consulta banco de dados e retorna uma lista em JSON
        return new ResponseEntity<List<Usuario>>(listaUsuarios, HttpStatus.OK);
    }

    @PostMapping(value = "salvaruser") // Faz mapeamento de URL.
    @ResponseBody // Descrição da resposta.
    // Recebe dados para execução.
    public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario) {
        Usuario user = usuarioRepository.save(usuario);

        return new ResponseEntity<Usuario>(user, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "delete")
    @ResponseBody
    public ResponseEntity<String> delete(@RequestParam Long idUser) {
        usuarioRepository.deleteById(idUser);

        return new ResponseEntity<String>("Usuário excluido com sucesso !", HttpStatus.OK);
    }

    @GetMapping("buscaruserid")
    @ResponseBody
    public ResponseEntity<Usuario> buscaUserPorId(@RequestParam(name = "idUser") Long idUser) {

        Usuario usuario = usuarioRepository.findById(idUser).get();

        return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
    }

    @PutMapping(value = "atualizaruser")
    @ResponseBody
    public ResponseEntity<?> atualizarUser(@RequestBody Usuario usuario) {
        Usuario user = usuarioRepository.saveAndFlush(usuario);

        if (usuario.getId() == null) {
            return new ResponseEntity<String>("Id do usuário não foi informado.", HttpStatus.OK);
        }

        return new ResponseEntity<Usuario>(user, HttpStatus.OK);
    }

    @GetMapping("buscarpornome")
    @ResponseBody
    public ResponseEntity<?> buscarPorNome(@RequestParam(name = "nome") String nome) {

        List<Usuario> listaUsuarios = usuarioRepository.buscarPorNome(nome.trim().toUpperCase());

        return new ResponseEntity<List<Usuario>>(listaUsuarios, HttpStatus.OK);
    }

}
