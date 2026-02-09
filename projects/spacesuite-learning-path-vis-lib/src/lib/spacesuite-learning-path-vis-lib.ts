import { NgModule } from '@angular/core';
import { LearningPathV1Component } from './components/learning-path-v1.component';
import { MultipleLearningPathComponent } from './components/multiple-learning-path.component';
import { LearningPathV2Component } from './components/learning-path-v2.component';
@NgModule({
  imports: [LearningPathV1Component, MultipleLearningPathComponent, LearningPathV2Component],
  exports: [LearningPathV1Component, MultipleLearningPathComponent, LearningPathV2Component],
  providers: [],
})
export class SpacesuiteLearningPathVisLib {}
