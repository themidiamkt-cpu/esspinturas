export const PHONE = "+55 19 98611-4474";
export const WHATSAPP_NUMBER = "5519986114474";
export const TARGET_AREA = "Estado de São Paulo";
export const BRAND_NAME = "E2SPinturas";

export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const buildWhatsAppUrl = (text) =>
  `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;

export const PRIMARY_WHATSAPP_URL = buildWhatsAppUrl(
  `Olá! Quero agendar uma vistoria técnica da ${BRAND_NAME}.`
);

export const TEAM_WHATSAPP_URL = buildWhatsAppUrl(
  `Olá! Quero falar com o time técnico da ${BRAND_NAME}.`
);
