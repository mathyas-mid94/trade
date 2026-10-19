# À faire / à rappeler

## Variantes d'intro par catégorie (demandé, à reprendre plus tard)
L'intro générique (`intro/intro.html`, la loupe) doit être déclinée par thème :
la loupe s'arrête sur l'icône du thème, et les étiquettes peuvent changer.
- [ ] Immobilier
- [x] Budget — intro faite (`intro/budget/intro_budget.mp4`)
- [ ] Location
- [ ] Épargne
- [x] Défiscalisation — intro faite (`intro/defiscalisation/intro_defiscalisation.mp4`)
- [ ] … (autres catégories à définir avec l'utilisateur)

Même chose pour l'outro : une variante par catégorie.

## Formats réseaux sociaux
- [ ] Version verticale 9:16 de l'outro « abonnement » pour TikTok / Reels / Shorts (actuellement en 16:9).

## En cours
- [ ] Outro défiscalisation : animation prête (nuage « IMPÔTS » qui pleut, parapluie au-dessus de l'arbre),
      reste le rendu final + son : `node render.mjs "outro/outro.html?theme=defiscalisation" ...`
      (son : référence MIC avec `adelay=150`). Version abonnement : ajouter `&abonnement`.

## Vidéo « L'assurance-vie en 2 min 30 » (`videos/assurance-vie/`)
- [x] Script voix off (`SCRIPT.md`) + animation complète (8 scènes) + intro thème assurance-vie + outro site
- [ ] **Voix off** : l'utilisateur enregistre le script (ou passe par un outil de synthèse vocale de qualité) → recaler l'animation dessus
- [ ] Faire valider les chiffres par l'utilisateur (abattements 4 600 / 9 200 €, 152 500 € par bénéficiaire avant 70 ans)
- [ ] Musique de fond discrète (à fournir ou choisir)

## Vidéo longue « L'assurance vie » (18 min, `videos/assurance-vie-long/`)
- [x] Voix extraite de la vidéo de l'utilisateur (`voix.m4a`), 18 chapitres calés sur le transcript horodaté et les slides
- [x] Retour utilisateur : images validées, mais la voix improvisée ne colle pas → script propre (`SCRIPT.md`, repères [n])
- [ ] **L'utilisateur enregistre `SCRIPT_A_LIRE.md` / le PDF** (un seul fichier, 3 s de pause entre les 30 parties)
      → découper aux silences, recaler chaque scène (déformation temporelle par repères), remonter
- [ ] Musique de fond : l'utilisateur doit fournir une piste libre de droits → mixer sous la voix avec atténuation automatique
- [ ] Points à faire vérifier :
      - « taux réduit » après abattement : la voix dit 18,6 % ; la slide parle de prélèvements sociaux (l'impôt sur le revenu
        de 7,5 % peut aussi s'appliquer selon les cas) → l'écran affiche seulement « à un taux réduit »
      - S&P 500 « 12,2 % par an » (chiffre de la slide), courbe reconstruite à partir des rendements annuels publics
      - Logos des assureurs partenaires non repris (marques) : réseau dessiné de façon générique
