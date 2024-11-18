/* package com.coderush.match;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/match")
public class MatchController {

    private final MatchService matchService;

    @Autowired
    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping("/start")
    public String startMatch() {
        return matchService.startMatch();
    }

    @PostMapping("/end")
    public String endMatch() {
        return matchService.endMatch();
    }
} */