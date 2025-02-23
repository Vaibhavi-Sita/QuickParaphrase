package com.sita.paraphraseapi.model;

import lombok.Data;

@Data
public class Resopnse {
    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    private String result;
}