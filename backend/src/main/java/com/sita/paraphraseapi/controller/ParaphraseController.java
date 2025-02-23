package com.sita.paraphraseapi.controller;

import com.sita.paraphraseapi.model.ParaphraseRequest;
import com.sita.paraphraseapi.service.ParaphraseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/paraphrase")

@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://to-be-updated-by-sita.com",
})
public class ParaphraseController {

    private final ParaphraseService paraphraseService;

    @Autowired
    public ParaphraseController(ParaphraseService paraphraseService) {
        this.paraphraseService = paraphraseService;
    }
    @PostMapping
    public Mono<ResponseEntity<String>> paraphrase(@RequestBody ParaphraseRequest request) {
        return paraphraseService.paraphraseText(request)
                .map(result -> ResponseEntity.ok().body(result))
                .defaultIfEmpty(ResponseEntity.badRequest().body("Invalid request"));
    }
}
