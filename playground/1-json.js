import { readFileSync, writeFileSync } from 'fs'

const dataBuffer = readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

user.name = 'Gunther'
user.age = 54

const userJSON = JSON.stringify(user)
writeFileSync('1-json.json', userJSON)