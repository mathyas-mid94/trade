"""Transcrit une voix off avec Whisper (OpenAI), mot par mot, horodaté.

usage : python3 motion/tools/transcribe.py <audio> <sortie.json> [modèle=small]
Sortie : {"words": [{"w": "mot", "a": début_s, "b": fin_s}, ...], "text": "..."}
Le modèle est téléchargé une fois depuis openaipublic.azureedge.net (domaine à autoriser dans l'environnement).
"""
import json, sys
import whisper

audio, out = sys.argv[1], sys.argv[2]
model = whisper.load_model(sys.argv[3] if len(sys.argv) > 3 else "small")
res = model.transcribe(audio, language="fr", word_timestamps=True, condition_on_previous_text=False,
                       initial_prompt="Assurance vie, PEA, compte-titres, flat tax, abattement, unités de compte, fonds euros, DCA, S&P 500, MIC. Banane.")
words = [{"w": w["word"].strip(), "a": round(w["start"], 2), "b": round(w["end"], 2)}
         for seg in res["segments"] for w in seg.get("words", [])]
json.dump({"words": words, "text": res["text"]}, open(out, "w"), ensure_ascii=False, indent=0)
print(f"ok : {len(words)} mots -> {out}")
