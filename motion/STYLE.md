# Charte motion design

Référence unique pour toutes les vidéos (intros, pubs, explications) :
**« How The Economic Machine Works » de Ray Dalio** — propre, clean, très animé.

## Identité MIC (prioritaire sur les couleurs de l'original Dalio)
Logo et palette de référence : `brand/mic-logo-reference.png`, `brand/mic-palette-reference.webp`.

| Rôle | Nom | Hex |
|---|---|---|
| Fond | paper | `#FBF7EC` |
| Fond secondaire, remplissages clairs | paperDeep | `#F0E8D2` |
| Trait, texte, logo | ink (teal) | `#234E48` |
| Argent, aplats foncés | inkSoft | `#3F6F68` |
| Gilets, flèches d'échange, mise en avant | accent | `#CAA97A` |
| Cartons, détails clairs | accentSoft | `#ECE0C5` |

- Aucune couleur hors palette (pas de vert fluo, pas de rouge vif).
- Typo : Cormorant Garamond (logo, titres), Inter en capitales espacées (sous-titres, slogans).
- Logo : double cercle teal (épais + fin), « MIC » en serif, filet dessous. Version vectorielle animable : `D.micLogo()`.

## Règles visuelles (style Dalio)
- Fond papier uni avec un léger grain. Pas de dégradé, pas de photo.
- Trait net, arrondi, épaisseur régulière, couleur ink.
- Objets **remplis** et cernés — pas juste des contours.
- Personnages : jambes très longues et fines, gilet en œuf avec col en V et deux boutons,
  tête ovale claire, cheveux, un trait pour l'œil, bras fins et souples.
- Échanges représentés par des flèches en ressort.

## Règles d'animation
- Rien n'est statique : apparitions en « pop » avec rebond, objets qui volent en arc, boucles qui tournent.
- Les traits se dessinent ; le texte arrive lettre par lettre.
- Caméra vivante : poussées lentes, grands reculs qui révèlent le système entier.
- Transitions par objet : un élément fonce vers la caméra ou se transforme en élément du plan suivant.
- Une idée par plan.

## Pipeline
- `lib/dalio.js` : briques réutilisables (personnage, billets, carton, flèche ressort, tracé progressif, grain).
- Chaque animation est une page HTML/SVG qui expose `window.render(t)` et `window.DURATION`.
- `node motion/render.mjs <page.html> <sortie.mp4> [fps]` capture chaque image avec Chromium puis encode en MP4.

## Son
**Son validé : le son d'origine MIC** (`brand/mic-sound-reference.m4a`), utilisé tel quel.
Pour une nouvelle vidéo, on le recale pour que son impact (à 7,4 s dans le fichier) tombe sur l'apparition du logo :
`ffmpeg -i video.mp4 -ss <7.4 - instant_du_logo> -i brand/mic-sound-reference.m4a -map 0:v -map 1:a -c:v copy -af "afade=t=in:d=0.25" -shortest sortie.mp4`

- Rester **sobre** : le sound design synthétisé avec un effet sur chaque mouvement a été jugé « too much ».
- Pas de bruitage par élément animé ; une seule nappe + whoosh + impact suffit.
- `sound/intro_sfx.py` (version synthétisée) est gardé pour mémoire, mais n'est plus le choix par défaut.

## Intros
- **Intro générique MIC (par défaut)** : `intro/intro.html` — le personnage passe des instruments du patrimoine
  (immobilier, allocation, épargne, contrats, marchés) à la loupe ; la caméra plonge dans le verre, qui devient le logo.
  Message : « on va décortiquer un instrument financier ».
- `intro/variante-billets.html` : ancienne version (échanges de billets), trop « commerce » pour de la gestion de patrimoine.
- Icônes réutilisables : `D.icons.house / pie / coins / contract / curve`, loupe : `D.magnifier()`.

## Outros
- **Outro générique MIC (par défaut)** : `outro/outro.html` — le personnage plante une pièce, l'arbre du patrimoine pousse
  (les instruments sont ses fruits), la caméra glisse vers l'écran de fin : logo, « Merci d'avoir regardé », bouton S'abonner cliqué.
  Volontairement à l'opposé de l'intro : on ne plonge pas dans un détail, on prend du recul sur le long terme.
- Deux versions :
  - **site** (par défaut, `outro/outro.mp4`, 8,5 s) : logo + « Merci d'avoir regardé », sans appel à s'abonner
    (vidéos hébergées sur le site de l'utilisateur, pas d'abonnement possible) ;
  - **réseaux sociaux** (`outro/outro_abonnement.mp4`, 10,5 s) : + « Abonnez-vous » et bouton S'abonner cliqué.
    Rendu : `node render.mjs "outro/outro.html?abonnement" ...`
- Textes modifiables dans `CONFIG`. Son : référence MIC décalée de 1,15 s.

## Variantes par catégorie
- Intro et outro acceptent `?theme=<catégorie>` (objet `THEMES` en haut de chaque fichier) :
  icônes, étiquettes, mention de la catégorie sous le logo.
- Intro : la loupe s'arrête toujours sur l'icône du milieu (index 2) → le timing et le son ne bougent pas.
- Thèmes existants :
  - `generique`
  - `defiscalisation` : le « % » rétrécit sous la loupe ; outro : parapluie contre la pluie d'impôts
  - `assurancevie` : le sceau du contrat grossit sous la loupe
  - `budget` : revenus, dépenses, budget, épargne, logement ; sous la loupe le camembert tourne et une part se détache
- Ajouter un thème = une entrée dans `THEMES` (icônes, étiquettes, mention, et `react(f, k)` pour l'effet sous la loupe).

## Vidéos explicatives longues
- Une vidéo = un dossier `videos/<sujet>/` avec `SCRIPT.md` (voix off), `video.html` (scènes), `build.sh` (montage).
- `video.html` : liste `SCENES` ({ dur, build(g, T, draw) -> render(lt) }), enchaînées avec une transition glissée de 0,6 s.
  Les sous-titres (`say(T, début, fin, texte)`) reprennent la voix off, scène par scène.
- Montage : intro du thème + corps + outro (version site), sons MIC sur intro et outro.
- Vérification rapide sans tout rendre : `node snap.mjs <page.html> <dossier> t1 t2 ...`
- Personnages : `D.guy(parent, { vest, hair: "f" })` pour varier (femmes, gilets, enfants = échelle réduite).
