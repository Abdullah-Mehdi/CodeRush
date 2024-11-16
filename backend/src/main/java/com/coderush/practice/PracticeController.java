package com.coderush.practice;

import com.coderush.problem.Problem;
import com.coderush.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/practice")
public class PracticeController {
    private final PracticeService practiceService;

    @Autowired
    public PracticeController(PracticeService practiceService) {
        this.practiceService = practiceService;
    }

    @PostMapping("/start")
    public Practice startPractice(@RequestBody User user, @RequestBody Problem problem) {
        return practiceService.startPractice(user, problem);
    }

    @PostMapping("/complete")
    public String completePractice(@RequestBody Practice practice) {
        practiceService.completePractice(practice);
        return "Practice session completed!";
    }
}
