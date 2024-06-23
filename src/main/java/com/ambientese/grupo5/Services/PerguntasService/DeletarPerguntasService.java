package com.ambientese.grupo5.Services.PerguntasService;

import com.ambientese.grupo5.Model.PerguntasModel;
import com.ambientese.grupo5.Repository.PerguntasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DeletarPerguntasService {

    @Autowired
    private PerguntasRepository perguntasRepository;

    public ResponseEntity<String> deletarPergunta(long id) {
        PerguntasModel pergunta = perguntasRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Pergunta não encontrada"));
        perguntasRepository.delete(pergunta);
        return null;
    }
}
