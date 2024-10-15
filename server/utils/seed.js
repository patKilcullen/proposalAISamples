import mongoose from "mongoose";
import Business from "../models/Business.js";
import BusinessUser from "../models/User.js";
import { faker } from "@faker-js/faker";
import { hashString } from "./index.js";

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
export const seed = async () => {
  try {
    console.log("seeding");
    await Business.deleteMany({});
    await BusinessUser.deleteMany({});

    const businessIds = [];
    for (let i = 0; i <= 5; i++) {
      const name = faker.company.name();
      const business = await Business.create({
        businessName: name,
      });
      businessIds.push(business.id);
    }

    for (let i = 0; i <= 30; i++) {
      const businessId = faker.helpers.arrayElement(businessIds);
      const password = faker.internet.password({
        length: 20,
        pattern: /[A-Za-z0-9]/,
      });
      const user = await BusinessUser.create({
        userName: faker.person.fullName(),
        businessId: businessId,
        password: await hashString(password),
        email: faker.internet.email(),
      });

      const business = await Business.findById(businessId);
      business.users.push(user._id);
      business.save();
    }
    console.log(`seeded successfully`);
  } catch (error) {
    console.log("error when seeding", error.message);
  }
};
