package org.ensias.springdatarest.web;

import org.ensias.springdatarest.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/conseil")
    public String conseillerVoiture(@RequestBody String question) {
        return aiService.conseillerVoiture(question);
    }
}