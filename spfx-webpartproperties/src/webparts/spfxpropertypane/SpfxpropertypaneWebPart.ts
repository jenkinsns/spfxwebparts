import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from '@microsoft/sp-client-preview';

import styles from './Spfxpropertypane.module.scss';
import * as strings from 'spfxpropertypaneStrings';
import { ISpfxpropertypaneWebPartProps } from './ISpfxpropertypaneWebPartProps';

export default class SpfxpropertypaneWebPart extends BaseClientSideWebPart<ISpfxpropertypaneWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.spfxpropertypane}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to Client Webpart WebPart Properties</span>
              <p class="ms-font-l ms-fontColor-white">Name : ${this.properties.name}</p>
              <p class="ms-font-l ms-fontColor-white">Description: ${this.properties.description}</p>
              <p class="ms-font-l ms-fontColor-white">Slider value: ${this.properties.Slider}</p>
              <p class="ms-font-l ms-fontColor-white">Toggle value: ${this.properties.Toggle}</p>
              <p class="ms-font-l ms-fontColor-white">DropDown value: ${this.properties.dropdowm}</p>
              <p class="ms-font-l ms-fontColor-white">Check Box value: ${this.properties.checkbox}</p>
              <p class="ms-font-l ms-fontColor-white">Designation: ${this.properties.textbox}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        { //Page 1
          header: {
            description: "Page 1 - one group and two fields "
          },
          groups: [
            {
              groupName: "Group one",
              groupFields: [
                PropertyPaneTextField('name', {
                  label: "Name",
                  multiline: false,
                  resizable: false,
                  onGetErrorMessage: this.simpleTextBoxValidationMethod,
                  errorMessage: "",
                  deferredValidationTime: 10,
                  placeholder: "Please enter name","description": "This is Name"
                }),
                PropertyPaneTextField('description', {
                  label: "Description",
                  multiline: true,
                  resizable: true,
                  deferredValidationTime: 10,
                  placeholder: "Please enter description","description": "Description"
                })
              ]
            }
          ]
        },
        { //Page 2
          header: {
            description: "Page 2 - two groups and two fields each"
          },
          groups: [
            {
              groupName: "Group one",
              groupFields: [
                PropertyPaneSlider('Slider', {
                  label:'Slider',min:1,max:10
                }),
                PropertyPaneToggle('Toggle', {
                label: ''
                })
              ]
            },
            {
              groupName: "Group Two",
              groupFields: [
                PropertyPaneDropdown('dropdowm', {
                  label:'Drop Down',
                  options: [
                    { key: 'Item1', text: 'Item 1' },
                    { key: 'Item2', text: 'Item 2' },
                    { key: 'Item3', text: 'Item 3', isSelected: true }
                  ]
                }),
                PropertyPaneCheckbox('checkbox',
                  { text: 'Yes/No', isChecked: true, isEnabled: true})
              ]
            }
          ]
        },
         { //Page 3
          header: {
            description: "One group and two fields "
          },
          groups: [
            {
              groupName: "Group One",
              groupFields: [
                PropertyPaneLink('URL',
                { text:"My Blog", href:'http://www.jenkinsblogs.com',target:'_blank'}),
                 PropertyPaneLabel('label',
                { text:'Please Enter designation',required:true}),
                 PropertyPaneTextField('textbox',{})
              ]
            }
          ]
        }
      ]
    };
  }
  private simpleTextBoxValidationMethod(value: string): string {
    if (value.length < 5) {
        return "Name must be more than 5 characters!";
    } else {
      return "";
    }
  }
}
