export const TEST_DATA = {
  search: {
    id: 1,
    keyword: 'Java',
    portal: 'LinkedIn',
    postal_code: '80331',
    radius: '50',
    isCustom: false,
    urls: [
      'https://linkedin.com/jobs/java'
    ]
  },

  companies: [
    {
      id: 1,
      companyName: 'SAP',
      url: 'https://www.sap.com',
      api: 'https://api.sap.com',
      showCompany: true
    },
    {
      id: 2,
      companyName: 'Bosch',
      url: 'https://www.bosch.de',
      api: 'https://api.bosch.de',
      showCompany: true
    },
    {
      id: 3,
      companyName: 'Siemens',
      url: 'https://www.siemens.com',
      api: 'https://api.siemens.com',
      showCompany: true
    },
    {
      id: 4,
      companyName: 'BMW',
      url: 'https://www.bmwgroup.com',
      api: 'https://api.bmwgroup.com',
      showCompany: true
    },
    {
      id: 5,
      companyName: 'DATEV',
      url: 'https://www.datev.de',
      api: 'https://api.datev.de',
      showCompany: true
    },
    {
      id: 6,
      companyName: 'adesso',
      url: 'https://www.adesso.de',
      api: 'https://api.adesso.de',
      showCompany: true
    },
    {
      id: 7,
      companyName: 'msg systems',
      url: 'https://www.msg.group',
      api: 'https://api.msg.group',
      showCompany: false
    },
    {
      id: 8,
      companyName: 'JobHafen',
      url: 'https://jobhafen.de',
      api: 'https://api.jobhafen.de',
      showCompany: true
    }
  ],

  jobs: [
    {
      id: 1,
      jobTitle: 'Senior Java Developer',
      applied: true,
      companyId: 1,
      searchId: 1
    },
    {
      id: 2,
      jobTitle: 'Java Backend Engineer',
      applied: false,
      companyId: 2,
      searchId: 1
    },
    {
      id: 3,
      jobTitle: 'Spring Boot Developer',
      applied: false,
      companyId: 3,
      searchId: 1
    },
    {
      id: 4,
      jobTitle: 'Software Engineer Java',
      applied: true,
      companyId: 4,
      searchId: 1
    },
    {
      id: 5,
      jobTitle: 'Java Cloud Engineer',
      applied: false,
      companyId: 5,
      searchId: 1
    },
    {
      id: 6,
      jobTitle: 'Java Full Stack Developer',
      applied: false,
      companyId: 6,
      searchId: 1
    },
    {
      id: 7,
      jobTitle: 'Backend Developer Java',
      applied: true,
      companyId: 7,
      searchId: 1
    },
    {
      id: 8,
      jobTitle: 'Junior Java Developer',
      applied: false,
      companyId: 8,
      searchId: 1
    },
    {
      id: 9,
      jobTitle: 'Java Platform Engineer',
      applied: false,
      companyId: 1,
      searchId: 1
    },
    {
      id: 10,
      jobTitle: 'Lead Java Engineer',
      applied: true,
      companyId: 3,
      searchId: 1
    }
  ]
};