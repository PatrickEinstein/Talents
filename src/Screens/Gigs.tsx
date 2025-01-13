import { faker } from "@faker-js/faker";


export const gigsData = Array.from({ length: 10 }, () => ({
    title: faker.name.jobTitle(),
    description: faker.lorem.sentence(),
    by: faker.company.name(),
    mode: faker.helpers.arrayElement(["Remote", "On-site", "Hybrid"]),
    pay: faker.helpers.arrayElement(["Commission", "Hourly", "Fixed"]),
    image: faker.image.avatar(),
    date: faker.date.recent(),
    location: faker.location.city(),
  }));

const Gigs = () => {
  return <div>Gigs</div>;
};

export default Gigs;
