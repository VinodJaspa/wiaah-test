export const getRandomName = (): { firstName: string; lastName: string } => {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Henry",
    "Isabel",
    "Jack",
    "Kate",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Parker",
    "Quinn",
    "Ryan",
    "Sofia",
    "Tyler",
    "Uma",
    "Violet",
    "William",
    "Xavier",
    "Yara",
    "Zoe",
  ];
  const lastNames = [
    "Adams",
    "Brown",
    "Carter",
    "Davis",
    "Evans",
    "Fisher",
    "Garcia",
    "Harrison",
    "Irwin",
    "Jackson",
    "Kane",
    "Lee",
    "Miller",
    "Nelson",
    "O'Connor",
    "Patel",
    "Quinn",
    "Ramirez",
    "Singh",
    "Taylor",
    "Upton",
    "Vargas",
    "Williams",
    "Xiong",
    "Yamamoto",
    "Zhang",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return { firstName: randomFirstName, lastName: randomLastName };
};
