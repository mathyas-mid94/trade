# Devoir Machine Learning — Stratégie de trading CAC 40

Réseau de neurones *feedforward* (Keras/TensorFlow) qui prévoit la hausse du CAC 40
(`^FCHI`) à J+1, puis backtest de la stratégie. Sujet : MBA2 Trading et Finance de
Marché — A25 (Prof. H. SUN).

## Fichier
- `Devoir_ML_CAC40.ipynb` — notebook répondant aux 10 étapes du sujet.
  **Avant le dépôt sur BlackBoard, le renommer en `Nom_Prenom.ipynb`** et compléter la
  cellule d'en-tête avec votre nom.

## Exécution
Le notebook télécharge les données via `yfinance` : une **connexion internet** est requise
(Google Colab recommandé). En cas d'exécution sur Colab, décommenter la cellule
d'installation (`pip install yfinance TA-Lib tensorflow scikit-learn matplotlib`).

Étapes couvertes : téléchargement des données, features (variations Close J-1/J-8, ADX,
RSI, Stochastique, CCI, volatilité 10 j), label (hausse J+1 & variation J-8 positive),
split temporel + StandardScaler, réseau 512/256/128/32 (dropout 15 %) + sortie sigmoïde,
entraînement (`batch_size=64`, `epochs=25`), matrice de confusion + rapport de
classification, et backtest (bilan des ordres, Sharpe, max drawdown, rendement cumulé
vs *buy & hold*).
