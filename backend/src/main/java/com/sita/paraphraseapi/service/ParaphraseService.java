package com.sita.paraphraseapi.service;

import com.sita.paraphraseapi.model.Resopnse;
import com.sita.paraphraseapi.model.ParaphraseRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ParaphraseService {

    private final WebClient webClient;

    public ParaphraseService(WebClient webClient) {
        this.webClient = webClient;
    }


    public Mono<String> paraphraseText(ParaphraseRequest request) {
        return webClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Resopnse.class)
                .map(Resopnse::getResult)
                .onErrorResume(e -> Mono.just("Error processing request: " + e.getMessage()));
    }
}