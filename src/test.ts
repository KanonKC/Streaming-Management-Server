import Filter from 'bad-words'

const filter = new Filter({ replaceRegex:  /[A-Za-z0-9ก-ฮ_]/g }); 
const name = 'hello fcker hi hi damn ควย'
console.log(filter.clean(name))