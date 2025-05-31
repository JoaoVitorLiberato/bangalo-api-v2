export interface INotification {
  send (data: Record<string,string|boolean|number>): Promise<any>
}