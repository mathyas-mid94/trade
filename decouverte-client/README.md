# Découverte Client — R1 en ligne (Midelton Investment Capital)

Site statique d'une seule page (`index.html`) : le client remplit son bilan de découverte en
10 écrans, tout est calculé dans le navigateur, il télécharge un PDF et demande ses accès Majors
par e-mail prérempli. **Aucune donnée stockée** (ni serveur, ni localStorage, ni service tiers).

Ouvrir `index.html` dans un navigateur suffit ; pour le mettre en ligne, n'importe quel
hébergement statique convient (GitHub Pages, Netlify…).

## Paramètres

Tout ce qui est à valider est regroupé dans l'objet `CONFIG` en haut du script :

| Paramètre | Valeur actuelle | Statut |
|---|---|---|
| `urssaf` (net → brut → coût employeur) | 8 points, dont 36 000 → 45 810 → 63 598 | ⚠ seul le point 36 000 € est calé ; **les 7 autres sont provisoires** |
| `replaceBase` / `replaceYoung` | 50 % / 25 % | ⚠ **source INSEE à compléter** (`replaceSource`) |
| `retirementAge` | 64 ans (modifiable par le client) | validé |
| `reserveMonths` | 3 mois de net | validé |
| `debtCap` | 40 % | validé |
| `inflation`, `livretRate`, `targetRate` | 2 % / 1,7 % / 5 % (modifiables) | défauts à valider |

## Avant mise en ligne

- [ ] Remplacer la table `urssaf` par les valeurs exactes du simulateur mon-entreprise.urssaf.fr.
- [ ] Renseigner la source et le chiffre INSEE des taux de remplacement.
- [ ] Relire les textes du questionnaire de profil (repris du simulateur existant, passé au tutoiement).
