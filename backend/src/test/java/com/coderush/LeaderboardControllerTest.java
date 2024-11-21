package com.coderush.controller;

import com.coderush.models.Leaderboard;
import com.coderush.repository.LeaderboardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LeaderboardControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetLeaderboard() throws Exception {
        mockMvc.perform(get("/api/leaderboard/problem/1"))
               .andExpect(status().isOk())
               .andExpect(content().contentType("application/json"));
    }

    @Test
    public void testSubmitScore() throws Exception {
        String jsonPayload = "{\"problemId\": 1, \"username\": \"testUser\", \"timeInSeconds\": 300}";
        
        mockMvc.perform(post("/api/leaderboard/submit")
               .contentType("application/json")
               .content(jsonPayload))
               .andExpect(status().isOk());
    }
}

