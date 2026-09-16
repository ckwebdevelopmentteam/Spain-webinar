export interface WhatsAppGroupInfo {
  title: string;
  buttonText: string;
  url: string;
}

/**
 * Returns the secure WhatsApp group info for the specified batch language.
 * Stored and read exclusively from .env on the server side.
 */
export function getWhatsAppGroup(language?: string): WhatsAppGroupInfo {
  const key = (language || '').toLowerCase().trim();

  const groups: Record<string, WhatsAppGroupInfo> = {
    malayalam: {
      title: 'Join Malayalam Batch Group',
      buttonText: 'Join Malayalam WhatsApp Group',
      url: process.env.WHATSAPP_GROUP_MALAYALAM || '',
    },
    hindi: {
      title: 'Join Hindi Batch Group',
      buttonText: 'Join Hindi WhatsApp Group',
      url: process.env.WHATSAPP_GROUP_HINDI || '',
    },
    english: {
      title: 'Join English Batch Group',
      buttonText: 'Join English WhatsApp Group',
      url: process.env.WHATSAPP_GROUP_ENGLISH || '',
    },
  };

  return groups[key] || groups['english'];
}
