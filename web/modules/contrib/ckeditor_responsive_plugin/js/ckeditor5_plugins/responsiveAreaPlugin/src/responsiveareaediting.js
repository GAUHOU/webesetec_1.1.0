import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertResponsiveAreaCommand from './insertresponsiveareacommand';

// cSpell:ignore responsivearea insertresponsiveareacommand
export default class ResponsiveAreaEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertResponsiveArea',
      new InsertResponsiveAreaCommand(this.editor),
    );
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <responsiveArea>
   *    <responsiveAreaTitle></responsiveAreaTitle>
   *    <responsiveAreaDescription></responsiveAreaDescription>
   * </responsiveArea>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('responsiveArea', {
      isObject: true,
      allowWhere: '$block',
    });


    schema.register('responsiveDivWrapper', {
      inheritAllFrom: '$blockObject',
    });

    const options = this._optionsListCols();
    for (const option of options) {
      schema.register('responsiveDivColumn_' + option.grid, {
        // Cannot be split or left by the caret.
        isLimit: true,
        allowIn: 'responsiveDivWrapper',
        // Allow content which is allowed in the root (e.g. paragraphs).
        allowContentOf: '$root'
      });
    }
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'responsiveDivWrapper',
      view: {
        name: 'div',
        classes: 'ckeditor-col-container clearfix row',
      },
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'responsiveDivWrapper',
      view: {
        name: 'div',
        classes: 'ckeditor-col-container clearfix row',
      },
    });


    conversion.for('editingDowncast').elementToElement({
      model: 'responsiveDivWrapper',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('div', {
          class: 'ckeditor-col-container clearfix row',
        });

        return toWidget(section, viewWriter, { label: 'responsiveDivWrapper' });
      },
    });


    const options = this._optionsListCols();

    for (const option of options) {
      conversion.for('dataDowncast').elementToElement({
        model: 'responsiveDivColumn_' + option.grid,
        view: {
          name: 'div',
          classes: option.class
        },
      });

      conversion.for('upcast').elementToElement({
        model: 'responsiveDivColumn_' + option.grid,
        view: {
          name: 'div',
          classes: option.class
        },
      });

      conversion.for('editingDowncast').elementToElement({
        model: 'responsiveDivColumn_' + option.grid,
        view: (modelElement, { writer: viewWriter }) => {
          const section = viewWriter.createEditableElement('div', {
            class: option.class
          });

          return toWidgetEditable(section, viewWriter, { label: 'responsiveDivColumn' });
        },
      });


    }



  }


  _optionsListCols() {
    return [
      {
        grid: '1_100',
        class: 'grid-12 col-md-12 col-sm-12 col-xs-12 col-lg-12'
      },
      {
        grid: '2_50',
        class: 'grid-6 sixcol col-md-6 col-sm-6 col-xs-6 col-lg-6'
      },
      {
        grid: '2_75',
        class: 'grid-8 eightcol col-md-9 col-sm-9 col-xs-9 col-lg-9'
      },
      {
        grid: '2_25',
        class: 'grid-4 fourcol col-md-3 col-sm-3 col-xs-3 col-lg-3'
      },
      {
        grid: '2_33',
        class: 'grid-5 fivecol col-md-4 col-sm-4 col-xs-4 col-lg-4'
      },
      {
        grid: '2_66',
        class: 'grid-7 sevencol col-md-8 col-sm-8 col-xs-8 col-lg-8'
      },
      {
        grid: '3_33',
        class: 'grid-4 fourcol col-md-4 col-sm-4 col-xs-4 col-lg-4'
      },
      {
        grid: '3_44',
        class: 'grid-4 fourcol col-md-4 col-sm-4 col-xs-4 col-lg-4'
      },
      {
        grid: '3_25',
        class: 'grid-3 threecol col-md-3 col-sm-3 col-xs-3 col-lg-3'
      },
      {
        grid: '3_50',
        class: 'grid-6 sixcol col-md-6 col-sm-6 col-xs-6 col-lg-6'
      },
      {
        grid: '4_25',
        class: 'grid-3 threecol col-md-3 col-sm-3 col-xs-3 col-lg-3'
      },
      {
        grid: '5_20',
        class: 'grid-2 twocol col-sm-2 col-xs-2 col-lg-2 layout-5-col'
      }
    ];
  }

}
