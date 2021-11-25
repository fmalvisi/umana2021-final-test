import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyLayoutComponent } from './views/empty-layout/empty-layout.component';
import { SidebarLayoutComponent } from './views/sidebar-layout/sidebar-layout.component';
import { CoreModule } from 'keycloak-angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EmptyLayoutComponent, SidebarLayoutComponent],
  imports: [CommonModule, RouterModule, CoreModule],
})
export class LayoutModule {}
