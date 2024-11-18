import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from the React frontend
public class LeaderboardController {

    @GetMapping("/leaderboard")
    public List<Map<String, String>> getLeaderboard(@RequestParam(defaultValue = "10") int top) {
        ArrayList<ArrayList<String>> leaderboardData = MySqlHandler.getLeaderboard(top);
        List<Map<String, String>> response = new ArrayList<>();

        if (leaderboardData != null) {
            for (ArrayList<String> user : leaderboardData) {
                Map<String, String> userInfo = new HashMap<>();
                userInfo.put("username", user.get(0));
                userInfo.put("totalscore", user.get(1));
                response.add(userInfo);
            }
        }
        return response;
    }
}