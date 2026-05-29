const providerDefaults = {
  Interakt: { authHeader: 'Authorization', authPrefix: 'Basic' },
  Wati: { authHeader: 'Authorization', authPrefix: 'Bearer' },
  AiSensy: { authHeader: 'Authorization', authPrefix: 'Bearer' },
  Twilio: { authHeader: 'Authorization', authPrefix: 'Basic' },
  'Custom HTTP Gateway': { authHeader: 'Authorization', authPrefix: 'Bearer' }
};

export class WhatsAppService {
  constructor(providerConfig) {
    this.config = providerConfig;
    this.defaults = providerDefaults[providerConfig.provider] || providerDefaults['Custom HTTP Gateway'];
  }

  buildHeaders() {
    return {
      'Content-Type': 'application/json',
      [this.config.authHeader || this.defaults.authHeader]: `${this.config.authPrefix || this.defaults.authPrefix} ${this.config.token}`
    };
  }

  buildTemplatePayload(recipientNumber, templateName, variables = {}) {
    return {
      to: recipientNumber,
      type: 'template',
      template: {
        name: templateName,
        language: 'en',
        components: variables
      }
    };
  }

  async sendTemplateMessage(recipientNumber, templateName, variables) {
    return {
      url: `${this.config.baseUrl}/messages/template`,
      headers: this.buildHeaders(),
      body: this.buildTemplatePayload(recipientNumber, templateName, variables)
    };
  }

  async sendTextMessage(recipientNumber, messageText) {
    return {
      url: `${this.config.baseUrl}/messages`,
      headers: this.buildHeaders(),
      body: { to: recipientNumber, type: 'text', text: { body: messageText } }
    };
  }

  receiveIncomingLeadWebhook(payload, fieldMap) {
    const readPath = (path) => path.split('.').reduce((value, key) => value?.[key], payload);

    return {
      name: readPath(fieldMap.name),
      phone: readPath(fieldMap.phone),
      message: readPath(fieldMap.message),
      source: this.config.provider
    };
  }
}
