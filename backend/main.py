
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from gtts import gTTS
from io import BytesIO
import argostranslate.translate

app = FastAPI(title="CareBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslationRequest(BaseModel):
    text: str
    source_language: str = "en"
    target_language: str


@app.get("/")
def home():
    return {"message": "CareBridge backend is running"}


@app.post("/translate")
def translate_text(data: TranslationRequest):
    text = data.text.strip()
    source_code = data.source_language
    target_code = data.target_language

    if not text:
        raise HTTPException(400, "Please enter a message.")

    if len(text) > 5000:
        raise HTTPException(400, "Maximum length is 5000 characters.")

    if source_code == target_code:
        return {"translatedText": text}

    # Online translation involving Tamil
    if source_code == "ta" or target_code == "ta":
        try:
            from deep_translator import MyMemoryTranslator

            language_names = {
                "en": "english",
                "ta": "tamil india",
            }

            if source_code not in language_names or target_code not in language_names:
                raise HTTPException(
                    400, "This language pair is not supported."
                )

            translator = MyMemoryTranslator(
                source=language_names[source_code],
                target=language_names[target_code],
            )

            translated = translator.translate(text)

            if not translated:
                raise HTTPException(
                    502, "Translation returned empty."
                )

            return {"translatedText": translated}

        except HTTPException:
            raise
        except Exception:
            raise HTTPException(
                502,
                "Tamil translation failed. Check your internet or try again later.",
            )

    # Offline translation using Argos
    installed = argostranslate.translate.get_installed_languages()

    source = next(
        (lang for lang in installed if lang.code == source_code),
        None,
    )
    target = next(
        (lang for lang in installed if lang.code == target_code),
        None,
    )

    if source is None or target is None:
        raise HTTPException(
            400, "This language is not installed in the backend."
        )

    translation = source.get_translation(target)

    if translation is None:
        raise HTTPException(
            400, "This language pair is not installed in the backend."
        )

    return {"translatedText": translation.translate(text)}


@app.get("/speak")
def speak(text: str, lang: str = "ta"):
    try:
        audio = BytesIO()
        tts = gTTS(text=text, lang=lang)
        tts.write_to_fp(audio)
        audio.seek(0)

        return StreamingResponse(
            audio,
            media_type="audio/mpeg",
        )
    except Exception:
        raise HTTPException(
            500, "Audio generation failed. Check your internet connection."
        )
