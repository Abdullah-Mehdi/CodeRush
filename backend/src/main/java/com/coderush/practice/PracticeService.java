package com.coderush.practice;

import com.coderush.problem.Problem;
import com.coderush.user.User;
import org.springframework.stereotype.Service;

@Service
public class PracticeService {
    public Practice startPractice(User user, Problem problem) {
        Practice practice = new Practice();
        practice.setUser(user);
        practice.setProblem(problem);
        practice.setCompleted(false);
        return practice;
    }

    public void completePractice(Practice practice) {
        practice.setCompleted(true);
        System.out.println("Practice session completed!");
    }
}
