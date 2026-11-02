# Rendez-vous de découverte — Midelton Investment Capital

Deux fichiers à ouvrir dans Chrome, sans installation ni connexion :

| Fichier | Contenu |
|---|---|
| `Presentation_Complete_MIC.html` | Rendez-vous complet, slides 1 à 22 (présentation + bilan + profil investisseur) |
| `R1_Dynamique_MIC.html` | R1 seul, remplace les slides 13 à 22 du PowerPoint |

**En rendez-vous** : ← / → pour naviguer, `F` pour le plein écran, `H` pour masquer / réafficher la barre du bas,
touches 1 à 6 pour répondre au questionnaire.

**Valeurs ajustables** : les cases de la synthèse, le revenu estimé à la retraite (relevé du client) et le patrimoine global
(repris de Majors) sont calculés automatiquement mais restent modifiables ; « ↺ » revient au calcul.
**PDF** : bouton « PDF », puis « Enregistrer au format PDF » avec marges « Aucune ». Dans la version complète, le bouton
de la dernière slide télécharge tout le rendez-vous (slides 1 à 22) ; le menu « PDF » propose aussi le bilan seul.

Les saisies restent dans l'onglet et disparaissent à sa fermeture (bouton « Nouveau client » pour repartir de zéro).

## Modifier

Les deux fichiers sont générés à partir d'une source unique : modifier `src/deck.src.html`, puis

```bash
python3 build.py
```

Paramètres (adresse Majors `majorsUrl`, barème IR, seuil d'endettement, taux de crédit, réserve de précaution…) : objet `CONFIG` en tête du script.
