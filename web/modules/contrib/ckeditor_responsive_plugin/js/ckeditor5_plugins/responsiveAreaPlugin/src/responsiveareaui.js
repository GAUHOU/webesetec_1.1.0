/**
 * @file registers the responsiveArea toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import {
  createDropdown,
  addListToDropdown,
  ButtonView,
  ContextualBalloon,
  Model
} from 'ckeditor5/src/ui';
import icon from '../../../../icons/responsivearea.svg';
import {Collection} from "ckeditor5/src/utils";

export default class ResponsiveAreaUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;
    const options = this._getLocalizedOptions();
    this._balloon = this.editor.plugins.get(ContextualBalloon);


    // This will register the responsiveArea toolbar button.
    editor.ui.componentFactory.add('responsiveArea', (locale) => {
      const command = editor.commands.get('insertResponsiveArea');
      const dropdownView = createDropdown(locale);
      addListToDropdown( dropdownView, _prepareListOptions( options, command ) );
      dropdownView.buttonView.set( {
        label: t( 'CKEditor Responsive' ),
        icon: icon,
        tooltip: true
      } );
      dropdownView.bind( 'isEnabled' ).to( command );
      this.listenTo(dropdownView, 'execute', (item) => {
        editor.execute('insertResponsiveArea', { value: item.source.value })
      });

      return dropdownView;
    });
  }

  _getLocalizedOptions() {
    const editor = this.editor;
    const t = editor.t;
    const options  = [
      {
        value: '1_100',
        title: t('1 area - 100%')
      },
      {
        value: '2_50_50',
        title: t('2 areas - 50% each')
      },
      {
        value: '2_75_25',
        title: t('2 areas - 75% 25%')
      },
      {
        value: '2_25_75',
        title: t('2 areas - 25% 75%')
      },
      {
        value: '2_33_66',
        title: t('2 areas - 33% 66%')
      },
      {
        value: '2_66_33',
        title: t('2 areas - 66% 33%')
      },
      {
        value: '3_33_44_33',
        title: t('3 areas - 33% each')
      },
      {
        value: '3_25_50_25',
        title: t('3 areas - 25% 50% 25%')
      },
      {
        value: '3_25_25_50',
        title: t('3 areas - 25% 25% 50%')
      },
      {
        value: '4_25_25_25_25',
        title: t('4 areas - 25% each')
      },
      {
        value: '5_20_20_20_20_20',
        title: t('5 areas - 20% each')
      },

    ];

    return options.map( option => {
      // The only title to localize is "Default" others are font names.
      if ( option.title === 'Default' ) {
        option.title = t( 'Default' );
      }

      return option;
    } );
  }

  _showUI() {
    this._balloon.add( {
      view: this.formView,
      position: this._getBalloonPositionData()
    } );
  }

  _hideUI() {
    this._balloon.remove( this.formView );
    this.editor.editing.view.focus();
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;
    target = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );
    return {
      target
    };
  }
}


function _prepareListOptions(options, command) {
  const itemDefinitions = new Collection();

  // Create dropdown items.
  for (const option of options) {
    const def = {
      type: 'button',
      model: new ViewModel( {
        commandName: 'responsiveArea',
        commandParam: option.model,
        label: option.title,
        withText: true,
        value: option.value,
      } )
    };

    itemDefinitions.add(def);
  }
  return itemDefinitions;
}
