import { defineContract } from "@prisma/orm-postgres/contract-builder";

export const contract = defineContract({}, ({ field, model, rel }) => {
  const User = model("User", {
    fields: {
      id: field.id.uuidv7String(),
      email: field.text().unique(),
      name: field.text(),
      password: field.text(),
      mission: field.text().default("garçom"),
      admin: field.boolean().default(false),
      login: field.text().default("bloqueado"),
    },
  });

  const Product = model("Product", {
    fields: {
      id: field.id.uuidv7String(),
      name: field.text(),
      description: field.text(),
      category: field.text(),
      image: field.text().default(""),
      price: field.decimal(),
    },
  });

  return {
    models: {
      User,
      Product,
    },
  };
});
