package com.sita.paraphraseapi.service;

import com.sita.paraphraseapi.model.Resopnse;
import com.sita.paraphraseapi.model.ParaphraseRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class ParaphraseService {

    private final WebClient webClient;
    private final String model;

    public ParaphraseService(
            WebClient webClient,
            @Value("${ai.api.model}") String model
    ) {
        this.webClient = webClient;
        this.model = model;
    }

//    public Mono<String> paraphraseText(ParaphraseRequest request) {
//
//        String mode = (request.getMode() != null && !request.getMode().isEmpty()) ? request.getMode() : "standard";
//        int synonymsLevel = request.getSynonymsLevel() > 0 ? request.getSynonymsLevel() : 2;
//
//        String systemPrompt = buildSystemPrompt(mode, synonymsLevel);
//
//        return webClient.post()
//                .bodyValue(Map.of(
//                        "model", model,
//                        "messages", List.of(
//                                Map.of("role", "system", "content", systemPrompt),
//                                Map.of("role", "user", "content", request.getText())
//                        ),
//                        "stream", false
//                ))
//                .retrieve()
//                .bodyToMono(Resopnse.class)
//                .map(response -> response.getChoices().get(0).getMessage().getContent())
//                .onErrorResume(e -> Mono.error(new RuntimeException("API request failed")));
//    }
//

    public Mono<String> paraphraseText(ParaphraseRequest request) {
        String mode = (request.getMode() != null && !request.getMode().isEmpty()) ? request.getMode() : "standard";
        int synonymsLevel = request.getSynonymsLevel() > 0 ? request.getSynonymsLevel() : 2;

        String systemPrompt = buildSystemPrompt(mode, synonymsLevel);

        return webClient.post()
                .bodyValue(Map.of(
                        "model", model,
                        "messages", List.of(
                                Map.of("role", "system", "content", systemPrompt),
                                Map.of("role", "user", "content", request.getText())
                        ),
                        "stream", false
                ))
                .retrieve()
                .onStatus(status -> !status.is2xxSuccessful(), clientResponse ->
                        clientResponse.bodyToMono(String.class).flatMap(errorBody ->
                                Mono.error(new RuntimeException("API error: " + errorBody))
                        )
                )
                .bodyToMono(Resopnse.class)
                .map(response -> {
                    if (response.getChoices() == null || response.getChoices().isEmpty()) {
                        throw new RuntimeException("No choices in API response");
                    }
                    return response.getChoices().get(0).getMessage().getContent();
                })
                .onErrorResume(e -> {
                    e.printStackTrace(); // Log the actual error
                    return Mono.error(new RuntimeException("API request failed: " + e.getMessage()));
                });
    }

    private String buildSystemPrompt(String mode, int synonymsLevel) {
        return String.format("You are an advanced paraphrasing tool. Rewrite the user's text with these parameters: "
                        + "Mode: %s, Synonyms Level: %d. Maintain the original meaning but change the structure and wording.",
                mode, synonymsLevel);
    }
}

