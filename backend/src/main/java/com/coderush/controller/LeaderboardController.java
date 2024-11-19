package com.coderush.controller;

import com.coderush.models.Leaderboard;
import com.coderush.repository.LeaderboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaderboardController {
    
    private static final Logger log = LoggerFactory.getLogger(LeaderboardController.class);
    
    @Autowired
    private LeaderboardRepository leaderboardRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitScore(@RequestBody Leaderboard entry) {
        log.info("Received leaderboard submission: problemId={}, username={}, time={}",
            entry.getProblemId(), entry.getUsername(), entry.getTimeInSeconds());
        
        try {
            entry.setCompletedAt(LocalDateTime.now());
            Leaderboard savedEntry = leaderboardRepository.save(entry);
            log.info("Successfully saved leaderboard entry with id: {}", savedEntry.getId());
            return ResponseEntity.ok(savedEntry);
        } catch (Exception e) {
            log.error("Error saving leaderboard entry: ", e);
            return ResponseEntity.badRequest().body("Error saving score: " + e.getMessage());
        }
    }

    @GetMapping("/problem/{problemId}")
    public ResponseEntity<?> getLeaderboard(@PathVariable Long problemId) {
        return ResponseEntity.ok(
            leaderboardRepository.findByProblemIdOrderByTimeInSecondsAsc(problemId)
        );
    }
}


