\# Lab Kubernetes - Minikube



Ce dossier contient les fichiers utilisés pour le lab Kubernetes avec Minikube.



\## Objectif



L’objectif de ce lab est de découvrir Kubernetes avec Minikube, en créant et en gérant un déploiement nginx.



\## Étapes réalisées



\- Lancement de Minikube avec Docker

\- Vérification du cluster avec kubectl

\- Création d’un Deployment nginx

\- Scaling des replicas

\- Exposition du service avec NodePort

\- Test dans le navigateur avec Welcome to nginx

\- Exposition avec LoadBalancer

\- Test du Control Plane par suppression d’un pod

\- Création d’un Deployment avec fichier YAML

\- Modification du nombre de replicas

\- Rolling Update vers nginx:1.19

\- Rollback avec kubectl rollout undo

\- Gestion impérative avec create, scale, edit et patch

\- Accès shell au pod avec kubectl exec

\- Consultation des logs

\- Port-forward

\- Proxy Kubernetes

\- Nettoyage final



\## Fichiers



\- `nginx-deployment.yaml` : fichier de déploiement Kubernetes

\- `patch.json` : fichier utilisé pour modifier le nombre de replicas

