const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('db', 'contacts.json');

// TODO: задокументувати кожну функцію
/**
 * @returns {Promise<[data]>} // Повертає масив контактів.
 */
async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (error) {
    ({ message }) => console.log(message);
  }
}

/**
 * @param {*} contactId
 * @returns {object<contact>} // Повертає об'єкт контакту з таким id: contactId
 * @returns {Boolean<null>} // Повертає null, якщо контакт з таким id не знайдений.
 */
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) null;

  return contact;
}

/**
 *
 * @param {*} contactId
 * @returns {object<removeContact>} // Повертає об'єкт видаленого контакту.
 * @returns {Boolean<null>} // Повертає null, якщо контакт з таким id не знайдений.
 */
async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIndex === -1) null;

  const removedContact = contacts.splice(contactIndex, 1);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    ({ message }) => console.log(message);
  }

  return removedContact;
}

/**
 *
 * @param {*} name // string - значення властивості нового об'єкту
 * @param {*} email // string - значення властивості нового об'єкту
 * @param {*} phone // string - значення властивості нового об'єкту
 * @returns {object<newContact>} // Повертає об'єкт доданого контакту.
 */
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    ({ message }) => console.log(message);
  }

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
