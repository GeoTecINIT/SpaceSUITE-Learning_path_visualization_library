import 'zone.js';  // REQUIRED for Angular tests
import 'zone.js/testing';  // REQUIRED for Angular tests

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// You can call initTestEnvironment without parameters for basic setup
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
