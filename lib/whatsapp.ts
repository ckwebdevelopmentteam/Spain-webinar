export interface WhatsAppGroupInfo {
  title: string;
  buttonText: string;
  url: string;
}

/**
 * Returns the secure WhatsApp group info for the Malayalam batch.
 * Stored and read exclusively from .env on the server side.
 * Guaranteed to return only the Malayalam group link.
 */
export function getWhatsAppGroup(_language?: string): WhatsAppGroupInfo {
  return {
    title: 'Join Sapain Workshop Community',
    buttonText: 'Join WhatsApp Group',
    url: process.env.WHATSAPP_GROUP_URL || process.env.WHATSAPP_GROUP_MALAYALAM || 'https://chat.whatsapp.com/D77iUr390404BkaR0Rjl63',
  };
}
