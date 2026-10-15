# Charte motion design

Référence unique pour toutes les vidéos (intros, pubs, explications) :
**« How The Economic Machine Works » de Ray Dalio** — propre, clean, très animé.

## Règles visuelles
- Fond papier crème (`#F3F3E3`) avec un léger grain. Pas de dégradé, pas de photo.
- Trait gris anthracite (`#2F332E`), net, arrondi, épaisseur régulière.
- Objets **remplis** (blanc, gris, couleur) et cernés de noir — pas juste des contours.
- Personnages : jambes très longues et fines, gilet gris (`#B3B7AD`) en œuf avec col en V blanc et deux boutons,
  tête ovale blanche, cheveux gris, un trait pour l'œil, bras fins et souples.
- Argent = vert fluo (`#5EE05B`) en liasses. Rouge (`#E0574B`) pour la baisse / le danger. Gris pour la dette.
- Échanges représentés par des flèches roses en ressort (`#D9798F`).
- Texte : capitales condensées (Pathway Gothic One), dans des cadres dessinés avec petites lignes d'impact.

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
