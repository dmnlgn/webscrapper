const configuration = {
  RESERVED: {
    TSHIRT: {
      URL: "https://www.reserved.com/pl/pl/mezczyzna/ubrania/t-shirty",
      REQUEST: "/reserved/tshirt",
    },
    JEANS: {
      URL: "https://www.reserved.com/pl/pl/mezczyzna/ubrania/jeansy",
      REQUEST: "/reserved/jeans",
    },
  },
  MEDICINE: {
    TSHIRT: {
      URL: "https://wearmedicine.com/k/on/odziez/t-shirty?page=",
      REQUEST: {
        INSERT: "/medicine/tshirt/insert",
        TEST: "/medicine/tshirt/test",
        GET: "/medicine/tshirt/",
      },
      DESCRIPTION: "medicineStatusTshirt",
    },
    JEANS: {
      URL: "https://wearmedicine.com/k/on/odziez/jeansy?page=",
      REQUEST: {
        INSERT: "/medicine/jeans/insert",
        TEST: "/medicine/jeans/test",
        GET: "/medicine/jeans/",
      },
      DESCRIPTION: "medicineStatusJeans",
    },
  },
  HM: {
    TSHIRT: {
      URL: "https://www2.hm.com/pl_pl/on/produkty/t-shirty-i-podkoszulki.html?sort=stock&image-size=small&image=model&offset=0&page-size=5000",
      REQUEST: "/hm/tshirt",
      DESCRIPTION: "hmStatusTshirt",
    },
  },
};

module.exports = { configuration };
