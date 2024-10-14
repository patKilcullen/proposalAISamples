
import mongoose from "mongoose";
import Business from "../models/Business.js";
import BusinessUser from "../models/User.js";
import { faker } from '@faker-js/faker';
import { hashString } from "./index.js";


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
export const seed = async () =>{
    try {
        console.log('seeding')
        await Business.deleteMany({});
        await BusinessUser.deleteMany({});
        
        const businessIds = []
        for (let i = 0; i <= 5; i ++){
            const name = faker.company.name()
            const business = await Business.create({
                businessName: name
            })
            businessIds.push(business.id);
        };

        for (let i = 0; i <= 30; i++) {
        const businessId = faker.helpers.arrayElement(businessIds);
        const password = faker.internet.password({length: 20, pattern: /[A-Za-z0-9]/})
        const user = await BusinessUser.create({
            userName: faker.person.fullName(),
            businessId: businessId,
            password: await hashString(password), 
            email : faker.internet.email(),
        });

        const business = await Business.findById(businessId)
        business.users.push(user._id);
        business.save()
    }
    console.log(`seeded successfully`)
    } catch (error) {
        console.log('error when seeding', error.message)
    }
    
  }
  
  /*
   We've separated the `seed` function from the `runSeed` function.
   This way we can isolate the error handling and exit trapping.
   The `seed` function is concerned only with modifying the database.
//   */
//   async function runSeed() {
//     console.log('seeding...')
//     try {
//       await seed()
//     } catch (err) {
//       console.error(err)
//       process.exitCode = 1
//     } finally {
//       console.log('closing db connection')
//       await db.close()
//       console.log('db connection closed')
//     }
//   }
  
  /*
    Execute the `seed` function, IF we ran this module directly (`node seed`).
    `Async` functions always return a promise, so we can use `catch` to handle
    any errors that might occur inside of `seed`.
  */
//   if (module === require.main) {
//     runSeed()
//   }

  