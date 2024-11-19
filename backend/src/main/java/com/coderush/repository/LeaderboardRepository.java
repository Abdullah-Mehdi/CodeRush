// LeaderboardRepository.java
package com.coderush.repository;

import com.coderush.models.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {
    List<Leaderboard> findByProblemIdOrderByTimeInSecondsAsc(Long problemId);
}
