interface TranslationResponse {
    translatedText: string;
  }
  
  async function translateMultiple(
    text: string,
    sourceLang: string,
    targets: string[]
  ): Promise<Record<string, string>> {
    const promises = targets.map((target) =>
      fetch("http://localhost:6000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: target,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to translate to ${target}: ${res.statusText}`);
        }
        return (await res.json()) as TranslationResponse;
      })
    );
  
    const results = await Promise.all(promises);
  
    const translations = results.reduce<Record<string, string>>((acc, curr, i) => {
      acc[targets[i]] = curr.translatedText;
      return acc;
    }, {});
  
    return translations;
  }
  export default translateMultiple;