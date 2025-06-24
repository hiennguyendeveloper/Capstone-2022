export interface WorkbookInterface {
  id: number | null;
  workbookName: string;
  workbookPath: string;
  dtmCreated: Date | null;
  dtmUpdated: Date | null;
  dtmDeleted: Date | null;
}
