import { Model } from './model'

export const CURRENT_THUMBNAIL_VERSION = 1

export const ContentTypes = {
  Text: 'Text',
  Image: 'Image',
  File: 'File'
}

export const ConversationMetadata = Model('ConversationMetadata', {
  id: '',
  filename: '',
  secret: '',
  contacts: [],
  pic: '',
  thumbnail: {},
  readAt: '',
  wasRead: false,
  trusted: true
})

export const Conversation = Model('Conversation', {
  /**
   * List of IDs of contacts involved in the conversation
   */
  contacts: [],

  /**
   * Filename for the public file where outgoing messages are saved
   */
  filename: '',

  /**
   * The secret for the convo
   */
  secret: '',

  /**
   * The pic of the sender
   */
  pic: '',

  /**
   * List of messages contained in the conversation
   */
  messages: [],

  /**
   * Read receipt to calculate if read
   */
  readAt: '',

  /**
   * Read bool for display purposes
   */
  wasRead: false,

  //conversation contains only trusted contacts
  trusted: true
})

Conversation.getId = ({ contacts }) => contacts && contacts.sort().join('-')

Conversation.getDefaultThumbnail = () => ({
  id: null,
  version: CURRENT_THUMBNAIL_VERSION,
  contentType: ContentTypes.Text,
  content: '',
  timestamp: new Date().toISOString(),
  pic: 'https://lorempixel.com/64/64',
  readAt: '',
  wasRead: false,
  trusted: true
})

Conversation.getThumbnail = convo => {
  const id = Conversation.getId(convo)
  const version = CURRENT_THUMBNAIL_VERSION
  const [firstMessage] = convo.messages //should this be convo.messages[0]?

  const base = Conversation.getDefaultThumbnail()

  if (!firstMessage) {
    return {
      ...base,
      id,
      version
    }
  }

  return {
    ...base,
    id,
    version,
    contentType: firstMessage.type,
    content: firstMessage.content,
    lastSender: firstMessage.sender,
    timestamp: firstMessage.sentAt,
    pic: convo.pic,
    readAt: convo.readAt,
    wasRead: convo.wasRead,
    trusted: convo.trusted
  }
}

Conversation.getMetadata = convo => new ConversationMetadata({
  id: Conversation.getId(convo),
  thumbnail: Conversation.getThumbnail(convo),
  contacts: convo.contacts,
  filename: convo.filename,
  secret: convo.secret,
  pic: convo.pic,
  readAt: convo.readAt,
  wasRead: convo.wasRead,
  trusted: convo.trusted
})

export const Message = Model('Message', {
  /**
   * ID of the contact who sent this message
   */
  sender: '',

  /**
   * What type of content the message contains
   */
  type: ContentTypes.Text,

  /**
   * String content of the message
   */
  content: '',

  sentAt: new Date().toISOString(),

  expirationDate: '',

  paymentStatus: 'unpaid',

  value: '0.00'
})
