package org.ensias.springdatarest;

import org.ensias.springdatarest.modele.Proprietaire;
import org.ensias.springdatarest.modele.Voiture;
import org.ensias.springdatarest.modele.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class VoitureRepoTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        Proprietaire proprietaire = new Proprietaire("Test", "User");
        entityManager.persistAndFlush(proprietaire);

        Voiture voiture = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000, proprietaire);
        entityManager.persistAndFlush(voiture);

        assertThat(voiture.getId()).isNotNull();
    }

    @Test
    public void supprimerVoiture() {
        Proprietaire proprietaire = new Proprietaire("Test", "User");
        entityManager.persistAndFlush(proprietaire);

        entityManager.persistAndFlush(new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000, proprietaire));
        entityManager.persistAndFlush(new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000, proprietaire));

        voitureRepo.deleteAll();

        assertThat(voitureRepo.findAll()).isEmpty();
    }
}