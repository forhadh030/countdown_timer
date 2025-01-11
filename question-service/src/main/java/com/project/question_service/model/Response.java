package com.project.quizapp.model;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Response {
    private Long id;
    private String response;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    @Override
    public String toString() {
        return "Response{" +
                "id=" + id +
                ", response='" + response + '\'' +
                '}';
    }
}
