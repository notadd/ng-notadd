import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { ThousandsSeparatorPipe } from './thousands-separator.pipe';
import { FileExtensionPipe, IsImageFilePipe } from './file-extension.pipe';
import { RoutingPathPipe } from './routing-path.pipe';

@NgModule({
    imports: [
    ],
    declarations: [ KeysPipe, ThousandsSeparatorPipe, FileExtensionPipe, IsImageFilePipe, RoutingPathPipe ],
    exports: [ KeysPipe, ThousandsSeparatorPipe, FileExtensionPipe, IsImageFilePipe, RoutingPathPipe ]
})
export class NotaddPipesModule {
}
