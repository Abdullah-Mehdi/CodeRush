package com.coderush.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "leaderboards")
public class Leaderboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long problemId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Integer timeInSeconds;

    @Column(nullable = false)
    private LocalDateTime completedAt;
}
