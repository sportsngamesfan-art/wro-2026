from googletrans import Translator
import asyncio

async def test():
    translator = Translator()
    result = await translator.translate("Hello", src='en', dest='sa')
    print("Translated:", result.text)

asyncio.run(test())