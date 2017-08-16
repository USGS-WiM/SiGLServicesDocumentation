// ------------------------------------------------------------------------------
// ----- json-formatter.component -----------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
// purpose: component to format json response in mainview from https://github.com/mohsen1/json-formatter/issues/62

import { Component, Input, OnInit } from '@angular/core';
import { getObjectName, getPreview, getType, getValuePreview } from './utils';

const JSONFormatterConfig = {
  hoverPreviewEnabled: false
};

@Component({
  selector: 'json-formatter',
  styleUrls: ['./json-formatter.component.css'],
  template: `
    <div class="json-formatter-row">
      <a (click)="toggleOpen()">
        <span class="toggler" [class.open]="isOpen" *ngIf="isObject"></span>
        <span class="key" *ngIf="hasKey"><span class="key-text">{{key}}</span><span class="colon">:</span></span>
        <span class="value">
        <span *ngIf="isObject">
          <span class="constructor-name">{{ constructorName }}</span>
          <span *ngIf="isArray"><span class="bracket">[</span><span class="number">{{json.length}}</span><span
            class="bracket">]</span></span>
        </span>
        <span *ngIf="!isObject" (click)="openLink(isUrl)" class="{{type}}"
              [ngClass]="{date: isDate, url: isUrl}">{{parseValue(json)}}</span>
      </span>      
      </a>
      <div class="children" *ngIf="keys?.length && isOpen">
        <json-formatter *ngFor="let key of keys; trackBy: trackByFn" [json]="json[key]" [key]="key"
                        [open]="childrenOpen()"></json-formatter>
      </div>
      <div class="children empty object" *ngIf="isEmptyObject()"></div>
      <div class="children empty array" *ngIf="!keys?.length && isOpen && isArray"></div>
    </div>
  `
})
export class JsonFormatterComponent implements OnInit {
  @Input() json: any;
  @Input() key;
  @Input() open: number;

  isArray;
  isObject;
  isUrl;
  isDate;
  type;

  hasKey;
  keys: any;
  isOpen: boolean;
  constructorName: string;

  ngOnInit() {
    this.isArray = Array.isArray(this.json);
    this.isObject = this.json != null && typeof this.json === 'object';
    this.type = getType(this.json);
    this.hasKey = typeof this.key !== 'undefined';
    this.isOpen = this.open && this.open > 0

    this.constructorName = getObjectName(this.json);
    if (this.isObject) {
      this.keys = Object.keys(this.json).map((key) => key === '' ? '""' : key);
    }
    if (this.type === 'string') {
      if ((new Date(this.json)).toString() !== 'Invalid Date') {
        this.isDate = true;
      }
      if (this.json.indexOf('http') === 0) {
        this.isUrl = true;
      }
    }
  }

  isEmptyObject() {
    return this.keys && !this.keys.length && this.isOpen && !this.isArray;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  childrenOpen() {
    return this.open > 1 ? this.open - 1 : 0;
  }

  openLink(isUrl) {
    if (isUrl) {
      window.location.href = this.json;
    }
  }

  parseValue(value) {
    return getValuePreview(this.json, value);
  }

  showThumbnail() {
    return this.isObject && !this.isOpen;
  }

  trackByFn(i) {
    return i;
  }
}