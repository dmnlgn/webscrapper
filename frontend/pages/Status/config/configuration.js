export const scrapperStatus = {
  header: ["NAME", "STATUS", "RECORDS", "OPERATIONS"],
  sections: [
    {
      sectionName: "RESERVED",
      collection: [
        {
          shopTitle: "Tshirt",
          shopDescription: "reservedStatusTshirt",
          shopOperations: [
            {
              operationName: "test",
              endpoint: "reserved/tshirt/test",
              buttonName: "TEST",
            },
            {
              operationName: "insert",
              endpoint: "reserved/tshirt/insert",
              buttonName: "ADD TO DATABASE",
            },
          ],
        },
        {
          shopTitle: "Jeans",
          shopDescription: "reservedStatusJeans",
          shopOperations: [
            {
              operationName: "test",
              endpoint: "reserved/jeans/test",
              buttonName: "TEST",
            },
            {
              operationName: "insert",
              endpoint: "reserved/jeans/insert",
              buttonName: "ADD TO DATABASE",
            },
          ],
        },
      ],
    },
    {
      sectionName: "MEDICINE",
      collection: [
        {
          shopTitle: "Tshirt",
          shopDescription: "medicineStatusTshirt",
          shopOperations: [
            {
              operationName: "test",
              endpoint: "medicine/tshirt/test",
              buttonName: "TEST",
            },
            {
              operationName: "insert",
              endpoint: "medicine/tshirt/insert",
              buttonName: "ADD TO DATABASE",
            },
          ],
        },
        {
          shopTitle: "Jeans",
          shopDescription: "medicineStatusJeans",
          shopOperations: [
            {
              operationName: "test",
              endpoint: "medicine/jeans/test",
              buttonName: "TEST",
            },
            {
              operationName: "insert",
              endpoint: "medicine/jeans/insert",
              buttonName: "ADD TO DATABASE",
            },
          ],
        },
        {
          shopTitle: "ALL",
          shopDescription: "medicineStatusAll",
          shopOperations: [
            {
              operationName: "test",
              endpoint: "medicine/test/all",
              buttonName: "TEST",
            },
            {
              operationName: "insert",
              endpoint: "medicine/insert/all",
              buttonName: "ADD TO DATABASE",
            },
          ],
        },
      ],
    },
    {
      sectionName: "HM",
      collection: [
        {
          shopTitle: "Tshirt",
          shopOperation: "hm/tshirt",
          shopDescription: "hmStatusTshirt",
        },
      ],
    },
  ],
};
