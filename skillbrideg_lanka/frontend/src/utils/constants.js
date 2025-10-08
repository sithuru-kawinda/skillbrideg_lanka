export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'http://localhost:8082/api/auth/login',
    REGISTER: 'http://localhost:8082/api/auth/register',
    TEST: 'http://localhost:8082/api/auth/test',
    HEALTH: 'http://localhost:8082/api/auth/health'
  },
  JOBS: {
    BASE: 'http://localhost:8083/job',
    ALL: 'http://localhost:8083/job/all',
    WITH_RECRUITER: 'http://localhost:8083/job/withRecruiter',
    CREATE: 'http://localhost:8083/job/create',
    BY_LEVEL: 'http://localhost:8083/job'
  },
  RECRUITERS: {
    BASE: 'http://localhost:8081/api/recruiters',
    REGISTER: 'http://localhost:8081/api/recruiters/register',
    TEST: 'http://localhost:8081/api/recruiters/test'
  },
  SEEKERS: {
    BASE: 'http://localhost:8086/seekers',
    REGISTER: 'http://localhost:8086/seekers/register',
    TEST: 'http://localhost:8086/seekers/test',
    HEALTH: 'http://localhost:8086/seekers/health'
  }
};