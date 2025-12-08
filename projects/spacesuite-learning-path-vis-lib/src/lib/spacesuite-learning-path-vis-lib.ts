import { NgModule } from '@angular/core';
import { LearningPathComponent } from './components/learning-path.component/learning-path.component';
import { LearningPathsComponent } from './components/learning-paths.component';

@NgModule({
  imports: [LearningPathComponent, LearningPathsComponent],
  exports: [LearningPathComponent, LearningPathsComponent],
  providers: [],
})
export class SpacesuiteLearningPathVisLib {

}
