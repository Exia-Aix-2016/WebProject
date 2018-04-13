import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "ngx-bootstrap";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ButtonsModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
