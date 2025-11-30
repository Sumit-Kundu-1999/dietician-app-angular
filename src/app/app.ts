import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "@org/header";

@Component({
  imports: [RouterModule, Header],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'org';
}
