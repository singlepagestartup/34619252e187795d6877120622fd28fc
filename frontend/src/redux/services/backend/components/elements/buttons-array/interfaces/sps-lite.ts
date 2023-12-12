import { IBackendExtensionUploadApiEntity as IBackendExtensionUploadApiFile } from "~redux/services/backend/extensions/upload/api/file/interfaces";
import { IComponent as IBackendComponentButton } from "../../button/interfaces";

export interface IComponent {
  id: number;
  __component: "elements.buttons-array";
  variant: "column-with-title" | "row";
  title: string | null;
  additionalAttributes: any;
  buttons: IBackendComponentButton[];
  description: string | null;
  className: string | null;
  url: string | null;
  media?: IBackendExtensionUploadApiFile[] | null;
  additionalMedia?: IBackendExtensionUploadApiFile[] | null;
}
