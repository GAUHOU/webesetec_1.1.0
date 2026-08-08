/**
 * @file defines InsertResponsiveAreaCommand, which is executed when the responsiveArea
 * toolbar button is pressed.
 */
// cSpell:ignore responsiveareaediting

import { Command } from 'ckeditor5/src/core';

export default class InsertResponsiveAreaCommand extends Command {
  execute(option) {
    const { model } = this.editor;

    const value = option.value;

    model.change((writer) => {
      // Insert <responsiveArea>*</responsiveArea> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createResponsiveArea(writer));
      model.insertContent(createGrid(writer, value));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // responsiveArea is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'responsiveArea',
      'responsiveDivWrapper',
      'div'
    );

    // If the cursor is not in a location where a responsiveArea can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createResponsiveArea(writer) {
  // Create instances of the three elements registered with the editor in
  // responsiveareaediting.js.
  const responsiveArea = writer.createElement('responsiveArea');
  const responsiveAreaTitle = writer.createElement('responsiveAreaTitle');
  const responsiveAreaDescription = writer.createElement('responsiveAreaDescription');

  // Append the title and description elements to the responsiveArea, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(responsiveAreaTitle, responsiveArea);
  writer.append(responsiveAreaDescription, responsiveArea);

  // The responsiveAreaDescription text content will automatically be wrapped in a
  // `<p>`.
  writer.appendElement('paragraph', responsiveAreaDescription);

  // Return the element to be added to the editor.
  return responsiveArea;
}


function createGrid(writer, value) {
  const wrapper = writer.createElement('responsiveDivWrapper');
  let grid_columns = getColumnsByGrid(value);
  for (const grid_column of grid_columns) {
    const column = writer.createElement('responsiveDivColumn_' + grid_column);
    writer.append(column, wrapper);

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', column );
  }
  return wrapper;
}


function getColumnsByGrid(grid) {
  switch (grid) {
    case '1_100':
      return [
        '1_100'
      ];
    case '2_50_50':
      return [
        '2_50',
        '2_50'
      ];
    case '2_75_25':
      return [
        '2_75',
        '2_25'
      ];
    case '2_25_75':
      return [
        '2_25',
        '2_75'
      ];
    case '2_33_66':
      return [
        '2_33',
        '2_66'
      ];
    case '2_66_33':
      return [
        '2_66',
        '2_33'
      ];
    case '3_33_44_33':
      return [
        '3_33',
        '3_44',
        '3_33'
      ];
    case '3_25_50_25':
      return [
        '3_25',
        '3_50',
        '3_25'
      ];
    case '3_25_25_50':
      return [
        '3_25',
        '3_25',
        '3_50'
      ];
    case '3_50_25_25':
      return [
        '3_50',
        '3_25',
        '3_25'
      ];
    case '4_25_25_25_25':
      return [
        '4_25',
        '4_25',
        '4_25',
        '4_25'
      ];
    case '5_20_20_20_20_20':
      return [
        '5_20',
        '5_20',
        '5_20',
        '5_20',
        '5_20'
      ];
  }
}
