import {exit} from "node:process"
import db from "../config/db"
import color from "colors"

export const clearDB = async () => {
  try {
    db.sync({force: true})
    console.log(color.blue.bold("clear database"))
    exit()
  } catch (error) {
    console.log(color.red.bold.bgWhite("Unable to connect to the database"))
    exit(1)
  }
}

if(process.argv[2] === "--clear"){
  clearDB()
}
