package org.ensias.springdatarest.web;

import org.ensias.springdatarest.modele.Proprietaire;
import org.ensias.springdatarest.modele.ProprietaireRepo;
import org.ensias.springdatarest.modele.Voiture;
import org.ensias.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @Autowired
    private ProprietaireRepo proprietaireRepo;

    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    @PostMapping("/voitures")
    public Voiture ajouterVoiture(@RequestBody Map<String, Object> data) {

        Proprietaire proprietaire = proprietaireRepo.findById(1L)
                .orElseGet(() -> proprietaireRepo.save(new Proprietaire("Ali", "Hassan")));

        Voiture voiture = new Voiture(
                data.get("marque").toString(),
                data.get("modele").toString(),
                data.get("couleur").toString(),
                data.get("immatricule").toString(),
                Integer.parseInt(data.get("annee").toString()),
                Integer.parseInt(data.get("prix").toString()),
                proprietaire
        );

        return voitureRepo.save(voiture);
    }

    @PutMapping("/voitures/{id}")
    public Voiture modifierVoiture(@PathVariable Long id, @RequestBody Map<String, Object> data) {

        Voiture voiture = voitureRepo.findById(id).orElse(null);

        if (voiture != null) {
            voiture.setMarque(data.get("marque").toString());
            voiture.setModele(data.get("modele").toString());
            voiture.setCouleur(data.get("couleur").toString());
            voiture.setImmatricule(data.get("immatricule").toString());
            voiture.setAnnee(Integer.parseInt(data.get("annee").toString()));
            voiture.setPrix(Integer.parseInt(data.get("prix").toString()));

            return voitureRepo.save(voiture);
        }

        return null;
    }

    @DeleteMapping("/voitures/{id}")
    public void supprimerVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
    }

    @GetMapping("/voitures/{id}")
    public Voiture getVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id).orElse(null);
    }
}