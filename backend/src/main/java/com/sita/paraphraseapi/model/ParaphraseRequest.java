package com.sita.paraphraseapi.model;

import lombok.Data;

@Data
public class ParaphraseRequest {
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public int getSynonymsLevel() {
        return synonymsLevel;
    }

    public void setSynonymsLevel(int synonymsLevel) {
        this.synonymsLevel = synonymsLevel;
    }

    private String text;
    private String mode;
    private int synonymsLevel;
}