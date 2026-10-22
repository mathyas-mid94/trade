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
- [x] Voix enregistrée sur le script : `voix_script_brute.m4a` (16 min, très propre ; « banane » = code de reprise)
- [ ] **En attente : domaine `openaipublic.azureedge.net` autorisé dans l'environnement** (choix de l'utilisateur), puis :
      1. `pip install openai-whisper` (si absent)
      2. `python3 motion/tools/transcribe.py motion/videos/assurance-vie-long/voix_script_brute.m4a /tmp/mots.json small`
      3. `python3 motion/tools/align.py motion/videos/assurance-vie-long/voix_script_brute.m4a /tmp/mots.json motion/videos/assurance-vie-long/SCRIPT.md motion/videos/assurance-vie-long`
         → voix_script.m4a + timing.js (+ montage.txt à relire : reprises supprimées, repères)
      4. vérifier quelques scènes (`snap.mjs`), adapter build.sh (voix_script.m4a, sans décalage de 7,9 s), rendre
- [ ] Musique de fond : l'utilisateur doit fournir une piste libre de droits → mixer sous la voix avec atténuation automatique
- [x] Voix ElevenLabs (clone pro de l'utilisateur, 2 fichiers recollés) + texte retouché par l'utilisateur → `SCRIPT.md` v3
      (v2 dans `SCRIPT_v2.md`), images adaptées (gestion passive « équipe de professionnels », PLACER/RETIRER, chien retiré
      → 4e bénéficiaire « QUI VOUS VOULEZ », « Midelton Investment Capital » sous le logo et dans le test de profil),
      calage avec `PAUSE=1.2 python3 motion/tools/align.py …` (respiration entre parties, la voix de synthèse enchaîne tout)
- [ ] Points à faire vérifier :
      - « taux réduit d'environ 18,6 % » (texte de l'utilisateur, affiché à l'écran) : à revérifier. Après 8 ans, la part
        imposable est soumise à 7,5 % d'impôt sur le revenu, et les prélèvements sociaux s'appliquent sur tous les intérêts
        (l'abattement ne les couvre pas). La hausse de CSG 2026 (17,2 → 18,6 %) exclurait l'assurance vie → idem pour la
        « flat tax 31,4 % » de la partie fiscalité (30 % si l'assurance vie est exclue)
      - S&P 500 « 12,2 % par an » (chiffre de la slide), courbe reconstruite à partir des rendements annuels publics
      - Logos des assureurs partenaires non repris (marques) : réseau dessiné de façon générique

- [ ] Script v2 « plus parlé » (`SCRIPT.md`, mêmes 30 parties et repères ; v1 conservée dans `SCRIPT_v1.md`,
      c'est celle de la vidéo v2 et de timing.js). Si l'utilisateur réenregistre : transcribe.py puis align.py avec SCRIPT.md, puis build.sh.

## Doublage en direct (essai en cours)
- Studio unique : `motion/tools/studio/studio.html` (vidéo muette + texte .json minuté ou .md/.txt libre, retours en arrière, export .zip).
  Pour chaque vidéo, fournir : la vidéo muette + son `<sujet>.json` (cues {t, title, text}, t = secondes dans la vidéo muette).
- Réception du .zip : `python3 motion/tools/doublage.py doublage.zip voix_timeline.wav` (dernière prise gardée, calée sur la vidéo),
  puis transcribe.py, suppression des « banane » avec déformation de la vidéo (à écrire), rendu.
- L'utilisateur parle librement en regardant `doublage_muet.mp4` (corps de la v3 sans son, précédé d'un compte à rebours).
  Repère de synchro : « TOP » s'affiche à 3,6 s ; l'animation démarre à 4,6 s (= t 0 du corps v3, timing.js actuel).
- Traitement prévu : transcrire → trouver « top » → décaler ; supprimer les « banane » (+ phrase reprise) ;
  la vidéo doit suivre les coupes : refaire le rendu avec une déformation temporelle globale lissée
  (chaque mot gardé conserve l'image qu'il commentait), sans repères de script.
