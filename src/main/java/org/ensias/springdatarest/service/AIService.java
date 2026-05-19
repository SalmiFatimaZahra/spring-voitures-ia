package org.ensias.springdatarest.service;

import org.ensias.springdatarest.modele.Voiture;
import org.ensias.springdatarest.modele.VoitureRepo;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final VoitureRepo voitureRepo;
    private final ChatClient chatClient;

    public AIService(VoitureRepo voitureRepo, ChatClient.Builder chatClientBuilder) {
        this.voitureRepo = voitureRepo;
        this.chatClient = chatClientBuilder.build();
    }

    public String conseillerVoiture(String question) {
        Iterable<Voiture> voitures = voitureRepo.findAll();

        StringBuilder listeVoitures = new StringBuilder();

        for (Voiture voiture : voitures) {
            listeVoitures.append("- ID: ")
                    .append(voiture.getId())
                    .append(", Marque: ")
                    .append(voiture.getMarque())
                    .append(", Modele: ")
                    .append(voiture.getModele())
                    .append(", Couleur: ")
                    .append(voiture.getCouleur())
                    .append(", Immatricule: ")
                    .append(voiture.getImmatricule())
                    .append(", Annee: ")
                    .append(voiture.getAnnee())
                    .append(", Prix: ")
                    .append(voiture.getPrix())
                    .append("\n");
        }

        String prompt =
                "Tu es un assistant IA specialise dans le conseil automobile.\n\n" +
                        "Ton role est d'aider l'utilisateur a choisir une voiture a partir des voitures disponibles dans la base de donnees.\n\n" +
                        "Tu dois utiliser uniquement les voitures de cette liste :\n" +
                        listeVoitures.toString() +
                        "\nQuestion de l'utilisateur :\n" +
                        question +
                        "\n\nConsignes de reponse :\n" +
                        "- Reponds en francais.\n" +
                        "- Donne une reponse claire et professionnelle.\n" +
                        "- Recommande une voiture disponible dans la liste.\n" +
                        "- Justifie ton choix avec la marque, le modele, l'annee, la couleur et le prix.\n" +
                        "- Si l'utilisateur donne un budget, respecte ce budget si possible.\n" +
                        "- Si aucune voiture ne respecte exactement le budget, propose la voiture la plus proche.\n" +
                        "- Ne propose jamais une voiture qui n'existe pas dans la liste.\n";

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}