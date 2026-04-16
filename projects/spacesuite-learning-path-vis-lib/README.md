# Spacesuite Learning Path Visualization Library

This library enables the visualization of learning paths. It was developed as part of the SpaceSuite project (2025–2027)

#### Installation
Install the library from NPM using
```bash
npm i spacesuite-learning-path-vis-lib
```

### Usage
```js
// my-page.component.ts

import {
  Course,
  LearningPath,
  LearningPathComponent,
  LearningPathVerticalComponent,  
  MultipleLearningPathComponent,
  ThemeService,
} from 'spacesuite-learning-path-vis-lib';


@Component({
  ......
  imports: [
    CommonModule,
    LearningPathComponent,
    LearningPathVerticalComponent,
    MultipleLearningPathComponent,
  ],
})
export class MyPageComponent {
  learning_path: LearningPath = {
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
  };

}
```

#### Setting theme
Option 1: `provideLearningPath()`  - Set theme and config once at app bootstrap. All instances share the same resolved config.

```js
// app.config.ts
provideLearningPath({
  theme: { accentColor: '#a78bfa', accentColor2: '#f472b6' },
  showThemeSelector: true,
  cardWidth: 300,
})
```

Option 2: `[themeColor]` input  - Pass a hex string directly to the component. Useful when each instance needs a different color.

```html
// my-page.component.html
<spacesuite-learning-path
  [learningPath]="learning_path"
  [themeColor]="'#6366f1'"
/>
```

Option 3: `ThemeService` injection  - Inject ThemeService and call setCustom() / setPreset() at runtime — e.g. from a color picker or user preferences.

```js
// my-page.component.ts
readonly themeService = inject(ThemeService);

applyBrandColor(hex: string) {
  this.themeService.setCustom({ accentColor: hex });
}
```
