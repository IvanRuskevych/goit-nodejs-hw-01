const { program } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
require('colors');

program
  .option('-i, --id <id>', 'contact id')
  .option('-n, --name <name>', 'contact name')
  .option('-e, --email <email>', 'contact email')
  .option('-p, --phone <phone>', 'contact phone number')
  .option('-a, --action <action>', 'choose action')
  .parse();

const options = program.opts();
console.log(options);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      return contacts.length > 0 ? console.table(contacts) : console.log('The contact list is empty'.bgYellow);

    case 'get':
      const contact = await getContactById(id);
      return contact ? console.table(contact) : console.log(`There is no contact with id: "${id}" in the list`.red);

    case 'add':
      const newContact = await addContact(name, email, phone);
      return console.table(newContact);

    case 'remove':
      const removedContact = await removeContact(id);
      return removedContact
        ? console.table(removedContact)
        : console.log(`There is no contact with id: "${id}" in the list`.red);

    default:
      return console.log('Enter correct options'.bgBlue);
  }
}

invokeAction(options);
