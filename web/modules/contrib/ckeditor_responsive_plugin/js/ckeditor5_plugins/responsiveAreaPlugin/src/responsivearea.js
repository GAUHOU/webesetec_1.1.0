/**
 * @file This is what CKEditor refers to as a master (glue) plugin. Its role is
 * just to load the “editing” and “UI” components of this Plugin. Those
 * components could be included in this file, but
 *
 * I.e, this file's purpose is to integrate all the separate parts of the plugin
 * before it's made discoverable via index.js.
 */
// cSpell:ignore responsiveareaediting responsiveareaui

// The contents of ResponsiveAreaUI and ResponsiveArea editing could be included in this
// file, but it is recommended to separate these concerns in different files.
import ResponsiveAreaEditing from './responsiveareaediting';
import ResponsiveAreaUI from './responsiveareaui';
import { Plugin } from 'ckeditor5/src/core';

export default class ResponsiveArea extends Plugin {
  // Note that ResponsiveAreaEditing and ResponsiveAreaUI also extend `Plugin`, but these
  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only
  // discover the plugins explicitly exported in index.js.
  static get requires() {
    return [ResponsiveAreaEditing, ResponsiveAreaUI];
  }
}
