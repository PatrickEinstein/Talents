import { faker } from "@faker-js/faker";

export const gigsData = Array.from({ length: 10 }, () => ({
  title: faker.person.jobTitle(),
  description: faker.lorem.sentence(),
  by: faker.company.name(),
  mode: faker.helpers.arrayElement(["Remote", "On-site", "Hybrid"]),
  pay: faker.helpers.arrayElement(["Commission", "Hourly", "Fixed"]),
  image: faker.image.avatar(),
  date: faker.date.recent(),
  location: faker.location.city(),
}));


export const TabsData = [
  {
    name: "Manage",
  },
  {
    name: "Active",
  },
  {
    name: "All",
  },
];

export const GigsTabsData = [
    {
      name: "Manage",
    },
    {
      name: "All",
    },
  ];