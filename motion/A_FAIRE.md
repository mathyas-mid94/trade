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

## Méthode validée pour toutes les vidéos (l'utilisateur : « c'est exactement ce qu'on va faire pour chacune »)
Style Dalio + palette MIC, intro thématique, outro site, voix ElevenLabs (clone de l'utilisateur), images calées mot à mot.
- Produits SANS vidéo existante : l'utilisateur envoie les slides → j'écris le script (très naturel, simple, avec repères [n])
  → il le passe dans ElevenLabs → transcribe.py + `PAUSE=1.2` align.py → rendu.
- Produits AVEC vidéo existante : à décider avec lui (repartir de sa vidéo = transcript + slides → script propre → ElevenLabs,
  plutôt que garder sa voix improvisée, qui collait mal la première fois).
- **Vidéos déjà tournées (consigne de l'utilisateur, 22/10)** : PAS de version avec sa voix. Livrables, dans l'ordre :
  1. le transcript brut de sa vidéo (Whisper) ;
  2. un script cohérent, naturel, simple (repères [n]), à passer dans ElevenLabs ;
  3. une vidéo MUETTE pour valider les images : nouvelles images pour le nouveau thème, intro et outro adaptées,
     minutage estimé au débit de sa voix ElevenLabs (~215 mots/min + 1,2 s de respiration entre parties).
  Ensuite seulement : MP3 ElevenLabs → recalage exact → version finale.
  Prochaines : 2 vidéos, suites de l'assurance vie.
- Textes ElevenLabs : `tools/elevenlabs.py <SCRIPT.md> <dossier> [n]` (sigles écrits S.C.P.I., E.D.R.… : validé ; les tirets « esse-cé-pé-i » faisaient bégayer, < 10 000 car. par fichier).
- Vérifier systématiquement les respirations (réécoute Whisper autour de chaque silence ≥ 1,1 s), cf. bug corrigé à 6:22.

## Vidéo « Les obligations » (`videos/obligations/`)
- [x] Script (`SCRIPT.md`, 17 parties, ~7 min 30) d'après les 13 slides + insistance sur le pull to par → 1 texte ElevenLabs (~8 100 car.) + test de prononciation
- [ ] MP3 → calage → scènes (même style que « L'argent suit la valeur ») ; thème intro/outro à créer
- [ ] Slides : slide 4 (IG 3,5–4 %, HY 5,75 %) vs slide 9 (spreads posés sur le 10 ans allemand) ; slide 10 (10 ans à 3,83 % au 30/04) vs slide 11 (4,90 % au 01/10)

## Vidéo « L'argent suit la valeur » (`videos/argent-valeur/`)
- [x] Script (`SCRIPT.md`, 19 parties, ~7 min 30) d'après le texte de Mathyas + la leçon PDF → 1 texte ElevenLabs (~8 400 car.) + test de prononciation
- [x] Voix calée (19 parties, marges OK, respirations entre phrases), scènes, intro/outro génériques
- [ ] À réécouter : « plus son salaire grimpe » (partie 06, ~2:30) — Whisper entend « on s'alère »

## Vidéo « Les produits structurés » (`videos/produits-structures/`)
- [x] Script (`SCRIPT.md`, 21 parties dont 4 bonus, ~9 min) d'après les slides 12-30 (pas de vidéo d'origine) → 2 textes ElevenLabs + test
- [x] Version finale livrée (`produits-structures.mp4`, 9:39). Voix calée (21 parties, marges OK, respirations entre phrases), scènes animées (marcheurs, ascenseur, robinet, compteur, tapis, airbag, haie), intro/outro « structures »
- [ ] À réécouter : « ta mise te revient » (partie 09) et « le Phénix et l'Athéna » (partie 09) — Whisper entend « ministre » / « la Téla »
- [ ] Slides : « capital garanti » → préciser « à l'échéance, sauf défaut de l'émetteur » ; décrément « dans la poche de la banque » trop affirmatif

## Vidéo « Le CTO et le PEA » (`videos/pea-cto/`)
- [x] Script (`SCRIPT.md`, 24 parties, ~11 min, slides 11 à 30 + consignes orales) → 2 textes ElevenLabs + test de prononciation
- [x] Voix calée, 24 scènes, intro/outro « bourse », version finale livrée (`pea-cto.mp4`, 11:53) ; respiration qui coupait « P.F.U. » à 4:49 corrigée
- [ ] À vérifier : ETF swap « exclusion abandonnée le 26 août » (slide) ; « 0 € d'impôt » au décès (droits de succession restent dus)

## Vidéo « La SCPI » (`videos/scpi/`)
- [x] Transcript des 2 parties (`TRANSCRIPT.md`) → script unique (`SCRIPT.md`, 36 parties, ~18 min, ~19 800 car.) → 3 textes ElevenLabs (< 10 000 car.)
- [x] Voix calée (doublon de jonction retiré), 36 scènes, intro/outro « immobilier », version finale livrée (`scpi.mp4`, 18:37)
- [ ] À faire valider : slide Iroko « 120 019 € » (devrait être 122 019 €) ; slides cash 50/75/100 k€ « 125 parts » (250/375/500) ;
      rendement Osmo 7 % (simulation) vs 5,79 % (simulateur) ; « première banque privée » (EdR) ; slides Iroko/Osmo marquées « Française »
      alors que la règle est « < 10 % France » ; simulateur de portefeuille marqué « usage interne » (non montré dans la vidéo)

## Vidéo « L'assurance emprunteur » (`videos/assurance-emprunteur/`)
- [x] Transcript (`TRANSCRIPT.md`) → script resserré (`SCRIPT.md`, 17 parties, ~5 min 30, ~6 000 caractères) → textes ElevenLabs
- [x] Voix calée, 17 scènes, version finale livrée (`assurance-emprunteur.mp4`, 5:42)
- [x] (sans version muette, sur consigne)
      (`REPRISES=0 PAUSE=1.2 align.py`) ; intro/outro thème « crédit » rendues (`intro/credit`, `outro/credit`, icône bouclier)
- [ ] Corrections faites, à lui signaler : assurance pas « obligatoire » légalement mais exigée en pratique, la banque ne peut pas
      imposer la sienne ; marges pas « réglementées » ; « jusqu'à 65 % » (slide) ; 28 987 € ; mail noreply@utwin.fr (slide)
- Crédits ElevenLabs : pas un frein (l'utilisateur rachètera si besoin), priorité à la vitesse.

## Vidéo « Le Girardin industriel » (`videos/girardin/`)
- [x] Transcript (`TRANSCRIPT.md`, chiffres faux à l'oral) → script calé sur la présentation (`SCRIPT.md`, 22 parties, ~9 min)
- [x] Textes ElevenLabs (`elevenlabs/`) ; version muette (intro + outro « défiscalisation » existantes)
- [x] Images validées, voix ElevenLabs calée, version finale livrée (`girardin.mp4`, 9:44)
- [ ] À faire vérifier : plafond 10 000 + 8 000 € (en Girardin, seule une partie de la réduction s'impute sur le plafond) ;
      stratégie 2 (marge d'erreur 10 % sur la modulation du PAS, sinon pénalité) ; garantie de l'opérateur

## Vidéo « Le PER » (`videos/per/`)
- [x] Transcript brut (`TRANSCRIPT.md`) → script (`SCRIPT.md`, 28 parties, ~13 min estimées) → textes ElevenLabs (`elevenlabs/`)
- [x] Version muette (intro + outro thème « retraite », nouvelle icône sablier)
- [ ] Validation des images, puis MP3 ElevenLabs → `REPRISES=0 PAUSE=1.2 align.py` → build.sh
- [ ] Points à faire vérifier par l'utilisateur : réforme 2023 (64 ans) suspendue en 2026 ? ; « discussions pour réduire
      l'avantage à 75 / 50 % » ; rendements visés par profil (3-5 / 5-7 / 8-9 %) présentés comme non garantis ;
      retirés du texte : « la moitié des retraités sous le seuil de pauvreté » (faux, ≈ 10 %) et « système de Napoléon »

## Vidéo « Un capital pour ses 18 ans » (`videos/capital-18-ans/`, suite de l'assurance vie)
- [x] Transcript brut des 2 parties (`TRANSCRIPT.md`) → script unique, tutoiement, ton Mathyas (`SCRIPT.md`, 32 parties, ~21 min estimées)
- [x] Version muette sur minutage estimé (`tools/estime.py` → `estimation.js`), intro + outro thème « enfants »
- [x] Voix ElevenLabs reçue (3 MP3), calage `REPRISES=0 PAUSE=1.2 align.py` (REPRISES=0 : sinon les tournures répétées exprès sont coupées)
- [ ] Points juridiques à faire valider par le notaire (récompense, succession du conjoint non souscripteur, co-souscription)

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
