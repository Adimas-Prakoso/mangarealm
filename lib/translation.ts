import translate from 'translate';

// Configure the translate library
translate.engine = 'libre'; // Use LibreTranslate (free)
translate.key = process.env.TRANSLATION_API_KEY;

export interface TranslationOptions {
  text: string;
  from?: string;
  to: string;
}

export async function translateText({ text, from = 'auto', to }: TranslationOptions): Promise<string> {
  try {
    // For development, return mock translations
    if (process.env.NODE_ENV === 'development') {
      return `[Translated to ${to}] ${text}`;
    }

    const result = await translate(text, { from, to });
    return result;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}

export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
];

export function getLanguageName(code: string): string {
  const language = supportedLanguages.find(lang => lang.code === code);
  return language?.name || code;
}