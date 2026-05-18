package org.ensias.springdatarest.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    // Lister les voitures par modèle
    List<Voiture> findByModele(@Param("modele") String modele);

    // Lister les voitures par couleur
    List<Voiture> findByCouleur(@Param("couleur") String couleur);
}