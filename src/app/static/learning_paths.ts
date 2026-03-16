import { LearningPath } from '../../../dist/spacesuite-learning-path-vis-lib';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp1',
    label: 'Full-Stack Web Development',
    description:
      'A comprehensive learning path to become a proficient full-stack web developer. Becoming a full-stack web developer involves mastering both the user-facing front-end and the server-side back-end of modern web applications. This course will guide you from the fundamentals of coding to the deployment of fully functional, data-driven platforms. Designed for aspiring developers, this program provides a comprehensive foundation in the most in-demand technologies used in the tech industry today. You will learn to design interactive user interfaces, build robust server logic, and manage complex databases. Through hands-on projects, you will transition from a beginner to a job-ready professional capable of handling the entire software development lifecycle.',
    concepts: [
      // Programming Fundamentals
      {
        id: 'c1',
        label: 'Primitive Types',
        description: 'Numbers, strings, booleans',
        uri: 'https://eduflex.nl/data/concepts/c1',
      },
      {
        id: 'c2',
        label: 'Type Conversion',
        description: 'Converting between data types',

        uri: 'https://eduflex.nl/data/concepts/c2',
      },
      {
        id: 'c3',
        label: 'If-Else Statements',
        description: 'Conditional execution',
        uri: 'https://eduflex.nl/data/concepts/c3',
      },
      {
        id: 'c4',
        label: 'Loops',
        description: 'For, while, and do-while loops',
        uri: 'https://eduflex.nl/data/concepts/c4',
      },
      {
        id: 'c5',
        label: 'Function Declaration',
        description: 'Defining and calling functions',
        uri: 'https://eduflex.nl/data/concepts/c5',
      },
      {
        id: 'c6',
        label: 'Parameters & Return',
        description: 'Passing data and returning values',
        uri: 'https://eduflex.nl/data/concepts/c6',
      },

      // Web Development Basics
      {
        id: 'c7',
        label: 'HTML5 Elements',
        description: 'Semantic tags and structure',
        uri: 'https://eduflex.nl/data/concepts/c7',
      },
      {
        id: 'c8',
        label: 'Forms & Input',
        description: 'User input handling',
        uri: 'https://eduflex.nl/data/concepts/c8',
      },
      {
        id: 'c9',
        label: 'Accessibility',
        description: 'ARIA and semantic HTML',
        uri: 'https://eduflex.nl/data/concepts/c9',
      },
      {
        id: 'c10',
        label: 'Flexbox',
        description: 'One-dimensional layouts',
        uri: 'https://eduflex.nl/data/concepts/c10',
      },
      {
        id: 'c11',
        label: 'Grid',
        description: 'Two-dimensional layouts',
        uri: 'https://eduflex.nl/data/concepts/c11',
      },
      {
        id: 'c12',
        label: 'Responsive Design',
        description: 'Media queries and mobile-first',
        uri: 'https://eduflex.nl/data/concepts/c12',
      },
      {
        id: 'c13',
        label: 'DOM Selection',
        description: 'querySelector and getElementById',
        uri: 'https://eduflex.nl/data/concepts/c13',
      },
      {
        id: 'c14',
        label: 'Event Handling',
        description: 'Click, input, and custom events',
        uri: 'https://eduflex.nl/data/concepts/c14',
      },
      {
        id: 'c15',
        label: 'DOM Manipulation',
        description: 'Creating and modifying elements',
        uri: 'https://eduflex.nl/data/concepts/c15',
      },

      // Frontend Frameworks
      {
        id: 'c16',
        label: 'Component Architecture',
        description: 'Templates, styles, and logic',
        uri: 'https://eduflex.nl/data/concepts/c16',
      },
      {
        id: 'c17',
        label: 'Input & Output',
        description: 'Component communication',
        uri: 'https://eduflex.nl/data/concepts/c17',
      },
      {
        id: 'c18',
        label: 'Lifecycle Hooks',
        description: 'Component initialization and cleanup',
        uri: 'https://eduflex.nl/data/concepts/c18',
      },
      {
        id: 'c19',
        label: 'Property Binding',
        description: 'One-way data flow',
        uri: 'https://eduflex.nl/data/concepts/c19',
      },
      {
        id: 'c20',
        label: 'Event Binding',
        description: 'Handling user interactions',
        uri: 'https://eduflex.nl/data/concepts/c20',
      },
      {
        id: 'c21',
        label: 'Two-way Binding',
        description: 'NgModel and forms',
        uri: 'https://eduflex.nl/data/concepts/c21',
      },
      {
        id: 'c22',
        label: 'Service Creation',
        description: 'Injectable classes',
        uri: 'https://eduflex.nl/data/concepts/c22',
      },
      {
        id: 'c23',
        label: 'DI Hierarchy',
        description: 'Providers and injection tokens',
        uri: 'https://eduflex.nl/data/concepts/c23',
      },
      {
        id: 'c24',
        label: 'HTTP Client',
        description: 'API communication',
        uri: 'https://eduflex.nl/data/concepts/c24',
      },

      // Backend Development
      {
        id: 'c25',
        label: 'HTTP Methods',
        description: 'GET, POST, PUT, DELETE',
        uri: 'https://eduflex.nl/data/concepts/c25',
      },
      {
        id: 'c26',
        label: 'Resource Modeling',
        description: 'URL structure and naming',
        uri: 'https://eduflex.nl/data/concepts/c26',
      },
      {
        id: 'c27',
        label: 'Status Codes',
        description: 'Proper error handling',
        uri: 'https://eduflex.nl/data/concepts/c27',
      },
      {
        id: 'c28',
        label: 'SQL Fundamentals',
        description: 'SELECT, JOIN, and aggregation',
        uri: 'https://eduflex.nl/data/concepts/c28',
      },
      {
        id: 'c29',
        label: 'Database Design',
        description: 'Normalization and relationships',
        uri: 'https://eduflex.nl/data/concepts/c29',
      },
      {
        id: 'c30',
        label: 'ORMs',
        description: 'Object-relational mapping',
        uri: 'https://eduflex.nl/data/concepts/c30',
      },
      {
        id: 'c31',
        label: 'JWT Tokens',
        description: 'Stateless authentication',
        uri: 'https://eduflex.nl/data/concepts/c31',
      },
      {
        id: 'c32',
        label: 'Password Hashing',
        description: 'Bcrypt and security',
        uri: 'https://eduflex.nl/data/concepts/c32',
      },
      {
        id: 'c33',
        label: 'OAuth 2.0',
        description: 'Third-party authentication',
        uri: 'https://eduflex.nl/data/concepts/c33',
      },

      // Full-Stack Development
      {
        id: 'c34',
        label: 'Microservices',
        description: 'Service-oriented architecture',
        uri: 'https://eduflex.nl/data/concepts/c34',
      },
      {
        id: 'c35',
        label: 'Design Patterns',
        description: 'Common architectural patterns',
        uri: 'https://eduflex.nl/data/concepts/c35',
      },
      {
        id: 'c36',
        label: 'State Management',
        description: 'Frontend state patterns',
        uri: 'https://eduflex.nl/data/concepts/c36',
      },
      {
        id: 'c37',
        label: 'CI/CD Pipelines',
        description: 'Automated deployment',
        uri: 'https://eduflex.nl/data/concepts/c37',
      },
      {
        id: 'c38',
        label: 'Cloud Platforms',
        description: 'AWS, Azure, GCP',
        uri: 'https://eduflex.nl/data/concepts/c38',
      },
      {
        id: 'c39',
        label: 'Monitoring',
        description: 'Logging and error tracking',
        uri: 'https://eduflex.nl/data/concepts/c39',
      },
      {
        id: 'c40',
        label: 'Unit Testing',
        description: 'Testing individual functions',
        uri: 'https://eduflex.nl/data/concepts/c40',
      },
      {
        id: 'c41',
        label: 'Integration Testing',
        description: 'Testing component interactions',
        uri: 'https://eduflex.nl/data/concepts/c41',
      },
      {
        id: 'c42',
        label: 'E2E Testing',
        description: 'Full application testing',
        uri: 'https://eduflex.nl/data/concepts/c42',
      },
    ],
    courses: [
      {
        id: '1',
        label: 'Introduction to Programming',
        description: 'Learn the fundamentals of programming with hands-on exercises',
        duration: '4 weeks',
        difficulty: 'beginner',
        progress: 100,
        learning_objectives: [
          {
            id: 'lo1',
            label: 'Understand Variables & Data Types',
            description: 'Master the fundamentals of data storage and manipulation',
            conceptIds: ['c1', 'c2'],
            bloom_level: 4,
          },
          {
            id: 'lo2',
            label: 'Implement Control Flow',
            description: 'Use conditional statements and loops effectively',
            conceptIds: ['c3', 'c4'],
            bloom_level: 1,
          },
          {
            id: 'lo3',
            label: 'Create Reusable Functions',
            description: 'Build modular and maintainable code',
            conceptIds: ['c5', 'c6'],
            bloom_level: 2,
          },
        ],
      },
      {
        id: '2',
        label: 'Web Development Basics',
        description: 'Master HTML, CSS, and JavaScript fundamentals',
        duration: '6 weeks',
        difficulty: 'beginner',
        progress: 65,
        learning_objectives: [
          {
            id: 'lo4',
            label: 'Build Semantic HTML',
            description: 'Create well-structured web documents',
            conceptIds: ['c7', 'c8', 'c9'],
            bloom_level: 4,
          },
          {
            id: 'lo5',
            label: 'Master CSS Layouts',
            description: 'Create responsive and modern designs',
            conceptIds: ['c10', 'c11', 'c12'],
            bloom_level: 3,
          },
          {
            id: 'lo6',
            label: 'Manipulate the DOM',
            description: 'Create dynamic and interactive pages',
            conceptIds: ['c13', 'c14', 'c15'],
            bloom_level: 1,
          },
        ],
      },
      {
        id: '3',
        label: 'Frontend Frameworks',
        description: 'Build modern web applications with Angular',
        duration: '8 weeks',
        difficulty: 'intermediate',

        progress: 0,
        learning_objectives: [
          {
            id: 'lo7',
            label: 'Build Angular Components',
            description: 'Create reusable UI building blocks',
            conceptIds: ['c16', 'c17', 'c18'],
            bloom_level: 4,
          },
          {
            id: 'lo8',
            label: 'Implement Data Binding',
            description: 'Connect UI to application state',
            conceptIds: ['c19', 'c20', 'c21'],
            bloom_level: 4,
          },
          {
            id: 'lo9',
            label: 'Use Services & Dependency Injection',
            description: 'Manage shared logic and state',
            conceptIds: ['c22', 'c23', 'c24'],
            bloom_level: 3,
          },
        ],
      },
      {
        id: '4',
        label: 'Backend Development',
        description: 'Build REST APIs and work with databases',
        duration: '10 weeks',
        difficulty: 'intermediate',

        progress: 0,
        learning_objectives: [
          {
            id: 'lo10',
            label: 'Design RESTful APIs',
            description: 'Create scalable and maintainable endpoints',
            conceptIds: ['c25', 'c26', 'c27'],
            bloom_level: 4,
          },
          {
            id: 'lo11',
            label: 'Work with Databases',
            description: 'Store and query application data',
            conceptIds: ['c28', 'c29', 'c30'],
            bloom_level: 1,
          },
          {
            id: 'lo12',
            label: 'Implement Authentication',
            description: 'Secure your applications',
            conceptIds: ['c31', 'c32', 'c33'],
            bloom_level: 2,
          },
        ],
      },
      {
        id: '5',
        label: 'Full-Stack Development',
        description: 'Integrate frontend and backend to build complete applications',
        duration: '12 weeks',
        difficulty: 'advanced',

        progress: 0,
        learning_objectives: [
          {
            id: 'lo13',
            label: 'Design Application Architecture',
            description: 'Build scalable and maintainable systems',
            conceptIds: ['c34', 'c35', 'c36'],
            bloom_level: 4,
          },
          {
            id: 'lo14',
            label: 'Deploy to Production',
            description: 'Ship applications to the cloud',
            conceptIds: ['c37', 'c38', 'c39'],
            bloom_level: 4,
          },
          {
            id: 'lo15',
            label: 'Write Comprehensive Tests',
            description: 'Ensure code quality and reliability',
            conceptIds: ['c40', 'c41', 'c42'],
            bloom_level: 4,
          },
        ],
      },
    ],
  },
  {
    id: 'lp2',
    uri: 'https://eduflex.nl/data/lp/4b4034a0-b7fc-48fe-b9db-e0abd5dde293',
    label: 'Land-use image classification for greenhouse gases',
    description:
      'This course explores advanced techniques for analysing land-use patterns through image classification to assess greenhouse gas emissions. Participants will learn how to process satellite and aerial imagery, apply machine learning models, and interpret spatial data to identify land-use categories linked to carbon footprints. The curriculum covers data acquisition, preprocessing, classification algorithms, and validation methods, emphasising practical applications in climate monitoring and sustainable planning. By the end, learners will be equipped to integrate geospatial analysis into environmental decision-making, supporting efforts to mitigate climate change through informed land-use strategies.',
    courses: [
      {
        id: 'co1',
        label: 'Climate change awareness',
        uri: 'https://eduflex.nl/data/courses/7590617b-b7c8-4a2c-91c9-0adada4730ec',
        description:
          'This course provides a comprehensive introduction to the science, impacts, and solutions related to climate change. Participants will explore the causes of global warming, including greenhouse gas emissions, and examine the consequences for ecosystems, economies, and human health. The programme highlights international policies, sustainable practices, and innovative technologies aimed at reducing carbon footprints. Through interactive discussions and real-world case studies, learners will gain practical insights into how individuals and organisations can contribute to climate resilience. By the end, participants will be empowered to make informed decisions and advocate for sustainable actions in their communities and workplaces.',
        learning_objectives: [
          {
            id: 'lo11',
            uri: 'https://eduflex.nl/data/lo/df6d074d-e3c2-4e60-849f-9a46a3ebb88a',
            label: 'Discriminate between types of land use and gases',
            bloom_level: 4,
            bloom_level_label: 'analyse',
            conceptIds: ['1', '2'],
          },
        ],
        duration: '4 weeks',
        difficulty: 'beginner',
      },
      {
        id: 'co2',
        label: 'Course UAV for Precision Agriculture',
        uri: 'https://eduflex.nl/data/courses/87bf2e9c-74c2-44b7-9810-32cb7ba0c3f5',
        description:
          'This course introduces the use of Unmanned Aerial Vehicles (UAVs) in modern precision agriculture. Participants will learn how drones can capture high-resolution imagery and sensor data to monitor crop health, soil conditions, and irrigation efficiency. The curriculum covers UAV operation, flight planning, data acquisition, and image processing techniques, alongside practical applications such as yield estimation and pest detection. Emphasis is placed on integrating drone technology with farm management systems to optimise resources and improve sustainability. By the end, learners will be equipped with the skills to leverage UAVs for data-driven decision-making in agricultural practices.',
        learning_objectives: [
          {
            id: 'lo12',
            uri: 'https://eduflex.nl/data/lo/9247e572-7128-4a95-8f66-dddc355b1bab',
            label: 'Apply multispectral imagery to gauge plant health and crop requirements',
            bloom_level: 3,
            bloom_level_label: 'apply',
            conceptIds: ['3', '4'],
          },
        ],
        duration: '4 weeks',
        difficulty: 'beginner',
      },
    ],
    concepts: [
      {
        id: '1',
        uri: 'https://geospacebok.eu/TA12-1',
        label: '[TA12-1] EO for climate change mitigation & adaptation',
        description:
          'Climate change observations show the warming of the climate system. The changes since the 1950s are unprecedented over decades to millennia.The atmosphere and ocean have warmed, the amounts of snow and ice have diminished, and sea level has risen. The anthropogenic emissions of greenhouse gases are the highest in history. Recent climate changes have had widespread impacts on human and natural systems. There is an urgant need for climate action through mitigation and adaptation. Mitigation actions prevent or reduce the emission of greenhuse gases into the atmoshpere with the objective to make the impacts of climate change less severe. Adapting to climate change increases our resilience to impacts like extreme weather events (e.g. hazards like floods and droughts) that get more frequent and intense in many regions. Current climate change will get worse in the future even if the reduction of emissions is effective with negative effects on ecosystems, economy, human health and well-being. There is extensive need for actions to adapt to the impacts of climate change.',
      },
      {
        id: '2',
        uri: 'Permalink: https://geospacebok.eu/TA13-4-6',
        label: '[TA13-4-6] Monitor land use',
        description:
          'EO technologies (both optical and SAR) are capable to categorize bio-physical coverage of land to produce land cover maps like CORINE Land Cover (CLC). The EO method is objective and allows for frequent updates. EO-derived land cover is an excellent basis for mapping land use, the socioeconomic use that is made of land. Land use products are used in a wide range of applications (e.g. agriculture, forestry, spatial planning, determining and implementing environmental policy, land accounting). In a humanitarian context, land use mapping is applied to map refugee camps, population and pressures on population that cause migration.',
      },
      {
        id: '3',
        uri: 'https://geospacebok.eu/TA12-5',
        label: '[TA12-5] EO for sustainable agriculture & food production',
        description:
          'Agricultural activity is sustained by good environmental conditions that allow farmers to harness natural resources, create their produce and earn a living. This fosters a sustainable rural economy while food produced by agriculture sustains society as a whole.',
      },
      {
        id: '4',
        uri: 'https://geospacebok.eu/PP2-2-5-3',
        label: '[PP2-2-5-3] Soil permittivity',
        description:
          'Soil permittivity is a measure of the water content (soil moisture) in the soil and characterized by the metric of the dielectric constant of the soil. Soil moisture influences emission, absorption and propagation of microwave electromagnetic energy. Moisture decreases the ‘emissivity’ of soil, and thereby affects microwave radiation emitted from Earth’s surface. Dry soil has a low dielectric constant and low radar reflectivity. Moist and partially frozen solis have intermediate values. The higher the soil water content, the lower the radar signal penetration into the soil. In situ measurements of soil permittivity are a prerequisite for the calibration and validation of synthetic aperture radar (SAR) soil moisture retrieval algorithms. Soil moisture is a key variable in the hydrologic cycle and is recognized as an Essential Climate Variable (ECV).',
      },
    ],
  },
];
